# V2 — Passe 1 : état local testable, catalogue encore incomplet

État au 16 septembre 2026. **Aucun commit ni push.** La version en production n'est pas modifiée.

## Synthèse

Le moteur, les nouveaux intérêts, les avis locaux et les guides sont intégrés et testés localement. La cible de 500–600 idées n'est **pas atteinte** : le catalogue passe de 165 à **173 cadeaux**, avec 8 nouvelles correspondances produit/ASIN documentées. Cette livraison ne doit donc pas être considérée comme la réalisation complète de l'objectif catalogue. Les offres et stocks actuels ne sont pas garantis.

## 1. Fichiers modifiés et créés

Fichiers existants modifiés :

- `index.html` : 7 intérêts supplémentaires, « Je ne sais pas », extension « Voir plus », actions de nouvelle sélection/réinitialisation, aide vers les guides et messages de budget/FAQ adaptés. Ordre de page inchangé.
- `script.js` : intégration du moteur, historique et feedback, remplacement des cartes, surprise, explications de sélection, stockage du thème protégé contre les erreurs, complément factuel de confidentialité.
- `style.css` : styles compacts des nouvelles actions utilisant les variables existantes ; lisibilité des paragraphes et liens des guides. Aucune nouvelle palette ou refonte de mise en page.
- `cadeau-homme.html`, `cadeau-femme.html`, `cadeau-couple.html`, `cadeau-enfant.html` : lien vers le sommaire des guides et reprise du thème choisi. Suppression d'un nombre de catalogue figé dans le guide homme ; textes de fond conservés.
- `sitemap.xml` : les cinq nouvelles pages ajoutées.

Nouveaux fichiers :

- `recommendations.js` : moteur de sélection indépendant du DOM.
- `catalog-extra.js` : huit références supplémentaires et leurs métadonnées.
- `guide-theme.js` : réutilisation du thème sans charger le catalogue dans les guides.
- `guides.html` : sommaire des conseils par situation et destinataire.
- `cadeau-quelquun-qui-a-tout.html`
- `budget-cadeau-anniversaire.html`
- `cadeau-personne-peu-connue.html`
- `cadeau-utile-ou-original.html`
- `tests/recommendations.test.cjs` et `tests/browser.test.cjs`
- `docs/catalogue-sources.md` et le présent `docs/V2-PASSE1-RAPPORT.md`.

## 2–3. Catalogue avant/après et nouveaux cadeaux

**165 → 173, soit +8.** Les 165 titres, descriptions, images déclarées, destinataires, tranches d'âge normalisées, budgets et liens Amazon existants restent identiques. Des intérêts complémentaires et métadonnées sont ajoutés sans retirer les anciens intérêts.

Les ajouts sont : perceuse-visseuse Bosch EasyDrill 1200 ; arrosage Gardena Micro-Drip S ; adaptateur automobile Veepeak OBDCheck BLE ; machine à coudre Brother JX17FE ; trépied smartphone Amazon Basics ; éclairage PEYOU ; support vidéo horizontal Elitehood ; jumelles enfant Buki BN009. Ce sont des usages distincts, pas huit variantes d'un produit.

## 4. Répartition par intérêt

Un cadeau peut appartenir à plusieurs intérêts : les nombres ne s'additionnent pas au total du catalogue.

| Intérêt | Cadeaux |
|---|---:|
| jeux-video | 17 |
| manga | 14 |
| technologie | 32 |
| voyage | 36 |
| lecture | 31 |
| cuisine | 27 |
| animaux | 16 |
| sport | 28 |
| musique | 15 |
| cinema | 18 |
| bricolage | 1 |
| jardinage | 4 |
| auto-moto | 2 |
| creatif-diy | 13 |
| maison-deco | 11 |
| photo-video | 11 |
| nature-outdoor | 11 |

**Couverture encore faible** : bricolage (1), auto/moto (2), jardinage (4), jeunes enfants et plusieurs profils couple. L'affichage des nouveaux intérêts ne signifie pas qu'ils disposent déjà chacun d'un catalogue complet.

## 5. Répartition par budget

Catégories éditoriales, sans prix Amazon actualisé.

