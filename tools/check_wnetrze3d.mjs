import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {cleanInterior,interiorDefaults,cleanInteriorView,furnitureRects,localPoint,personWarnings,planSvg} from '../wnetrze3d-model.mjs';
const require=createRequire(import.meta.url),app=require('./editor_model')(),raw=app.state(),h=cleanInterior(raw),v=interiorDefaults();
assert.deepEqual(h,JSON.parse(fs.readFileSync(new URL('../wnetrze3d-baza.json',import.meta.url))));assert.deepEqual(cleanInterior(h),h);assert.equal(h.furn.length,79);assert.equal(h.rooms.length,12);assert.deepEqual(cleanInteriorView(v),v);
for(const f of h.furn){const body=JSON.parse(JSON.stringify(app.body(raw.furn.find(q=>q.id===f.id))));assert.deepEqual(furnitureRects(f),body,'obrys M'+f.id);}
assert.equal(h.furn.find(f=>f.id===71).equipment[0].type,'fridge');assert.equal(h.furn.find(f=>f.id===76).w,3050);assert.equal(h.furn.find(f=>f.id===92).parts.length,2);
for(const rot of [0,90,180,270]){const f={id:999,key:'desk',name:'test',x:2000,y:5000,w:1400,d:700,rot,parts:[[0,0,1,1]],seating:'table'};const r=furnitureRects(f)[0],point=localPoint(f,700,350);assert.equal(point.x,2000);assert.equal(point.y,5000);assert.equal(r.x2-r.x1,rot%180?700:1400);assert.ok(personWarnings({...h,furn:[f]},{x:2000,y:5000}).some(x=>x.includes('M999')));}
assert.deepEqual(personWarnings(h,{x:2800,y:5600}),[]);assert.ok(personWarnings(h,{x:0,y:0}).length);const sofa=h.furn.find(f=>f.id===76);assert.ok(personWarnings(h,{x:sofa.x,y:sofa.y+300}).length);
// Otwory dają faktyczną przerwę w ścianie, okna pozostają przeszkodą.
const w=h.walls.find(w=>!w.ext&&w.op.some(o=>o.type==='door')),o=w.op.find(o=>o.type==='door');if(o){const L=Math.hypot(w.x2-w.x1,w.y2-w.y1),x=w.x1+(w.x2-w.x1)/L*o.pos,y=w.y1+(w.y2-w.y1)/L*o.pos;assert.ok(!personWarnings({...h,furn:[]},{x,y}).includes('Ściana E2-S'+w.id));}
const stools=structuredClone(raw);stools.furn.find(f=>f.id===73).seating.mode='stools';const sh=cleanInterior(stools);assert.deepEqual(furnitureRects(sh.furn.find(f=>f.id===73)),JSON.parse(JSON.stringify(app.body(stools.furn.find(f=>f.id===73)))));
app.arrange(raw.furn.find(f=>f.id===74),'expanded');const expanded=cleanInterior(raw);assert.deepEqual(furnitureRects(expanded.furn.find(f=>f.id===74)),JSON.parse(JSON.stringify(app.body(raw.furn.find(f=>f.id===74)))));
assert.throws(()=>cleanInteriorView({person:{x:1,y:1,height:5,angle:0}}));assert.throws(()=>cleanInterior({...h,furn:[{...h.furn[0],rot:45}]}));assert.throws(()=>cleanInterior({...h,rooms:[{...h.rooms[0],id:h.walls[0].id}]}));
const priv=structuredClone(h);priv.context={private:'PRIVATE'};priv.furn[0].notes='PRIVATE';assert.ok(!JSON.stringify(cleanInterior(priv)).includes('PRIVATE'));const hostile=structuredClone(h);hostile.rooms[0].name='<script>alert(1)</script>';const svg=planSvg(hostile,v);assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('&lt;script&gt;'));
console.log('INTERIOR_MODEL_OK: 12 pomieszczeń, 79 dokładnych obrysów, niezależny zapis, pozycje/kolizje ludzika, drzwi, hokery, rozłożony stół, walidacja i prywatność.');
