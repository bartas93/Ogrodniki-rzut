const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0],clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)}});
 vm.runInContext(source+'globalThis.api={state:()=>S,load:loadSavedVariant,fresh:freshState,upgrade:upgradeE2Installations,points:installationPoints,relations:lightingRelations,coverage:serviceCoverage};})();',c,{timeout:5000});return c.api;
}
const app=launch(),s=app.state(),items=s.installations,old=require('./fixtures/e2-v36.json'),get=tag=>items.find(i=>i.tag===tag);
assert.equal(s.installationRevision,2);assert.equal(items.length,247);
for(const key of ['walls','rooms','furn','set'])assert.deepEqual(clone(s[key]),old[key],key+' bez zmian');
assert.deepEqual(new Set(items.map(i=>i.layer)),new Set(['Instalacje','Hydraulika','Podłogówka','Elektryka']));
assert.equal(items.filter(i=>i.kind==='light').length,26);assert.equal(items.filter(i=>i.kind==='switch').length,20);
assert.equal(items.filter(i=>i.kind==='zone'&&i.system==='underfloor').length,12);
const edges=app.relations();assert.equal(edges.length,30);assert.ok(edges.every(e=>e.light));
for(const l of items.filter(i=>i.kind==='light'))assert.ok(edges.some(e=>e.lightId===l.id),'Brak włącznika dla '+l.tag);
assert.equal(edges.filter(e=>e.light.tag==='L-HOL').length,3);assert.equal(edges.filter(e=>e.light.tag==='L67').length,3);
assert.equal(get('W61').channels.length,2);assert.ok(get('W61').channels[1].lightIds.includes(get('L-LUST1').id));
for(const i of items){assert.ok(app.points(i,s).length,i.tag);assert.ok(i.notes.length);}
assert.ok(app.coverage().every(row=>row.items.length&&!row.missing.length));
for(const tag of ['CAM1','CAM4','CAM-BR','BRAMA','FURT','NVR','SMART','PV-INT','Z-PC','Z-PRZ','UZ-GND','W-RO2'])assert.ok(get(tag),tag);
const ids=[...s.walls,...s.walls.flatMap(w=>w.op),...s.rooms,...s.furn,...items].map(i=>i.id);assert.equal(new Set(ids).size,ids.length);
const before=JSON.stringify(s);app.upgrade(s);assert.equal(JSON.stringify(s),before);
const custom=clone(old),water=custom.installations.find(i=>i.tag==='KZ'&&i.system==='water'),lamp=custom.installations.find(i=>i.tag==='L61');
water.userNotes='Moje ustalenia';water.offsetX=125;water.layer='Własna hydraulika';water.points=[[2345,6789]];lamp.name='Moja lampa';
custom.rooms[0].name='Mój salon';custom.furn[0].x+=123;custom.nextId=900;custom.hidden.push('Instalacje');
const customSocket=custom.installations.find(i=>i.tag==='G59');customSocket.points=[{w:25,u:2500,side:1,standOff:30}];
const shiftedSocket=custom.installations.find(i=>i.tag==='G63');shiftedSocket.offsetX=200;
const removed=custom.installations.find(i=>i.tag==='WC2'&&i.system==='water');custom.installations=custom.installations.filter(i=>i.id!==removed.id);
const raw=JSON.stringify(custom),reference='{"immutable":true}',saved=new Map([['ogrodniki-rzut-v36:E2',raw],['ogrodniki-reference-2026-11-16',reference]]),m=launch(saved).state();
for(const key of ['walls','rooms','furn','set'])assert.deepEqual(clone(m[key]),custom[key],key+' migracja v36');
assert.equal(saved.get('ogrodniki-rzut-v36:E2'),raw);assert.equal(saved.get('ogrodniki-reference-2026-11-16'),reference);
assert.ok(!m.installations.some(i=>i.id===removed.id));assert.ok(m.hidden.includes('Hydraulika')&&m.hidden.includes('Podłogówka')&&m.hidden.includes('Elektryka'));
for(const i of custom.installations){const n=m.installations.find(n=>n.id===i.id);assert.ok(n);assert.equal(n.name,i.name);assert.equal(n.userNotes,i.userNotes);assert.equal(n.offsetX,i.offsetX);}
assert.deepEqual(clone(m.installations.find(i=>i.id===water.id)),water.media?water:{...water,media:['ZW','CWU']});
assert.deepEqual(clone(m.installations.find(i=>i.id===customSocket.id).points),customSocket.points);assert.deepEqual(clone(m.installations.find(i=>i.id===shiftedSocket.id).points),shiftedSocket.points);
assert.ok(m.installations.filter(i=>!custom.installations.some(o=>o.id===i.id)).every(i=>i.id>=900));
saved.set('ogrodniki-rzut-v37:E2',JSON.stringify(m));const own=launch(saved).state();assert.equal(JSON.stringify(own),JSON.stringify(m));
// Ruch i usunięcie drzwi nie gubią ani nie przenoszą punktu sterowania na inny obiekt.
const sw=get('W61'),p0=clone(app.points(sw,s)[0]),wall=s.walls.find(w=>w.op.some(o=>o.id===28)),door=wall.op.find(o=>o.id===28);door.pos+=100;
const p1=app.points(sw,s)[0];assert.equal(p1.x-p0.x,100);wall.op=wall.op.filter(o=>o.id!==28);assert.equal(app.points(sw,s).length,0);
// Zmienione przypisanie, usunięta lampa i puste kanały pozostają widoczne w danych.
const first=get('W59');first.channels[0].lightIds=[get('L60').id];assert.ok(app.relations().some(e=>e.sw.id===first.id&&e.light.tag==='L60'));
s.installations=s.installations.filter(i=>i.id!==get('L-LUST1').id);assert.ok(app.relations().some(e=>!e.light&&e.sw.id===sw.id));
console.log('INSTALLATION_LAYERS_OK: 4 warstwy, 26 lamp, 20 włączników, 30 powiązań, zakres dodatkowych instalacji, kotwice i wierna migracja v36');
