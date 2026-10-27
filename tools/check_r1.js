// Kontrakt nowego wariantu R1. Geometrię i stan stołu sprawdza check_variant.js R1.
// Użycie: timeout 15s node tools/check_r1.js
const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8');
const script=html.split('<script>')[1].split('</script>')[0];
new Function(script);
const prefix=script.slice(0,script.indexOf('/* ---------- widok ---------- */'));
const api=new Function('document','localStorage','return '+prefix.trimStart()
  +'\nreturn {fresh:freshState, inspect:v=>{S=freshState(v);A=analyse();return {state:S,analysis:A};}};})();'
)({querySelector:()=>null},{getItem:()=>null});
const check=(condition,message)=>{if(!condition)throw Error(message);};
const r1=api.inspect('R1'),e2=api.inspect('E2'),s=r1.state;
const area=r=>{const b=r.analysis.bbox;return (b.x2-b.x1)*(b.y2-b.y1);};
check(s.rooms.filter(r=>/^(Sypialnia|Pokój)/.test(r.name)).length===3,'R1 musi mieć trzy pokoje poza salonem');
check(!s.rooms.some(r=>r.name==='Gabinet'),'R1 nie ma czwartego, osobnego gabinetu');
check(area(r1)<0.85*area(e2),'R1 ma być co najmniej 15% mniejszy od E2');
const north=s.walls.filter(w=>w.ext).sort((a,b)=>(a.y1+a.y2)-(b.y1+b.y2))[0];
check(north.y1===north.y2&&north.op.some(o=>o.type==='door'&&o.w>=900&&o.side<0),'Wejście R1 musi być od północy i otwierać się na zewnątrz');
const desks=s.furn.filter(f=>f.key==='desk');
check(desks.length===2&&desks.every(f=>f.w===1400&&f.d===700),'Dwa biurka muszą mieć 140×70 cm');
check(s.rooms.filter(r=>/^Łazienka/.test(r.name)).length===2,'Zachowaj dwie łazienki');
for(const name of ['Spiżarnia','Pralnia','Techniczne','Garderoba'])check(s.rooms.some(r=>r.name===name),'Brak pomieszczenia: '+name);
for(const f of s.furn)check(!r1.analysis.fs.get(f.id)?.msgs.length,'Kolizja lub niedostępność mebla: '+f.name);
for(const r of s.rooms)check(r1.analysis.roomReach.has(r1.analysis.rooms.get(r.id)?.reg?.k),'Brak dojścia: '+r.name);
const table=s.furn.find(f=>f.arrangements);
check(table.arrangements.expanded.w===2400&&table.arrangements.expanded.parts.length===9,'Rozłożony stół: 240 cm i osiem krzeseł');
console.log('R1_OK: wejście północne, trzy pokoje, mniejsza bryła, wyposażenie i dojścia');
