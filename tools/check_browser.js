// Wymaga Playwright i Chromium. Uruchom: timeout 60s node tools/check_browser.js
const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.join(__dirname,'..'),server=http.createServer((req,res)=>{
  const name=req.url.split('?')[0].slice(1)||'index.html';
  if(!['index.html','edytor-rzutu.html'].includes(name)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,name)));
 }).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;const errors=[];
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:1600,height:1000},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(e.message));
  const variant=async v=>assert.equal(await page.locator('#sVar').inputValue(),v);
  const find=async id=>{await page.locator('#bFindId').click();await page.locator('#idQuery').fill(id);await page.locator('#idForm button[type=submit]').click();assert.equal(await page.locator('#idDialog').evaluate(d=>d.open),false,id);};
  const state=async v=>JSON.parse(await page.evaluate(v=>localStorage.getItem('ogrodniki-rzut-v29:'+v),v));
  await page.goto(base+'/?variant=R2&source=test#plan');await variant('R2');assert.ok(page.url().includes('source=test#plan'));
  await page.locator('#sVar').selectOption('R3');await variant('R3');assert.equal(new URL(page.url()).searchParams.get('variant'),'R3');
  await page.goBack();await variant('R2');await page.goForward();await variant('R3');
  await page.goto(base+'/');await variant('E2');await page.goto(base+'/?variant=nieznany');await variant('E2');
  // Każdy wariant obsługuje oznaczenia i wyszukanie istniejącego elementu.
  const variants=await page.locator('#sVar option').evaluateAll(options=>options.map(o=>o.value));
  for(const v of variants){await page.locator('#sVar').selectOption(v);await page.locator('#tIds').check();const s=await state(v);await find('S'+s.walls[0].id);assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),v+'-S'+s.walls[0].id);assert.ok(await page.locator('#gIds text').count());}
  // Pełne ID przełącza wariant, skrót pozostaje w bieżącym. Edycja i odczyt nie zmieniają numeru.
  await find('E2-M75');await variant('E2');await page.locator('#pFName').fill('Test trwałego ID');await page.locator('#pFName').press('Tab');
  const oldX=(await state('E2')).furn.find(f=>f.id===75).x;
  await page.locator('#cv').focus();await page.keyboard.press('ArrowRight');assert.equal((await state('E2')).furn.find(f=>f.id===75).x,oldX+50);
  await page.reload();await find('M75');assert.equal(await page.locator('#pFName').inputValue(),'Test trwałego ID');
  await page.locator('[data-copy-id="E2-M75"]').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'E2-M75');
  const e2=await state('E2'),eqParent=e2.furn.find(f=>f.equipment?.length>0),eqId=`E2-M${eqParent.id}-E${eqParent.equipment[0].id}`;
  await find(eqId);assert.ok(await page.locator('#gIds rect').count());await page.locator(`[data-copy-id="${eqId}"]`).click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),eqId);
  const opening=e2.walls.flatMap(w=>w.op).find(o=>o.type==='window');await find('O'+opening.id);await page.locator('#pOType').selectOption('door');assert.equal(await page.locator('[aria-label="ID elementu"]').inputValue(),'E2-O'+opening.id);await page.locator('#pOType').selectOption('window');
  // Niezależne zapisane edycje R2/R3.
  const r2Furniture=(await state('R2')).furn[0].id;
  await find('R2-M'+r2Furniture);await page.locator('#pFName').fill('Własny R2');await page.locator('#pFName').press('Tab');
  await find('R3-M'+r2Furniture);assert.notEqual(await page.locator('#pFName').inputValue(),'Własny R2');await find('R2-M'+r2Furniture);assert.equal(await page.locator('#pFName').inputValue(),'Własny R2');
  // Wyszukiwanie błędnego ID nie przełącza wariantu ani nie usuwa zaznaczenia.
  await page.locator('#bFindId').click();await page.locator('#idQuery').fill('E2-M999999');await page.locator('#idForm button[type=submit]').click();assert.ok((await page.locator('#idError').innerText()).includes('Nie znaleziono'));await variant('R2');await page.keyboard.press('Escape');
  await page.locator('#bFit').click();await page.locator('#tIds').check();await page.screenshot({path:'/tmp/ogrodniki-desktop.png'});
  const pngEvent=page.waitForEvent('download');await page.locator('#bPng').click();const png=await pngEvent;await png.saveAs('/tmp/ogrodniki-export.png');assert.ok(fs.statSync('/tmp/ogrodniki-export.png').size>20000);
  const jsonEvent=page.waitForEvent('download');await page.locator('#bExp').click();const json=await jsonEvent;await json.saveAs('/tmp/ogrodniki-export.json');
  const exported=JSON.parse(fs.readFileSync('/tmp/ogrodniki-export.json'));assert.equal(exported.furn.find(f=>f.id===r2Furniture).name,'Własny R2');
  await page.locator('#fImp').setInputFiles('/tmp/ogrodniki-export.json');await find('M'+r2Furniture);assert.equal(await page.locator('#pFName').inputValue(),'Własny R2');
  // Migracja starego zapisu zachowuje własne zmiany poza pięcioma meblami E2.
  await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('ogrodniki-rzut-v29:E2'));s.furn.find(f=>f.id===75).x+=123;s.furn.find(f=>f.id!==75&&f.key==='k240').name='Własna kuchnia v23';localStorage.setItem('ogrodniki-rzut-v23:E2',JSON.stringify(s));localStorage.removeItem('ogrodniki-rzut-v29:E2');});
  await page.goto(base+'/');await variant('E2');assert.ok((await state('E2')).furn.some(f=>f.name==='Własna kuchnia v23'));assert.ok(await page.evaluate(()=>localStorage.getItem('ogrodniki-rzut-v23:E2')));
  // V24 -> v25: na istniejącym rzucie obraca się wyłącznie wskazana sofa.
  await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('ogrodniki-rzut-v29:E2'));const f=s.furn.find(f=>f.id===75);f.x=685;f.y=6650;f.rot=270;f.name='Moja sofa v24';s.rooms[0].name='Mój salon v24';localStorage.setItem('ogrodniki-rzut-v24:E2',JSON.stringify(s));localStorage.removeItem('ogrodniki-rzut-v29:E2');});
  await page.reload();await find('M75');assert.equal((await state('E2')).furn.find(f=>f.id===75).rot,0);assert.equal(await page.locator('#pFName').inputValue(),'Moja sofa v24');assert.equal((await state('E2')).rooms[0].name,'Mój salon v24');assert.ok(await page.evaluate(()=>localStorage.getItem('ogrodniki-rzut-v24:E2')));
  await find('O5');assert.equal(await page.locator('#pOW').inputValue(),'1200');
  await find('M73');assert.equal(await page.locator('#pFW').inputValue(),'1700');assert.equal(await page.locator('#pFD').inputValue(),'900');
  await page.locator('#bFit').click();await page.screenshot({path:'/tmp/e2-u-desktop.png'});
  await context.close();
  const mobile=await browser.newContext({viewport:{width:412,height:915},isMobile:true,hasTouch:true});
  const phone=await mobile.newPage();phone.setDefaultTimeout(5000);phone.on('pageerror',e=>errors.push(e.message));
  await phone.goto(base+'/?variant=R3');assert.equal(await phone.locator('#sVar').inputValue(),'R3');await phone.locator('#tIds').check();
  assert.ok(await phone.locator('#bView').evaluate(b=>b.classList.contains('on')));assert.equal(await phone.locator('#side').isVisible(),false);
  assert.ok(await phone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const before=await phone.locator('#cv').getAttribute('viewBox');
  await phone.locator('#cv').evaluate(svg=>{for(const [type,x,y] of [['pointerdown',220,450],['pointermove',270,480],['pointerup',270,480]])svg.dispatchEvent(new PointerEvent(type,{pointerId:11,pointerType:'touch',isPrimary:true,clientX:x,clientY:y,bubbles:true,buttons:type==='pointerup'?0:1}));});
  assert.notEqual(await phone.locator('#cv').getAttribute('viewBox'),before);
  await phone.locator('#bFit').click();await phone.screenshot({path:'/tmp/ogrodniki-phone.png'});
  await phone.locator('#bFindId').click();await phone.locator('#idQuery').fill('E2-M75');await phone.locator('#idForm button[type=submit]').click();assert.equal(await phone.locator('[aria-label="ID elementu"]').inputValue(),'E2-M75');assert.equal(await phone.locator('#side').isVisible(),true);
  await phone.locator('#tIds').check();await phone.screenshot({path:'/tmp/ogrodniki-phone-selected.png'});
  const mobilePngEvent=phone.waitForEvent('download');await phone.locator('#bPng').click();await (await mobilePngEvent).saveAs('/tmp/ogrodniki-phone-export.png');
  await mobile.close();assert.deepEqual(errors,[]);
  console.log('BROWSER_OK: linki, historia, wszystkie warianty i ID, wyszukiwanie, schowek, zapis/import/migracja, eksport PNG, telefon 412 px i dotyk');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