| Budget | Cadeaux |
|---|---:|
| <20 | 30 |
| 20-50 | 52 |
| 50-100 | 59 |
| >100 | 32 |

## 6–8. Amazon, ASIN et références à contrôler

- 173 IDs uniques ; **173 ASIN uniques**.
- **173 liens directs** au format Amazon.fr /dp/ASIN.
- Tag `trouvetonca05-21` présent sur chacun.
- Aucun lien de recherche utilisé par le catalogue actuel ; fallback recherche testé lorsque le champ direct est vide.
- `rel="noopener noreferrer sponsored"` conservé et contrôlé sur les cartes.
- Les 165 liens historiques sont comparés exactement avec HEAD.
- Les 8 nouveaux ASIN sont reliés à des sources identifiables. Trois correspondances reposent notamment sur des sources tierces ; les autres sur des fiches Amazon indexées.
- **Pas de certification de disponibilité actuelle**, ni des huit ajouts ni des références historiques. Certaines sources sont anciennes ou les ouvertures directes échouent. Aucune promesse de stock ou de tarif en direct.
- Détail des liens, sources et pistes non intégrées dans [catalogue-sources.md](catalogue-sources.md).

## 9. Métadonnées

Chaque cadeau est enrichi avec `family`, `univers`, `traits` et `occasions`. Les champs historiques restent compatibles. Les familles regroupent les usages proches pour réduire leur présence simultanée.

Traits utilisés selon les cas : utile, pratique, original, valeur_sure, passion, sentimental, personnalisable, creatif, decoration, decouverte et experience_maison. Les tableaux peuvent recevoir d'autres traits sans changement de structure. On ne force pas les labels « premium » ou « drôle » faute d'évaluation spécifique.

L'enrichissement des anciennes références est en partie heuristique et éditorial ; il ne constitue pas une analyse exhaustive de chaque fiche marchande. Des associations d'intérêts anciennes restent discutables (par exemple les outils pour bonsaï associés aux animaux/voyage). Elles ne sont pas corrigées silencieusement dans cette passe.

## 10. Sélection et diversité

Genre/destinataire, âge et budget sont des filtres stricts. Les produits déclarés déjà possédés et les refus de la recherche en cours sont exclus.

Score : base 75, jusqu'à 3 intérêts communs à +40 chacun, originalité ×0,4, +10 pour une valeur sûre sans intérêt choisi, +7 si occasion renseignée et correspondante, +5 découverte en mode surprise, variation aléatoire limitée à 4 points. Les pénalités d'historique et d'avis s'appliquent ensuite.

La construction des dix résultats favorise d'abord les candidats ayant au moins un intérêt commun. Elle pénalise ensuite les familles et univers déjà représentés (−15 et −4 par répétition), avec un petit bonus de nouvel univers. S'il manque des correspondances d'intérêt, des alternatives respectant les autres filtres complètent la sélection ; un message le précise. Le moteur ne modifie pas le budget ou l'âge pour remplir dix cartes.

Les occasions existantes conservent leurs profils prédéfinis. L'affinage par occasion repose encore sur peu de métadonnées ; Noël/anniversaire sont très largement communs. Ce n'est pas une personnalisation saisonnière exhaustive.

## 11. Anti-répétition

Historique limité aux 12 derniers lots d'affichage, au plus 10 IDs par lot. Une sélection complète ou un remplacement y ajoute un lot. Une apparition récente retire jusqu'à 24 points ; plusieurs apparitions peuvent cumuler leurs pénalités. Les plus anciens lots sortent automatiquement.

L'historique est partagé entre les recherches de ce navigateur, sans rendre définitivement un produit inaccessible. « D'autres idées » garde les critères et les refus de la recherche en cours.

## 12. Feedback et remise à zéro

- **Bonne idée** : bonus léger pour des univers ou traits spécifiques similaires, plafonné à +8.
- **Pas son style** : −65 sur le produit lors des prochaines recherches du profil, −8 sur sa famille ; exclusion immédiate pendant la recherche en cours et remplacement si possible.
- **Il/elle l'a déjà** : exclusion pour ce profil, y compris après rechargement.
- **Réinitialiser les préférences** : efface historique et avis, sans supprimer favoris ou thème.

