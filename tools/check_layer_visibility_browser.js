const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const mobile=process.argv.includes('mobile');
(async()=>{
 const root=path.join(__dirname,'..'),server=http.createServer((req,res)=>{
  const file=req.url.split('?')[0].slice(1)||'index.html';if(!['index.html','edytor-rzutu.html'].includes(file)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,file)));
 }).listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext(mobile?{viewport:{width:412,height:915},hasTouch:true,isMobile:true}:{viewport:{width:1600,height:1000}});
  const page=await context.newPage(),errors=[];page.setDefaultTimeout(5000);page.on('pageerror',e=>errors.push(e.message));
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ogrodniki-rzut-v37:E2')));
  await page.goto('http://127.0.0.1:'+server.address().port+'/');const initial=await state(),lookup=new Map(initial.installations.map(i=>[i.id,i]));
  const original=JSON.stringify([initial.walls,initial.rooms,initial.furn,initial.installations]),archive=await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16'));
  const shown=async()=>page.locator('#gInstallations [data-i]').evaluateAll(nodes=>[...new Set(nodes.map(n=>+n.dataset.i))]);
  const systems=async()=>[...new Set((await shown()).map(id=>lookup.get(id).system))].sort();
  await page.locator('#serviceView').selectOption('hydraulics');
  assert.deepEqual(await systems(),['heating','sewage','water']);assert.equal(await page.locator('#gFurn').innerHTML(),'');
  assert.equal(await page.locator('#bInstallations').innerText(),'Wentylacja');assert.equal(await page.locator('#bInstallations').getAttribute('aria-pressed'),'false');
  assert.equal(await page.locator('#bOtherServices').getAttribute('aria-pressed'),'false');assert.equal(await page.locator('#electricalLegend').isVisible(),false);
  assert.equal(await page.locator('[data-lv="Instalacje"]').isChecked(),false);assert.equal(await page.locator('[data-lv="Hydraulika"]').isChecked(),true);
  const hydraulics=await shown();await page.locator('#bInstallations').click();assert.ok((await systems()).includes('ventilation'));
  await page.locator('#bInstallations').click();assert.deepEqual(await shown(),hydraulics);assert.equal(await page.locator('#bHydraulics').getAttribute('aria-pressed'),'true');
  await page.locator('#bOtherServices').click();assert.ok((await systems()).includes('data'));assert.ok((await systems()).includes('water'));
  await page.locator('#bOtherServices').click();assert.deepEqual(await shown(),hydraulics);
  await page.reload();assert.deepEqual(await shown(),hydraulics);assert.equal(await page.locator('#serviceView').inputValue(),'hydraulics');
  await page.screenshot({path:'/tmp/hydraulics-only-'+(mobile?'mobile':'desktop')+'.png'});
  await page.locator('#serviceView').selectOption('none');await page.locator('#bOtherServices').click();assert.deepEqual(await systems(),['data','reserves']);
  await page.locator('#bInstallations').click();await page.locator('#bOtherServices').click();assert.deepEqual(await systems(),['ventilation']);
  await page.locator('#serviceView').selectOption('electrical');assert.deepEqual(await systems(),['power']);
  assert.equal(await page.locator('#electricalLegend').isVisible(),true);assert.equal(await page.locator('#electricalLegend [data-legend-type]').count(),10);
  const colors=await page.locator('#electricalLegend [data-legend-color]').evaluateAll(nodes=>nodes.map(n=>n.dataset.legendColor));assert.equal(new Set(colors).size,10);
  assert.ok(await page.locator('#electricalLegend [data-legend-type="route"] path').getAttribute('stroke-dasharray'));
  const expected=[['L61','#a56800'],['W60','#1769aa'],['W61','#7b2cbf'],['W59','#bd1854'],['LOD','#237a3b'],['G63','#00818b'],['G-BIU1','#455bc0'],['W-RO2','#79512b'],['PŁ','#bb3425'],['EL0','#57616d']];
  for(const [tag,color] of expected){const i=initial.installations.find(i=>i.system==='power'&&i.tag===tag);assert.ok(i,tag);const node=page.locator(`#gInstallations circle[data-i="${i.id}"],#gInstallations rect[data-i="${i.id}"],#gInstallations polyline[data-i="${i.id}"]`).first();assert.equal(await node.getAttribute('stroke'),color,tag);}
  const svgBox=await page.locator('#cv').boundingBox(),legendBox=await page.locator('#electricalLegend').boundingBox();assert.ok(legendBox.y>=svgBox.y+svgBox.height-1,'legenda nie zasłania rzutu');
  await page.locator('[data-tool="measure"]').click();
  const measureBox=await page.locator('#measureBar').boundingBox(),legendWithMeasure=await page.locator('#electricalLegend').boundingBox();assert.ok(measureBox.y+measureBox.height<=legendWithMeasure.y,'miarka i legenda nie nachodzą na siebie');
  await page.locator('[data-tool="select"]').click();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'/tmp/electrical-colors-'+(mobile?'mobile':'desktop')+'.png'});
  await page.evaluate(()=>{const fn=XMLSerializer.prototype.serializeToString;XMLSerializer.prototype.serializeToString=function(n){return window.lastExport=fn.call(this,n);};});
  const download=page.waitForEvent('download');await page.locator('#bPng').click();const png=await download;await png.saveAs('/tmp/electrical-colors-export-'+(mobile?'mobile':'desktop')+'.png');
  assert.ok((await page.evaluate(()=>window.lastExport)).includes('data-electrical-legend="true"'));assert.ok(fs.statSync('/tmp/electrical-colors-export-'+(mobile?'mobile':'desktop')+'.png').size>20000);
  await page.locator('#bShowAll').click();assert.ok(await page.locator('#gFurn [data-f]').count());assert.equal((await systems()).length,8);
  const final=await state();assert.equal(JSON.stringify([final.walls,final.rooms,final.furn,final.installations]),original);assert.equal(await page.evaluate(()=>localStorage.getItem('ogrodniki-reference-2026-11-16')),archive);
  await page.locator('#sVar').selectOption('E2REF20261116');assert.equal(await page.locator('#electricalLegend').isVisible(),false);
  assert.deepEqual(errors,[]);console.log('LAYER_VISIBILITY_BROWSER_OK '+(mobile?'mobile':'desktop')+': niezależne branże, tylko hydraulika, 10 kolorów, legenda poza rzutem, PNG, zapis i niezmienne dane');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
