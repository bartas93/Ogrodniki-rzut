// Dane z publicznych kart producenta/sprzedawcy, sprawdzone 12.11.2026.
// Karta produktu nie oznacza potwierdzenia stanu w wybranym sklepie.
const product=(name,path,ean,dims)=>({name,url:'https://www.castorama.pl/'+path+'/'+ean+'_CAPL.prd',ean,dims});
export const PRODUCTS={
 base30:product('Caraway — korpus dolny 30 cm','korpus-szafki-kuchennej-dolnej-goodhome-caraway-30-cm','3663602637417','30×57×72 cm; z nóżkami 15 cm: 87 cm'),
 base50:product('Caraway — korpus dolny 50 cm','korpus-szafki-kuchennej-dolnej-goodhome-caraway-50-cm','3663602637448','50×57×72 cm; z nóżkami 15 cm: 87 cm'),
 base60:product('Caraway — korpus dolny 60 cm','korpus-szafki-kuchennej-dolnej-goodhome-caraway-60-cm','3663602637455','60×57×72 cm; z nóżkami 15 cm: 87 cm'),
 base80:product('Caraway — korpus dolny 80 cm','korpus-szafki-kuchennej-dolnej-goodhome-caraway-80-cm','3663602637462','80×57×72 cm; z nóżkami 15 cm: 87 cm'),
 tall:product('Caraway — panele do wysokiego słupka AGD','panele-do-slupka-wysokiego-agd-goodhome-caraway','3663602637905','panelem bazowym jest bok 219×57 cm; płyta 18 mm, komplet do uzupełnienia'),
 drawer60:product('Soto — szuflada standard 60 cm','korpus-szuflady-goodhome-soto-60-cm-antracyt','3663602479161','głębokość 45 cm; szerokość zewnętrzna 56,4 cm; wysokość 10,8 cm'),
 deep60:product('Soto — szuflada głęboka 60 cm','korpus-szuflady-glebokiej-goodhome-soto-60-cm-antracyt','3663602479277','głębokość 45 cm; szerokość zewnętrzna 56,4 cm; wysokość boku 19 cm'),
 cargo30:product('Pebre — dolne cargo 30 cm, 2 poziomy','kosz-cargo-goodhome-pebre-30-cm','3663602480150','26,4×48,6×48,4 cm; do korpusu 30 cm'),
};
export function supplierFor(m){
 if(m.kind==='counter')return {status:'Wyposażenie własne',products:[],note:'Gabaryty ekspresu, czajnika i Thermomixa dopasuj do posiadanych modeli.'};
 if(m.kind==='blind')return {status:'Blenda / element do dopasowania',products:[],note:'Ślepy narożnik zamknięty panelem. Nie dodajemy tu pojemności nieistniejącej szafki.'};
 if(m.kind==='shallow')return {status:'Na wymiar — głębokość 30 cm',products:[],note:'To nie jest gotowy korpus Caraway. Zachowanie wyspy 90 cm wymaga płytkiego tyłu na wymiar albo rezygnacji z tych schowków. Standardowe korpusy wiszące nie są automatycznym zamiennikiem.'};
 if(m.kind==='pantry')return {status:'Do dopasowania — słupek 40 cm',products:[],note:'Nie potwierdzono gotowego kompletnego słupka Caraway 40 cm dla tego miejsca. Rysunek zachowuje rezerwację z rzutu; potrzebny dobór rozwiązania lub wykonanie na wymiar. Nie jest to pozycja gotowa do zakupu.'};
 if(m.kind==='oven'||m.kind==='fridge')return {status:'Caraway — słupek składany',products:[PRODUCTS.tall],note:'Panele 219 cm + nogi 15 cm dają wstępnie 234 cm. To nie kompletny słupek: dobierz półki, fronty, blendy, mocowania i wentylację według instrukcji AGD.'};
 if(m.kind==='dishwasher')return {status:'Wnęka AGD 60 cm',products:[],note:'Zmywarka ma wnękę i front, bez dodatkowego korpusu dolnego. Dobierz front i mocowanie do urządzenia.'};
 const base=PRODUCTS['base'+m.w/10];return {status:base?'Caraway — korpus katalogowy':'Do doboru',products:base?[base]:[],note:'Rezerwacja w rzucie ma 60 cm głębokości. Korpus 57 cm pozostawia miejsce na front i montaż. Podział frontów i wyposażenie wewnętrzne dobierz osobno; nie każdy mechanizm jest dostępny w każdej szerokości.'};
}
export function mechanismProducts(m,type){if(type==='cargo'&&m.w===300)return [PRODUCTS.cargo30];if(m.w===600&&['drawers2','drawers3','hobdrawers','inner'].includes(type))return [PRODUCTS.drawer60,PRODUCTS.deep60];return [];}
