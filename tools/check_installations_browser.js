// Powtarzalny test nowych przepływów: komputer i emulowany telefon.
const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const mobile=process.argv.includes('mobile');
(async()=>{
 const root=path.join(__dirname,'..'),server=http.createServer((req,res)=>{
  const name=req.url.split('?')[0].slice(1)||'index.html';if(!['index.html','edytor-rzutu.html'].includes(name)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,name)));
 }).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext(mobile?{viewport:{width:412,height:915},isMobile:true,hasTouch:true}:{viewport:{width:1600,height:1000},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage(),errors=[];page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:'+server.address().port,ref='E2REF20261116';
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ogrodniki-rzut-v37:E2')));
  const find=async id=>{await page.locator('#bFindId').click();await page.locator('#idQuery').fill(id);await page.locator('#idForm button[type=submit]').click();assert.equal(await page.locator('#idDialog').evaluate(d=>d.open),false,id);};
  await page.goto(url+'/');const initial=await state();assert.ok(initial.installations.length>100);
  assert.ok(await page.locator('#gInstallations [data-i]').count());
  const geometry=s=>JSON.stringify([s.walls,s.rooms,s.furn]),originalGeometry=geometry(initial),originalAudit=await page.locator('#kvPass').innerText();
  await page.locator('#bFurniture').click();assert.equal(await page.locator('#gFurn [data-f]').count(),0);
  assert.equal(await page.locator('#bFurniture').getAttribute('aria-pressed'),'false');
  assert.equal(await page.locator('#kvPass').innerText(),originalAudit,'ukrywanie mebli nie wyłącza ich z kontroli');
  await page.locator('[data-tool="furn"]').click();
  await page.locator('#bOnlyInstallations').click();assert.equal(await page.locator('#gFurn').innerHTML(),'');
  assert.equal(await page.locator('[data-tool="select"]').evaluate(b=>b.classList.contains('on')),true);
  for(const id of ['gRoof','gLabels','gPass','gRoomFill'])assert.equal(await page.locator('#'+id).innerHTML(),'');
  assert.ok((await page.locator('#gInstallations [data-i]').count())>100);
  assert.equal(geometry(await state()),originalGeometry);
  assert.ok(Object.values((await state()).ui.serviceSystems).every(Boolean));
  await page.reload();assert.equal(await page.locator('#gFurn').innerHTML(),'');
  await page.locator('#bInstallations').click();assert.equal(await page.locator('#gInstallations').innerHTML(),'');
  await page.locator('#bShowAll').click();assert.ok(await page.locator('#gFurn [data-f]').count());
  assert.ok((await page.locator('#gInstallations [data-i]').count())>100);
  assert.equal(await page.locator('#bFurniture').getAttribute('aria-pressed'),'true');
  assert.equal(geometry(await state()),originalGeometry);assert.equal(await page.locator('#kvPass').innerText(),originalAudit);
  // Wszystkie przyciski są osiągalne na telefonie bez poziomego przewijania paska.
  for(const id of ['bFurniture','bInstallations','bOnlyInstallations','bShowAll']){
    const box=await page.locator('#'+id).boundingBox();assert.ok(box.x>=0&&box.x+box.width<=await page.evaluate(()=>innerWidth));
  }
  await page.screenshot({path:'/tmp/layer-buttons-'+(mobile?'mobile':'desktop')+'.png'});
  if(mobile)await page.locator('#bPanel').click();
  await page.locator('#servicesAll').click();assert.ok((await page.locator('#gInstallations [data-i]').count())>100);
  await page.locator('#servicesVent').click();await page.locator('[data-system="water"]').check();
  const i=initial.installations.find(i=>i.tag==='KZ'&&i.system==='water'),full='E2-I'+i.id;
  await find(full);assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),full);
  await page.locator('#pINotes').fill('Własne ustalenie przyłącza');await page.locator('#pINotes').press('Tab');
  await page.locator('#pIX').fill('150');await page.locator('#pIX').press('Tab');
  await page.reload();await find(full);assert.equal(await page.locator('#pINotes').inputValue(),'Własne ustalenie przyłącza');assert.equal(await page.locator('#pIX').inputValue(),'150');
  await page.locator('#bInstallations').click();assert.equal(await page.locator('#gInstallations [data-i]').count(),0);
  await find(full);assert.ok(await page.locator('#gInstallations [data-i]').count());
  await page.locator('#bFit').click();if(mobile)await page.locator('#bPanel').click();
  await page.screenshot({path:'/tmp/installations-'+(mobile?'mobile':'desktop')+'.png'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  // Na telefonie punkt instalacji można wybrać zwykłym stuknięciem w trybie Podgląd.
  if(mobile){
    await find(full);await page.locator('#bPanel').click();
    const circle=page.locator('#gInstallations circle[data-i="'+i.id+'"]');await circle.tap();
    assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),full);assert.equal(await page.locator('#side').isVisible(),true);
  }
  const e=page.waitForEvent('download');await page.locator('#bExp').click();const json=await e,dest='/tmp/installations-'+(mobile?'mobile':'desktop')+'.json';await json.saveAs(dest);
  const exported=JSON.parse(fs.readFileSync(dest));assert.equal(exported.installations.find(x=>x.id===i.id).userNotes,'Własne ustalenie przyłącza');
  const frozen=await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16'));
  await page.locator('#sVar').selectOption(ref);assert.equal(await page.locator('#bInstallations').isVisible(),false);
  assert.equal(await page.locator('#bReset').isDisabled(),true);await find(ref+'-M75');assert.ok((await page.locator('#props').innerText()).includes('tylko odczyt'));
  assert.equal(await page.locator('#pFW').count(),0);await page.locator('#cv').focus();await page.keyboard.press('Delete');await page.keyboard.press('ArrowRight');await page.keyboard.press('r');
  assert.equal(await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16')),frozen);
  await page.reload();await find(ref+'-M75');assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),ref+'-M75');
  await page.locator('[data-tool="measure"]').click();assert.equal(await page.locator('#measureBar').isVisible(),true);
  await page.locator('#bFit').click();await page.screenshot({path:'/tmp/reference-'+(mobile?'mobile':'desktop')+'.png'});
  await page.locator('#sVar').selectOption('E2');await find('M75');await page.locator('#pFName').fill('Późniejsza zmiana');await page.locator('#pFName').press('Tab');
  await find(full);assert.equal(await page.locator('#pINotes').inputValue(),'Własne ustalenie przyłącza');
  await page.locator('#sVar').selectOption(ref);assert.equal(await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16')),frozen);
  await page.goto(url+'/');assert.equal(await page.locator('#sVar').inputValue(),'E2');
  await page.locator('#fImp').setInputFiles(dest);await find(full);assert.equal(await page.locator('#pIX').inputValue(),'150');
  await page.locator('#bFit').click();const download=page.waitForEvent('download');await page.locator('#bPng').click();const png=await download;const pngPath='/tmp/installations-export-'+(mobile?'mobile':'desktop')+'.png';await png.saveAs(pngPath);assert.ok(fs.statSync(pngPath).size>20000);
  assert.deepEqual(errors,[]);console.log('INSTALLATIONS_BROWSER_OK '+(mobile?'mobile':'desktop')+': filtry, dotyk, ID, edycja, zapis, import/eksport i niezmienny snapshot');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
