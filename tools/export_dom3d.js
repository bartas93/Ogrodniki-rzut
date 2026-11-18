// Publiczna baza zawiera wyłącznie geometrię koncepcji domu, bez danych działki.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
(async()=>{const {cleanHouse}=await import('../dom3d-model.mjs'),h=cleanHouse(require('./editor_model')().state());const text=JSON.stringify(h,null,2)+'\n';fs.writeFileSync(path.join(__dirname,'..','dom3d-baza.json'),text);console.log('DOM3D_BASE_OK '+crypto.createHash('sha256').update(text).digest('hex'));})().catch(e=>{console.error(e);process.exitCode=1;});
