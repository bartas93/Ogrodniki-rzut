// M76: wymiary od użytkownika, układ U, HST i migracja v30 bez resetu innych edycji.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const prefix=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0],clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(prefix+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,bodies:furnBodies,zones:furnZones,analyse:analyse};})();`,c,{timeout:5000});return c.api;
}
const api=launch(),s=api.state(),get=(s,id)=>s.furn.find(f=>f.id===id),corner=get(s,76),sofa=get(s,75);
assert.equal(corner.w,3050);assert.equal(corner.d,2200);assert.equal(corner.rot,90);assert.equal(corner.sleepingUnverified,true);
assert.equal(corner.z[1].d,1300);
const bodies=api.bodies(corner),bbox={x1:Math.min(...bodies.map(b=>b.x1)),x2:Math.max(...bodies.map(b=>b.x2)),y1:Math.min(...bodies.map(b=>b.y1)),y2:Math.max(...bodies.map(b=>b.y2))};
assert.deepEqual(bbox,{x1:200,x2:2400,y1:6950,y2:10000});
assert.equal(sofa.w,2000);assert.equal(sofa.d,970);assert.equal(sofa.rot,0);
assert.equal(api.bodies(sofa)[0].y2,6920);assert.equal(api.bodies(sofa)[0].x1,1100);
const wall=s.walls.find(w=>w.op.some(o=>o.type==='slide')),hst=wall.op.find(o=>o.type==='slide');
const openingX=wall.x1+Math.sign(wall.x2-wall.x1)*hst.pos;
assert.equal(openingX-hst.w/2-bbox.x2,150,'HST nie zasłonięte przez narożnik');
const report=api.analyse();for(const f of s.furn)assert.equal(report.fs.get(f.id)?.msgs.length||0,0,f.name);
for(const r of s.rooms)assert.ok(report.roomReach.has(report.rooms.get(r.id)?.reg?.k),r.name);
const approach=[...report.passPath.matchAll(/M(-?[\d.]+) (-?[\d.]+)h([\d.]+)v([\d.]+)/g)].some(m=>{const [x,y,w,h]=m.slice(1).map(Number);return openingX>=x&&openingX<x+w&&9600>=y&&9600<y+h;});
assert.ok(approach,'Dojście od wejścia do punktu przed środkiem HST, nie tylko brak kolizji z otworem');
const sleeping75=api.zones(sofa)[0],reserve76=api.zones(corner)[1];
assert.equal(Math.min(sleeping75.y2,reserve76.y2)-Math.max(sleeping75.y1,reserve76.y1),400,'Jawna kolizja rezerw, bez obietnicy jednoczesnego spania');
assert.ok(Math.min(sleeping75.x2,reserve76.x2)>Math.max(sleeping75.x1,reserve76.x1));
const old=clone(s),oldCorner=get(old,76),oldSofa=get(old,75);
Object.assign(oldCorner,{w:2300,d:1510,x:955,y:8850,parts:[[0,610/1510,1,900/1510],[1300/2300,0,1000/2300,610/1510]],name:'Mój narożnik',layer:'Salon własny'});
oldCorner.z[0].rect=[0,-600,2300,600];oldCorner.z[1].rect=[0,0,1300,610];oldCorner.z[1].d=610;delete oldCorner.sleepingUnverified;oldCorner.notes.push('Moja uwaga o tkaninie');
Object.assign(oldSofa,{x:1200,y:6755,name:'Moja sofa',layer:'Salon własny'});oldSofa.notes.push('Moja uwaga o sofie');
get(old,71).equipment[0].x+=20;get(old,72).equipment.find(e=>e.kind==='hob').x+=30;
get(old,73).w=1600;old.walls.flatMap(w=>w.op).find(o=>o.id===5).w=1400;old.rooms[0].name='Mój salon';
const saved=new Map([['ogrodniki-rzut-v30:E2',JSON.stringify(old)]]),m=launch(saved).state();
assert.equal(JSON.stringify(m.furn.filter(f=>![75,76].includes(f.id))),JSON.stringify(old.furn.filter(f=>![75,76].includes(f.id))),'Inne meble i ręcznie zmienione wyposażenie kuchni bez zmian');
for(const key of Object.keys(old).filter(k=>k!=='furn'))assert.equal(JSON.stringify(m[key]),JSON.stringify(old[key]),'Zachowaj '+key);
for(const id of [75,76]){assert.equal(get(m,id).name,get(old,id).name);assert.equal(get(m,id).layer,get(old,id).layer);assert.ok(get(m,id).notes.includes(id===75?'Moja uwaga o sofie':'Moja uwaga o tkaninie'));}
assert.equal(get(m,76).w,3050);assert.equal(get(m,76).d,2200);assert.equal(get(m,75).x,2100);assert.equal(get(m,75).y,6435);
assert.equal(saved.get('ogrodniki-rzut-v30:E2'),JSON.stringify(old),'Kopia v30 pozostaje');
const custom=clone(m);get(custom,76).w=3000;get(custom,75).x+=50;saved.set('ogrodniki-rzut-v35:E2',JSON.stringify(custom));assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(custom),'Nie migruj ponownie v32');
saved.delete('ogrodniki-rzut-v35:E2');
const safe=clone(old);Object.assign(get(safe,75),{x:3200,y:6300});saved.set('ogrodniki-rzut-v30:E2',JSON.stringify(safe));const safeLoaded=launch(saved).state();assert.equal(get(safeLoaded,75).x,3200);assert.equal(get(safeLoaded,75).y,6300,'Nie przesuwaj sofy ustawionej bez kolizji');
const missing=clone(old);missing.furn=missing.furn.filter(f=>f.id!==76);saved.set('ogrodniki-rzut-v30:E2',JSON.stringify(missing));assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(missing),'Nie odtwarzaj usuniętego M76 ani nie przesuwaj M75');
for(const v of ['E2S','R1','R2','R3']){const own=clone(api.fresh(v));own.furn[0].name='Własny '+v;saved.set('ogrodniki-rzut-v30:'+v,JSON.stringify(own));assert.equal(JSON.stringify(launch(saved).load(v)),JSON.stringify(own),v+' bez zmian');}
console.log('E2_CORNER_OK: M76 305×220, M75 bez kolizji, HST wolne, jawne ograniczenie jednoczesnego rozłożenia, migracja tylko M75/M76 i niezależne warianty');
