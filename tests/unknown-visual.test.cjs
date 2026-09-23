'use strict';
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:process.env.TTC_BROWSER_CHANNEL || 'msedge'});
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await context.route('**/*',route=>{
    const u=new URL(route.request().url());
    if(['127.0.0.1','localhost'].includes(u.hostname)||u.protocol==='data:')return route.continue();
    return route.fulfill({status:200,body:'',contentType:route.request().resourceType()==='script'?'application/javascript':'text/plain'});
  });
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('[data-key="genre"][data-value="homme"]').click();
  await page.locator('#next-1').click();
  await page.locator('[data-key="age"][data-value="26-35"]').click();
  await page.locator('#next-2').click();
  await page.locator('[data-key="budget"][data-value="20-50"]').click();
  await page.locator('#next-3').click();
  const unknown=page.locator('.interest-btn[data-value="unknown"]');
  for(let i=0;i<15;i++){
    const r=await unknown.boundingBox();
    if(r&&r.y>=70&&r.y+r.height<=820)break;
    await page.mouse.wheel(0,290);
    await page.waitForTimeout(40);
  }
  const before=await page.evaluate(()=>({scrollY,viewportHeight:innerHeight,unknown:(()=>{const r=document.querySelector('.interest-btn[data-value="unknown"]').getBoundingClientRect();return {top:r.top,bottom:r.bottom}})()}));
  const box=await unknown.boundingBox();
  await page.mouse.click(box.x+box.width/2,box.y+box.height/2);
  const inspect=()=>page.evaluate(()=>{
    const block=document.getElementById('unknownFollowup');
    const title=block.querySelector('.unknown-question p');
    const geometry=el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height,display:s.display,visibility:s.visibility,opacity:s.opacity,overflow:s.overflow,maxHeight:s.maxHeight,classes:el.className,hidden:el.hidden}};
    const parents=[];for(let el=block;el&&parents.length<9;el=el.parentElement)parents.push({tag:el.tagName,id:el.id,...geometry(el)});
    return {scrollY,viewportHeight:innerHeight,scrollingElement:document.scrollingElement?.tagName,documentScrollTop:document.scrollingElement?.scrollTop,
      step:geometry(document.getElementById('step-4')),block:geometry(block),title:geometry(title),parents,
      titleIntersectsViewport:title.getBoundingClientRect().bottom>0&&title.getBoundingClientRect().top<innerHeight,
      selected:document.querySelector('.interest-btn[data-value="unknown"]').classList.contains('selected'),
      state:{step:state.currentStep,unknownInterests:state.unknownInterests,person:state.unknownPerson,gift:state.unknownGift}};
  });
  const immediate=await inspect();
  const output=process.env.TTC_VISUAL_OUTPUT;
  if(output)await page.screenshot({path:path.resolve(output),fullPage:false});
  await page.waitForTimeout(500);
  const settled=await inspect();
  console.log(JSON.stringify({before,immediate,settled,errors,output},null,2));
  assert.deepEqual(errors,[]);
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
