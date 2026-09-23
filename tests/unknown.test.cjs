'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const engine = require('../recommendations.js');
const root = path.resolve(__dirname,'..');
const context = vm.createContext({document:{addEventListener(){}},URL,localStorage:{getItem(){return null;},setItem(){}}});
for (const file of ['recommendations.js','catalog-extra.js','script.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
vm.runInContext('normalizeGiftDatabase()',context);
const catalog = JSON.parse(vm.runInContext('JSON.stringify(CADEAUX)',context));
const profile = {genre:'homme',age:'26-35',budget:'20-50',interets:[],unknownInterests:true};
const memory = {history:[],feedback:{}};
const fixed = () => 0;
const score = (gift,p) => engine.score(gift,p,memory,catalog,fixed);
const eligible = catalog.filter(g=>engine.eligible(g,profile,memory));
assert.equal(catalog.length,320);
for (const gift of eligible) {
  assert.equal(score(gift,profile),score(gift,{...profile,unknownInterests:false}),'sans réponse : score historique');
  assert.equal(score(gift,profile),score(gift,{...profile,unknownPerson:'none',unknownGift:'none'}),'réponses neutres');
}
const persons = {
  creative:['bricolage','creatif-diy','jardinage'],tech:['technologie','jeux-video','photo-video'],
  cuisine:['cuisine'],outdoor:['sport','nature-outdoor']
};
for (const [answer,interests] of Object.entries(persons)) {
  const yes = eligible.find(g=>interests.some(i=>g.interets.includes(i)));
  const no = eligible.find(g=>!interests.some(i=>g.interets.includes(i)));
  assert.ok(yes && no,answer+' représenté et contrastable');
  assert.equal(score(yes,{...profile,unknownPerson:answer})-score(yes,profile),6,answer+' bonus');
  assert.equal(score(no,{...profile,unknownPerson:answer})-score(no,profile),0,answer+' pas de malus');
}
const gifts = {useful:'utile',original:'original',discovery:'decouverte'};
for (const [answer,trait] of Object.entries(gifts)) {
  const yes = eligible.find(g=>g.traits.includes(trait));
  const no = eligible.find(g=>!g.traits.includes(trait));
  assert.ok(yes && no,answer+' représenté et contrastable');
  assert.equal(score(yes,{...profile,unknownGift:answer})-score(yes,profile),5,answer+' bonus');
  assert.equal(score(no,{...profile,unknownGift:answer})-score(no,profile),0,answer+' pas de malus');
}
const both = eligible.find(g=>g.interets.includes('technologie')&&g.traits.includes('utile'));
assert.ok(both);
assert.equal(score(both,{...profile,unknownPerson:'tech',unknownGift:'useful'})-score(both,profile),11);
const changedRankings = Object.fromEntries([...Object.keys(persons),...Object.keys(gifts)].map(hint=>[hint,0]));
let profileChecks = 0;
for (const genre of ['homme','femme','couple','enfant']) {
  const ages = genre==='enfant'?['0-3','4-7','8-12','13-17']:['18-25','26-35','36-50','50+'];
  for (const age of ages) for (const budget of ['<20','20-50','50-100','>100']) {
    for (const hint of [null,...Object.keys(persons),...Object.keys(gifts)]) {
      const p={genre,age,budget,interets:[],unknownInterests:true,
        unknownPerson:hint in persons?hint:null,unknownGift:hint in gifts?hint:null};
      const expected=catalog.filter(g=>engine.eligible(g,p,memory)).length;
      assert.equal(engine.select(catalog,p,memory,{random:fixed}).results.length,Math.min(10,expected));
      profileChecks++;
      if (hint && hint!=='none') {
        const baseline=engine.select(catalog,{...p,unknownPerson:null,unknownGift:null},memory,{random:fixed}).results.map(g=>g.id).join(',');
        const actual=engine.select(catalog,p,memory,{random:fixed}).results.map(g=>g.id).join(',');
        if (actual!==baseline) changedRankings[hint]++;
      }
    }
  }
}
for (const [hint,changed] of Object.entries(changedRankings)) assert.ok(changed>0,hint+' doit changer un classement réel');
console.log(JSON.stringify({status:'PASS',catalog:catalog.length,answers:9,profileChecks,maximumBonus:11,changedRankings}));
