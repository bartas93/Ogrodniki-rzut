import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {terrainPresentation,terrainReport,cleanTerrain,cleanTerrainSettings,terraceLevels} from '../dom3d-teren.mjs';
import {cleanHouse} from '../dom3d-model.mjs';
import {rotatePoint} from '../dzialka-obrot.mjs';
import {terrainAt} from '../dzialka-teren.mjs';
const require=createRequire(import.meta.url),h=cleanHouse(require('./editor_model')().state());
const plane=(x,y)=>120+x*.12+y*.04,raw={layoutAngle:-31,elements:[{id:'house',x:3,y:-8,w:17.824,h:10.624}],context:{private:'PRIVATE',origin:{e:123456,n:654321},verticalDatum:'PL-KRON86-NH',terrain:{x:-100,y:-100,step:1,cols:201,rows:201,values:[]}}};
for(let r=0;r<201;r++)for(let c=0;c<201;c++)raw.context.terrain.values.push(plane(-99.5+c,-99.5+r));
const t=terrainPresentation(raw,h),centre=[3+17.824/2,-8+10.624/2];for(const [x,y]of [[0,0],[4,3],[-8.912,-5.312],[8.912,5.312]]){const [e,n]=rotatePoint([centre[0]+x,centre[1]+y],raw.layoutAngle);assert.ok(Math.abs(terrainAt(t.grid,x,y)-plane(e,n))<.0001,'NMT: rotacja, środek domu i środki komórek');}
assert.deepEqual(cleanTerrain(t,h),t);assert.ok(!JSON.stringify(t).includes('PRIVATE'));assert.ok(!JSON.stringify(t).includes('123456'));const r=terrainReport(t,h,{floorLevel:null});assert.ok(r.complete);assert.equal(r.floorLevel,Math.ceil((r.max+.3)*100)/100);assert.ok(r.span>1);assert.equal(r.profiles.length,2);assert.ok(r.openings.find(o=>o.id===10).difference>0);assert.equal(terrainReport(t,h,{floorLevel:119}).floorLevel,119);assert.ok(terrainReport(t,h,{floorLevel:119}).maxAboveFloor>0);
const terraces=terraceLevels(t,[{id:'terraceWest',x:-13,z:-2,w:4,d:7}],r.floorLevel);assert.ok(terraces[0].complete);
const broken=structuredClone(t);broken.grid.values.fill(null);assert.equal(terrainReport(broken,h,{floorLevel:null}).valid,false);assert.equal(terrainAt(broken.grid,0,0),null);
assert.equal(terrainPresentation({elements:[]},h),null);assert.throws(()=>cleanTerrainSettings({floorLevel:'123'}));assert.throws(()=>cleanTerrain({...t,houseSize:{width:10,depth:10}},h));assert.throws(()=>cleanTerrain({...t,grid:{...t.grid,values:[null]}},h));
const gap=structuredClone(t),idx=Math.floor(gap.grid.rows/2)*gap.grid.cols+Math.floor(gap.grid.cols/2);gap.grid.values[idx]=null;assert.equal(terrainReport(gap,h,{floorLevel:null}).complete,false);
console.log('TERRAIN_MODEL_OK: obrócony dom, translacja, środki komórek, NMT 1:1, brak ekstrapolacji, robocza posadzka, otwory/tarasy, walidacja i prywatność.');