Le profil est volontairement simple : destinataire + tranche d'âge, pas une personne identifiée. Deux personnes du même type/âge partageront donc les avis dans un même navigateur ; cette limite est expliquée près des résultats. Une gestion individuelle des personnes relève de la passe 2.

## 13. Nouveaux intérêts

Bricolage, jardinage, auto/moto, créatif/DIY, maison/déco, photo/vidéo, nature/outdoor. « Je ne sais pas » est exclusif des intérêts sélectionnés et ne participe pas comme un faux intérêt au score. Le moteur utilise alors les autres critères, la diversité et les valeurs sûres.

## 14–15. Guides et SEO

Quatre nouveaux guides pratiques substantiels et un sommaire, avec méthodes, exemples et points de vigilance. Les articles ne dépendent pas de clics affiliés pour apporter de l'information.

Les huit guides et leur sommaire sont reliés à l'accueil/générateur ; les nouveaux guides sont aussi reliés entre eux. Un H1 par page, title, description, canonical et Open Graph présents ; cinq nouvelles URLs au sitemap. Pas de pages créées en série, pas de fausses notes ou statistiques. Aucun changement de robots.txt. Ces améliorations ne garantissent pas une approbation AdSense.

## 16. localStorage et confidentialité

Nouvelles clés : `ttc_recent_gifts_v2` et `ttc_gift_feedback_v2`. Maximum 12 lots d'historique, 24 groupes d'avis et 100 avis par groupe. JSON mal formé, stockage bloqué et dépassement de quota sont gérés ; le moteur continue en mémoire si nécessaire.

Les clés historiques de favoris et de thème sont conservées. Le nouveau moteur ne transmet pas les registres complets d'historique et d'avis au réseau. Les événements Analytics préexistants restent actifs : un remplacement peut notamment déclencher gift_rejected avec l'ID et le titre du cadeau. Le paragraphe de stockage local précise cette distinction, les limites et la remise à zéro. Mentions légales et Contact inchangés ; paragraphes Analytics/AdSense/Amazon inchangés.

## 17. Tests et performances

Tests exécutés avec Node et Microsoft Edge via Playwright :

