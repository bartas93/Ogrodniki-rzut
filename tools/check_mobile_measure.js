// Regresja miarki dotykowej. Wymaga Playwright i Chromium.
// Uruchom: timeout 60s node tools/check_mobile_measure.js
const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.join(__dirname,'..'),server=http.createServer((req,res)=>{
  const name=req.url.split('?')[0].slice(1)||'index.html';
  if(!['index.html','edytor-rzutu.html'].includes(name)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,name)));
 }).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 let browser;const errors=[];
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:412,height:915},isMobile:true,hasTouch:true});
  const page=await context.newPage();page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/');
  const original=await page.evaluate(()=>localStorage.getItem('ogrodniki-rzut-v29:E2'));
  // Powiększ sofę przez wyszukiwarkę. Jej krawędź ma znaną długość 970 mm.
  await page.locator('#bFindId').click();await page.locator('#idQuery').fill('E2-M75');await page.locator('#idForm button[type=submit]').click();
  await page.locator('#bPanel').click();await page.locator('[data-tool="measure"]').click();
  const points=async()=>page.locator('#cv').evaluate(svg=>{
   const f=svg.querySelector('[data-f="75"]'),x=+f.getAttribute('x'),y=+f.getAttribute('y'),w=+f.getAttribute('width'),h=+f.getAttribute('height'),m=svg.getScreenCTM();
   const screen=(x,y)=>{const p=new DOMPoint(x,y).matrixTransform(m);return {x:p.x,y:p.y};};return {a:screen(x,y),b:screen(w<=h?x+w:x,w<=h?y:y+h),width:Math.min(w,h)};
  });
  const tap=async p=>page.touchscreen.tap(p.x,p.y);
  let p=await points();assert.equal(p.width,970);
  await tap(p.a);await tap(p.b);
  // To ujawnia poprzedni błąd: Podgląd nie pozwalał utworzyć żadnego pomiaru.
  assert.equal(await page.locator('[data-mdel]').count(),1,'Dwa stuknięcia muszą utworzyć pomiar w trybie Podgląd');
  assert.ok((await page.locator('#props').innerText()).includes('970 mm'));
  assert.equal(await page.locator('#side').isVisible(),false,'Miarka nie otwiera automatycznie panelu');
  assert.equal(await page.locator('#measureBar').isVisible(),true);
  assert.ok((await page.locator('#mStatus').innerText()).includes('970 mm'));
  // Pierwszy punkt przeżywa przesuwanie i zoom; nawigacja nie dodaje pomiarów.
  await page.locator('#mClear').click();await tap((await points()).a);
  const before=await page.locator('#cv').getAttribute('viewBox');
  const drag=async()=>page.locator('#cv').evaluate(svg=>{
   for(const [type,x,y] of [['pointerdown',220,400],['pointermove',250,420],['pointerup',250,420]])svg.dispatchEvent(new PointerEvent(type,{pointerId:31,pointerType:'touch',isPrimary:true,clientX:x,clientY:y,bubbles:true,buttons:type==='pointerup'?0:1}));
  });
  await drag();assert.notEqual(await page.locator('#cv').getAttribute('viewBox'),before);assert.equal(await page.locator('[data-mdel]').count(),0);
  assert.equal(await page.locator('#mCancel').isEnabled(),true);
  // Dwa prawdziwe palce w Chromium (bez wstrzykiwania stanu aplikacji).
  const cdp=await context.newCDPSession(page),vb=await page.locator('#cv').getAttribute('viewBox');
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:180,y:410,id:0},{x:260,y:410,id:1}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:160,y:410,id:0},{x:280,y:410,id:1}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  assert.notEqual(await page.locator('#cv').getAttribute('viewBox'),vb);
  assert.equal(await page.locator('[data-mdel]').count(),0);assert.equal(await page.locator('#mCancel').isEnabled(),true);
  await tap((await points()).b);assert.equal(await page.locator('[data-mdel]').count(),1);assert.ok((await page.locator('#mStatus').innerText()).includes('970 mm'));
  // Niewielkie drżenie palca pozostaje stuknięciem i nie przesuwa widoku.
  await page.locator('#mClear').click();p=await points();const still=await page.locator('#cv').getAttribute('viewBox');
  await page.locator('#cv').evaluate((svg,a)=>{
   for(const [type,dx] of [['pointerdown',0],['pointermove',2],['pointerup',0]])svg.dispatchEvent(new PointerEvent(type,{pointerId:32,pointerType:'touch',isPrimary:true,clientX:a.x+dx,clientY:a.y,bubbles:true,buttons:type==='pointerup'?0:1}));
  },p.a);
  assert.equal(await page.locator('#cv').getAttribute('viewBox'),still);assert.equal(await page.locator('#mCancel').isEnabled(),true);
  await page.locator('#mCancel').click();assert.equal(await page.locator('#mCancel').isEnabled(),false);assert.equal(await page.locator('[data-mdel]').count(),0);
  // Anulowany dotyk oraz pinch zaczęty przed punktem A niczego nie zatwierdzają.
  await page.locator('#cv').evaluate(svg=>{
   for(const type of ['pointerdown','pointercancel','pointerup'])svg.dispatchEvent(new PointerEvent(type,{pointerId:33,pointerType:'touch',isPrimary:true,clientX:230,clientY:350,bubbles:true,buttons:type==='pointerdown'?1:0}));
  });
  assert.equal(await page.locator('#mCancel').isEnabled(),false);
  // Miarka działa również po wyłączeniu Podglądu, bez ruszania mebla.
  await page.locator('#bView').click();p=await points();await tap(p.a);await tap(p.b);assert.equal(await page.locator('[data-mdel]').count(),1);assert.ok((await page.locator('#mStatus').innerText()).includes('970 mm'));
  assert.equal(await page.evaluate(()=>localStorage.getItem('ogrodniki-rzut-v29:E2')),original);
  await page.screenshot({path:'/tmp/ogrodniki-mobile-measure.png'});
  // Wyczyść działa bez klawiatury; wyjście z miarki chowa jej pasek.
  await page.locator('#mClear').click();assert.equal(await page.locator('[data-mdel]').count(),0);
  await page.locator('[data-tool="select"]').click();assert.equal(await page.locator('#measureBar').isVisible(),false);
  // Zwykłe kliknięcia myszą nadal mierzą.
  const desktop=await browser.newPage({viewport:{width:1400,height:900}});desktop.on('pageerror',e=>errors.push(e.message));await desktop.goto('http://127.0.0.1:'+server.address().port+'/');await desktop.locator('[data-tool="measure"]').click();
  const r=await desktop.locator('#cv').boundingBox();await desktop.mouse.click(r.x+r.width*.4,r.y+r.height*.4);await desktop.mouse.click(r.x+r.width*.6,r.y+r.height*.4);assert.equal(await desktop.locator('[data-mdel]').count(),1);
  await desktop.close();await context.close();assert.deepEqual(errors,[]);
  console.log('MOBILE_MEASURE_OK: dwa stuknięcia, przyciąganie 970 mm, Podgląd/edycja, pan, pinch, drżenie palca, anulowanie, kasowanie, brak zmian projektu i mysz');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
