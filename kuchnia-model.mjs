// Niezależny plan wyposażenia. Współrzędne rzutu w mm; trwałe kody szafek tego planera.
import {supplierFor} from './kuchnia-castorama.mjs';
export const STORAGE_KEY='ogrodniki-kuchnia3d-v1';
export const MODULES=[
 {id:'W1',name:'Piekarnik i zaplecze pieczenia',run:'Słupki',source:'E2-M71-E2',x:200,y:1800,w:600,d:600,h:2340,axis:'west',kind:'oven',default:'oven'},
 {id:'W2',name:'Lodówka w zabudowie',run:'Słupki',source:'E2-M71-E1',x:200,y:1200,w:600,d:600,h:2340,axis:'west',kind:'fridge',default:'fridge'},
 {id:'W3',name:'Słupek zapasów 40 — do dopasowania',run:'Słupki',source:'E2-M71-E3',x:200,y:800,w:400,d:600,h:2340,axis:'west',kind:'pantry',default:'shelves'},
 {id:'C1',name:'Ślepy niski narożnik',run:'Słupki',source:'E2-M71-E4',x:200,y:200,w:600,d:600,h:900,axis:'west',kind:'blind',default:'blind'},
 {id:'N1',name:'Przybory i przygotowanie',run:'Ściana z oknem',source:'E2-M72-E1',x:800,y:200,w:600,d:600,h:900,axis:'north',kind:'base',default:'drawers3'},
 {id:'N2',name:'Zlew i segregacja',run:'Ściana z oknem',source:'E2-M72-E2',x:1400,y:200,w:800,d:600,h:900,axis:'north',kind:'sink',default:'bins'},
 {id:'N3',name:'Zmywarka',run:'Ściana z oknem',source:'E2-M72-E3',x:2200,y:200,w:600,d:600,h:900,axis:'north',kind:'dishwasher',default:'dishwasher'},
 {id:'N4',name:'Wąski moduł przy płycie',run:'Ściana z oknem',source:'E2-M72-E4',x:2800,y:200,w:300,d:600,h:900,axis:'north',kind:'base',default:'cargo'},
 {id:'N5',name:'Płyta i patelnie',run:'Ściana z oknem',source:'E2-M72-E5',x:3100,y:200,w:600,d:600,h:900,axis:'north',kind:'hob',default:'hobdrawers'},
 {id:'N6A',name:'Pojemniki i przechowywanie',run:'Ściana z oknem',source:'E2-M72-E6',x:3700,y:200,w:500,d:600,h:900,axis:'north',kind:'base',default:'drawers3'},
 {id:'N6B',name:'Naczynia do serwowania',run:'Ściana z oknem',source:'E2-M72-E6',x:4200,y:200,w:500,d:600,h:900,axis:'north',kind:'base',default:'shelves'},
 {id:'I1',name:'Garnki i pokrywki',run:'Wyspa od kuchni',source:'E2-M73',x:2100,y:2100,w:800,d:600,h:900,axis:'islandNorth',kind:'base',default:'drawers2'},
 {id:'I2',name:'Talerze, miski i sztućce',run:'Wyspa od kuchni',source:'E2-M73',x:2900,y:2100,w:600,d:600,h:900,axis:'islandNorth',kind:'base',default:'drawers3'},
 {id:'I3',name:'Blachy i deski pionowo',run:'Wyspa od kuchni',source:'E2-M73',x:3500,y:2100,w:300,d:600,h:900,axis:'islandNorth',kind:'base',default:'vertical'},
 {id:'R1',name:'Szklanki i kieliszki',run:'Wyspa od jadalni',source:'E2-M73',x:2100,y:2700,w:800,d:300,h:900,axis:'north',kind:'shallow',default:'shelves'},
 {id:'R2',name:'Kubki i bidony',run:'Wyspa od jadalni',source:'E2-M73',x:2900,y:2700,w:600,d:300,h:900,axis:'north',kind:'shallow',default:'shelves'},
 {id:'R3',name:'Tekstylia i drobiazgi stołu',run:'Wyspa od jadalni',source:'E2-M73',x:3500,y:2700,w:300,d:300,h:900,axis:'north',kind:'shallow',default:'shelves'},
 {id:'BLAT',name:'Sprzęty codzienne i noże',run:'Blat',source:'E2-M72 / E2-M73',w:1700,d:900,h:900,kind:'counter',default:'counter'},
];
export const BY_ID=Object.fromEntries(MODULES.map(m=>[m.id,m]));
export const MECHANISMS={drawers3:'3 szuflady · podział poglądowy',drawers2:'2 szuflady · podział poglądowy',shelves:'Półki za frontem',cargo:'Wysuw cargo',inner:'Szuflady wewnętrzne za drzwiami',vertical:'Pionowe przegrody na blachy',bins:'Wysuw segregacji + miejsce na syfon',sinkShelf:'Półka z rezerwą na syfon',hobdrawers:'2 szuflady pod płytą + rezerwa wentylacji',oven:'Piekarnik, dolna szuflada i górna szafka',fridge:'Lodówka zintegrowana',dishwasher:'Zmywarka zintegrowana',blind:'Narożnik bez dostępu',counter:'Wyposażenie blatu'};
export function allowed(m){return ({base:['drawers3','drawers2','shelves','inner','cargo','vertical'],shallow:['shelves','vertical'],pantry:['shelves','inner','cargo'],sink:['bins','sinkShelf'],hob:['hobdrawers'],oven:['oven'],fridge:['fridge'],dishwasher:['dishwasher'],blind:['blind'],counter:['counter']})[m.kind];}
const raw=[
 ['plates','Talerze obiadowe',12,280,280,30],['soup','Talerze głębokie',12,240,240,50],['smallplates','Talerzyki',12,210,210,25],['bowls','Miski',8,180,180,90],['salads','Salaterki',3,260,260,130],['cutlery','Sztućce',48,0,0,0],['knives','Noże w bloku',6,0,0,0],['utensils','Łopatki, chochle i przybory',12,0,0,0],['glasses','Szklanki',12,80,80,140],['mugs','Kubki',8,110,90,110],['wine','Kieliszki',8,90,90,220],['pans','Patelnie z rączką',4,500,300,100],['pots','Garnki',5,350,250,220],['lids','Pokrywki',8,280,280,50],['ovenware','Naczynia żaroodporne',4,360,250,130],['trays','Blachy piekarnika',3,460,370,30],['moulds','Formy do pieczenia',4,300,250,100],['boards','Deski do krojenia',3,400,280,25],['containers','Pojemniki na żywność',12,220,160,100],['bottles','Bidony i termosy',4,90,90,260],['wraps','Folie, papier i woreczki',3,0,0,0],['linen','Ścierki, serwetki i podkładki',8,0,0,0],['spices','Słoiczki przypraw',12,60,60,120],['oils','Oleje, octy i sosy',4,90,90,300],['dryfood','Pojemniki produktów sypkich',8,140,140,220],['smallagd','Airfryer, toster / grill i inne AGD',3,0,0,0],['cleaning','Środki i akcesoria do zmywania',4,0,0,0],['bags','Worki i zapasy do segregacji',3,0,0,0]
];
export const INVENTORY=raw.map(([id,name,target,w,d,h])=>({id,name,target,w,d,h}));
export const DAILY=[
 {id:'coffee',name:'Ekspres',x:4380,y:350,w:300,d:400,h:400,surface:'north'},
 {id:'kettle',name:'Czajnik',x:4120,y:400,w:220,d:220,h:270,surface:'north'},
 {id:'mixer',name:'Thermomix',x:3350,y:2200,w:350,d:400,h:350,surface:'island'},
 {id:'pitcher',name:'Dzbanek na wodę',x:3320,y:2720,w:180,d:180,h:280,surface:'island'},
 {id:'knifeBlock',name:'Blok noży',x:3540,y:2720,w:120,d:180,h:240,surface:'island'},
];
export function slotsFor(m,c){
 const type=c.mechanism,drawer=type.includes('drawers')||type==='inner'||type==='oven',w=m.w-(drawer?80:36),d=Math.max(100,m.d-(drawer?180:m.kind==='shallow'?36:80));
 const slot=(id,label,y,h)=>({id,label,y,h,w,d,clearH:Math.max(40,h-(type.includes('drawer')||type==='inner'?55:25))});
 if(['blind','fridge','dishwasher'].includes(type))return [];
 if(type==='counter')return [{id:'block',label:'Blok noży na wyspie',w:120,d:180,h:240,clearH:240,y:900}];
 if(type==='oven')return [slot('s1','Dolna szuflada — pieczenie',150,720),slot('s2','Szafka nad piekarnikiem',1520,m.h-1540)];
 if(['bins','sinkShelf'].includes(type))return [slot('s1',type==='bins'?'Przy segregacji — poza syfonem':'Półka poza syfonem',150,300)];
 if(type==='hobdrawers')return [slot('s1','Górna szuflada — pod rezerwą płyty',460,310),slot('s2','Dolna szuflada',150,310)];
 if(type==='vertical')return [slot('s1','Pionowe przegrody',150,720)];
 const tall=m.kind==='pantry',height=tall?m.h-168:720;
 const count=type==='drawers3'?3:type==='drawers2'?2:Math.max(2,Math.min(6,c.shelfCount||3));
 if(type==='drawers3'||type==='drawers2'){
  const sizes=type==='drawers3'?[144,288,288]:[360,360];let y=150+height;
  return sizes.map((h,i)=>{y-=h;return slot('s'+(i+1),['Górna','Środkowa','Dolna'][type==='drawers2'&&i===1?2:i]+' szuflada',y,h);});
 }
 return Array.from({length:count},(_,i)=>slot('s'+(i+1),(type==='cargo'?'Kosz cargo ':type==='inner'?'Szuflada wewnętrzna ':'Poziom półki ')+(i+1),150+(count-1-i)*height/count,height/count));
}
export function initialPlan(){
 const configs=Object.fromEntries(MODULES.map(m=>[m.id,{mechanism:m.default,shelfCount:m.kind==='pantry'?5:3,notes:''}]));
 configs.N4.shelfCount=2;configs.R1.shelfCount=2;configs.R2.shelfCount=2;
 const assignments=[];const put=(moduleId,slotId,ids)=>ids.forEach(itemId=>assignments.push({id:'a'+(assignments.length+1),moduleId,slotId,itemId,qty:INVENTORY.find(i=>i.id===itemId).target}));
 put('N1','s1',['utensils']);put('N1','s2',['wraps']);put('N1','s3',['boards']);
 put('N2','s1',['cleaning','bags']);put('N4','s1',['spices']);put('N4','s2',['oils']);
 put('N5','s1',['pans']);put('N6A','s2',['containers']);put('N6B','s2',['salads']);
 put('I1','s1',['lids']);put('I1','s2',['pots']);put('I2','s1',['cutlery']);put('I2','s2',['plates','smallplates']);put('I2','s3',['soup','bowls']);
 put('I3','s1',['trays']);put('W1','s1',['ovenware','moulds']);put('W3','s2',['dryfood']);
 put('R1','s1',['wine']);put('R1','s2',['glasses']);put('R2','s1',['bottles']);put('R2','s2',['mugs']);put('R3','s2',['linen']);put('BLAT','block',['knives']);
 return {schema:1,configs,inventory:structuredClone(INVENTORY),assignments,daily:structuredClone(DAILY),notes:''};
}
const num=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max;
const safeId=v=>typeof v==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,60}$/.test(v)&&!['constructor','prototype','__proto__'].includes(v);
export function validatePlan(raw){
 if(!raw||raw.schema!==1||!Array.isArray(raw.inventory)||raw.inventory.length>200||!Array.isArray(raw.assignments)||raw.assignments.length>1500)throw Error('Nieprawidłowy format planu kuchni. Wczytaj plik zapisany z tego planera.');
 const p=initialPlan();p.inventory=raw.inventory.map(i=>{
  if(!i||!safeId(i.id)||typeof i.name!=='string'||!i.name.trim()||i.name.length>120||!num(i.target,0,999)||!Number.isInteger(i.target)||!['w','d','h'].every(k=>num(i[k]??0,0,3000)))throw Error('Nieprawidłowe dane na liście wyposażenia.');
  return {id:i.id,name:i.name.trim(),target:i.target,w:i.w||0,d:i.d||0,h:i.h||0};
 });
 const ids=new Set(p.inventory.map(i=>i.id));if(ids.size!==p.inventory.length)throw Error('Powtórzone pozycje wyposażenia.');
 for(const m of MODULES){const c=raw.configs?.[m.id];if(!c||!allowed(m).includes(c.mechanism)||!Number.isInteger(c.shelfCount)||!num(c.shelfCount,2,6)||typeof c.notes!=='string'||c.notes.length>2000)throw Error('Nieprawidłowa konfiguracja szafki '+m.id);p.configs[m.id]={mechanism:c.mechanism,shelfCount:c.shelfCount,notes:c.notes};}
 p.assignments=raw.assignments.map(a=>{
  if(!a||!safeId(a.id)||!Object.hasOwn(BY_ID,a.moduleId)||!ids.has(a.itemId)||!['s1','s2','s3','s4','s5','s6','block'].includes(a.slotId)||!Number.isInteger(a.qty)||!num(a.qty,1,999))throw Error('Nieprawidłowe przypisanie zawartości szafki.');
  return {id:a.id,moduleId:a.moduleId,slotId:a.slotId,itemId:a.itemId,qty:a.qty};
 });
 if(new Set(p.assignments.map(a=>a.id)).size!==p.assignments.length)throw Error('Powtórzone przypisania.');
 if(!Array.isArray(raw.daily)||raw.daily.length!==DAILY.length)throw Error('Brak danych sprzętów na blacie.');
 p.daily=DAILY.map(base=>{const d=raw.daily.find(v=>v.id===base.id);if(!d||!['x','y','w','d','h'].every(k=>num(d[k],k==='x'||k==='y'?0:30,k==='x'||k==='y'?6000:1500)))throw Error('Nieprawidłowy gabaryt sprzętu na blacie.');return {...base,...Object.fromEntries(['x','y','w','d','h'].map(k=>[k,d[k]]))};});
 p.notes=typeof raw.notes==='string'?raw.notes.slice(0,4000):'';return p;
}
export function validAssignment(p,a){const m=BY_ID[a.moduleId];return !!m&&slotsFor(m,p.configs[m.id]).some(s=>s.id===a.slotId);}
export function coverage(p){return p.inventory.map(i=>({...i,assigned:p.assignments.filter(a=>a.itemId===i.id&&validAssignment(p,a)).reduce((s,a)=>s+a.qty,0)}));}
export function fitIssue(p,a){
 const i=p.inventory.find(i=>i.id===a.itemId),m=BY_ID[a.moduleId],slot=slotsFor(m,p.configs[m.id]).find(s=>s.id===a.slotId);
 if(!slot)return 'Po zmianie mechanizmu wybierz ponownie przegrodę.';
 if(!i.w||!i.d||!i.h||m.kind==='counter')return '';
 const sizes=p.configs[m.id].mechanism==='vertical'?[[i.w,i.d,i.h],[i.w,i.h,i.d],[i.d,i.w,i.h],[i.d,i.h,i.w],[i.h,i.w,i.d],[i.h,i.d,i.w]]:[[i.w,i.d,i.h],[i.d,i.w,i.h]];
 return sizes.some(([w,d,h])=>w<=slot.w&&d<=slot.d&&h<=slot.clearH)?'':'Gabaryt pojedynczej sztuki może nie mieścić się w tej przegrodzie.';
}
export function dailyIssues(p){
 const issues=[],over=(a,b)=>Math.min(a.x+a.w,b.x+b.w)>Math.max(a.x,b.x)&&Math.min(a.y+a.d,b.y+b.d)>Math.max(a.y,b.y);
 for(const d of p.daily){const area=d.surface==='north'?{x:3700,y:200,w:1000,d:600}:{x:2100,y:2100,w:1700,d:900};
  if(d.x<area.x||d.y<area.y||d.x+d.w>area.x+area.w||d.y+d.d>area.y+area.d)issues.push(d.name+': wystaje poza blat.');
  if(d.surface==='north'&&d.x<4100)issues.push(d.name+': zajmuje wolne 40 cm przy płycie.');
  if(d.surface==='island'&&d.x<3300)issues.push(d.name+': zmniejsza wolny blat 120×90 cm.');
  for(const other of p.daily)if(d.id<other.id&&over(d,other))issues.push(d.name+' i '+other.name+': nakładają się.');
 }
 return issues;
}
export function reportRows(p){return p.assignments.map(a=>{const m=BY_ID[a.moduleId],slot=slotsFor(m,p.configs[m.id]).find(s=>s.id===a.slotId),i=p.inventory.find(i=>i.id===a.itemId),supplier=supplierFor(m);return [m.id,m.name,m.source,MECHANISMS[p.configs[m.id].mechanism],slot?.label||'DO PONOWNEGO PRZYPISANIA',i.name,a.qty,fitIssue(p,a),supplier.status,supplier.products.map(p=>p.ean).join(' / '),supplier.products.map(p=>p.url).join(' / ')];});}
export function cabinetRows(p){return MODULES.map(m=>{const supplier=supplierFor(m);return [m.id,m.name,m.source,MECHANISMS[p.configs[m.id].mechanism],'MODUŁ','','',supplier.note,supplier.status,supplier.products.map(p=>p.ean).join(' / '),supplier.products.map(p=>p.url).join(' / ')];});}
export function csv(p){const quote=v=>{let s=String(v);if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};return '\uFEFF'+[['Szafka','Nazwa','ID rzutu','Mechanizm','Przegroda','Zawartość','Liczba','Uwagi','Korpus / status','EAN','Karta produktu'],...cabinetRows(p),...reportRows(p),...coverage(p).filter(i=>i.assigned<i.target).map(i=>['NIEPRZYPISANE','','','','',i.name,i.target-i.assigned,'Znajdź miejsce','','',''])].map(r=>r.map(quote).join(';')).join('\r\n');}
