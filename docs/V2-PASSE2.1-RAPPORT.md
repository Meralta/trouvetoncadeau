# V2 — Passe 2.1 : recommandations adaptatives

## Avant / après

Le moteur filtrait déjà par destinataire, âge et budget, appliquait les intérêts choisis, conservait douze sélections récentes et enregistrait les avis par destinataire et âge. « Déjà possédé » excluait le produit. « Pas son style » retirait la carte pendant la recherche et imposait surtout un malus à l'ID exact ; « Bonne idée » n'apportait qu'un faible bonus (au plus 8 points) aux thèmes proches. Le bouton « D'autres idées » régénérait déjà la liste.

Désormais, les avis « Bonne idée » et « Pas son style » influencent davantage le **classement** des idées compatibles, par similarité fondée uniquement sur les métadonnées présentes : intérêts, famille d'usage, univers et traits spécifiques. Aucun avis ne modifie les filtres stricts. Les idées aimées restent visibles après le clic mais sont exclues de la prochaine génération de la même recherche. Un refus remplace immédiatement sa carte ; la possession exclut le seul ID, sans malus sur ses proches. La confirmation discrète indique comment afficher les idées suivantes.

## Logique exacte

1. `eligible` impose genre, âge, budget ; les IDs refusés de la recherche et les produits possédés sont écartés. Les IDs aimés dans cette recherche sont aussi écartés des générations suivantes.
2. Le score de base reste `75 + 40 × nombre d'intérêts correspondants (maximum 3) + 0,4 × originalité`, avec les ajustements déjà présents pour occasion, surprise et historique. Le moteur privilégie toujours les cadeaux correspondant à un intérêt sélectionné tant qu'il en reste.
3. Similarité d'un avis avec un candidat : `4 × intérêts communs + 3` si même famille + `2` si même univers + `2 × traits spécifiques communs` (maximum deux traits), bornée à 12. Les traits génériques « passion », « original », « utile » et « pratique » ne comptent pas.
4. Chaque ❤️ ajoute cette similarité (maximum cumulé **+18**). L'ID aimé lui-même reçoit seulement +2 dans le score théorique ; l'interface l'exclut de la prochaine génération de la recherche.
5. Chaque ❌ retranche `min(8 ; 0,7 × similarité)` aux autres cadeaux (maximum cumulé **−16**). Son ID reçoit aussi le malus historique de −65 dans le score, mais l'exclusion de session est la protection déterminante. Aucun intérêt/famille entière n'est exclu.
6. « Déjà possédé » ne contribue ni au bonus ni au malus. Le moteur exclut son ID pour ce profil. L'anti-répétition et la diversification par famille/univers, avec la part aléatoire préexistante de 0 à 4 points, restent en place.

Ces bornes laissent le poids principal aux intérêts explicites (40 points chacun) et évitent une spécialisation excessive après plusieurs avis. Le changement dans `recommendations.js` est limité à la fonction de similarité et aux bonus/malus du score ; `select` et ses contraintes ne sont pas réécrits.

## Stockage local

- `ttc_recent_gifts_v2` : historique anti-répétition, au plus 12 groupes de 10 IDs.
- `ttc_gift_feedback_v2` : avis `good`, `style`, `owned` par genre et âge, au plus 24 profils et 100 avis par profil. Le dernier avis d'un même ID remplace l'ancien.
- `rejectedIds` et `likedIds` : exclusions en mémoire pour la recherche courante, réinitialisées au nouveau quiz, à « Surprends-moi », à une occasion rapide ou à la réinitialisation des préférences. Aucun identifiant personnel, nouvelle clé, API ou tracking n'a été ajouté.
- Si le stockage est indisponible ou mal formé, le moteur continue avec une mémoire vide ou uniquement en mémoire vive.

## Fichiers modifiés

- `recommendations.js` : score adaptatif borné.
- `script.js` : exclusion temporaire des cadeaux aimés et confirmation visuelle discrète.
- `tests/adaptive.test.cjs` : scénarios déterministes et parcours sur le catalogue réel.
- `tests/browser.test.cjs` : vérification supplémentaire qu'un ❤️ n'est pas immédiatement reproposé.
- `docs/V2-PASSE2.1-RAPPORT.md` : présent rapport.

## Scénarios et résultats

- Génération → ❤️ → nouvelles idées : idée aimée absente de la suite, proche favorisée ; **PASS**.
- Génération → ❌ → remplacement / nouvelles idées : ID absent et proche moins prioritaire ; **PASS**.
- Génération → déjà possédé → nouvelles idées : ID absent, score du proche inchangé ; **PASS**.
- Plusieurs ❤️ : deux thèmes continuent de recevoir des candidats, diversité de familles ; **PASS**.
- Plusieurs ❌ et mélange ❤️ + ❌ + possédé : pas de profil vidé artificiellement, exclusions respectées ; **PASS**.
- Changement de profil, intérêt « Je ne sais pas », stockage/rechargement, anti-répétition, favoris, « Surprends-moi » : vérifiés par les tests moteur et navigateur ; **PASS**.
- Catalogue : 320 cadeaux, 320 ASIN uniques, liens et tag inchangés ; **PASS**.
- Couverture : 1 152 profils, syntaxe JavaScript et `git diff --check` ; **PASS**.
- Navigateur : largeurs 390, 768, 1280 px ; thèmes clair et sombre ; contrôles de débordement, console et liens locaux ; **PASS**.

## Limites connues

Les avis sont regroupés par genre et tranche d'âge, et non par personne : une nouvelle recherche avec le même profil réutilise ces préférences jusqu'à « Réinitialiser les préférences ». Les profils naturellement peu fournis peuvent répéter certains cadeaux malgré l'historique ; aucun filtre strict n'est relâché pour les remplir. Les métadonnées existantes décrivent des ressemblances, pas les goûts réels d'une personne : l'adaptation reste volontairement modérée et explicable.
