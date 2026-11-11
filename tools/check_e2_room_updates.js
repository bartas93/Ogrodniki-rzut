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
assert.equal(laundryWindow.pos-laundryWindow.w/2-gardenDoor.pos-gardenDoor.w/2,300,'30 cm ściany do drzwi pralni');
const northWall=s.walls.find(w=>w.op.some(o=>o.id===5));
assert.ok(northWall.x1+laundryWindow.pos+laundryWindow.w/2<9698,'Okno kończy się przed wysokim narożnikiem PAX');
const door=openings.find(o=>o.id===52);assert.equal(door.side,1);assert.equal(door.hinge,1);
const box=(id,expected)=>{const b=api.bodies(f(id))[0];for(const [key,value] of Object.entries(expected))assert.equal(b[key],value,'M'+id+' '+key);};
box(101,{x1:13180,x2:14150,y1:200,y2:2200});
box(143,{x1:14100,x2:15070,y1:8000,y2:10000});assert.equal(f(143).rot,270);
box(117,{x1:6730,x2:7700,y1:8000,y2:10000});assert.equal(f(117).rot,90);
box(116,{x1:4850,x2:5550,y1:8600,y2:10000});assert.equal(f(116).rot,270);
assert.equal(f(116).w,1400);assert.equal(f(116).d,700);
assert.equal(f(74).rot,0);assert.equal(f(74).x,2500);assert.equal(f(74).arrangements.expanded.parts.length,11);
const rowParts=f(74).arrangements.expanded.parts.slice(1);assert.equal(rowParts.filter(p=>p[1]<0).length,5);assert.equal(rowParts.filter(p=>p[1]===1).length,5);
assert.equal(4700-(f(74).x+f(74).arrangements.expanded.w/2),800,'Przejście od strony holu');
// Weryfikacja kolizji i dostępności: stół rozłożony, wszystkie pięć miejsc spania, oba stany jednocześnie.
for(const scenario of ['stół','spanie','stół i spanie']){
 const app=launch(),state=app.state(),sleepIds=[75,76,101,117,143];
 if(scenario.includes('stół'))app.arrange(state.furn.find(f=>f.id===74),'expanded');
 if(scenario.includes('spanie'))for(const id of sleepIds){
  const item=state.furn.find(f=>f.id===id);
  for(const b of app.zones(item).filter((_,i)=>item.z[i].k==='unfold'&&!item.z[i].off))state.furn.push({id:state.nextId++,key:'ref',name:'Rozłożenie '+id,x:(b.x1+b.x2)/2,y:(b.y1+b.y2)/2,w:b.x2-b.x1,d:b.y2-b.y1,rot:0,layer:'',z:[]});
 }
 const a=app.analyse();
 for(const r of state.rooms)assert.ok(a.roomReach.has(a.rooms.get(r.id)?.reg?.k),scenario+': '+r.name);
 for(const item of state.furn){const msgs=(a.fs.get(item.id)?.msgs||[]).filter(m=>!scenario.includes('spanie')||!sleepIds.includes(item.id)||!m.startsWith('strefa „po rozłożeniu”'));assert.equal(msgs.length,0,scenario+' M'+item.id+': '+msgs.join('; '));}
}
// Prawdziwe stare pozycje, własne nazwy/warstwy oraz rozszerzony stół w zapisie użytkownika.
const old=clone(s),get=id=>old.furn.find(f=>f.id===id);
old.walls[0].op.push({id:3,type:'window',pos:5781,w:600,hinge:0,side:1,sill:1500,height:600});
old.walls.flatMap(w=>w.op).find(o=>o.id===52).side=-1;
Object.assign(get(101),{y:1800});Object.assign(get(143),{x:15150,y:9515,rot:180});
Object.assign(get(117),{x:5335,y:8200,rot:270});Object.assign(get(116),{x:6550,y:9650,rot:180});
get(74).notes.push('Moja uwaga o stole');
Object.assign(get(74),{x:2900,y:4800,rot:90});api.arrange(get(74),'expanded');
get(75).x+=50;get(100).notes=['Moja notatka'];old.rooms[0].name='Mój salon';old.hidden=['Moja warstwa'];
old.furn.push({...clone(get(100)),id:old.nextId++,name:'Mój dodatkowy mebel'});
for(const id of [74,101,116,117,143]){get(id).name='Moje M'+id;get(id).layer='Własne';}
const saved=new Map([['ogrodniki-rzut-v25:E2',JSON.stringify(old)]]),m=launch(saved).state(),changed=[74,101,116,117,143];
assert.equal(JSON.stringify(m.furn.filter(f=>!changed.includes(f.id))),JSON.stringify(old.furn.filter(f=>!changed.includes(f.id))),'Pozostałe meble, w tym M75, bez zmian');
const expectedWalls=clone(old.walls);for(const w of expectedWalls){w.op=w.op.filter(o=>o.id!==3);for(const o of w.op)if(o.id===52){o.side=1;o.hinge=1;}}
assert.equal(JSON.stringify(m.walls),JSON.stringify(expectedWalls),'Tylko O3 i O52');
for(const field of ['rooms','hidden','nextId','set','ui'])assert.equal(JSON.stringify(m[field]),JSON.stringify(old[field]),field);
for(const id of changed){const item=m.furn.find(f=>f.id===id);assert.equal(item.name,'Moje M'+id);assert.equal(item.layer,'Własne');assert.equal(item.rot,f(id).rot);assert.equal(item.x,f(id).x);assert.equal(item.y,f(id).y);}
assert.ok(m.furn.find(f=>f.id===74).notes.includes('Moja uwaga o stole'),'Zachowaj własne notatki stołu');
assert.equal(m.furn.find(f=>f.id===74).arrangements.mode,'expanded');assert.equal(m.furn.find(f=>f.id===74).parts.length,11);
assert.equal(saved.get('ogrodniki-rzut-v25:E2'),JSON.stringify(old),'Stary zapis zachowany');
// V26 -> v27: zmienia się wyłącznie x2 ściany S42, bez ponawiania zmian mebli.
const v26=clone(m);v26.walls.find(w=>w.id===42).x2=14025;v26.furn.find(f=>f.id===74).x+=100;v26.furn.find(f=>f.id===101).y+=50;
saved.set('ogrodniki-rzut-v26:E2',JSON.stringify(v26));const expected27=clone(v26);expected27.walls.find(w=>w.id===42).x2=expected27.walls.find(w=>w.id===54).x1;
assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(expected27),'Tylko x2 S42 może się zmienić');assert.equal(saved.get('ogrodniki-rzut-v26:E2'),JSON.stringify(v26),'Kopia v26 pozostaje');
const v30=clone(expected27);v30.walls.find(w=>w.id===42).x2-=100;saved.set('ogrodniki-rzut-v30:E2',JSON.stringify(v30));assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(v30),'V30 ma pierwszeństwo i nie jest ponownie migrowane');
for(const v of ['E2S','R1','R2','R3']){const state=clone(api.fresh(v));state.furn[0].name='Własny '+v;saved.set('ogrodniki-rzut-v25:'+v,JSON.stringify(state));assert.equal(JSON.stringify(launch(saved).load(v)),JSON.stringify(state),v+' bez synchronizacji');}
// V28 -> v29: tylko szerokość O5, również przy ręcznych wymiarach wysokości i własnych meblach.
const v28=clone(s),oldWindow=v28.walls.flatMap(w=>w.op).find(o=>o.id===5);
oldWindow.w=900;oldWindow.height=1100;oldWindow.sill=1300;oldWindow.opening='Moje okno FIX';
v28.furn.find(f=>f.id===73).w=1600;v28.furn.find(f=>f.id===73).x+=100;v28.walls.find(w=>w.id===42).x2-=100;
const saved28=new Map([['ogrodniki-rzut-v28:E2',JSON.stringify(v28)]]),expected29=clone(v28);expected29.walls.flatMap(w=>w.op).find(o=>o.id===5).w=1200;
assert.equal(JSON.stringify(launch(saved28).state()),JSON.stringify(expected29),'Z v28 migruje tylko szerokość O5');assert.equal(saved28.get('ogrodniki-rzut-v28:E2'),JSON.stringify(v28),'Kopia v28 zachowana');
const custom30=clone(expected29);custom30.walls.flatMap(w=>w.op).find(o=>o.id===5).w=1400;saved28.set('ogrodniki-rzut-v30:E2',JSON.stringify(custom30));assert.equal(JSON.stringify(launch(saved28).state()),JSON.stringify(custom30),'Własna szerokość v30 ma pierwszeństwo');
saved28.delete('ogrodniki-rzut-v30:E2');for(const w of v28.walls)w.op=w.op.filter(o=>o.id!==5);saved28.set('ogrodniki-rzut-v28:E2',JSON.stringify(v28));assert.ok(!launch(saved28).state().walls.flatMap(w=>w.op).some(o=>o.id===5),'Nie odtwarzaj usuniętego O5');
console.log('E2_ROOM_UPDATES_OK: O3, M101, M143, O52, M117/M116, M74; rozłożenie pięciu mebli i stołu, S42 zlicowana z S54, O5 120 cm, trwałe ID i migracja bez utraty edycji');
