// M73: wymiary i rzeczywiste prześwity; migracja v27 -> v28 zmienia tylko wyspę.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const prefix=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0];
const clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(prefix+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,bodies:furnBodies,arrange:setArrangement};})();`,c,{timeout:5000});return c.api;
}
const api=launch(),s=api.state(),island=s.furn.find(f=>f.id===73),box=api.bodies(island)[0];
assert.equal(island.w,1700);assert.equal(island.d,900);assert.equal(island.rot,180);
const north=api.bodies(s.furn.find(f=>f.id===72))[0],west=api.bodies(s.furn.find(f=>f.id===71))[0],wall=s.walls.find(w=>w.id===22);
assert.equal(box.y1-north.y2,1300);assert.equal(box.x1-west.x2,1300);
assert.equal(wall.x1-wall.t/2-box.x2,900);
const table=s.furn.find(f=>f.id===74);assert.equal(api.bodies(table)[0].y1-box.y2,1350);
api.arrange(table,'expanded');assert.equal(Math.min(...api.bodies(table).map(b=>b.y1))-box.y2,750);
api.arrange(table,'closed');
for(const name of ['Wyspa 140×90 — blat roboczy','Moja własna wyspa']){
 const old=clone(s),f=old.furn.find(f=>f.id===73);Object.assign(f,{w:1400,x:2500,y:2250,name,layer:'Własna kuchnia'});f.notes.push('Moja zachowana uwaga');
 old.furn.find(f=>f.id===74).x+=100;old.furn.find(f=>f.id===101).y+=50;old.walls.find(w=>w.id===42).x2-=100;old.rooms[0].name='Mój salon';
 const saved=new Map([['ogrodniki-rzut-v27:E2',JSON.stringify(old)]]),m=launch(saved).state(),changed=m.furn.find(f=>f.id===73);
 assert.equal(changed.w,1700);assert.equal(changed.x,2950);assert.equal(changed.y,2550);
 assert.equal(changed.name,name.startsWith('Wyspa 140')?'Wyspa 170×90 — blat roboczy':name);assert.ok(changed.notes.includes('Moja zachowana uwaga'));
 for(const key of ['id','key','d','rot','layer','z'])assert.equal(JSON.stringify(changed[key]),JSON.stringify(f[key]),key);
 assert.equal(JSON.stringify(m.furn.filter(f=>f.id!==73)),JSON.stringify(old.furn.filter(f=>f.id!==73)),'Inne meble bez zmian');
 for(const key of Object.keys(old).filter(k=>k!=='furn'))assert.equal(JSON.stringify(m[key]),JSON.stringify(old[key]),'Zachowaj '+key);
 assert.equal(saved.get('ogrodniki-rzut-v27:E2'),JSON.stringify(old),'Stara kopia pozostaje');
 const current=clone(m);current.furn.find(f=>f.id===73).w=1600;saved.set('ogrodniki-rzut-v32:E2',JSON.stringify(current));assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(current),'Nie nadpisuj edycji v32');
 for(const v of ['E2S','R1','R2','R3']){const state=clone(api.fresh(v));state.furn[0].name='Własny '+v;saved.set('ogrodniki-rzut-v27:'+v,JSON.stringify(state));assert.equal(JSON.stringify(launch(saved).load(v)),JSON.stringify(state),v+' bez synchronizacji');}
 old.furn=old.furn.filter(f=>f.id!==73);saved.delete('ogrodniki-rzut-v32:E2');saved.set('ogrodniki-rzut-v27:E2',JSON.stringify(old));assert.ok(!launch(saved).state().furn.some(f=>f.id===73),'Nie odtwarzaj usuniętej wyspy');
}
console.log('E2_ISLAND_OK: 170×90 cm, 130 cm od północy i zachodu, 90 cm od wschodu, 75 cm przy 10 krzesłach; migracja wyłącznie M73');
