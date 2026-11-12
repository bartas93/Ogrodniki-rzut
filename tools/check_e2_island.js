// M73: wymiary i rzeczywiste prześwity; migracja v27 -> v28 zmienia tylko wyspę.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const prefix=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0];
const clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(prefix+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,bodies:furnBodies,arrange:setArrangement};})();`,c,{timeout:5000});return c.api;
}
const api=launch(),s=api.state(),island=s.furn.find(f=>f.id===73),box=api.bodies(island)[0];
assert.equal(island.w,1700);assert.equal(island.d,1000);assert.equal(island.rot,180);
const north=api.bodies(s.furn.find(f=>f.id===72))[0],west=api.bodies(s.furn.find(f=>f.id===71))[0],wall=s.walls.find(w=>w.id===22);
assert.equal(box.y1-north.y2,1200);assert.equal(box.x1-west.x2,1200);
assert.equal(wall.x1-wall.t/2-box.x2,1000);
const table=s.furn.find(f=>f.id===74);assert.equal(api.bodies(table)[0].y1-box.y2,1350);
api.arrange(table,'expanded');assert.equal(Math.min(...api.bodies(table).map(b=>b.y1))-box.y2,750);
api.arrange(table,'closed');
// Migracje rzeczywistych zapisów v23/v32: tools/check_project_revision.js.
s.furn.find(f=>f.id===73).seating.mode='stools';assert.equal(api.bodies(island).length,3);api.arrange(table,'expanded');assert.equal(island.seating.mode,'table');
console.log('E2_ISLAND_OK: 170×100 cm, przejścia 120/120/100 cm, 75 cm do krzeseł stołu, dwa alternatywne hokery');
