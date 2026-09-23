# TrouveUnCadeau — bilan Passe 1.5

17 septembre 2026 — version locale, aucun commit ni push.

## 1–6. Catalogue et validation Amazon

- Avant : **173 cadeaux** ; après : **275** ; ajoutés : **102**.
- **275 IDs uniques, 275 ASIN uniques, 275 liens directs Amazon.fr /dp/ASIN**, tous avec `tag=trouvetonca05-21` ; aucune recherche dans le catalogue actuel. Fallback de recherche préservé et testé ; `rel="noopener noreferrer sponsored"` préservé.
- Lots contrôlés successivement : A 27 (bricolage/auto), B 22 (jardin/maison), C 33 (enfants/couples), D 20 (outdoor/photo/créatif).
- Les 102 nouvelles fiches ont été ouvertes et leur offre disponible observée. Aucun prix précis, stock, avis ou note ajouté au site. Les budgets restent indicatifs. Les 173 anciennes URLs restent identiques ; leurs offres n’ont pas toutes été revérifiées commercialement pendant cette passe.
- [Inventaire des 102 produits, liens et candidats écartés](catalogue-sources-passe1.5.md). Neuf candidats insuffisamment établis sont exclus, pas présentés comme indisponibles. Aucun ASIN supposé.
- 275 plutôt que 300 : arrêt sur un lot cohérent validé ; aucune référence douteuse ajoutée pour remplir un quota.

## 7. Cadeaux par intérêt

Un cadeau peut appartenir à plusieurs intérêts ; les colonnes ne s’additionnent donc pas à 275.

| Intérêt | Avant | Après |
|---|---:|---:|
| jeux-video | 17 | 18 |
| manga | 14 | 14 |
| technologie | 32 | 38 |
| voyage | 36 | 47 |
| lecture | 31 | 34 |
| cuisine | 27 | 32 |
| animaux | 16 | 19 |
| sport | 28 | 28 |
| musique | 15 | 21 |
| cinema | 18 | 17 |
| bricolage | 1 | 19 |
| jardinage | 4 | 19 |
| auto-moto | 2 | 18 |
| creatif-diy | 13 | 28 |
| maison-deco | 11 | 24 |
| photo-video | 11 | 19 |
| nature-outdoor | 11 | 23 |

## 8–9. Budgets et destinataires

| Budget | Avant | Après |
|---|---:|---:|
| <20 | 30 | 78 |
| 20-50 | 52 | 90 |
| 50-100 | 59 | 69 |
| >100 | 32 | 38 |

| Destinataire | Avant | Après |
|---|---:|---:|
| homme | 132 | 208 |
| femme | 145 | 221 |
| couple | 38 | 58 |
| enfant | 43 | 71 |
| famille | 1 | 1 |
Destinataires non exclusifs. La valeur historique « famille » (1 produit, ID 146) ne correspond pas à un choix de destinataire du quiz : anomalie conservée à documenter pour une correction ciblée ultérieure.

## 10–11. Couverture enfants et couples

Candidats compatibles sans filtre d’intérêt ; chaque cellule indique avant → après.

| Destinataire / âge | <20 | 20–50 | 50–100 | >100 |
|---|---:|---:|---:|---:|
| enfant 0-3 | 1 → 8 | 1 → 3 | 1 → 2 | 1 → 1 |
| enfant 4-7 | 1 → 5 | 5 → 9 | 3 → 5 | 2 → 2 |
| enfant 8-12 | 11 → 17 | 8 → 11 | 7 → 8 | 4 → 4 |
| enfant 13-17 | 15 → 18 | 8 → 12 | 8 → 8 | 4 → 4 |
| couple 18-25 | 5 → 14 | 4 → 11 | 6 → 9 | 1 → 2 |
| couple 26-35 | 5 → 14 | 8 → 15 | 13 → 16 | 10 → 11 |
| couple 36-50 | 5 → 14 | 8 → 15 | 13 → 16 | 12 → 13 |
| couple 50+ | 1 → 10 | 5 → 12 | 9 → 12 | 11 → 12 |

Les tranches 0–3 et 4–7 restent insuffisantes, surtout au-delà de 50 €. Ne pas élargir les âges pour combler ces trous. Un article indiqué dès 12/18 mois n’est pas destiné dès la naissance : la description rappelle les limites lorsqu’elles sont établies ; les parents doivent vérifier l’étiquetage. Une revue des âges historiques reste utile (ex. LEGO ID 91, minimum produit plus fin que la tranche 8–12).

