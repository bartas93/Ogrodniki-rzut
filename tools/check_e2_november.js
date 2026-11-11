// Poprawki E2 z 10.11.2026 i migracja zapisu v23 -> v24.
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
assert.equal(corner.rot,90);near(boxes[0].x1,200);near(boxes[0].x2,1100);near(boxes[0].y1,7700);near(boxes[0].y2,10000);
near(boxes[1].x1,1100);near(boxes[1].x2,1710);near(boxes[1].y1,9000);near(boxes[1].y2,10000);
const sink=s.furn.find(f=>f.key==='sink80'&&f.x===6950),wc=s.furn.find(f=>f.id===87);
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
  for(const other of state.furn.filter(x=>x.id!==id))assert.equal(report.fs.get(other.id)?.msgs.length||0,0,'Rozłożenie '+id+': '+other.name);
}
// Oba miejsca spania w salonie i sofa pokoju 3 rozłożone jednocześnie.
{
  const api2=launch(),state=api2.current(),sleepIds=[75,76,101];
  for(const id of sleepIds){
    const f=state.furn.find(f=>f.id===id);
    for(const z of f.z.filter(z=>z.k==='unfold'&&!z.off)){
      const q=api2.zones(f)[f.z.indexOf(z)];
      state.furn.push({id:state.nextId++,key:'ref',name:'Rozłożenie '+id,x:(q.x1+q.x2)/2,y:(q.y1+q.y2)/2,w:q.x2-q.x1,d:q.y2-q.y1,rot:0,layer:'',z:[]});
    }
  }
  const report=api2.analysis();
  for(const r of state.rooms)assert.ok(report.roomReach.has(report.rooms.get(r.id)?.reg?.k),'Wszystkie rozłożone: '+r.name);
  for(const f of state.furn){
    const messages=(report.fs.get(f.id)?.msgs||[]).filter(m=>!sleepIds.includes(f.id)||!m.startsWith('strefa „po rozłożeniu”'));
    assert.equal(messages.length,0,'Wszystkie rozłożone: '+f.name+': '+messages.join('; '));
  }
}
const previous=JSON.parse(JSON.stringify(s));
const changed=[75,76,86,87,101];
for(const f of previous.furn)if(changed.includes(f.id))f.x+=123;
const custom=previous.furn.find(f=>f.key==='k240');custom.name='Mój zachowany blat';custom.notes=['Własna notatka'];
previous.furn.push({...previous.furn[0],id:previous.nextId++,name:'Mój dodatkowy mebel'});
const saved=new Map([['ogrodniki-rzut-v23:E2',JSON.stringify(previous)]]);
const migrated=launch(saved).current();
for(const id of changed){const actual=migrated.furn.find(f=>f.id===id),expected=s.furn.find(f=>f.id===id);assert.equal(JSON.stringify(actual),JSON.stringify(expected));}
assert.equal(migrated.furn.find(f=>f.key==='k240').name,'Mój zachowany blat');
assert.ok(migrated.furn.some(f=>f.name==='Mój dodatkowy mebel'));
assert.equal(saved.get('ogrodniki-rzut-v23:E2'),JSON.stringify(previous),'Nie usuwaj kopii v23');
const e2s=api.fresh('E2S');e2s.furn[0].name='Moja kuchnia E2S';saved.set('ogrodniki-rzut-v23:E2S',JSON.stringify(e2s));
assert.equal(JSON.stringify(launch(saved).load('E2S')),JSON.stringify(e2s));
const v24=JSON.parse(JSON.stringify(s));v24.furn.find(f=>f.id===76).x+=50;saved.set('ogrodniki-rzut-v24:E2',JSON.stringify(v24));
assert.equal(JSON.stringify(launch(saved).current()),JSON.stringify(v24),'Nie nadpisuj późniejszych edycji v24');
console.log('E2_NOVEMBER_OK: narożnik, wspólna ściana WC/umywalki, sofa pokoju 3, rzeczywiste rozłożenie i migracja zapisów');
