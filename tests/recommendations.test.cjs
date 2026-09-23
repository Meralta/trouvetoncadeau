'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const cp = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
process.chdir(root);
const engine = require('../recommendations.js');
const read = f => fs.readFileSync(f,'utf8');
const context = vm.createContext({document:{addEventListener(){}},console,URL,localStorage:{getItem(){return null;},setItem(){}}});
for (const f of ['recommendations.js','catalog-extra.js','script.js']) vm.runInContext(read(f),context,{filename:f});
vm.runInContext('normalizeGiftDatabase()',context);
const catalog = JSON.parse(vm.runInContext('JSON.stringify(CADEAUX)',context));
const oldContext=vm.createContext({document:{addEventListener(){}},console,URL});
for(const f of ['recommendations.js','catalog-extra.js','script.js'])
 vm.runInContext(cp.execFileSync('git',['show','HEAD:'+f],{encoding:'utf8'}),oldContext);
vm.runInContext('normalizeGiftDatabase()',oldContext);
const baseline=JSON.parse(vm.runInContext('JSON.stringify(CADEAUX)',oldContext));
assert.equal(baseline.length,320);
assert.equal(catalog.length,Number(process.env.TTC_CATALOG_COUNT || 320));
assert.equal(new Set(catalog.map(g=>g.id)).size,catalog.length);
assert.equal(new Set(catalog.map(g=>new URL(g.affiliateLink).pathname)).size,catalog.length);
for(const g of catalog){
 const url=new URL(g.affiliateLink);
 assert.equal(url.hostname,'www.amazon.fr');
 assert.match(url.pathname,/^\/dp\/[A-Z0-9]{10}$/);
 assert.equal(url.searchParams.get('tag'),'trouvetonca05-21');
 assert.ok(g.family && g.univers && Array.isArray(g.traits));
 assert.ok(g.interets.every(i=>i in engine.INTERESTS));
}
for(const b of baseline){
 const g=catalog.find(g=>g.id===b.id);
 assert.deepEqual(g,b,'Référence du checkpoint modifiée : '+b.id);
}
assert.match(vm.runInContext("getProductUrl({titre:'Cadeau test',affiliateLink:''})",context),/amazon\.fr\/s\?/);
assert.equal(new URL(vm.runInContext("getProductUrl({titre:'Cadeau test',affiliateLink:''})",context)).searchParams.get('tag'),'trouvetonca05-21');
assert.deepEqual(engine.load({getItem(){return '{bad';}}),{history:[],feedback:{}});
assert.deepEqual(engine.load({getItem(){throw Error('blocked');}}),{history:[],feedback:{}});
assert.equal(engine.persist({setItem(){throw Error('quota');}},{history:[],feedback:{}}),false);
let tested=0, sparse=[];
for(const genre of ['homme','femme','couple','enfant']){
 const ages=genre==='enfant'?['0-3','4-7','8-12','13-17']:['18-25','26-35','36-50','50+'];
 for(const age of ages)for(const budget of ['<20','20-50','50-100','>100']){
  for(const interest of [null,...Object.keys(engine.INTERESTS)]){
   const profile={genre,age,budget,interets:interest?[interest]:[]};
   const memory={history:[],feedback:{}};
   const selection=engine.select(catalog,profile,memory).results;
   const eligible=catalog.filter(g=>engine.eligible(g,profile,memory));
   assert.equal(selection.length,Math.min(10,eligible.length));
   assert.equal(new Set(selection.map(g=>g.id)).size,selection.length);
   assert.ok(selection.every(g=>g.genre.includes(genre)&&g.age.includes(age)&&g.budget===budget));
   if(interest){
    const matching=eligible.filter(g=>g.interets.includes(interest));
    assert.equal(selection.filter(g=>g.interets.includes(interest)).length,Math.min(10,matching.length));
   }
   if(!interest && eligible.length<10)sparse.push({genre,age,budget,count:eligible.length});
   tested++;
  }
 }
}
const p={genre:'homme',age:'26-35',budget:'20-50',interets:['technologie','lecture']};
const memory={history:[],feedback:{}};
const first=engine.select(catalog,p,memory).results[0];
engine.feedback(memory,p,first.id,'owned');
assert.ok(!engine.select(catalog,p,memory).results.some(g=>g.id===first.id));
assert.equal(engine.feedbackFor(memory,{...p,age:'36-50'},first.id),null);
engine.feedback(memory,p,first.id,'style');
const penalized=engine.score(first,p,memory,catalog,()=>0);
assert.ok(penalized<engine.score(first,p,{history:[],feedback:{}},catalog,()=>0));
engine.feedback(memory,p,first.id,'good');
assert.ok(engine.score(first,p,memory,catalog,()=>0)>engine.score(first,p,{history:[],feedback:{}},catalog,()=>0));
for(let i=0;i<100;i++)engine.remember(memory,catalog.slice(0,10));
assert.equal(memory.history.length,12);
const forbidden=new Set(catalog.slice(0,30).map(g=>g.id));
assert.ok(engine.select(catalog,p,memory,{rejected:forbidden}).results.every(g=>!forbidden.has(g.id)));
let seed=42;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
function measure(profile,modern){
 const mem={history:[],feedback:{}};let previous=[],repeats=0,slots=0,distinct=new Set(),interestMatches=0;
 // Comparaison à catalogue constant : seules les 165 références historiques sont utilisées.
 const gifts=modern?catalog.filter(g=>g.id<=165):baseline.filter(g=>g.id<=165);
 for(let n=0;n<40;n++){
  let results;
  if(modern){results=engine.select(gifts,profile,mem,{random}).results;engine.remember(mem,results);}
  else{results=gifts.filter(g=>g.genre.includes(profile.genre)&&g.age.includes(profile.age)&&g.budget===profile.budget)
   .map(g=>({...g,score:75+profile.interets.filter(i=>g.interets.includes(i)).length*15+g.originalite*.5+random()*5}))
   .sort((a,b)=>b.score-a.score).slice(0,10);}
  if(n){repeats+=results.filter(g=>previous.includes(g.id)).length;slots+=results.length;}
  results.forEach(g=>{distinct.add(g.id);if(!profile.interets.length||profile.interets.some(i=>g.interets.includes(i)))interestMatches++;});
  previous=results.map(g=>g.id);
 }
 return {repeatPercent:Math.round(100*repeats/slots),distinct:distinct.size,interestMatches};
}
const statistics=[
 {genre:'homme',age:'26-35',budget:'20-50',interets:[]},
 {genre:'femme',age:'26-35',budget:'20-50',interets:['lecture']},
 {genre:'couple',age:'36-50',budget:'>100',interets:[]},
 {genre:'enfant',age:'8-12',budget:'20-50',interets:[]}
].map(profile=>({profile,before:measure(profile,false),after:measure(profile,true)}));
assert.ok(statistics[0].after.repeatPercent<statistics[0].before.repeatPercent);
const protectedFiles=['ads.txt','robots.txt','CNAME'];
for(const file of protectedFiles)assert.equal(read(file).replace(/\r\n/g,'\n'),cp.execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'}).replace(/\r\n/g,'\n'));
const originalIndex=cp.execFileSync('git',['show','HEAD:index.html'],{encoding:'utf8'});
const scripts=s=>[...s.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map(m=>m[0]).filter(t=>/google|gtag|consent|fundingchoices|__tcfapi/i.test(t)).map(t=>t.replace(/\r\n/g,'\n'));
assert.deepEqual(scripts(read('index.html')),scripts(originalIndex));
const htmlFiles=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const seoTitles=new Set(),seoDescriptions=new Set(),seoCanonicals=new Set();
for(const file of htmlFiles){
 const html=read(file);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const link=match[1]; if(/^(https?:|mailto:|data:|#)/.test(link))continue;
  const target=link.split(/[?#]/)[0];
  assert.ok(fs.existsSync(path.join(root,target)),file+': lien absent '+target);
 }
 assert.equal((html.match(/<h1\b/g)||[]).length,1,file+' H1');
 assert.ok(html.includes('rel="canonical"'),file+' canonical');
 const title=(html.match(/<title>([^<]+)<\/title>/)||[])[1];
 const description=(html.match(/<meta name="description" content="([^"]+)"/)||[])[1];
 const canonical=(html.match(/<link rel="canonical" href="([^"]+)"/)||[])[1];
 assert.ok(title&&description&&canonical,file+' métadonnées SEO');
 assert.ok(!seoTitles.has(title),file+' title dupliqué');seoTitles.add(title);
 assert.ok(!seoDescriptions.has(description),file+' description dupliquée');seoDescriptions.add(description);
 assert.ok(!seoCanonicals.has(canonical),file+' canonical dupliqué');seoCanonicals.add(canonical);
 assert.doesNotMatch(html,/noindex/i,file+' ne doit pas être noindex');
}
const sitemap=read('sitemap.xml');
for(const file of htmlFiles.filter(f=>f!=='index.html'))assert.ok(sitemap.includes('/'+file),file+' sitemap');
const start=performance.now();
for(let i=0;i<100;i++)engine.select(catalog,p,memory);
const result={catalog:catalog.length,uniqueAsins:new Set(catalog.map(g=>new URL(g.affiliateLink).pathname)).size,profilesTested:tested,statistics,averageSelectionMs:+((performance.now()-start)/100).toFixed(2),byInterest:Object.fromEntries(Object.keys(engine.INTERESTS).map(i=>[i,catalog.filter(g=>g.interets.includes(i)).length])),byBudget:Object.fromEntries(['<20','20-50','50-100','>100'].map(b=>[b,catalog.filter(g=>g.budget===b).length])),sparse};
console.log(JSON.stringify(result,null,2));
