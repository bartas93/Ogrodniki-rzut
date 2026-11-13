const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
module.exports=function model(saved=new Map()){
 const source=fs.readFileSync(path.join(__dirname,'..','edytor-rzutu.html'),'utf8').split('<script>')[1].split('/* ---------- widok ---------- */')[0];
 const c=vm.createContext({document:{querySelector:()=>null},localStorage:{getItem:k=>saved.get(k)||null}});
 vm.runInContext(source+`globalThis.api={state:()=>S,fresh:freshState,load:loadSavedVariant,body:furnBodies,zones:furnZones,geom,doors:auditDoors,metrics:doorMetrics,analyse,arrange:setArrangement,revise:reviseE2KitchenAndDoors,replaceLaundry:replaceLaundryBillyWithPax,fixNiches:fixE2NicheMounting,front:(f,e)=>fT(f)(e.x+e.w/2,e.y+e.d)};})();`,c,{timeout:5000});return c.api;
};
