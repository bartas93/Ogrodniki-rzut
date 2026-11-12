// Sześć zmian E2 według ID, dojścia po rozłożeniu i migracja v25 -> v26.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8');
const prefix=html.split('<script>')[1].split('/* ---------- widok ---------- */')[0];
const clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(prefix+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,bodies:furnBodies,zones:furnZones,extensions:computeExt,arrange:setArrangement,analyse:()=>{A=analyse();return A;}};})();`,c,{timeout:5000});return c.api;
}
const api=launch(),s=api.state(),f=id=>s.furn.find(f=>f.id===id),openings=s.walls.flatMap(w=>w.op);
assert.ok(!openings.some(o=>o.id===3),'Usunięte wyłącznie okno O3');
const wall42=s.walls.find(w=>w.id===42),wall54=s.walls.find(w=>w.id===54);
assert.equal(wall42.x2,13725);assert.equal(wall42.x2,wall54.x1);
assert.equal(wall42.x2+api.extensions().get(42)[1],wall54.x1+wall54.t/2,'Zlicowany prawy koniec S42 i S54');
assert.ok(wall42.op.every(o=>o.pos+o.w/2<=wall42.x2-wall42.x1),'Otwory pozostają wewnątrz S42');
const laundryWindow=openings.find(o=>o.id===5),gardenDoor=openings.find(o=>o.id===4);
assert.equal(laundryWindow.w,1200);assert.equal(laundryWindow.height,1200);assert.equal(laundryWindow.sill,1200);
assert.equal(laundryWindow.pos-laundryWindow.w/2-gardenDoor.pos-gardenDoor.w/2,200,'20 cm ściany do drzwi pralni');
const northWall=s.walls.find(w=>w.op.some(o=>o.id===5));
assert.ok(northWall.x1+laundryWindow.pos+laundryWindow.w/2<9698,'Okno kończy się przed wysokim narożnikiem PAX');
const door=openings.find(o=>o.id===52);assert.equal(door.side,1);assert.equal(door.hinge,1);
const box=(id,expected)=>{const b=api.bodies(f(id))[0];for(const [key,value] of Object.entries(expected))assert.equal(b[key],value,'M'+id+' '+key);};
box(101,{x1:13180,x2:14150,y1:200,y2:2200});
box(143,{x1:14100,x2:16100,y1:9030,y2:10000});assert.equal(f(143).rot,180);
box(117,{x1:6730,x2:7700,y1:8000,y2:10000});assert.equal(f(117).rot,90);
box(116,{x1:4850,x2:5550,y1:8600,y2:10000});assert.equal(f(116).rot,270);
assert.equal(f(116).w,1400);assert.equal(f(116).d,700);
assert.equal(f(74).rot,0);assert.equal(f(74).x,2500);assert.equal(f(74).arrangements.expanded.parts.length,11);
const rowParts=f(74).arrangements.expanded.parts.slice(1);assert.equal(rowParts.filter(p=>p[1]<0).length,5);assert.equal(rowParts.filter(p=>p[1]===1).length,5);
assert.equal(4700-(f(74).x+f(74).arrangements.expanded.w/2),800,'Przejście od strony holu');
// M75 i konserwatywna rezerwa nowego M76 są alternatywami, nie jednoczesnym spaniem.
for(const scenario of ['stół','spanie sofa','spanie narożnik','stół i spanie sofa','stół i spanie narożnik']){
 const app=launch(),state=app.state(),sleepIds=[scenario.includes('narożnik')?76:75,101,117,143];
 if(scenario.includes('stół'))app.arrange(state.furn.find(f=>f.id===74),'expanded');
 if(scenario.includes('spanie'))for(const id of sleepIds){
  const item=state.furn.find(f=>f.id===id);
  for(const b of app.zones(item).filter((_,i)=>item.z[i].k==='unfold'&&!item.z[i].off))state.furn.push({id:state.nextId++,key:'ref',name:'Rozłożenie '+id,x:(b.x1+b.x2)/2,y:(b.y1+b.y2)/2,w:b.x2-b.x1,d:b.y2-b.y1,rot:0,layer:'',z:[]});
 }
 const a=app.analyse();
 for(const r of state.rooms)assert.ok(a.roomReach.has(a.rooms.get(r.id)?.reg?.k),scenario+': '+r.name);
 for(const item of state.furn){
  const msgs=(a.fs.get(item.id)?.msgs||[]).filter(m=>!scenario.includes('spanie')||!sleepIds.includes(item.id)||!m.startsWith('strefa „po rozłożeniu”'));
  if(scenario.includes('narożnik')&&item.id===75){assert.equal(msgs.length,1);assert.ok(msgs[0].startsWith('strefa „po rozłożeniu”'));}
  else assert.equal(msgs.length,0,scenario+' M'+item.id+': '+msgs.join('; '));
 }
}
// Zakres migracji i własne edycje: tools/check_project_revision.js (rzeczywiste zapisy).
console.log('E2_ROOM_UPDATES_OK: trwałe ID, S42, O5, M101, M143 pod oknem, O52, M117/M116, M74; dojścia przy stole i alternatywnym spaniu');
