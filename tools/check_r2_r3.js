// Kontrakt R2/R3, odbicie fizycznej geometrii oraz trwałe numery elementów.
// Pełna kontrola kolizji: node tools/check_variant.js R2 / R3.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8');
const prefix=html.split('<script>')[1].split('/* ---------- widok ---------- */')[0];
const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:()=>null}});
vm.runInContext(prefix+'globalThis.api={fresh:freshState,defaults,bodies:furnBodies,zones:furnZones,geom,fT,variants:Object.keys(VARIANTS)};})();',c,{timeout:5000});
const {api}=c,states=Object.fromEntries(['R1','R2','R3'].map(v=>[v,api.fresh(v)]));
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
for(const v of ['R2','R3']){
 const s=states[v],ext=s.walls.filter(w=>w.ext);
 const xs=ext.flatMap(w=>[w.x1-w.t/2,w.x2+w.t/2]),ys=ext.flatMap(w=>[w.y1-w.t/2,w.y2+w.t/2]);
 near(Math.max(...xs)-Math.min(...xs),15174);near(Math.max(...ys)-Math.min(...ys),9824);
 assert.equal(s.rooms.filter(r=>/^(Sypialnia|Pokój)/.test(r.name)).length,3);
 assert.equal(s.rooms.filter(r=>r.name.startsWith('Łazienka')).length,2);
 for(const name of ['Pralnia','Techniczne','Spiżarnia','Garderoba'])assert.ok(s.rooms.some(r=>r.name===name));
 assert.equal(s.furn.filter(f=>f.key==='desk').length,2);
 assert.ok(s.furn.filter(f=>f.key==='desk').every(f=>f.w===1400&&f.d===700));
 const north=ext.find(w=>w.y1===-6&&w.y2===-6),entry=north.op.find(o=>o.type==='door');
 const g=api.geom(north),entryX=g.a.x+g.d.x*entry.pos;
 if(v==='R2')assert.ok(Math.abs(entryX-7375)<1000,'Wejście blisko środka północy');
 else assert.ok(entryX>13000,'Wejście przy północno-wschodnim narożniku');
 const salon=s.rooms.find(r=>r.name.startsWith('Salon'));assert.ok(salon.y>4700);
 assert.ok(v==='R2'?salon.x<7400:salon.x>7400);
}
// Odbicie obejmuje obrysy, strefy, otwory, zawiasy i wyposażenie, a numery pozostają.
const r1=states.R1,r3=states.R3,mirrorBox=b=>({x1:14750-b.x2,y1:b.y1,x2:14750-b.x1,y2:b.y2});
for(const f of r1.furn){
 const m=r3.furn.find(x=>x.id===f.id);assert.ok(m);
 const boxes=api.bodies(f).map(mirrorBox),actual=api.bodies(m);
 boxes.forEach((b,i)=>Object.keys(b).forEach(k=>near(b[k],actual[i][k])));
 api.zones(f).map(mirrorBox).forEach((b,i)=>Object.keys(b).forEach(k=>near(b[k],api.zones(m)[i][k])));
 for(const e of f.equipment||[]){const me=m.equipment.find(x=>x.id===e.id),a=api.fT(f)(e.x+e.w/2,e.y+e.d/2),b=api.fT(m)(me.x+me.w/2,me.y+me.d/2);near(b.x,14750-a.x);near(b.y,a.y);}
}
for(const w of r1.walls){const m=r3.walls.find(x=>x.id===w.id);near(m.x1,14750-w.x2);near(m.y1,w.y2);for(const o of w.op){const mo=m.op.find(x=>x.id===o.id);near(mo.pos,api.geom(w).L-o.pos);if(o.type==='door')assert.equal(mo.hinge,o.hinge?0:1);}}
for(const v of api.variants){
 const s=api.fresh(v),ids=[...s.walls,...s.walls.flatMap(w=>w.op),...s.rooms,...s.furn].map(x=>x.id);
 assert.equal(new Set(ids).size,ids.length,'Numery obiektów: '+v);assert.ok(s.nextId>Math.max(...ids));
 for(const f of s.furn){const eq=(f.equipment||[]).map(e=>e.id);assert.equal(new Set(eq).size,eq.length);assert.ok(eq.every(Number.isInteger));}
 const restored=api.defaults(JSON.parse(JSON.stringify(s)));assert.equal(JSON.stringify(restored),JSON.stringify(s),'Odczyt zachowuje ID '+v);
}
// Nie ufaj przestarzałemu nextId w importowanym JSON. Numery wyposażenia przeżywają zmianę kolejności.
const custom=api.fresh('E2'),f=custom.furn.find(f=>f.equipment?.length>1),before=f.equipment.map(e=>e.id);
f.equipment.reverse();custom.nextId=1;api.defaults(custom);assert.equal(f.equipment.map(e=>e.id).join(),before.reverse().join());
f.equipment.push({kind:'cabinet',x:0,y:0,w:100,d:100,label:'nowe'});api.defaults(custom);assert.ok(f.equipment.at(-1).id>Math.max(...before));
assert.ok(custom.nextId>Math.max(...custom.furn.map(x=>x.id)));
states.R2.furn[0].name='Własna edycja';assert.notEqual(api.fresh('R2').furn[0].name,'Własna edycja');assert.notEqual(r1.furn[0].name,'Własna edycja');
console.log('R2_R3_OK: program, obrys, orientacja, pełne odbicie, niezależność oraz trwałe numery we wszystkich wariantach');
