// Kontrakt aktualnego układu i migracja prawdziwych, publicznych zapisów sprzed zmian.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),model=require('./editor_model');
const clone=x=>JSON.parse(JSON.stringify(x)),fixture=v=>JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures','e2-v'+v+'.json'),'utf8'));
const app=model(),s=app.state(),f=(s,id)=>s.furn.find(f=>f.id===id),o=(s,id)=>s.walls.flatMap(w=>w.op).find(o=>o.id===id),box=id=>app.body(f(s,id))[0];
assert.equal(f(s,71).w,2800);assert.equal(f(s,71).equipment.find(e=>e.id===3).height,900);assert.equal(f(s,71).equipment.find(e=>e.id===5).x,0);
assert.equal(f(s,72).equipment.find(e=>e.id===6).height,2340);assert.equal(f(s,72).equipment.find(e=>e.id===7).w,400);
for(const id of [71,72]){const a=[...f(s,id).equipment].sort((a,b)=>a.x-b.x);let end=0;for(const e of a){assert.equal(e.x,end,'Brak nakładania modułów M'+id);end=e.x+e.w;}assert.equal(end,f(s,id).w);}
assert.equal(o(s,23).side,1);assert.equal(o(s,23).hinge,1);assert.equal(o(s,29).pos,9600-4775);assert.equal(o(s,6).pos,12200+6);
assert.equal(f(s,80).key,'steel');assert.equal(f(s,80).w,f(s,82).w);assert.equal(f(s,81).key,'bench');
assert.equal(box(73).x1-box(71).x2,1200);assert.equal(box(73).y1-box(72).y2,1200);assert.equal(f(s,73).d,1000);
assert.equal(f(s,83).x,5900);assert.equal(f(s,83).y,3000);assert.equal(f(s,83).w,1300);assert.equal(f(s,83).d,900);assert.equal(f(s,83).enclosedShower,true);
assert.equal(f(s,143).rot,180);assert.equal(box(143).y2,10000);assert.equal(f(s,110).key,'steel');assert.equal(f(s,110).rot,180);assert.equal(f(s,113).w,800);assert.equal(f(s,113).equipment.length,0);assert.equal(o(s,39).pos,16300-13925);assert.equal(s.furn.filter(f=>f.presetTag?.startsWith('nov12-tech-')).length,2);assert.equal(s.furn.find(f=>f.presetTag==='nov12-robot-laundry').relocatedFrom,'E2-M113-E1');assert.equal(box(111).x1-box(110).x2,850);
assert.equal(s.walls.find(w=>w.id===53).y1,8325);assert.equal(box(132).y1,8400);assert.equal(10000-box(132).y2,1000);assert.equal(f(s,134).w,400);assert.equal(box(129).y2,8250);assert.equal(box(129).y1-box(127).y2,1025);
const doors=app.doors();assert.equal(doors.length,14);assert.ok(doors.every(d=>d.issues.length===0));assert.ok(doors.every(d=>d.effective>=800&&d.height>=2000));const entrance=doors.find(d=>d.id===10);assert.equal(entrance.effective,900);
const d45=doors.find(d=>d.id===45);assert.equal(d45.rough,1000);assert.equal(d45.effective,900);assert.deepEqual(clone(d45.piers),[75,75]);assert.ok(doors.find(d=>d.id===43).warnings.length,'Nie ukrywaj ciasnego mocowania O43');
function checkReach(api){const a=api.analyse({entryId:10}),state=api.state();for(const f of state.furn)assert.equal(a.fs.get(f.id)?.msgs.length||0,0,f.name);for(const r of state.rooms)assert.ok(a.roomReach.has(a.rooms.get(r.id)?.reg?.k),r.name);}
checkReach(app);f(s,73).seating.mode='stools';checkReach(app);assert.equal(app.body(f(s,73)).length,3);app.arrange(f(s,74),'expanded');assert.equal(f(s,73).seating.mode,'table');checkReach(app);
// Detektor musi reagować na zbyt wąskie drzwi i na ścianę w otworze.
const narrow=model();o(narrow.state(),23).w=750;assert.ok(narrow.doors().find(d=>d.id===23).issues.length);
const blocked=model();o(blocked.state(),45).pos=10800-4775;assert.ok(blocked.doors().find(d=>d.id===45).issues.some(m=>m.includes('ściana')));
for(const v of [23,32]){
 const old=fixture(v),unaffected=[75,76,100,101,105,106,107,108,111,121,122,123,124,125],changed=[71,72,73,80,81,83,109,110,113,129,130,131,132,133,134,135,136,137,138,143,144];
 for(const id of changed){const it=f(old,id);if(it){it.name='Własne M'+id;it.notes=[...(it.notes||[]),'Moja uwaga '+id];}}
 old.rooms[0].name='Mój salon';f(old,100).name='Moje biurko';f(old,100).x+=25;old.furn.push({...clone(f(old,100)),id:old.nextId++,name:'Dodatkowy własny mebel',x:12000,y:2000});
 const saved=new Map([['ogrodniki-rzut-v'+v+':E2',JSON.stringify(old)]]),loaded=model(saved).state();
 for(const id of changed){const it=f(loaded,id);if(it){assert.equal(it.name,'Własne M'+id,'Nazwa M'+id+' v'+v);assert.ok(it.notes.includes('Moja uwaga '+id));}}
 assert.equal(loaded.rooms[0].name,'Mój salon');assert.equal(f(loaded,100).x,f(old,100).x);assert.ok(loaded.furn.some(f=>f.name==='Dodatkowy własny mebel'));
 if(v===32)for(const id of unaffected)assert.equal(JSON.stringify(f(loaded,id)),JSON.stringify(f(old,id)),'Nie zmieniaj M'+id);
 assert.equal(saved.get('ogrodniki-rzut-v'+v+':E2'),JSON.stringify(old));assert.equal(f(loaded,73).d,1000);assert.equal(f(loaded,71).w,2800);assert.equal(o(loaded,29).pos,9600-4775);assert.equal(new Set(loaded.furn.map(f=>f.id)).size,loaded.furn.length);
 for(const id of [71,72]){const ids=f(loaded,id).equipment.map(e=>e.id);assert.equal(new Set(ids).size,ids.length);for(const e of f(fixture(32),id).equipment)assert.ok(ids.includes(e.id));}
 const current=clone(loaded);f(current,73).w=1650;f(current,83).name='Mój prysznic';saved.set('ogrodniki-rzut-v33:E2',JSON.stringify(current));assert.equal(JSON.stringify(model(saved).state()),JSON.stringify(current),'Priorytet v33');
}
for(const variant of ['E2S','R1','R2','R3']){const own=clone(app.fresh(variant));own.furn[0].name='Własny '+variant;const saved=new Map([['ogrodniki-rzut-v32:'+variant,JSON.stringify(own)]]);assert.equal(JSON.stringify(model(saved).load(variant)),JSON.stringify(own));}
const stable=model(),before=JSON.stringify(stable.state());stable.revise(stable.state());assert.equal(JSON.stringify(stable.state()),before,'Idempotencja, bez nowych ID po drugim wywołaniu');
console.log('PROJECT_REVISION_OK: kuchnia i otwory, rama/światło i O45, spiżarnia, garderoba, prysznic, sofa, kotłownia, dwa hokery, dojścia i prawdziwe migracje v23/v32');
