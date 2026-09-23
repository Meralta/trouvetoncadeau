'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const engine = require('../recommendations.js');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({document:{addEventListener(){}},console,URL,localStorage:{getItem(){return null;},setItem(){}}});
for (const file of ['recommendations.js','catalog-extra.js','script.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
vm.runInContext('normalizeGiftDatabase()',context);
const catalog = JSON.parse(vm.runInContext('JSON.stringify(CADEAUX)',context));
const profile = {genre:'homme',age:'26-35',budget:'20-50',interets:['technologie','lecture']};
const blank = () => ({history:[],feedback:{}});
const fixed = () => 0;
const gift = (id,interets,family,univers) => ({id,genre:['homme'],age:['26-35'],budget:'20-50',
  interets,family,univers,traits:['passion'],originalite:7,occasions:[]});
const sample = [gift(1,['technologie'],'audio','technologie'),gift(2,['technologie'],'audio','technologie'),
  gift(3,['lecture'],'livre','lecture'),gift(4,['lecture'],'carnet','lecture')];
const delta = (g,m) => engine.score(g,profile,m,sample,fixed)-engine.score(g,profile,blank(),sample,fixed);
let memory = blank();
engine.feedback(memory,profile,1,'good');
assert.ok(delta(sample[1],memory)>0,'❤️ rehausse un cadeau proche');
assert.equal(delta(sample[2],memory),0,'❤️ ne rehausse pas tous les thèmes');
assert.equal(engine.select(sample,profile,memory,{limit:1,rejected:new Set([1]),random:fixed}).results[0].id,2,
  '❤️ change la prochaine proposition, sans reproposer le cadeau aimé');
engine.feedback(memory,profile,3,'good');
assert.ok(delta(sample[3],memory)>0,'plusieurs ❤️ couvrent plusieurs thèmes');
assert.equal(engine.select(sample,profile,memory,{limit:4,random:fixed}).results.length,4);
memory = blank();
engine.feedback(memory,profile,1,'style');
assert.ok(delta(sample[1],memory)<0,'❌ abaisse un cadeau proche');
assert.equal(delta(sample[2],memory),0,'❌ conserve les autres thèmes');
assert.equal(engine.select(sample,profile,memory,{limit:1,rejected:new Set([1]),random:fixed}).results[0].id,3,
  '❌ laisse passer une autre famille en premier');
for (const item of sample) engine.feedback(memory,profile,item.id,'style');
assert.equal(engine.select(sample,profile,memory,{limit:4,random:fixed}).results.length,4,
  'plusieurs ❌ ne vident pas le profil sans exclusion explicite');
memory = blank();
engine.feedback(memory,profile,1,'owned');
assert.ok(!engine.select(sample,profile,memory,{random:fixed}).results.some(g=>g.id===1));
assert.equal(delta(sample[1],memory),0,'déjà possédé ne pénalise pas les proches');
assert.equal(engine.feedbackFor(memory,{...profile,age:'36-50'},1),null,'autre profil isolé');
const session = blank(), first = engine.select(catalog,profile,session,{random:fixed}).results;
const excluded = new Set();
engine.remember(session,first);
engine.feedback(session,profile,first[0].id,'good'); excluded.add(first[0].id);
const afterGood = engine.select(catalog,profile,session,{rejected:excluded,random:fixed}).results;
assert.ok(!afterGood.some(g=>g.id===first[0].id));
assert.ok(afterGood.every(g=>engine.eligible(g,profile,session)));
engine.feedback(session,profile,afterGood[0].id,'style');excluded.add(afterGood[0].id);
const afterStyle = engine.select(catalog,profile,session,{rejected:excluded,random:fixed}).results;
assert.ok(!afterStyle.some(g=>excluded.has(g.id)));
engine.feedback(session,profile,afterStyle[0].id,'owned');
const mixed = engine.select(catalog,profile,session,{rejected:excluded,random:fixed}).results;
assert.ok(!mixed.some(g=>g.id===afterStyle[0].id));
assert.ok(mixed.length>0);
assert.ok(new Set(mixed.map(g=>g.family)).size>1,'diversité conservée');
const saved = new Map();
const storage = {getItem:key=>saved.get(key) || null,setItem:(key,value)=>saved.set(key,value)};
assert.equal(engine.persist(storage,session),true);
assert.deepEqual(engine.load(storage),session,'historique et avis restent distincts après rechargement');
assert.ok(saved.has(engine.HISTORY_KEY) && saved.has(engine.FEEDBACK_KEY));
const unknown = engine.select(catalog,{...profile,interets:['unknown']},blank(),{random:fixed}).results;
assert.equal(unknown.length,engine.select(catalog,{...profile,interets:[]},blank(),{random:fixed}).results.length);
console.log(JSON.stringify({status:'PASS',catalog:catalog.length,scenarios:['good','style','owned','successive','mixed','profile','unknown','diversity']}));
