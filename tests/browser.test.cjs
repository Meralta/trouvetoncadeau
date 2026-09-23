'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.TTC_BROWSER_CHANNEL || 'msedge'});
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 // Isoler le test fonctionnel des services tiers (aucun événement Analytics de test envoyé).
 await context.route('**/*',route=>{
   const u=new URL(route.request().url());
   if(['127.0.0.1','localhost'].includes(u.hostname)||u.protocol==='data:')return route.continue();
   return route.fulfill({status:200,body:'',contentType:route.request().resourceType()==='script'?'application/javascript':'text/plain'});
 });
 const page=await context.newPage();const errors=[],failedLocal=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1')&&r.status()>=400)failedLocal.push(r.url());});
 const url='http://127.0.0.1:4173/';
 const overflow=async()=>{
  await page.waitForTimeout(350);
  const sizes=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,
   nodes:[...document.querySelectorAll('body > *, .modal, .modal-content, .confetti-piece')].filter(e=>e.getBoundingClientRect().right>innerWidth).map(e=>({class:e.className,right:e.getBoundingClientRect().right}))}));
  assert.ok(sizes.scroll<=sizes.viewport,'débordement '+JSON.stringify(sizes));
 };
 await page.goto(url); await page.waitForFunction(()=>typeof CADEAUX!=='undefined'&&CADEAUX.length===320);
 assert.equal(await page.locator('.trend-stars').count(),0);
 const screenDir=process.env.TTC_SCREENSHOTS;
 const shot=async name=>{if(screenDir)await page.screenshot({path:path.join(screenDir,name+'.png'),fullPage:false});};
 await overflow();await shot('desktop-accueil');
 await page.locator('[data-key="genre"][data-value="homme"]').click();
 await page.locator('#next-1').click();
 await page.locator('[data-key="age"][data-value="26-35"]').click();
 await page.locator('#next-2').click();
 await page.locator('[data-key="budget"][data-value="20-50"]').click();
 await page.locator('#next-3').click();
 for(const interest of ['bricolage','jardinage','auto-moto','creatif-diy','maison-deco','photo-video','nature-outdoor']){
  const button=page.locator('.interest-btn[data-value="'+interest+'"]');
  await button.click();assert.equal(await button.getAttribute('aria-pressed'),'true');
 }
 assert.equal(await page.evaluate(()=>state.interets.length),7);
 await page.locator('.interest-btn[data-value="unknown"]').click();
 assert.equal(await page.evaluate(()=>state.interets.length),0);
 assert.equal(await page.evaluate(()=>state.unknownInterests),true);
 await page.locator('.btn-submit').click();
 await page.locator('#cardsGrid .gift-card').first().waitFor();
 assert.equal(await page.locator('#cardsGrid .gift-card').count(),10);
 await page.waitForTimeout(900);await overflow();await shot('desktop-resultats');
 const initial=await page.evaluate(()=>displayedIds.slice());
 await page.locator('#cardsGrid .gift-card').first().locator('.btn-fav').click();
 const savedFavorites=await page.evaluate(()=>getFavoriteIds());
 assert.ok(savedFavorites.length);
 await page.locator('#cardsGrid .gift-card').first().locator('.btn-feedback').first().click();
 assert.ok(await page.evaluate(()=>Object.values(recommendationMemory.feedback).flat().some(e=>e.kind==='good')));
 const owned=Number(await page.locator('#cardsGrid .gift-card').nth(1).getAttribute('data-gift-id'));
 await page.locator('#cardsGrid .gift-card').nth(1).locator('.btn-feedback').nth(1).click();
 await page.waitForTimeout(350);
 assert.ok(!(await page.evaluate(()=>displayedIds)).includes(owned));
 const style=Number(await page.locator('#cardsGrid .gift-card').nth(2).getAttribute('data-gift-id'));
 await page.locator('#cardsGrid .gift-card').nth(2).locator('.btn-skip').click();
 await page.waitForTimeout(350);
 await page.evaluate(()=>regenerateResults());
 assert.ok(!(await page.evaluate(()=>displayedIds)).includes(owned));
 assert.ok(!(await page.evaluate(()=>displayedIds)).includes(style));
 assert.notDeepEqual(await page.evaluate(()=>displayedIds),initial);
 const links=await page.locator('#cardsGrid .btn-buy').evaluateAll(elements=>elements.map(el=>({href:el.href,rel:el.rel})));
 for(const link of links){assert.match(link.href,/\/dp\/[A-Z0-9]{10}\?tag=trouvetonca05-21/);assert.equal(link.rel,'noopener noreferrer sponsored');}
 await page.reload();
 assert.ok(await page.evaluate(id=>Object.values(recommendationMemory.feedback).flat().some(e=>e.id===id&&e.kind==='owned'),owned));
 assert.deepEqual(await page.evaluate(()=>getFavoriteIds()),savedFavorites);
 await page.evaluate(()=>openFavoritesModal());await page.locator('#favModal .gift-card').first().waitFor();
 await overflow();
 await page.keyboard.press('Escape');
 for(const width of [390,768,1280]){
  await page.setViewportSize({width,height:844});
  for(const theme of ['light','dark']){
   await page.evaluate(theme=>applyTheme(theme),theme);
   assert.equal(await page.locator('.trend-stars').count(),0);
   await overflow();await shot(width+'-'+theme+'-accueil');
   await page.evaluate(()=>surpriseMe());
   await page.waitForTimeout(900);
   assert.equal(await page.locator('#cardsGrid .gift-card').count(),10);
   await overflow();await shot(width+'-'+theme+'-resultats');
   await page.evaluate(()=>openFavoritesModal());await overflow();await page.keyboard.press('Escape');
   for(const key of ['mentions','confidentialite','contact']){
    await page.evaluate(key=>openLegalModal(key),key);
    assert.ok(await page.locator('#legalBody').textContent());
    await overflow();await page.keyboard.press('Escape');
   }
   await page.evaluate(()=>restartQuiz());
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>{restartQuiz(); selectOption(document.querySelector('[data-value="homme"]'),'genre','homme'); state.age='26-35'; state.budget='20-50'; nextStep(4);});
 assert.equal(await page.locator('.interests-grid').count(),1);
 assert.equal(await page.locator('.interests-more, #extraInterests').count(),0);
 await overflow();await shot('390-interets');
 await page.evaluate(()=>restartQuiz());
 await page.locator('[data-key="genre"][data-value="enfant"]').click();
 await page.locator('#next-1').click();
 const ages=await page.locator('#ageOptions .option-btn').evaluateAll(es=>es.map(e=>e.dataset.value));
 assert.deepEqual(ages,['0-3','4-7','8-12','13-17']);
 await page.evaluate(()=>restartQuiz());
 const occasionButtons=await page.locator('[onclick*="quickOccasion"]').count();
 for(let i=0;i<occasionButtons;i++){
  await page.locator('[onclick*="quickOccasion"]').nth(i).click();await page.waitForTimeout(700);
  assert.ok(await page.locator('#cardsGrid .gift-card').count()>0);
  await overflow();await page.evaluate(()=>restartQuiz());
 }
 for(const file of fs.readdirSync(path.resolve(__dirname,'..')).filter(f=>f.endsWith('.html')&&f!=='index.html')){
  for(const theme of ['light','dark']){
   await page.evaluate(t=>localStorage.setItem('ttc_theme',t),theme);
   await page.goto(url+file);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
   await overflow();
   if(file==='guides.html')await shot('390-'+theme+'-guides');
  }
 }
 await page.goto(url);await page.evaluate(()=>{localStorage.setItem('ttc_favorites_v1','{bad');localStorage.setItem('ttc_recent_gifts_v2','{bad');localStorage.setItem('ttc_gift_feedback_v2','{bad');});
 await page.reload();
 assert.deepEqual(await page.evaluate(()=>getFavoriteIds()),[]);
 await page.evaluate(()=>surpriseMe());await page.waitForTimeout(900);
 await page.evaluate(()=>resetRecommendationPreferences());
 assert.equal(await page.evaluate(()=>Object.keys(recommendationMemory.feedback).length),0);
 assert.equal(await page.evaluate(()=>recommendationMemory.history.length),0);
 await page.evaluate(()=>{saveFavorites([1]);openFavoritesModal();});
 await page.locator('#favModal button[onclick="removeFavorite(1)"]').click();
 assert.ok(!(await page.evaluate(()=>getFavoriteIds())).includes(1));
 await page.keyboard.press('Escape');
 await page.evaluate(()=>restartQuiz());
 await page.locator('.faq-question').first().click();
 assert.equal(await page.locator('.faq-item.open').count(),1);
 await page.locator('.faq-question').first().click();
 assert.equal(await page.locator('.faq-item.open').count(),0);
// Passe 1.5 : clics réels pour chaque intérêt, chaque largeur et chaque thème.
 const interestChecks=[];
 for(const width of [1280,768,390]) for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:844});
  await page.evaluate(t=>applyTheme(t),theme);
  for(const interest of [...await page.evaluate(()=>Object.keys(GiftEngine.INTERESTS)),'unknown']){
   await page.evaluate(()=>{
    restartQuiz(); state.genre='homme';state.age='26-35';state.budget='20-50';nextStep(4);
    if(!window.testSelectOriginal){
     window.testSelectOriginal=GiftEngine.select;
     GiftEngine.select=function(c,p,m,o){window.testReceivedProfile=JSON.parse(JSON.stringify(p));return window.testSelectOriginal(c,p,m,o);};
    }
   });
   const button=page.locator('.interest-btn[data-value="'+interest+'"]');
   assert.ok(await button.isVisible());
   await button.click();
   assert.equal(await button.getAttribute('aria-pressed'),'true');
   assert.match(await button.getAttribute('class'),/selected/);
   const expected=interest==='unknown'?[]:[interest];
   assert.deepEqual(await page.evaluate(()=>state.interets),expected);
   // Désélection puis resélection par de vrais clics.
   await button.click();assert.equal(await button.getAttribute('aria-pressed'),'false');
   await button.click();
   await overflow();
   await page.locator('.btn-submit').click();
   await page.locator('#cardsGrid .gift-card').first().waitFor();
   await page.waitForTimeout(450);
   assert.deepEqual(await page.evaluate(()=>window.testReceivedProfile.interets),expected);
   const influence=await page.evaluate(()=>{
    const matching=CADEAUX.filter(g=>GiftEngine.eligible(g,state,recommendationMemory)&&state.interets.some(i=>g.interets.includes(i))).length;
    const actual=displayedIds.map(id=>CADEAUX.find(g=>g.id===id)).filter(g=>state.interets.some(i=>g.interets.includes(i))).length;
    return {matching,actual};
   });
   if(interest!=='unknown')assert.equal(influence.actual,Math.min(10,influence.matching));
   interestChecks.push({width,theme,interest,...influence});
  }
  for(const combination of [['bricolage','auto-moto'],['bricolage','jardinage','nature-outdoor']]){
   await page.evaluate(()=>{restartQuiz();state.genre='homme';state.age='26-35';state.budget='20-50';nextStep(4);});
   for(const i of combination)await page.locator('.interest-btn[data-value="'+i+'"]').click();
   assert.deepEqual(await page.evaluate(()=>state.interets),combination);
   await page.locator('.btn-submit').click();await page.locator('#cardsGrid .gift-card').first().waitFor();
   assert.deepEqual(await page.evaluate(()=>window.testReceivedProfile.interets),combination);
  }
  await page.evaluate(()=>{restartQuiz();state.genre='homme';state.age='26-35';state.budget='20-50';nextStep(4);});
  for(const i of ['bricolage','jardinage','unknown'])await page.locator('.interest-btn[data-value="'+i+'"]').click();
  assert.deepEqual(await page.evaluate(()=>state.interets),[]);
  assert.equal(await page.locator('.interest-btn.selected').count(),1);
  assert.equal(await page.locator('.interest-btn').last().getAttribute('data-value'),'unknown');
  await page.locator('.interest-btn[data-value="auto-moto"]').click();
  assert.equal(await page.locator('.interest-btn[data-value="unknown"]').getAttribute('aria-pressed'),'false');
  assert.deepEqual(await page.evaluate(()=>state.interets),['auto-moto']);
  await overflow();await shot(width+'-'+theme+'-interets-complets');
 }
 console.log(JSON.stringify({interestChecks:interestChecks.length,combinations:12,exclusiveUnknown:6,status:'PASS'}));
 assert.equal(failedLocal.length,0,JSON.stringify(failedLocal));
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({status:'PASS',viewports:[390,768,1280],themes:['light','dark'],consoleErrors:errors,localFailures:failedLocal,occasions:occasionButtons,thirdParty:'isolated; no Analytics/AdSense traffic sent'}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