## 12–18. Couverture des sept intérêts prioritaires par budget

Totaux tous destinataires/âges confondus : ce tableau ne garantit pas autant de candidats pour un profil particulier. Exemple : bricolage 20–50 compte 8 produits mais 5 pour Homme 26–35.

| Intérêt | <20 | 20–50 | 50–100 | >100 |
|---|---:|---:|---:|---:|
| bricolage | 6 | 8 | 3 | 2 |
| auto-moto | 6 | 8 | 1 | 3 |
| jardinage | 5 | 12 | 1 | 1 |
| maison-deco | 10 | 9 | 3 | 2 |
| nature-outdoor | 8 | 8 | 4 | 3 |
| photo-video | 6 | 2 | 7 | 4 |
| creatif-diy | 13 | 9 | 5 | 1 |

## 19–21. Couverture des 1 152 combinaisons

Correspondance stricte destinataire × âge × budget × intérêt (17 intérêts + sans intérêt). Les suggestions de complément hors intérêt ne sont pas comptées comme couverture. Certaines combinaisons, notamment bébé + auto/moto, ne justifient pas un enrichissement artificiel.

| Candidats correspondants | Avant | Après |
|---|---:|---:|
| 0 | 506 | 359 |
| 1-4 | 482 | 496 |
| 5-9 | 124 | 224 |
| 10+ | 40 | 73 |

[Les 1 152 lignes, avec tous les profils demandés et leurs mesures](V2-PASSE1.5-couverture.md) — [distributions JSON](V2-PASSE1.5-statistiques.json).

## 22. Répétition et pertinence

20 générations par profil, même moteur et même graine aléatoire, catalogue 173 comparé au catalogue 275. 46 080 sélections simulées. Âge, budget et destinataire conformes aux métadonnées dans chaque sélection ; maximum 10 résultats uniques. La conformité aux métadonnées n’est pas une certification des âges fabricants historiques.

| Profil | Candidats intérêt avant → après | Répétition % avant → après | Pertinence intérêt % avant → après |
|---|---:|---:|---:|
| homme 26-35, 20-50, bricolage | 0 → 5 | 0 → 50 | 0 → 50 |
| homme 26-35, 20-50, auto-moto | 1 → 8 | 10 → 80 | 10 → 80 |
| homme 26-35, 20-50, sans intérêt | 33 → 64 | 0 → 0 | 100 → 100 |
| enfant 8-12, <20, sans intérêt | 11 → 17 | 90 → 30 | 100 → 100 |
| enfant 8-12, 20-50, sans intérêt | 8 → 11 | 100 → 90 | 100 → 100 |

La répétition peut augmenter quand les vrais produits de l’intérêt deviennent prioritaires : auto/moto passe de 1 à 8 correspondances, donc huit références reviennent dans une liste de dix. Ce n’est pas une régression de l’anti-répétition : avec moins de dix produits correspondants, le moteur conserve la pertinence. Le prochain lot doit surtout accroître ces petits ensembles. Avec dix candidats ou moins au total, une génération peut légitimement se répéter intégralement.

## 23–24. Descriptions et associations historiques

39 descriptions réécrites individuellement ; formulations « cadeau physique précis » : 82 → 43. IDs : 2, 3, 9, 10, 11, 12, 13, 15, 17, 18, 25, 30, 35, 36, 44, 45, 46, 47, 50, 55, 58, 84, 87, 94, 95, 97, 114, 116, 117, 125, 140, 142, 149, 150, 151, 156, 158, 164, 165. Les 102 nouvelles descriptions expliquent l’usage cadeau.

| ID | Produit | Intérêts avant | Après |
|---|---|---|---|
| 106 | Mini-serre de semis avec éclairage | cuisine, animaux | jardinage |
| 116 | Volant de simulation avec pédalier | technologie, sport, voyage, auto-moto | jeux-video, auto-moto, technologie |
| 125 | Micro-cravate pour smartphone | lecture, cinema, musique, photo-video | photo-video, musique, technologie |
| 150 | Kit d’outils pour bonsaï | animaux, voyage, jardinage | jardinage |
| 156 | Jardin aromatique intérieur | cuisine, animaux, jardinage | jardinage, cuisine |

## 25. Fichiers de cette passe

