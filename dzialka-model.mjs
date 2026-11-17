export const SITE_KEY='ogrodniki-dzialka-v1';
// Lokalny układ metrowy: X na wschód, Y na południe. Brak georeferencji.
export const houseSize={w:17.824,h:10.624};
export function initialSite(){return {schema:1,entry:'pending',greenhouseLock:true,notes:'',elements:[
 {id:'garden',name:'Ogród południowy',x:-17,y:12,w:43,h:24,color:'#d9e9c6'},
 {id:'road',name:'Dojazd od granicy wschodniej',x:28,y:-35,w:4,h:36.8,color:'#d8d9d5'},
 {id:'turn',name:'Skręt do wschodniej elewacji',x:8.912,y:-2.2,w:23.088,h:4,color:'#d8d9d5'},
 {id:'parking',name:'Parking 4–5 samochodów',x:12,y:-9,w:13,h:11,color:'#e2dfd4'},
 {id:'terraceWest',name:'Taras zachodni',x:-13.912,y:-2.5,w:5,h:11.012,color:'#e4cbb3'},
 {id:'terraceSouth',name:'Taras południowo-zachodni',x:-8.912,y:5.312,w:10,h:3.2,color:'#e4cbb3'},
 {id:'house',name:'Projekt Główny — dom',x:-8.912,y:-5.312,...houseSize,color:'#e7e8df'},
 {id:'roof',name:'Zadaszenie tarasu zachodniego',x:-13.912,y:-2.5,w:5,h:5.5,color:'#c0b394'},
 {id:'shed',name:'Pomieszczenie gospodarcze',x:17,y:-19,w:6,h:6,color:'#cebea3'},
 {id:'shelter',name:'Wiata przy gospodarczym',x:23,y:-19,w:4,h:6,color:'#e8ddc8'},
 {id:'storageA',name:'Magazynek północny 1',x:17,y:-25,w:4,h:4,color:'#d7c4a8'},
 {id:'storageB',name:'Magazynek północny 2',x:21.5,y:-25,w:4,h:4,color:'#d7c4a8'},
 {id:'pv',name:'PV na gruncie — północ',x:-10,y:-30,w:18,h:8,color:'#758eab'},
 {id:'greenhouse',name:'Szklarnia — zachód',x:-22.912,y:-3,w:4,h:6,color:'#b5dcd0'},
 {id:'fire',name:'Siedzisko z ogniskiem',x:-9,y:21,w:6,h:6,color:'#ddbb91'}
 ].map(e=>({...e,visible:true}))};}
export function greenhouseGap(elements){const h=elements.find(e=>e.id==='house'),g=elements.find(e=>e.id==='greenhouse');return h.x-(g.x+g.w);}
export function enforceGreenhouse(s){if(s.greenhouseLock){const h=s.elements.find(e=>e.id==='house'),g=s.elements.find(e=>e.id==='greenhouse');g.x=h.x-10-g.w;}return s;}
export function validateSite(x){
 if(!x||x.schema!==1||!Array.isArray(x.elements))throw new Error('To nie jest zapis planera działki.');
 const s=initialSite();s.entry=['north','south','pending'].includes(x.entry)?x.entry:'pending';s.greenhouseLock=x.greenhouseLock!==false;s.notes=typeof x.notes==='string'?x.notes.slice(0,15000):'';
 for(const e of s.elements){const a=x.elements.find(a=>a.id===e.id);if(!a)continue;for(const k of ['x','y','w','h']){if(typeof a[k]!=='number'||!Number.isFinite(a[k])||Math.abs(a[k])>2000||(['w','h'].includes(k)&&a[k]<.2))throw new Error('Nieprawidłowe wymiary lub położenie.');e[k]=a[k];}e.visible=a.visible!==false;}
 const h=s.elements.find(e=>e.id==='house');h.w=houseSize.w;h.h=houseSize.h;return enforceGreenhouse(s);
}
// Rezerwy funkcjonalne mogą się stykać/nakładać: dojazd z parkingiem, zadaszenie z tarasem.
export function siteWarnings(s){const es=s.elements,h=es.find(e=>e.id==='house'),g=es.find(e=>e.id==='greenhouse'),out=[];
 for(const e of es.filter(e=>!['house','turn','road','garden'].includes(e.id))){const dx=Math.min(h.x+h.w,e.x+e.w)-Math.max(h.x,e.x),dy=Math.min(h.y+h.h,e.y+e.h)-Math.max(h.y,e.y);if(dx>.01&&dy>.01)out.push(`${e.name}: obrys nachodzi na dom.`);}
 if(Math.abs(greenhouseGap(es)-10)>.01)out.push('Szklarnia: odstęp poziomy od zachodniej elewacji różni się od 10 m.');
 if(g.y+g.h<h.y||g.y>h.y+h.h)out.push('Szklarnia jest poza pasem zachodniej elewacji — 10 m to odstęp poziomy, nie najkrótsza odległość narożników.');
 if(s.entry==='pending')out.push('Strona wjazdu nieustalona: na schemacie dojazd pokazano roboczo od północy.');
 out.push('Brak granic i rzędnych: nie sprawdzono odsunięć od działki, drogi, sąsiadów, zacieniania ani spadków.');
 return out;
}