- Syntaxe des quatre scripts applicatifs : valide.
- 1152 combinaisons destinataire/âge/budget/intérêt : unicité et filtres stricts validés ; nombre de résultats égal au minimum de 10 et du nombre de candidats.
- Comparaison exacte des données historiques protégées ; liens directs et fallback Amazon validés.
- JSON corrompu, stockage indisponible, feedback positif/négatif/déjà possédé, séparation des profils et bornes d'historique testés.
- Parcours navigateur réel : quatre étapes, sept intérêts, multisélection, « Je ne sais pas », résultat de dix cartes, recherche répétée, trois feedbacks, rechargement, favoris, surprise, cinq occasions, FAQ, modales légales et remise à zéro.
- Liens locaux HTML : aucun fichier cible manquant ; pages du sitemap vérifiées.
- **0 erreur JavaScript/console et 0 réponse HTTP locale en erreur dans le scénario testé.**
- `git diff --check` : réussi.
- Sélection pure mesurée autour de 0.09 ms par génération sur cette machine (100 appels ; ce n'est pas un benchmark mobile ou une mesure de chargement Internet).
- Pas de rendu des 173 cartes d'un coup : dix résultats au maximum, chargement paresseux des images conservé, nouveaux produits sans photo utilisant le fallback.
- Environ 141 Ko de JavaScript applicatif non compressé au total. Les guides ne chargent pas les deux fichiers catalogue/moteur ni script.js.

Les requêtes externes sont neutralisées dans les tests navigateur pour éviter l'envoi d'événements de test à Analytics et la diffusion d'annonces. Ces tests ne valident donc ni le réseau Amazon, ni la diffusion publicitaire, ni le consentement fourni par un service externe. Les scripts Google présents sont comparés avec la version initiale et sont inchangés.

### Comparaison statistique à catalogue constant

40 générations successives par profil sur les **165 références historiques**, avec graine pseudo-aléatoire reproductible. Taux = proportion de produits également présents dans la génération précédente, pas simplement l'ordre des cartes.

| Profil | Répétition avant → après | Cadeaux distincts avant → après |
|---|---|---|
| homme, 26-35, 20-50, sans intérêt | 37% → 0% | 30 → 30 |
| femme, 26-35, 20-50, lecture | 91% → 90% | 21 → 26 |
| couple, 36-50, >100, sans intérêt | 91% → 90% | 11 → 11 |
| enfant, 8-12, 20-50, sans intérêt | 100% → 100% | 8 → 8 |

La répétition de 100 % chez l'enfant vient des huit candidats seulement : on ne peut pas en afficher dix différents. Le profil lecture conserve neuf correspondances de passion parmi dix résultats, d'où une répétition élevée malgré le renouvellement des alternatives. **Le scoring ne remplace pas l'élargissement du catalogue.**

## 18. Mobile et rendu

Accueil/résultats/modales testés en 390, 768 et 1280 px, thèmes clair et sombre ; guides parcourus en 390 px dans les deux thèmes. Captures de l'accueil, des résultats et du sommaire inspectées visuellement. Aucun débordement de page observé après stabilisation des transitions. Le carrousel conserve son défilement horizontal interne.

Les couleurs, le header et l'ordre cadeau du jour → occasions → générateur → idées originales sont conservés. Seules les actions demandées et leurs petits styles sont ajoutés. Les images historiques ne sont pas remplacées : leur service externe peut utiliser des photos d'ambiance, pas nécessairement une photographie du produit exact.

## 19. Limites et contrôles avant publication

1. **Catalogue 500–600 non réalisé : 173 seulement.** Priorité à la recherche de références fiables, surtout enfants, couples à petit budget et nouveaux intérêts.
2. Contrôle manuel des huit offres Amazon proposées, de leur budget et de leur disponibilité avant publication.
3. Métadonnées et descriptions historiques encore inégales : 82 descriptions contiennent la formulation technique « cadeau physique précis ». Leurs textes ont été conservés, pas présentés comme nouvellement améliorés.
4. Les tranches « 0–3 ans » restent trop larges pour garantir à elles seules l'adaptation à chaque enfant ; vérifier les notices fabricant. Les filtres existants n'ont pas été artificiellement élargis.
5. Les compteurs Fête des Mères/Pères utilisent encore des dates fixes historiques. Ce comportement préexistant est conservé ici ; une correction calendaire annuelle mérite une passe séparée.
6. Aucun test terrain TikTok, appareil physique ou réseau mobile ralenti ; aucune garantie d'acceptation AdSense.
7. Les réglages Analytics/AdSense/consentement sont conservés, pas audités juridiquement dans ce travail.

## 20. Suite conseillée

Avant de développer des comptes ou un backend : terminer la qualification du catalogue par lots, corriger les étiquettes historiques incohérentes, remplacer les descriptions techniques par des conseils propres à chaque produit, puis refaire les statistiques par intérêt et tranche d'âge.

Pour la passe 2 : profils de destinataires réellement distincts, comparaison simple de finalistes, puis calendrier/SOS cadeau selon les priorités retenues. Ne pas ajouter de collecte distante avant d'avoir défini les besoins et les règles de confidentialité.

## Voir le site localement

Le serveur est lancé uniquement sur cette machine :

**http://127.0.0.1:4173/**

Si vous fermez la session et devez le relancer dans PowerShell :

```powershell
Set-Location 'C:\Users\jimmy\Documents\Codex\2026-08-11\github-plugin-github-openai-curated-remote-2\work\trouvetoncadeau'
& 'C:\Users\jimmy\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 4173 --bind 127.0.0.1
```

Pour les tests du moteur, depuis ce répertoire :

```powershell
& 'C:\Users\jimmy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tests/recommendations.test.cjs
```

Pour les tests navigateur (serveur déjà lancé) :

```powershell
$env:PLAYWRIGHT_MODULE='C:\Users\jimmy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\playwright'
& 'C:\Users\jimmy\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tests/browser.test.cjs
```

Aucun commit/push. La production reste sur la version précédente ; les modifications attendent votre essai local.
