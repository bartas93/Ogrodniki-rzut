// Poprawki E2 z 10/11.11.2026, układ U i migracje v23/v24 -> v25.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const text=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8');
const prefix=text.split('<script>')[1].split('/* ---------- widok ---------- */')[0];
function launch(saved=new Map()){
  const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
  vm.runInContext(prefix+`globalThis.api={current:()=>S,fresh:freshState,load:loadSavedVariant,bodies:furnBodies,zones:furnZones,analysis:()=>{A=analyse();return A;}};})();`,c,{timeout:5000});return c.api;
}
const api=launch(),s=api.current(),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,a+' != '+b);
assert.equal(s.variant,'E2');
const corner=s.furn.find(f=>f.id===76),boxes=api.bodies(corner);
assert.equal(corner.rot,90);assert.equal(corner.w,3050);assert.equal(corner.d,2200);
near(boxes[0].x1,200);near(boxes[0].x2,1100);near(boxes[0].y1,6950);near(boxes[0].y2,10000);
near(boxes[1].x1,1100);near(boxes[1].x2,2400);near(boxes[1].y1,9000);near(boxes[1].y2,10000);
const salonSofa=s.furn.find(f=>f.id===75),sofaBody=api.bodies(salonSofa)[0];
assert.equal(salonSofa.rot,0,'Górne ramię U ma być skierowane na południe');
near(sofaBody.x1,1100);near(sofaBody.x2,3100);near(sofaBody.y1,5950);near(sofaBody.y2,6920);
near(boxes[0].y1-sofaBody.y2,30);
const sofaSleep=api.zones(salonSofa)[0];near(sofaSleep.x1,boxes[0].x2);near(sofaSleep.y2-boxes[0].y1,400);
const sink=s.furn.find(f=>f.id===85),wc=s.furn.find(f=>f.id===87);
assert.equal(wc.rot,0);near(wc.y-wc.d/2,sink.y-sink.d/2);assert.ok(wc.x>sink.x);
const roomSofa=s.furn.find(f=>f.id===101);assert.equal(roomSofa.rot,90);near(roomSofa.x+roomSofa.d/2,14150);
assert.equal(roomSofa.w,2000);assert.equal(roomSofa.d,970);
const a=api.analysis();for(const f of s.furn)assert.equal(a.fs.get(f.id)?.msgs.length||0,0,f.name);
for(const r of s.rooms)assert.ok(a.roomReach.has(a.rooms.get(r.id)?.reg?.k),r.name);
// Rozłożenie jest rzeczywistą przeszkodą podczas osobnej kontroli dojść do mebli.
for(const id of [75,76,101]){
  const api2=launch(),state=api2.current(),f=state.furn.find(f=>f.id===id);
  for(const z of f.z.filter(z=>z.k==='unfold'&&!z.off)){
    const q=api2.zones(f)[f.z.indexOf(z)];
    state.furn.push({id:state.nextId++,key:'ref',name:'Fizyczny obrys rozłożenia',x:(q.x1+q.x2)/2,y:(q.y1+q.y2)/2,w:q.x2-q.x1,d:q.y2-q.y1,rot:0,layer:'',z:[]});
  }
  const report=api2.analysis();
  for(const r of state.rooms)assert.ok(report.roomReach.has(report.rooms.get(r.id)?.reg?.k),'Rozłożenie '+id+': '+r.name);
  // Strefa unfold jest zajęta przez dodany obrys — kontrolujemy pozostałe meble i dostęp.
  for(const other of state.furn.filter(x=>x.id!==id)){
    const messages=report.fs.get(other.id)?.msgs||[];
    if(id===76&&other.id===75){assert.equal(messages.length,1);assert.ok(messages[0].startsWith('strefa „po rozłożeniu”'));}
    else assert.equal(messages.length,0,'Rozłożenie '+id+': '+other.name);
  }
}
// Konserwatywna rezerwa nowego M76 i pole M75 kolidują przy jednoczesnym rozłożeniu.
{
  const api2=launch(),state=api2.current(),sleepIds=[75,76,101];
  const firstProxy=state.nextId;
  for(const id of sleepIds){
    const f=state.furn.find(f=>f.id===id);
    for(const z of f.z.filter(z=>z.k==='unfold'&&!z.off)){
      const q=api2.zones(f)[f.z.indexOf(z)];
      state.furn.push({id:state.nextId++,key:'ref',name:'Rozłożenie '+id,x:(q.x1+q.x2)/2,y:(q.y1+q.y2)/2,w:q.x2-q.x1,d:q.y2-q.y1,rot:0,layer:'',z:[]});
    }
  }
  const report=api2.analysis();
  for(const r of state.rooms)assert.ok(report.roomReach.has(report.rooms.get(r.id)?.reg?.k),'Wszystkie rozłożone: '+r.name);
  let conflictingProxies=0;
  for(const f of state.furn){
    const messages=(report.fs.get(f.id)?.msgs||[]).filter(m=>!sleepIds.includes(f.id)||!m.startsWith('strefa „po rozłożeniu”'));
    if(f.id===firstProxy||f.id===firstProxy+1){assert.equal(messages.length,1);assert.ok(messages[0].startsWith('nachodzi na: Rozłożenie '));conflictingProxies++;}
    else assert.equal(messages.length,0,'Wszystkie rozłożone: '+f.name+': '+messages.join('; '));
  }
  assert.equal(conflictingProxies,2,'Kontrola musi wykryć, a nie ukryć kolizję obu rezerw');
}
// Migracje rzeczywistych zapisów v23/v32: tools/check_project_revision.js.
console.log('E2_NOVEMBER_OK: M76 305×220, układ U, WC/umywalka, sofa pokoju 3; kontrola wykrywa kolizję rezerw M75/M76 rozłożonych jednocześnie');
