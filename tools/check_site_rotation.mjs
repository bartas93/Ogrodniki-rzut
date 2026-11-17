import assert from 'node:assert/strict';
import {rotatePoint,inversePoint,elementCorners,suggestLayoutAngle} from '../dzialka-obrot.mjs';
import {polygonArea,rectangleRelation,terrainStats,gatePoint,accessProfile} from '../dzialka-teren.mjs';
import {validateSite,greenhouseGap} from '../dzialka-model.mjs';
import {contextFixture} from './site_context_fixture.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} ≠ ${b}`);
for(const angle of [-11.25,0,35,90,-90]){const p=[13,-8],r=rotatePoint(p,angle),back=inversePoint(r,angle);near(back[0],p[0]);near(back[1],p[1]);near(Math.hypot(...r),Math.hypot(...p));const e={x:-8,y:-5,w:16,h:10};near(polygonArea(elementCorners(e,angle)),160);}
const base=contextFixture();for(const angle of [-15,27]){const s=structuredClone(base);s.context.parcel.polygon=s.context.parcel.polygon.map(p=>rotatePoint(p,angle));delete s.layoutAngle;const loaded=validateSite(s);near(loaded.layoutAngle,angle);assert.ok(rectangleRelation(loaded.elements.find(e=>e.id==='house'),loaded.context.parcel.polygon,angle).inside);near(greenhouseGap(loaded.elements),10);near(suggestLayoutAngle(s.context.parcel.polygon),angle);}
const s=validateSite({...base,layoutAngle:-12}),house=s.elements.find(e=>e.id==='house'),t=s.context.terrain,stats=terrainStats(t,house,s.layoutAngle),poly=elementCorners(house,s.layoutAngle);for(const [index,corner] of [poly[0],poly[1],poly[3],poly[2]].entries())near(stats.corners[index],100+corner[0]*.05+corner[1]*.02);
near(stats.mean,100);assert.ok(stats.complete);assert.deepEqual(gatePoint(s.context),[40,50]);assert.ok(accessProfile(s).complete);assert.notEqual(accessProfile(s).length,accessProfile(base).length);
assert.deepEqual(validateSite(JSON.parse(JSON.stringify(s))),s);assert.throws(()=>validateSite({...base,layoutAngle:NaN}));assert.throws(()=>validateSite({...base,layoutAngle:181}));
console.log('SITE_ROTATION_OK: obrót bez skalowania i odbicia, migracja, prostopadłe10m, obrócone NMT i granice, nieruchoma brama');
