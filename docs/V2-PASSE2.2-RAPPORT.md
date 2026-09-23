# V2 — Passe 2.2 : mode « Je ne sais pas »

## Audit préalable

Avant cette passe, « Je ne sais pas » était exclusif des 17 intérêts réels, mais envoyait simplement une liste d'intérêts vide au moteur. Le score sans intérêt privilégiait déjà les 23 cadeaux marqués `valeur_sure`. Les filtres stricts (destinataire, âge, budget), l'historique anti-répétition, la diversité et les feedbacks adaptatifs de la Passe 2.1 étaient appliqués ensuite.

Les 320 cadeaux normalisés disposent d'intérêts, d'une famille, d'un univers, d'une originalité et de traits existants. Les données pertinentes ici sont notamment : `bricolage` (29), `creatif-diy` (32), `jardinage` (23), `technologie` (41), `jeux-video` (18), `photo-video` (23), `cuisine` (34), `sport` (25), `nature-outdoor` (24) ; traits `utile` (90), `original` (69), `decouverte` (78). Ces métadonnées suffisent pour de faibles préférences de classement, pas pour inférer des goûts certains ni pour filtrer.

## Questions ajoutées

Les deux questions sont facultatives et affichées uniquement après sélection de « 🤷 Je ne sais pas ».

1. « Cette personne est plutôt… » : Manuelle / créative (`bricolage`, `creatif-diy`, `jardinage`) ; Tech (`technologie`, `jeux-video`, `photo-video`) ; Gourmande (`cuisine`) ; Sport / plein air (`sport`, `nature-outdoor`) ; « 🤷 Difficile à dire » (neutre).
2. « Tu aimerais plutôt offrir… » : Quelque chose d'utile (trait `utile`) ; Quelque chose d'original (trait `original`) ; Quelque chose à découvrir (trait `decouverte`) ; « Peu importe » (neutre).

Une réponse peut être désélectionnée en recliquant. Choisir un véritable intérêt masque immédiatement les questions et remet les deux réponses à zéro. Les réponses sont aussi effacées lors d'une nouvelle recherche, de « Surprends-moi » ou d'une occasion rapide.

## Adaptation

Le calcul existant est conservé. Un cadeau compatible reçoit **+6 points** s'il porte au moins un des intérêts associés à la première réponse, et **+5 points** s'il porte le trait associé à la seconde ; maximum **+11**. Les réponses neutres et les questions laissées sans réponse donnent zéro. Ces bonus ne s'appliquent que si « Je ne sais pas » est sélectionné et qu'aucun intérêt réel n'est choisi. Ils ne changent ni `eligible`, ni le nombre de résultats, ni les bonus/malus des feedbacks 2.1. Un intérêt réel explicite garde son poids de 40 points. Aucun nouveau stockage local, tracking, appel réseau ou métadonnée produit n'est ajouté.

## Fichiers modifiés

- `index.html` : deux groupes de réponses facultatives à l'étape 4.
- `style.css` : présentation compacte réutilisant les couleurs et états des boutons d'intérêt, y compris en thème sombre.
- `script.js` : affichage, sélection et réinitialisation des réponses dans l'état courant.
- `recommendations.js` : deux bonus bornés dans `score`.
- `tests/unknown.test.cjs` : effets des réponses et couverture des profils.
- `tests/unknown-browser.test.cjs` : parcours réel, responsive et thèmes.
- `docs/V2-PASSE2.2-RAPPORT.md` : présent rapport.

## Vérifications

- Sans réponse, score identique à l'ancien mode ; réponses neutres sans biais : **PASS**.
- Chaque réponse active apporte le bonus annoncé seulement aux cadeaux correspondants ; cumul maximal +11 : **PASS**. Les classements réels changent pour chacun des sept indices actifs, selon le profil : créatif 59/64, tech 52/64, cuisine 47/64, sport/plein air 46/64, utile 46/64, original 17/64, découverte 58/64.
- Aucun filtre ou profil vidé par les réponses : **PASS**, 512 combinaisons de profil et d'indice vérifiées ici ; les 1 152 profils de la suite de régression existante restent valides.
- Passage de « Je ne sais pas » à un intérêt réel : affichage masqué et réponses réinitialisées : **PASS**.
- Catalogue inchangé : 320 cadeaux et 320 ASIN uniques ; liens Amazon inchangés : **PASS**.
- Tests de régression Passe 2.1, favoris et Surprends-moi : **PASS**.
- Navigateur 390 / 768 / 1280 px, clair / sombre : nouveau parcours testé dans les six combinaisons ; suite complète avec 108 clics d'intérêts, 12 multisélections, six contrôles d'exclusivité « Je ne sais pas », favoris, Surprends-moi et feedbacks. Aucun débordement horizontal, erreur console ou lien local en échec : **PASS**.
- Syntaxe JavaScript et `git diff --check` : **PASS**.

## Limites

Les catégories sont volontairement larges et certaines tranches strictes peuvent comporter peu ou aucun cadeau portant un indice choisi. Dans ce cas, la réponse n'ajoute simplement aucun bonus : la sélection compatible reste disponible et aucun résultat artificiel n'est créé. La réponse ne prédit pas les goûts de la personne ; les feedbacks permettent ensuite d'affiner la session.

## Correctif après validation manuelle

Le premier test navigateur ouvrait l'étape 4 en affectant directement l'état JavaScript, puis utilisait `locator.click()` de Playwright. Celui-ci faisait défiler automatiquement le bouton avant de cliquer. `isVisible()` confirmait seulement que les questions n'étaient pas masquées par CSS ; il ne vérifiait pas qu'elles étaient dans la fenêtre. En usage réel, l'utilisateur peut cliquer sur le dernier intérêt près du bas de l'écran : à 390 × 844 px, avant correction, les deux titres étaient à environ 861 et 1 026 px, donc hors écran. Ni le scoring, ni la classe `hidden`, ni le passage d'étape n'étaient en cause.

Lorsqu'un clic révèle les questions, `toggleInterest` recentre désormais immédiatement leur bloc **seulement s'il est hors fenêtre**. Aucun délai artificiel ni changement de score. Le nouveau test suit les quatre étapes par de vrais clics, positionne « Je ne sais pas » en bas de fenêtre comme dans la reproduction, utilise un clic souris sans auto-défilement Playwright et vérifie les deux titres **avant** génération. Il couvre aussi sélection, désélection, neutralité, basculement vers un intérêt réel, six combinaisons largeur/thème, puis une génération avec deux réponses actives comparée à un classement sans indice. Résultat : **PASS**, sans erreur console ni débordement.
