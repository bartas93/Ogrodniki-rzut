// Kontrola kopii E2S: odbicie brył mebli, stref i zawiasów oraz niezależność od E2.
// Użycie: timeout 15s node tools/check_e2_south.js
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8');
const prefix=html.split('<script>')[1].split('/* ---------- widok ---------- */')[0];
const ctx=vm.createContext({document:{querySelector:()=>null}});
vm.runInContext(prefix+`
 globalThis.model=v=>{const s=freshState(v);return {s,bodies:s.furn.map(f=>({id:f.id,boxes:furnBodies(f),zones:furnZones(f)}))};};
 globalThis.verifyIndependence=()=>{const keep=variantE2;try{variantE2=()=>{throw Error('Kopia nie może zależeć od bieżącego E2');};freshState('E2S');}finally{variantE2=keep;}};
 globalThis.doorHinges=s=>s.walls.flatMap(w=>w.op.filter(o=>o.type==='door').map(o=>{const g=geom(w),u=o.pos+(o.hinge?1:-1)*o.w/2,v=o.side*w.t/2;return {id:o.id,x:g.a.x+g.d.x*u+g.n.x*v,y:g.a.y+g.d.y*u+g.n.y*v};}));
})();`,ctx,{timeout:5000});
const a=ctx.model('E2'),b=ctx.model('E2S');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,a+' != '+b);
for(let i=0;i<a.bodies.length;i++){
 const x=a.bodies[i],y=b.bodies[i];assert.equal(x.id,y.id);
 for(const type of ['boxes','zones'])for(let j=0;j<x[type].length;j++){
  const p=x[type][j],q=y[type][j];
  close(p.x1,q.x1);close(p.x2,q.x2);close(10200-p.y2,q.y1);close(10200-p.y1,q.y2);
 }
}
const ha=ctx.doorHinges(a.s),hb=ctx.doorHinges(b.s);
for(let i=0;i<ha.length;i++){assert.equal(ha[i].id,hb[i].id);close(ha[i].x,hb[i].x);close(10200-ha[i].y,hb[i].y);}
assert.ok(b.s.furn.filter(f=>['tall','k240','island'].includes(f.key)&&f.x<4700).every(f=>f.y>7000));
assert.ok(b.s.rooms.find(r=>r.name==='Spiżarnia').y>7000);
assert.ok(b.s.walls.some(w=>w.ext&&w.x1>17000&&w.x2>17000&&w.op.some(o=>o.type==='door')));
assert.equal(a.s.furn.length,b.s.furn.length);
ctx.verifyIndependence();
console.log('REFLECTION_OK: furniture bodies, service zones, door hinges, kitchen south, pantry south, entry east');