- `index.html` : un seul groupe de 18 choix ; suppression Voir plus/moins ; « Je ne sais pas » en dernier.
- `script.js` : suppression de la fonction de dépliage devenue inutile ; 39 descriptions et cinq associations ciblées.
- `style.css` : suppression de l’unique règle `.interests-more` devenue inutilisée ; aucune refonte.
- `catalog-extra.js` : 102 références et métadonnées complètes ; familles d’objets distinctes, pas des variantes de couleur/capacité.
- `tests/recommendations.test.cjs`, `tests/browser.test.cjs` : adaptation du total et des tests UI.
- Nouveaux tests/fixtures : `tests/catalogue-coverage.test.cjs`, `tests/fixtures/catalogue-173.json`, `tests/fixtures/catalogue-editorial-changes.json`.
- Documentation : ce rapport, `docs/V2-PASSE1.5-couverture.md`, `docs/V2-PASSE1.5-statistiques.json`, `docs/catalogue-sources-passe1.5.md`.

Le dépôt contient aussi les changements locaux de la Passe 1 antérieure : ils ne sont pas des modifications de cette Passe 1.5. Comparaison SHA-256 : 24 autres fichiers de premier niveau inchangés depuis le début de cette passe, dont moteur, guides, sitemap, robots, ads.txt et CNAME. Scripts Analytics/AdSense/consentement comparés sans différence par les tests.

## Tests et performance

- Syntaxe Node : script, catalogue, moteur et trois fichiers de tests valides.
- Tests moteur : 275 IDs/ASIN/liens uniques, tags, fallback, exclusion, feedback, stockage malformé/quota, 1 152 profils ; conservation des champs protégés des 173 références antérieures.
- Navigateur réel Edge : 108 clics/sélections/recherches individuels (18 × 3 tailles × 2 thèmes), état interne et intérêt reçu par le moteur contrôlés ; 12 multisélections ; six tests d’exclusivité « Je ne sais pas ».
- 390, 768 et 1280 px, clair/sombre : aucun débordement horizontal ; captures inspectées visuellement. Tous les intérêts sont dépliés, avec défilement vertical normal sur mobile ; CTA accessible.
- Surprise, favoris persistants/suppression, feedback, nouvelle recherche, cinq occasions, modales, FAQ et guides testés.
- Aucune erreur JavaScript ni ressource locale manquante dans les tests navigateur isolés. Services externes neutralisés uniquement dans le banc de test pour ne pas envoyer de faux événements Analytics/AdSense ; leur fonctionnement réseau en production n’est pas certifié par ce test.
- Calcul local de sélection environ 0,16 ms en moyenne dans le test machine ; ce n’est pas un score Lighthouse ni une mesure réseau mobile. Dix résultats maximum, lazy loading et architecture inchangés.
- `git diff --check` valide. Aucun commit/push ; HEAD conservé : `6f27b1c50239cfb59c05d61bb56c14ac50b081a8`.

## 26–27. Limites et prochain lot recommandé

1. Priorité enfants 0–3 / 4–7 : références aux âges explicitement établis, surtout 20–50 et 50–100 ; puis enfants plus âgés >50. Ne pas promettre dix choix lorsqu’ils n’existent pas.
2. Bricolage et auto/moto : encore 19 et 18 au total ; renforcer les profils/budgets précis sous dix correspondances, et les accessoires réellement moto (lot actuel surtout auto).
3. Couple 18–25 : seulement neuf candidats 50–100 et deux >100 ; compléter avec usages partagés crédibles, sans affecter arbitrairement tous les objets maison aux couples.
4. Photo 20–50, jardinage >50 et créativité premium restent peu fournis ; utiliser le tableau complet pour sélectionner les besoins réels.
5. Terminer les 43 descriptions historiques génériques ; revoir quelques associations issues de la table d’enrichissement du moteur (ex. ID 95 snorkeling associé au créatif, ID 70 ukulélé associé à outdoor). Moteur laissé intact conformément au périmètre de cette passe.
6. Revalider les offres des références historiques et les budgets avant publication ; stock et prix Amazon ne sont jamais permanents. Les 102 nouveaux produits sans image fiable utilisent le fallback existant. Certaines illustrations historiques restent peu représentatives du produit ; conservées sans inventer d’images. Les étoiles historiques du carrousel ne constituent pas des notes Amazon vérifiées et méritent une clarification dans une future passe UI, non modifiées ici.

Serveur local : **http://127.0.0.1:4173/**. Validation utilisateur attendue avant toute publication.

