// Ergonomia E2: spójne moduły, trójkąt między środkami frontów i migracja wyłącznie M71/M72.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const prefix=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0],clone=x=>JSON.parse(JSON.stringify(x));
function launch(saved=new Map()){
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(prefix+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,bodies:furnBodies,front:(f,e)=>fT(f)(e.x+e.w/2,e.y+e.d)};})();`,c,{timeout:5000});return c.api;
}
const api=launch(),s=api.state(),get=(state,id)=>state.furn.find(f=>f.id===id),tall=get(s,71),counter=get(s,72);
const fridge=tall.equipment.find(e=>e.kind==='fridge'),oven=tall.equipment.find(e=>e.kind==='oven'),pantry=tall.equipment.find(e=>e.id===3),corner=tall.equipment.find(e=>e.kind==='filler');
assert.equal(fridge.id,1);assert.equal(fridge.x,600);assert.equal(oven.id,2);assert.equal(oven.x,0);assert.equal(pantry.w,400);assert.equal(corner.id,4);assert.equal(corner.height,900);
for(const f of [tall,counter]){
 const sorted=[...f.equipment].sort((a,b)=>a.x-b.x);let end=0;
 for(const e of sorted){assert.equal(e.x,end,'Brak luk i nakładania modułów M'+f.id);assert.ok(e.w>0&&e.d<=f.d);end=e.x+e.w;}
 assert.equal(end,f.w);assert.equal(new Set(f.equipment.map(e=>e.id)).size,f.equipment.length);
}
const sink=counter.equipment.find(e=>e.kind==='sink'),hob=counter.equipment.find(e=>e.kind==='hob'),dw=counter.equipment.find(e=>e.kind==='dishwasher');
assert.equal(dw.x,sink.x+sink.w);assert.equal(hob.x-(sink.x+sink.w),900);assert.equal(counter.w-hob.x-hob.w,1000);assert.equal(hob.id,5);
const points=[api.front(tall,fridge),api.front(counter,sink),api.front(counter,hob)],lengths=points.map((p,i)=>Math.hypot(p.x-points[(i+1)%3].x,p.y-points[(i+1)%3].y));
assert.ok(lengths.every(l=>l>=1200&&l<=2700));assert.ok(lengths.reduce((a,b)=>a+b,0)>5500&&lengths.reduce((a,b)=>a+b,0)<5520);
const island=api.bodies(get(s,73))[0];assert.ok(Math.max(...points.map(p=>p.y))<island.y1,'Wyspa nie przecina boków trójkąta');
assert.equal(points[2].x,3400);assert.equal(points[0].y,1500);
const old=clone(s),ot=get(old,71),oc=get(old,72);
ot.equipment=ot.equipment.filter(e=>e.kind!=='filler');ot.equipment.find(e=>e.id===1).x=0;ot.equipment.find(e=>e.id===2).x=600;ot.equipment.find(e=>e.id===3).w=1000;ot.nextEquipmentId=4;
oc.equipment.find(e=>e.id===4).w=600;oc.equipment.find(e=>e.id===5).x=2600;Object.assign(oc.equipment.find(e=>e.id===6),{x:3200,w:700});
ot.name='Moje słupki';oc.name='Moja kuchnia';ot.notes.push('Moja uwaga 71');oc.notes.push('Moja uwaga 72');
get(old,73).w=1600;get(old,73).x+=100;old.walls.find(w=>w.id===42).x2-=100;old.walls.flatMap(w=>w.op).find(o=>o.id===5).w=1400;
const saved=new Map([['ogrodniki-rzut-v29:E2',JSON.stringify(old)]]),m=launch(saved).state();
assert.equal(JSON.stringify(m.furn.filter(f=>![71,72].includes(f.id))),JSON.stringify(old.furn.filter(f=>![71,72].includes(f.id))),'Pozostałe meble zachowane');
for(const key of Object.keys(old).filter(k=>k!=='furn'))assert.equal(JSON.stringify(m[key]),JSON.stringify(old[key]),'Zachowaj '+key);
for(const id of [71,72]){const changed=get(m,id),previous=get(old,id);for(const key of Object.keys(previous).filter(k=>!['equipment','nextEquipmentId','notes'].includes(k)))assert.equal(JSON.stringify(changed[key]),JSON.stringify(previous[key]),'M'+id+' '+key);assert.ok(changed.notes.includes('Moja uwaga '+id));}
assert.equal(get(m,71).equipment.find(e=>e.kind==='fridge').id,1);assert.equal(get(m,72).equipment.find(e=>e.kind==='hob').id,5);
assert.equal(saved.get('ogrodniki-rzut-v29:E2'),JSON.stringify(old));
const custom=clone(m);get(custom,72).equipment.find(e=>e.id===5).x+=20;saved.set('ogrodniki-rzut-v30:E2',JSON.stringify(custom));assert.equal(JSON.stringify(launch(saved).state()),JSON.stringify(custom),'Nie powtarzaj migracji v30');
for(const v of ['E2S','R1','R2','R3']){const state=clone(api.fresh(v));saved.set('ogrodniki-rzut-v29:'+v,JSON.stringify(state));assert.equal(JSON.stringify(launch(saved).load(v)),JSON.stringify(state),v);}
console.log('E2_KITCHEN_OK: trójkąt '+lengths.map(l=>(l/1000).toFixed(2)).join(' / ')+' m, blat 90 cm, dostępne zapasy 40 cm + niski narożnik, trwałe ID i migracja tylko M71/M72');
