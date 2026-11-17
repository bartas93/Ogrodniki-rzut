// Porównania koncepcyjne, jednostki jawne; bez doboru rur i urządzeń.
export const PLAN_KEY='ogrodniki-instalacje-plan-v1';
export function pipeVolume(lengthM,insideMm){return Math.PI*(insideMm/1000)**2/4*lengthM*1000;}
export function compareWater({length,diameter,flow,starts,delta,loopLength,loss,pump,hours}){
  const a=[length,diameter,flow,starts,delta,loopLength,loss,pump,hours];
  if(a.some(v=>typeof v!=='number'||!Number.isFinite(v)||v<0)||diameter===0||flow===0||hours>24)throw new Error('Sprawdź liczby: średnica i przepływ muszą być dodatnie, czas 0–24 h.');
  const liters=pipeVolume(length,diameter),thermal=liters*delta*4.186/3600;
  return {liters,seconds:liters/flow*60,waterDay:liters*starts,cooledHeatDay:thermal*starts,circulationHeatDay:loopLength*loss*hours/1000,pumpElectricDay:pump*hours/1000};
}
export function balance(rows){
  let supply=0,extract=0,missing=0;
  for(const row of rows){if(row.value===''||row.value==null){missing++;continue;}const n=Number(row.value);if(!Number.isFinite(n)||n<0)throw new Error('Strumienie muszą być nieujemne.');if(row.type==='N')supply+=n;else extract+=n;}
  return {supply,extract,missing,difference:supply-extract};
}
export function numeric(value,min,max){if(value==='')return '';const n=Number(value);if(!Number.isFinite(n)||n<min||n>max)throw new Error('Liczba poza zakresem.');return n;}
