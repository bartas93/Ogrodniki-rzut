// Raport koncepcji z prawdziwego silnika. Każde wywołanie: timeout 30s node tools/audit_main_project.js.
const model=require('./editor_model'),clone=x=>JSON.parse(JSON.stringify(x)),app=model(),s=app.state(),f=id=>s.furn.find(f=>f.id===id);
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const sourceSha256=crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'))).digest('hex');
const initial=clone(s),scenarios=[],precision=require('./audit_precision')(s,app);
function report(name){const a=app.analyse({entryId:10});return {name,problems:s.furn.filter(f=>a.fs.get(f.id)?.msgs.length).map(f=>({id:f.id,name:f.name,messages:a.fs.get(f.id).msgs})),warnings:s.furn.filter(f=>a.fs.get(f.id)?.warns.length).map(f=>({id:f.id,name:f.name,messages:a.fs.get(f.id).warns})),unreachable:s.rooms.filter(r=>!a.roomReach.has(a.rooms.get(r.id)?.reg?.k)).map(r=>r.name)};}
scenarios.push(report('Codziennie: stół złożony, hokery odstawione'));f(73).seating.mode='stools';scenarios.push(report('Dwa zajęte hokery, stół złożony i nieużywany'));app.arrange(f(74),'expanded');scenarios.push(report('Stół 280 cm / 10 osób, hokery odstawione'));
function sleeping(ids,name){
  s.furn=clone(initial.furn);
  for(const id of ids){const sofa=f(id);for(const [i,z] of sofa.z.entries())if(z.k==='unfold'&&!z.off){const b=app.zones(sofa)[i];s.furn.push({id:s.nextId++,key:'ref',name:'Rozłożenie M'+id,x:(b.x1+b.x2)/2,y:(b.y1+b.y2)/2,w:b.x2-b.x1,d:b.y2-b.y1,rot:0,layer:'',z:[]});}}
  const r=report(name);
  // Własne pole wypełnione materacem nie jest kolizją; konflikty z innymi meblami zostają.
  r.problems=r.problems.map(it=>({...it,messages:it.messages.filter(m=>!ids.includes(it.id)||!m.startsWith('strefa „po rozłożeniu”'))})).filter(it=>it.messages.length);
  scenarios.push(r);
}
for(const id of [75,76,101,117,143])sleeping([id],'Spanie M'+id);
sleeping([75,101,117,143],'Spanie M75 + M101 + M117 + M143 (bez M76)');
sleeping([76,101,117,143],'Rezerwa M76 + M101 + M117 + M143 (M75 zamknięta)');
sleeping([75,76],'Próba równoczesnego spania M75 + rezerwa M76 — oczekiwana kolizja');
s.furn=clone(initial.furn);const a=app.analyse(),regions=a.regions.map(reg=>({...reg,rects:[...reg.path.matchAll(/M(-?[\d.]+) (-?[\d.]+)h([\d.]+)v([\d.]+)/g)].map(m=>m.slice(1).map(Number))})),at=(x,y)=>regions.find(r=>r.rects.some(([a,b,w,h])=>x>=a&&x<a+w&&y>=b&&y<b+h));
const glazing=[];
for(const w of s.walls)if(w.ext){const g=app.geom(w);for(const o of w.op)if(['window','slide'].includes(o.type)){const x=g.a.x+g.d.x*o.pos+g.n.x*(w.t/2+125),y=g.a.y+g.d.y*o.pos+g.n.y*(w.t/2+125),reg=at(x,y);glazing.push({id:o.id,room:reg?.rooms[0],roughArea:o.w*(o.height||0)/1e6});}}
s.furn.find(f=>f.id===89).ref=false;const drying=app.analyse({entryId:10}),dryingRects=[...drying.passPath.matchAll(/M(-?[\d.]+) (-?[\d.]+)h([\d.]+)v([\d.]+)/g)].map(m=>m.slice(1).map(Number)),dryingRack={gardenExitFromMain:dryingRects.some(([x,y,w,h])=>7350>=x&&7350<x+w&&500>=y&&500<y+h),problems:s.furn.filter(f=>drying.fs.get(f.id)?.msgs.length).map(f=>({id:f.id,messages:drying.fs.get(f.id).msgs}))};s.furn=clone(initial.furn);
const rooms=s.rooms.map(r=>{const reg=a.rooms.get(r.id)?.reg,glass=glazing.filter(w=>w.room===r.id);return {id:r.id,name:r.name,area:Math.round((reg?.area||0)/1e4)/100,dimensions:reg?.dims,openings:glass.map(o=>'O'+o.id),roughGlazingArea:Math.round(glass.reduce((a,w)=>a+w.roughArea,0)*100)/100,requiredAtOneEighth:Math.round((reg?.area||0)/8/1e4)/100};});
const b=id=>app.body(f(id))[0],table=f(74),island=b(73),hob=f(72).equipment.find(e=>e.kind==='hob'),sink=f(72).equipment.find(e=>e.kind==='sink'),fridge=f(71).equipment.find(e=>e.kind==='fridge'),points=[app.front(f(71),fridge),app.front(f(72),sink),app.front(f(72),hob)];
const wall=id=>s.walls.find(w=>w.id===id),leftFace=id=>wall(id).x1-wall(id).t/2,rightFace=id=>wall(id).x1+wall(id).t/2;
const laundryAisle=b(96).x1-b(145).x2,nominalLeaf=f(145).joinery.nominalWidth/f(145).joinery.doorCount;
const occupiedStools=app.body({...f(73),seating:{...f(73).seating,mode:'stools'}}).slice(1);
const shelves=s.furn.filter(f=>f.id===109||f.id===110||f.presetTag?.startsWith('nov12-tech-'));
const reviewMeasurements={
  footprintWidth:a.bbox.x2-a.bbox.x1,footprintDepth:a.bbox.y2-a.bbox.y1,
  roomRasterArea:a.regions.reduce((sum,r)=>sum+r.area,0)/1e6,
  laundry:{closedAisle:laundryAisle,nominalDoorLeaf:nominalLeaf,oneDoorOpen:laundryAisle-nominalLeaf,twoDoorsOpen:laundryAisle-2*nominalLeaf},
  bath:{wcZoneWidth:app.zones(f(128))[0].y2-app.zones(f(128))[0].y1,basinToBath:b(129).y1-b(127).y2},
  bedroom:{bedToCrib:b(124).x1-b(121).x2,cribToTV:b(125).x1-b(124).x2},
  utilityDeviceGaps:[b(106).x1-b(105).x2,b(107).x1-b(106).x2],
  cabinetBays:[{ids:[102,103],left:rightFace(34),right:leftFace(35)},{ids:[114,115],left:rightFace(47),right:leftFace(48)},{ids:[139,140,141],left:(()=>{const w=s.walls.find(w=>w.presetTag==='nov13-office-return')||wall(40);return w.x1+w.t/2;})(),right:leftFace(8)}].map(bay=>({...bay,width:bay.right-bay.left,usedWidth:Math.max(...bay.ids.map(id=>b(id).x2))-Math.min(...bay.ids.map(id=>b(id).x1)),leftMargin:Math.min(...bay.ids.map(id=>b(id).x1))-bay.left,rightMargin:bay.right-Math.max(...bay.ids.map(id=>b(id).x2))})),
  staleStorageNotes:s.storagePlan.filter(note=>note.startsWith('Robot sprzątający:'))
};
console.log(JSON.stringify({variant:s.variant,sourceRevision:s.projectRevision,sourceSha256,reviewDecisions:s.reviewDecisions,precision,reviewMeasurements,dryingRack,doors:app.doors(),rooms,kitchen:{triangle:points.map((p,i)=>Math.round(Math.hypot(p.x-points[(i+1)%3].x,p.y-points[(i+1)%3].y))),northAisle:island.y1-b(72).y2,westAisle:island.x1-b(71).x2,eastAisle:leftFace(22)-island.x2,islandSize:[f(73).w,f(73).d],stoolsToUnusedTable:b(74).y1-Math.max(...occupiedStools.map(b=>b.y2)),closedTableToIsland:b(74).y1-island.y2},wardrobe:{aisle:wall(12).y1-wall(12).t/2-b(132).y2,accessoryShelfWidth:f(134).w},technical:{pinch:b(111).x1-b(110).x2,shelves:shelves.map(f=>({id:f.id,w:f.w,d:f.d})),shelfFootprint:shelves.reduce((sum,f)=>sum+f.w*f.d,0)/1e6},scenarios,limitations:['Raster 50 mm; niezależna kontrola prostokątów wykrywa także mniejsze penetracje ścian osiowych.','Brak modelu pionowego okuć, pełnych frontów i instalacji.','Światło drzwi według przyjętej rezerwy; nie zestawienie do zamówienia.','Powierzchnia okien brutto jest górną granicą, nie potwierdzeniem doświetlenia w świetle ościeżnic.','Niepotwierdzone jednoczesne spanie M75/M76.']},null,2));
// Exit 1 oznacza wykryte problemy domu, a nie awarię narzędzia. Raport nadal jest pełny.
if(precision.wallOverlaps.length||precision.furnitureOverlaps.length||precision.unsupportedWalls.length||scenarios.slice(0,3).some(s=>s.problems.length||s.unreachable.length)||app.doors().some(d=>d.issues.length))process.exitCode=1;
