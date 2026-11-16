// Snapshot pozostaje niezależny; instalacje nie zmieniają geometrii i zachowują zapis v35.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),frozen=require('../snapshots/projekt-glowny-2026-11-16.json'),clone=x=>JSON.parse(JSON.stringify(x));
const source=fs.readFileSync(path.join(root,'edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0];
function launch(saved=new Map(),variant='E2'){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},location:{search:'?variant='+variant},URLSearchParams});
 vm.runInContext(source+'globalThis.api={state:()=>S,load:loadSavedVariant,fresh:freshState,add:addE2Installations,points:installationPoints,analyse};})();',c,{timeout:5000});return c.api;
}
const archiveKey='ogrodniki-reference-2026-11-16',ref='E2REF20261116',store=new Map(),app=launch(store),s=app.state();
for(const key of ['walls','rooms','furn','set'])assert.deepEqual(clone(s[key]),frozen[key],key+' nie może się zmienić');
assert.ok(s.installations.length>100);assert.equal(s.installationRevision,1);
const allIds=[...s.walls,...s.walls.flatMap(w=>w.op),...s.rooms,...s.furn,...s.installations].map(o=>o.id);
assert.equal(new Set(allIds).size,allIds.length);assert.ok(s.nextId>Math.max(...allIds));
const before=JSON.stringify(s);app.add(s);assert.equal(JSON.stringify(s),before,'inicjalizacja nie powiela');
assert.equal(s.ui.serviceSystems.ventilation,true);assert.equal(s.ui.serviceSystems.power,false);
assert.deepEqual(new Set(s.installations.map(i=>i.system)),new Set(['ventilation','water','sewage','heating','power','data','reserves']));
for(const i of s.installations){assert.ok(i.notes.length&&i.level&&i.name);assert.equal(i.layer,'Instalacje');assert.ok(app.points(i,s).length);}
const node=s.installations.find(i=>i.system==='water'&&i.tag==='KZ'),p0=clone(app.points(node,s)[0]);
s.furn.find(f=>f.id===72).x+=123;const p1=app.points(node,s)[0];assert.equal(p1.x-p0.x,123);assert.equal(p1.y,p0.y);
node.offsetY=50;assert.equal(app.points(node,s)[0].y,p0.y+50);
const missing=clone(s);missing.furn=missing.furn.filter(f=>f.id!==72);
assert.equal(app.points(node,missing).length,0);
assert.equal(app.points(s.installations.find(i=>i.system==='water'&&i.tag==='KZT'),missing).length,0);
const archive=app.load(ref);assert.deepEqual(clone(archive.furn),frozen.furn);assert.equal(archive.installations.length,0);
assert.equal(archive.reference.source,'zamrożona wersja opublikowana');
const old=clone(frozen);old.rooms[0].name='Własny salon';old.furn.find(f=>f.id===73).x+=175;old.nextId=500;
const raw=JSON.stringify(old),saved=new Map([['ogrodniki-rzut-v35:E2',raw]]),custom=launch(saved),m=custom.state();
for(const key of ['walls','rooms','furn','set'])assert.deepEqual(clone(m[key]),old[key],key+' migracja v35');
assert.equal(saved.get('ogrodniki-rzut-v35:E2'),raw);assert.ok(m.installations.every(i=>i.id>=500));
const reference=custom.load(ref);assert.deepEqual(clone(reference.furn),old.furn);assert.deepEqual(clone(reference.rooms),old.rooms);
assert.ok(!JSON.parse(saved.get(archiveKey)).installations);const savedArchive=saved.get(archiveKey);
saved.set('ogrodniki-rzut-v36:E2',JSON.stringify({...m,rooms:m.rooms.map(r=>({...r,name:'Późniejsze zmiany'}))}));
launch(saved);assert.equal(saved.get(archiveKey),savedArchive,'kopia nie synchronizuje się z E2');
const direct=new Map([['ogrodniki-rzut-v35:E2',raw]]);assert.equal(launch(direct,ref).state().rooms[0].name,'Własny salon');
const firstOther=new Map([['ogrodniki-rzut-v35:E2',raw]]);launch(firstOther,'R3');assert.equal(JSON.parse(firstOther.get(archiveKey)).rooms[0].name,'Własny salon');
for(const v of ['R1','R2','R3','E2S'])assert.equal(app.fresh(v).installations.length,0);
const a=app.analyse();assert.equal((a.bbox.x2-a.bbox.x1)*(a.bbox.y2-a.bbox.y1),17824*10624);
console.log('INSTALLATIONS_OK: zamrożony snapshot, edycje v35, niezależność, ID, kotwice, 7 branż i zachowany obrys');
