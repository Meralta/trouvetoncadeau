'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
process.chdir(path.resolve(__dirname,'..'));
const engine=require('../recommendations.js');
const ctx=vm.createContext({document:{addEventListener(){}},console,URL,localStorage:{getItem(){return null},setItem(){}}});
for(const f of ['recommendations.js','catalog-extra.js','script.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
vm.runInContext('normalizeGiftDatabase()',ctx);
const after=JSON.parse(vm.runInContext('JSON.stringify(CADEAUX)',ctx));
const before=JSON.parse(fs.readFileSync('tests/fixtures/catalogue-275.json','utf8'));
const editorial=JSON.parse(fs.readFileSync('tests/fixtures/catalogue-passe1.6-changes.json','utf8'));
for(const old of before){
 const current=after.find(g=>g.id===old.id);assert.ok(current);
 for(const key of Object.keys(old))assert.deepEqual(current[key],Object.hasOwn(editorial[old.id]||{},key)?editorial[old.id][key]:old[key],old.id+': '+key);
}
const budgets=['<20','20-50','50-100','>100'],interests=Object.keys(engine.INTERESTS);
function measure(catalog,p){
 let seed=42;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const memory={history:[],feedback:{}},eligible=catalog.filter(g=>engine.eligible(g,p,memory));
 const matching=eligible.filter(g=>!p.interets.length||p.interets.some(i=>g.interets.includes(i)));
 let previous=[],overlap=0,slots=0,total=0,matches=0,familySum=0;
 const distinct=new Set(),families=new Set();
 for(let n=0;n<20;n++){
  const r=engine.select(catalog,p,memory,{random}).results;
  assert.ok(r.length<=10 && r.every(g=>g.genre.includes(p.genre)&&g.age.includes(p.age)&&g.budget===p.budget));
  assert.equal(new Set(r.map(g=>g.id)).size,r.length);
  if(n){overlap+=r.filter(g=>previous.includes(g.id)).length;slots+=r.length}
  total+=r.length;matches+=r.filter(g=>!p.interets.length||p.interets.some(i=>g.interets.includes(i))).length;
  familySum+=new Set(r.map(g=>g.family)).size;
  r.forEach(g=>{distinct.add(g.id);families.add(g.family)});
  previous=r.map(g=>g.id);engine.remember(memory,r);
 }
 return {eligible:eligible.length,matching:matching.length,distinct:distinct.size,repeatPercent:slots?Math.round(1000*overlap/slots)/10:null,interestMatchPercent:total?Math.round(1000*matches/total)/10:null,families:families.size,averageFamilies:familySum/20,budgetAgeRecipientValid:true};
}
const coverage=[],buckets={before:{'0':0,'1-4':0,'5-9':0,'10+':0},after:{'0':0,'1-4':0,'5-9':0,'10+':0}};
for(const genre of ['homme','femme','couple','enfant'])for(const age of genre==='enfant'?['0-3','4-7','8-12','13-17']:['18-25','26-35','36-50','50+'])for(const budget of budgets)for(const interest of [null,...interests]){
 const profile={genre,age,budget,interets:interest?[interest]:[]};
 const row={profile,before:measure(before,profile),after:measure(after,profile)};
 for(const phase of ['before','after']){const n=row[phase].matching;buckets[phase][n===0?'0':n<5?'1-4':n<10?'5-9':'10+']++}
 coverage.push(row);
}
const count=(catalog,key,values)=>Object.fromEntries(values.map(v=>[v,catalog.filter(g=>Array.isArray(g[key])?g[key].includes(v):g[key]===v).length]));
const distributions={};
for(const [phase,catalog] of [['before',before],['after',after]])distributions[phase]={interests:count(catalog,'interets',interests),budgets:count(catalog,'budget',budgets),recipients:count(catalog,'genre',['homme','femme','couple','enfant','famille']),interestBudgets:Object.fromEntries(interests.map(i=>[i,count(catalog.filter(g=>g.interets.includes(i)),'budget',budgets)]))};
assert.equal(coverage.length,1152);assert.equal(after.length,320);
console.log(JSON.stringify({before:before.length,after:after.length,added:after.length-before.length,uniqueAsins:new Set(after.map(g=>new URL(g.affiliateLink).pathname)).size,buckets,distributions,coverage,newProducts:after.filter(g=>g.id>275),genericDescriptions:after.filter(g=>/cadeau physique précis/i.test(g.desc)).map(g=>g.id)},null,2));
