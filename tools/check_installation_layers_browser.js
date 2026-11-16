const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const mobile=process.argv.includes('mobile');
(async()=>{
 const root=path.join(__dirname,'..'),server=http.createServer((req,res)=>{
  const name=req.url.split('?')[0].slice(1)||'index.html';if(!['index.html','edytor-rzutu.html'].includes(name)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,name)));
 }).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext(mobile?{viewport:{width:412,height:915},isMobile:true,hasTouch:true}:{viewport:{width:1600,height:1000}});
  const old=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/e2-v36.json')));old.furn[0].name='Własna kuchnia';old.installations.find(i=>i.tag==='KZ').userNotes='Zachować filtr';
  await context.addInitScript(state=>{if(!localStorage.getItem('ogrodniki-rzut-v36:E2'))localStorage.setItem('ogrodniki-rzut-v36:E2',JSON.stringify(state));},old);
  const page=await context.newPage(),errors=[];page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(e.message));
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ogrodniki-rzut-v37:E2')));
  const find=async id=>{await page.locator('#bFindId').click();await page.locator('#idQuery').fill(id);await page.locator('#idForm button[type=submit]').click();assert.equal(await page.locator('#idDialog').evaluate(d=>d.open),false,id);};
  await page.goto('http://127.0.0.1:'+server.address().port+'/');
  const initial=await state(),geometry=s=>JSON.stringify([s.walls,s.rooms,s.furn]),original=geometry(initial),reference=await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16'));
  assert.equal(initial.installationRevision,2);assert.equal(initial.furn[0].name,'Własna kuchnia');assert.equal(initial.installations.find(i=>i.tag==='KZ').userNotes,'Zachować filtr');
  for(const id of ['bHydraulics','bUnderfloor','bElectrical']){const b=await page.locator('#'+id).boundingBox();assert.ok(b.x>=0&&b.x+b.width<=await page.evaluate(()=>innerWidth));}
  await page.locator('#bOnlyInstallations').click();await page.locator('#bInstallations').click();
  await page.locator('#bHydraulics').click();assert.ok(await page.locator('#gInstallations [data-i]').count());assert.equal(await page.locator('#bHydraulics').getAttribute('aria-pressed'),'true');
  await page.locator('#bHydraulics').click();assert.equal(await page.locator('#gInstallations [data-i]').count(),0);
  await page.locator('#bUnderfloor').click();assert.equal(await page.locator('[data-heat-zone]').count(),12);
  await page.screenshot({path:'/tmp/underfloor-'+(mobile?'mobile':'desktop')+'.png'});
  await page.locator('#bUnderfloor').click();assert.equal(await page.locator('[data-heat-zone]').count(),0);
  await page.locator('#bElectrical').click();
  const sw=initial.installations.find(i=>i.tag==='W61'),main=initial.installations.find(i=>i.tag==='L61'),other=initial.installations.find(i=>i.tag==='L60');
  await find('W61');assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),'E2-I'+sw.id);assert.equal(await page.locator('.control-channel').count(),2);
  assert.equal(await page.locator('[data-control-link]').count(),2);await page.locator('#focusLighting').click();
  assert.ok((await page.locator('#props').innerText()).includes('L-LUST1'));
  await page.screenshot({path:'/tmp/lighting-controls-'+(mobile?'mobile':'desktop')+'.png'});
  // Jednoznaczna edycja kanału A; kanał lustra pozostaje bez zmian.
  await page.locator('.light-picker summary').first().click();await page.locator(`[data-control-channel="0"][data-control-light="${main.id}"]`).uncheck();
  await page.locator('.light-picker summary').first().click();await page.locator(`[data-control-channel="0"][data-control-light="${other.id}"]`).check();
  await page.reload();await find('E2-W61');const changed=(await state()).installations.find(i=>i.id===sw.id);assert.deepEqual(changed.channels[0].lightIds,[other.id]);assert.deepEqual(changed.channels[1].lightIds,sw.channels[1].lightIds);
  await find('L60');assert.ok((await page.locator('#props').innerText()).includes('W61'));assert.ok((await page.locator('#props').innerText()).includes('W60'));
  await find('W61');await page.locator('#focusLighting').click();
  if(mobile){await page.locator('#bPanel').click();await page.locator(`#gInstallations rect[data-i="${sw.id}"]`).tap();assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),'E2-I'+sw.id);}
  // Eksport zachowuje zaznaczone powiązania mimo usunięcia zwykłych uchwytów zaznaczenia.
  await page.evaluate(()=>{const original=XMLSerializer.prototype.serializeToString;XMLSerializer.prototype.serializeToString=function(node){const text=original.call(this,node);window.exportedSvg=text;return text;};});
  const d=page.waitForEvent('download');await page.locator('#bPng').click();const png=await d;await png.saveAs('/tmp/lighting-export-'+(mobile?'mobile':'desktop')+'.png');
  assert.ok((await page.evaluate(()=>window.exportedSvg)).includes('data-control-link='));
  const e=page.waitForEvent('download');await page.locator('#bExp').click();const json=await e,file='/tmp/lighting-'+(mobile?'mobile':'desktop')+'.json';await json.saveAs(file);
  assert.deepEqual(JSON.parse(fs.readFileSync(file)).installations.find(i=>i.id===sw.id).channels[0].lightIds,[other.id]);
  await page.locator('#fImp').setInputFiles(file);await find('W61');assert.deepEqual((await state()).installations.find(i=>i.id===sw.id).channels[0].lightIds,[other.id]);
  assert.equal(geometry(await state()),original);assert.equal(await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16')),reference);
  await find('CAM1');assert.ok((await page.locator('#props').innerText()).includes('PoE'));await find('BRAMA');assert.ok((await page.locator('#props').innerText()).includes('fotokomórek'));
  assert.ok((await page.locator('.service-coverage').textContent()).includes('Smart home'));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await find('L-LUST1');await page.locator('#cv').focus();await page.keyboard.press('Delete');await find('W61');
  assert.ok((await page.locator('#props').innerText()).includes('Brak lampy'));await page.locator('[data-remove-light]').click();
  assert.deepEqual((await state()).installations.find(i=>i.id===sw.id).channels[1].lightIds,[]);
  assert.equal(geometry(await state()),original);
  assert.deepEqual(errors,[]);console.log('INSTALLATION_LAYERS_BROWSER_OK '+(mobile?'mobile':'desktop')+': warstwy, podłogówka, przypisania i edycja włączników, dotyk, migracja, JSON/PNG i zakres dodatkowych instalacji');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
