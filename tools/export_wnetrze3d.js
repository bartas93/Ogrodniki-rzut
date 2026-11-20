// Wyłącznie publiczna geometria z konstruktora; bez lokalnych edycji i instalacji.
const fs=require('node:fs'),path=require('node:path');
(async()=>{const {cleanInterior}=await import('../wnetrze3d-model.mjs');const h=cleanInterior(require('./editor_model')().state());fs.writeFileSync(path.join(__dirname,'..','wnetrze3d-baza.json'),JSON.stringify(h,null,2)+'\n');console.log('INTERIOR_BASE_OK',h.rooms.length,'pomieszczeń,',h.furn.length,'mebli');})().catch(e=>{console.error(e);process.exitCode=1;});
