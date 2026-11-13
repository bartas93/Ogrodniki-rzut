// Rzeczywisty v34 -> v35: wnęki, opaski, zachowanie ID i własnych edycji.
const assert=require('node:assert/strict'),model=require('./editor_model'),precision=require('./audit_precision');
const clone=x=>JSON.parse(JSON.stringify(x)),old=clone(require('./fixtures/e2-v34.json'));
old.rooms[0].name='Mój salon';old.furn.find(f=>f.id===73).w=1675;
old.furn.find(f=>f.id===103).name='Moje ubrania';old.furn.find(f=>f.id===103).notes.push('Własna uwaga');
old.walls.push({id:150,x1:1000,y1:1000,x2:1100,y2:1000,t:20,ext:false,layer:'własna',op:[]});old.nextId=151;
const raw=JSON.stringify(old),saved=new Map([['ogrodniki-rzut-v34:E2',raw]]),app=model(saved),s=app.state(),affected=[102,103,114,115,139,140,141];
assert.equal(s.projectRevision,35);assert.equal(saved.get('ogrodniki-rzut-v34:E2'),raw);
assert.equal(JSON.stringify(s.furn.filter(f=>!affected.includes(f.id))),JSON.stringify(old.furn.filter(f=>!affected.includes(f.id))));
for(const id of affected){const before=old.furn.find(f=>f.id===id),after=s.furn.find(f=>f.id===id);for(const k of ['id','name','w','d','y','rot','key','layer'])assert.equal(after[k],before[k],id+':'+k);}
assert.ok(s.furn.find(f=>f.id===103).notes.includes('Własna uwaga'));
assert.equal(s.walls.find(w=>w.id===35).t,75);assert.equal(s.walls.find(w=>w.id===47).t,75);
assert.equal(s.walls.find(w=>w.id===40).t,150);assert.equal(s.walls.find(w=>w.id===40).y2,6200);
const end=s.walls.find(w=>w.presetTag==='nov13-office-return');assert.equal(end.id,151);assert.equal(end.t,75);assert.equal(end.y2,6900);
for(const w of old.walls.filter(w=>![35,40,42,47].includes(w.id)))assert.equal(JSON.stringify(s.walls.find(x=>x.id===w.id)),JSON.stringify(w));
const w42=s.walls.find(w=>w.id===42),old42=old.walls.find(w=>w.id===42);assert.equal(JSON.stringify(w42.op.filter(o=>o.id!==43)),JSON.stringify(old42.op.filter(o=>o.id!==43)));
assert.equal(JSON.stringify(s.rooms),JSON.stringify(old.rooms));
const d=app.doors().find(d=>d.id===43);assert.equal(d.effective,800);assert.deepEqual(clone(d.casingFit.sideGaps),[20.75,20.75]);assert.equal(d.issues.length+d.warnings.length,0);
const door=w42.op.find(o=>o.id===43);door.frame.casing.outerWidth=986;assert.ok(app.doors().find(d=>d.id===43).warnings.length);door.frame.casing.outerWidth=1000;assert.ok(app.doors().find(d=>d.id===43).issues.length);door.frame.casing.outerWidth=946;
const clean=model(),state=clean.state();assert.equal(precision(state,clean).wallOverlaps.length,0);assert.equal(precision(state,clean).furnitureOverlaps.length,0);
for(const [ids,left,right] of [[[102,103],10950,12737.5],[[114,115],5912.5,7700],[[139,140,141],14912.5,17200]]){
 const boxes=ids.map(id=>clean.body(state.furn.find(f=>f.id===id))[0]);assert.ok(boxes[0].x1-left>=20);assert.ok(right-boxes.at(-1).x2>=20);for(let i=1;i<boxes.length;i++)assert.equal(boxes[i].x1,boxes[i-1].x2);
}
const before=JSON.stringify(s);app.fixNiches(s);assert.equal(JSON.stringify(s),before,'Idempotencja');
saved.set('ogrodniki-rzut-v35:E2',before);assert.equal(JSON.stringify(model(saved).state()),before,'Własny v35 ma pierwszeństwo');
const removed=clone(old);removed.furn=removed.furn.filter(f=>f.id!==103);assert.ok(!model(new Map([['ogrodniki-rzut-v34:E2',JSON.stringify(removed)]])).state().furn.some(f=>f.id===103));
const ownOpening=clone(old),ownWall=ownOpening.walls.find(w=>w.id===40);ownWall.op.push({id:160,type:'open',pos:3200,w:100,hinge:0,side:1});ownOpening.nextId=161;
const withOpening=model(new Map([['ogrodniki-rzut-v34:E2',JSON.stringify(ownOpening)]])).state();assert.equal(withOpening.walls.find(w=>w.presetTag==='nov13-office-return').op.find(o=>o.id===160).pos,400);
ownWall.op.at(-1).pos=2800;const crossing=model(new Map([['ogrodniki-rzut-v34:E2',JSON.stringify(ownOpening)]])).state();assert.equal(crossing.walls.find(w=>w.id===40).y2,6900);assert.ok(!crossing.walls.some(w=>w.presetTag==='nov13-office-return'),'Nie rozcinaj przez własny otwór');
for(const v of ['E2S','R1','R2','R3']){const other=clone(clean.fresh(v));const m=new Map([['ogrodniki-rzut-v34:'+v,JSON.stringify(other)]]);assert.equal(JSON.stringify(model(m).load(v)),JSON.stringify(other));}
console.log('NICHE_MOUNTING_OK: pełne korpusy, luzy >20 mm na końcach, O43, negatywny test opaski, migracja i ID');
