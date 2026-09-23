/* Moteur V2 indépendant du DOM. Aucun historique ni feedback envoyé au réseau. */
'use strict';
const GiftEngine = (() => {
  const HISTORY_KEY = 'ttc_recent_gifts_v2';
  const FEEDBACK_KEY = 'ttc_gift_feedback_v2';
  const INTERESTS = {
    'jeux-video':'les jeux vidéo', manga:'les mangas et les anime', technologie:'la technologie',
    voyage:'le voyage', lecture:'la lecture', cuisine:'la cuisine', animaux:'les animaux',
    sport:'le sport', musique:'la musique', cinema:'le cinéma', bricolage:'le bricolage',
    jardinage:'le jardinage', 'auto-moto':'l’auto et la moto', 'creatif-diy':'les activités créatives',
    'maison-deco':'la maison et la décoration', 'photo-video':'la photo et la vidéo',
    'nature-outdoor':'la nature et les activités de plein air'
  };
  const UNKNOWN_PERSON_INTERESTS = {
    creative:['bricolage','creatif-diy','jardinage'],
    tech:['technologie','jeux-video','photo-video'],
    cuisine:['cuisine'],
    outdoor:['sport','nature-outdoor']
  };
  const UNKNOWN_GIFT_TRAITS = {useful:'utile',original:'original',discovery:'decouverte'};
  // Famille = usage réel, distinct de l'univers : deux variantes ne remplissent pas la sélection.
  const FAMILIES = [
    [/figurine|amiibo|funko/i,'collection-figurine'],
    [/manette|dualsense/i,'accessoire-console'], [/casque|écouteur|bandeau audio/i,'audio-personnel'],
    [/enceinte/i,'enceinte'], [/shiatsu|massant/i,'massage'], [/valise/i,'bagage'],
    [/projecteur/i,'projection'], [/caméra|appareil photo|instax|drone/i,'prise-de-vue'],
    [/trépied|stabilisateur|micro-cravate|ring light/i,'accessoire-photo'], [/cadre|toile photo/i,'souvenir-photo'],
    [/coffret manga|dragon ball|harry potter|livre|dictionnaire|artbook|trilogie/i,'livre'],
    [/jeu de société|escape|micromacro|puzzle/i,'jeu-table'], [/mug|tasse/i,'tasse'],
    [/carnet|journal/i,'carnet'], [/stylo|calligraphie|marqueur|aquarelle|coloriage|créatif/i,'dessin'],
    [/plante|bonsaï|jardin|arrosage/i,'jardin'], [/lampe|lumineux|LED personnalisé/i,'eclairage'],
    [/sac|trousse|pochette/i,'rangement-nomade'], [/montre/i,'montre'],
    [/portefeuille|porte-monnaie|porte-cartes/i,'maroquinerie'], [/bougie|bain|cosmétique/i,'detente'],
    [/robot.*(cuiseur|pâtissier)|machine.*(pâtes|café)/i,'appareil-cuisine'],
    [/couteau|wok|tablier|shaker|pâtisserie/i,'ustensile-cuisine'],
    [/verre|carafe/i,'verrerie'], [/bâton|paddle|randonnée/i,'equipement-outdoor']
  ];
  const EXTRA_INTERESTS = {
    'creatif-diy':[17,58,95,112,113,123,130,134,148,164],
    'jardinage':[114,150,156],
    'auto-moto':[116],
    'maison-deco':[24,25,28,32,58,109,115,120,136,140,159],
    'photo-video':[27,35,55,125,131,140,149,158],
    'nature-outdoor':[31,35,65,70,114,117,118,137,142,143]
  };
  const SAFE_IDS = new Set([30,32,34,43,47,52,61,65,70,85,87,94,107,109,110,112,114,121,139,140,146,154,161]);
  function enrich(gift) {
    const added = Object.keys(EXTRA_INTERESTS).filter(i => EXTRA_INTERESTS[i].includes(gift.id));
    const interets = [...new Set([...gift.interets, ...added])];
    const family = gift.family || (FAMILIES.find(([re]) => re.test(gift.titre)) || [null, `type-${gift.id}`])[1];
    const traits = new Set(gift.traits || []);
    if (gift.originalite >= 8) traits.add('original');
    if (SAFE_IDS.has(gift.id)) traits.add('valeur_sure');
    if (interets.length) traits.add('passion');
    if (/support|lampe|outil|charge|rangement|trousse|adaptateur|câble|SSD|lunch|tournevis/i.test(gift.titre)) {
      traits.add('utile'); traits.add('pratique');
    }
    if (/personnalis|gravé|familial|empreinte/i.test(gift.titre)) { traits.add('sentimental'); traits.add('personnalisable'); }
    if (interets.includes('creatif-diy')) traits.add('creatif');
    if (interets.includes('maison-deco') && /cadre|toile|affiche|carte|bougie|lumineux/i.test(gift.titre)) traits.add('decoration');
    if (/kit|coffret.*(créatif|jeu)|puzzle/i.test(gift.titre)) traits.add('decouverte');
    if (['jeu-table','dessin'].includes(family)) traits.add('experience_maison');
    return {...gift, interets, family, univers:gift.univers || interets[0] || 'attention', traits:[...traits],
      occasions:gift.occasions || ['noel','anniv', ...(traits.has('sentimental') ? ['valentin'] : [])]};
  }
  function profileKey(profile) { return `${profile.genre || ''}:${profile.age || ''}`; }
  function load(storage) {
    let history = [], feedback = {};
    try { history = JSON.parse(storage.getItem(HISTORY_KEY) || '[]'); } catch {}
    try { feedback = JSON.parse(storage.getItem(FEEDBACK_KEY) || '{}'); } catch {}
    history = Array.isArray(history) ? history.filter(Array.isArray).slice(-12).map(batch =>
      [...new Set(batch.filter(Number.isSafeInteger))].slice(0, 10)) : [];
    const clean = {};
    if (feedback && typeof feedback === 'object' && !Array.isArray(feedback)) {
      Object.entries(feedback).filter(([key]) => /^(homme|femme|couple|enfant):(18-25|26-35|36-50|50\+|0-3|4-7|8-12|13-17)$/.test(key)).slice(-24).forEach(([key, entries]) => {
        if (!Array.isArray(entries)) return;
        clean[key] = entries.filter(e => e && Number.isSafeInteger(e.id) && ['good','style','owned'].includes(e.kind)).slice(-100);
      });
    }
    return {history, feedback:clean};
  }
  function persist(storage, memory) {
    try {
      storage.setItem(HISTORY_KEY, JSON.stringify(memory.history));
      storage.setItem(FEEDBACK_KEY, JSON.stringify(memory.feedback));
      return true;
    } catch { return false; }
  }
  function remember(memory, gifts) {
    if (!gifts.length) return;
    memory.history.push([...new Set(gifts.map(g => g.id))].slice(0,10));
    memory.history = memory.history.slice(-12);
  }
  function feedbackFor(memory, profile, id) {
    return (memory.feedback[profileKey(profile)] || []).find(e => e.id === id)?.kind || null;
  }
  function feedback(memory, profile, id, kind) {
    if (!Number.isSafeInteger(id) || !['good','style','owned'].includes(kind)) return;
    const key = profileKey(profile);
    const entries = (memory.feedback[key] || []).filter(e => e.id !== id);
    entries.push({id, kind});
    delete memory.feedback[key];
    memory.feedback[key] = entries.slice(-100);
    const keys = Object.keys(memory.feedback);
    if (keys.length > 24) delete memory.feedback[keys[0]];
  }
  function eligible(gift, profile, memory, rejected = new Set()) {
    return gift.genre.includes(profile.genre) && gift.age.includes(profile.age) && gift.budget === profile.budget &&
      !rejected.has(gift.id) && feedbackFor(memory, profile, gift.id) !== 'owned';
  }
  function similarity(a, b) {
    const sharedInterests = a.interets.filter(i => b.interets.includes(i)).length;
    const sharedTraits = a.traits.filter(t => !['passion','original','utile','pratique'].includes(t) && b.traits.includes(t)).length;
    return Math.min(12, sharedInterests * 4 + (a.family === b.family ? 3 : 0) +
      (a.univers === b.univers ? 2 : 0) + Math.min(sharedTraits, 2) * 2);
  }
  function score(gift, profile, memory, catalog, random = Math.random) {
    if (!eligible(gift,profile,memory)) return -Infinity;
    const interests = (profile.interets || []).filter(i => i in INTERESTS);
    const matches = interests.filter(i => gift.interets.includes(i)).length;
    let result = 75 + Math.min(matches,3)*40 + gift.originalite*.4;
    if (!interests.length) result += gift.traits.includes('valeur_sure') ? 10 : 0;
    if (profile.occasion && gift.occasions.includes(profile.occasion)) result += 7;
    if (profile.mode === 'surprise' && gift.traits.includes('decouverte')) result += 5;
    // « Je ne sais pas » reste facultatif : deux indices modestes, jamais des filtres.
    if (profile.unknownInterests && !interests.length) {
      if (UNKNOWN_PERSON_INTERESTS[profile.unknownPerson]?.some(i => gift.interets.includes(i))) result += 6;
      if (gift.traits.includes(UNKNOWN_GIFT_TRAITS[profile.unknownGift])) result += 5;
    }
    memory.history.forEach((ids,index) => {
      if (ids.includes(gift.id)) result -= 24 * (index+1) / memory.history.length;
    });
    const entries = memory.feedback[profileKey(profile)] || [];
    let preferenceBonus = 0, preferenceMalus = 0;
    for (const entry of entries) {
      const other = catalog.find(g => g.id === entry.id);
      if (!other) continue;
      if (entry.kind === 'style') {
        if (entry.id === gift.id) result -= 65;
        else preferenceMalus += Math.min(8, similarity(other, gift) * .7);
      }
      if (entry.kind === 'good') preferenceBonus += entry.id === gift.id ? 2 : similarity(other, gift);
      // Un cadeau possédé n'est pas un désaveu de son thème.
    }
    // Bornes : un avis ne peut ni écraser les critères choisis ni vider un profil.
    return result + Math.min(18,preferenceBonus) - Math.min(16,preferenceMalus) + random()*4;
  }
  function select(catalog, profile, memory, {limit=10, rejected=new Set(), exclude=[], random=Math.random} = {}) {
    const interests = (profile.interets || []).filter(i => i in INTERESTS);
    const pool = catalog.filter(g => eligible(g,profile,memory,rejected) && !exclude.includes(g.id))
      .map(g => ({...g, score:score(g,profile,memory,catalog,random),
        interestMatch:!interests.length || interests.some(i => g.interets.includes(i))}));
    const selected = [], remaining = [...pool];
    const existing = catalog.filter(g => exclude.includes(g.id));
    while (selected.length < limit && remaining.length) {
      // L'intérêt reste prioritaire, même lorsque l'historique contient tous les favoris du domaine.
      const matching = remaining.filter(g => g.interestMatch);
      const candidates = matching.length ? matching : remaining;
      const previous = [...existing,...selected];
      const rank = g => g.score - 15*previous.filter(p => p.family === g.family).length
        - 4*previous.filter(p => p.univers === g.univers).length
        + (previous.some(p => p.univers === g.univers) ? 0 : 4);
      candidates.sort((a,b) => rank(b)-rank(a) || a.id-b.id);
      const next = candidates[0];
      selected.push(next);
      remaining.splice(remaining.indexOf(next),1);
    }
    const usedLabels = new Set();
    selected.forEach((gift,index) => {
      const labels = [
        [index === 0 && !exclude.length,'🎯 Notre choix'], [gift.traits.includes('utile'),'🛠️ Une idée utile'],
        [gift.traits.includes('original'),'✨ Pour surprendre'], [gift.traits.includes('valeur_sure'),'🎯 Une valeur sûre'],
        [gift.traits.includes('sentimental'),'❤️ Plus personnel'],
        [interests.length && gift.interestMatch,'🔥 Pour sa passion'], [gift.traits.includes('decouverte'),'💡 À découvrir']
      ];
      const label = labels.find(([ok,text]) => ok && !usedLabels.has(text));
      gift.selectionLabel = label ? label[1] : '';
      if (label) usedLabels.add(label[1]);
    });
    return {results:selected, pool:pool.sort((a,b)=>b.score-a.score)};
  }
  return {INTERESTS,HISTORY_KEY,FEEDBACK_KEY,enrich,profileKey,load,persist,remember,feedback,feedbackFor,eligible,score,select};
})();
if (typeof module !== 'undefined' && module.exports) module.exports = GiftEngine;
