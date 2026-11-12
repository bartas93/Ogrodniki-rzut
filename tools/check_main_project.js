// Projekt Główny: wnęka i WC oraz płytkie PAX zamiast dawnych BILLY.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0],clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(source+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,body:furnBodies,zones:furnZones,variants:VARIANTS,analyse:analyse};})();`,c,{timeout:5000});return c.api;
}
const app=launch(),s=app.state(),get=(s,id)=>s.furn.find(f=>f.id===id),wall=(s,id)=>s.walls.find(w=>w.id===id);
assert.equal(s.variant,'E2');assert.equal(app.variants.E2.name,'Projekt Główny — domyślny');
assert.equal(wall(s,33).x1-wall(s,24).x1-150,3100);assert.equal(get(s,79).d,400);assert.equal(wall(s,33).x1,8425);assert.equal(wall(s,31).x2,8425);
const books=s.furn.filter(f=>f.presetTag?.startsWith('nov12-billy-'));assert.equal(books.length,2);
for(const f of books){assert.equal(f.w,f.presetTag.endsWith('-0')?998:498);assert.equal(f.d,375);assert.equal(f.joinery.bodyDepth,355);assert.equal(f.joinery.frontDepth,20);assert.equal(f.joinery.height,2364);assert.equal(f.rot,270);assert.equal(app.body(f)[0].x1,8500);assert.equal(app.body(f)[0].x2,8875);}
const basin=app.body(get(s,127))[0],bath=app.body(get(s,129))[0],wcZone=app.zones(get(s,128))[0];
assert.equal(get(s,127).w,600);assert.equal(bath.y1-basin.y2,1025);assert.equal(wcZone.y2-wcZone.y1,900);assert.ok(wcZone.y1>=basin.y2&&wcZone.y2<=bath.y1);assert.equal(get(s,128).z[0].strict,true);
const a=app.analyse();for(const f of s.furn)assert.equal(a.fs.get(f.id)?.msgs.length||0,0,f.name);for(const r of s.rooms)assert.ok(a.roomReach.has(a.rooms.get(r.id)?.reg?.k),r.name);
const old=clone(s);old.projectRevision=33;old.furn=old.furn.filter(f=>!f.presetTag?.startsWith('nov12-billy-'));
wall(old,24).x1=wall(old,24).x2=5125;wall(old,33).x1=wall(old,33).x2=8775;wall(old,31).x2=8775;
Object.assign(get(old,79),{d:350,x:4875});for(const id of [83,84,85])get(old,id).x-=50;Object.assign(get(old,86),{w:1050,x:8175});get(old,87).x=8175;
Object.assign(get(old,127),{key:'sink80',w:800,y:6250});get(old,128).y=6930;get(old,128).z[0].ex=220;delete get(old,128).z[0].strict;
for(const id of [79,83,84,85,86,87,127,128]){get(old,id).name='Moje M'+id;get(old,id).notes=['Zachowana uwaga '+id];}
get(old,72).equipment.find(e=>e.kind==='hob').x=2350;get(old,76).w=3000;old.rooms[0].name='Mój salon';
old.furn.push({...clone(get(old,80)),id:old.nextId++,name:'Własny dodany mebel'});
const saved=new Map([['ogrodniki-rzut-v31:E2',JSON.stringify(old)]]),m=launch(saved).state(),changed=[79,83,84,85,86,87,127,128];
assert.equal(JSON.stringify(m.furn.filter(f=>!changed.includes(f.id)&&!f.presetTag?.startsWith('nov12-billy-'))),JSON.stringify(old.furn.filter(f=>!changed.includes(f.id))),'Pozostałe meble, kuchnia, M76 i garderoba zachowane');
for(const id of changed){assert.equal(get(m,id).name,'Moje M'+id);assert.ok(get(m,id).notes.includes('Zachowana uwaga '+id));}
for(const key of Object.keys(old).filter(k=>!['furn','walls','nextId','projectRevision'].includes(k)))assert.equal(JSON.stringify(m[key]),JSON.stringify(old[key]),key);
const unchangedWalls=s=>s.walls.filter(w=>![24,31,33].includes(w.id));assert.equal(JSON.stringify(unchangedWalls(m)),JSON.stringify(unchangedWalls(old)));
assert.equal(new Set(m.furn.map(f=>f.id)).size,m.furn.length);assert.equal(saved.get('ogrodniki-rzut-v31:E2'),JSON.stringify(old));
const own=clone(m);get(own,79).d=420;saved.set('ogrodniki-rzut-v34:E2',JSON.stringify(own));assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(own),'Nie powtarzaj migracji v32');
for(const v of ['E2S','R1','R2','R3']){const own=clone(app.fresh(v));saved.set('ogrodniki-rzut-v31:'+v,JSON.stringify(own));assert.equal(JSON.stringify(launch(saved).load(v)),JSON.stringify(own),v);}
console.log('MAIN_PROJECT_OK: nazwa i domyślność, 40 cm = 5+35, PAX 100+50 z drzwiami, WC 90 cm przy 60 cm umywalce, garderoba zachowana, niezależna migracja i ID');
