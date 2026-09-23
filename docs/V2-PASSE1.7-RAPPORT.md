# TrouveUnCadeau — Rapport Passe 1.7

23 septembre 2026 — travail local, sans publication.

## Checkpoint avant modification

- Commit : `839aec4882f93ae0317988c2031885ce35aaba57` (`V2 checkpoint - passes 1 to 1.6 validated`).
- Branche : `main`.
- Tests avant sauvegarde : syntaxe JavaScript, moteur, 320 cadeaux/ASIN, 1 152 profils et suite navigateur complète réussis.
- Le commit contient l’ensemble des passes 1 à 1.6 validées. Aucun push effectué.

## Audit des pages existantes

Dix pages HTML existaient au checkpoint :

- `index.html` : accueil, générateur et conseils courts.
- `guides.html` : ancien sommaire éditorial.
- Destinataires : `cadeau-homme.html`, `cadeau-femme.html`, `cadeau-couple.html`, `cadeau-enfant.html`.
- Décision et situation : `cadeau-quelquun-qui-a-tout.html`, `cadeau-personne-peu-connue.html`, `cadeau-utile-ou-original.html`, `budget-cadeau-anniversaire.html`.

Le guide anniversaire couvre déjà le choix d’une enveloppe. Les pages génériques « moins de 20 € » et « moins de 50 € » n’ont donc pas été créées : elles auraient recoupé ce contenu et favorisé une logique de liste mince.

## Huit pages créées

| Page | Intention et raison |
|---|---|
| `cadeau-ado.html` | Choisir pour un 13–17 ans avec des contraintes spécifiques de goûts, autonomie, âge et compatibilité. |
| `cadeau-grands-parents.html` | Éviter les clichés liés à l’âge et partir des usages, souvenirs et moments partagés. |
| `cadeau-collegue.html` | Répondre aux contextes anniversaire, départ et Secret Santa sans être trop personnel. |
| `cadeau-noel.html` | Organiser plusieurs cadeaux, le budget global et les vérifications avant commande. |
| `cadeau-derniere-minute.html` | Décider rapidement sans inventer disponibilité ou délai et prévoir une solution honnête. |
| `cadeau-bricoleur.html` | Comparer atelier, projets, sécurité, batteries et accessoires avant un outil. |
| `cadeau-gamer.html` | Vérifier plateforme, édition, connectique, équipement et doublons. |
| `cadeau-cuisine.html` | Tenir compte des recettes, de la place, du nettoyage, des consommables et allergènes. |

Chaque page compte environ 495 à 540 mots visibles, possède un H1 unique, une introduction directe, des conseils, des erreurs à éviter, des exemples réels du catalogue, un CTA et quatre liens complémentaires. Aucun prix actuel, stock, note, avis ou statistique commerciale n’est affirmé.

## Navigation et connexion au générateur

- `guides.html` devient un hub organisé en quatre groupes : destinataire, occasion, passion et conseils.
- Toutes les nouvelles pages sont accessibles depuis le hub et se relient à deux à quatre guides pertinents.
- Les CTA ado, bricolage, gaming et cuisine transmettent des critères validés dans l’URL.
- Le préréglage ado ouvre l’étape budget avec « Enfant / 13–17 ans ». Les guides de passion conservent l’intérêt choisi pendant le questionnaire.
- Aucun résultat n’est lancé automatiquement ; l’utilisateur garde le contrôle et peut modifier ses choix.
- `recommendations.js`, le scoring et le catalogue de 320 cadeaux restent inchangés.

## SEO

Chaque nouvelle page possède :

- un `title`, une meta description et un H1 uniques ;
- une canonical absolue sur `https://trouveuncadeau.fr/` ;
- Open Graph cohérent, image existante et locale `fr_FR` ;
- `index, follow`, sans `noindex` ;
- des liens internes et un accès au générateur.

Le sitemap contient les 18 pages HTML indexables (accueil comprise). Le test automatique vérifie l’unicité des titles, descriptions et canonicals ainsi que l’existence de tous les liens locaux.

## Fichiers de la Passe 1.7

Modifiés :

- `guides.html`, `script.js`, `style.css`, `sitemap.xml`.
- `tests/browser.test.cjs`, `tests/recommendations.test.cjs`.

Créés :

- les huit pages listées plus haut ;
- `docs/V2-PASSE1.7-RAPPORT.md`.

Aucun fichier Amazon, AdSense, Analytics, consentement, mentions légales, catalogue ou moteur de recommandation n’a été modifié.

## Tests

- Syntaxe : `script.js`, `guide-theme.js` et tests — réussie.
- Moteur : 320 cadeaux, 320 ASIN uniques, 1 152 profils ; catalogue strictement identique au checkpoint — réussi.
- SEO et liens : un H1 par page, métadonnées uniques, canonical, sitemap et liens locaux — réussi.
- `git diff --check` — réussi (avertissements Windows LF/CRLF informatifs uniquement).
- Navigateur réel Edge : **réussi** pour la homepage, le générateur, le hub et les 17 guides à 390/768/1280 px, clair/sombre.
- Interactions : 108 contrôles individuels des intérêts, 12 multisélections, 6 contrôles d’exclusivité « Je ne sais pas », favoris, feedback, Surprends-moi, 5 occasions et modales — réussis.
- CTA préréglés : intérêt bricolage transmis et visible ; profil Enfant / 13–17 ans transmis avec ouverture à l’étape budget — réussis.
- 0 débordement horizontal, 0 erreur console/JavaScript et 0 ressource locale HTTP en échec.
- Services tiers isolés pendant les tests automatisés : aucun événement de test envoyé à Analytics ou AdSense.

## Limites et vérifications manuelles

- La qualité éditoriale et la navigation améliorent la valeur du site, sans garantir une acceptation AdSense.
- Les liens Amazon et la disponibilité commerciale évoluent ; les nouvelles pages ne prétendent pas les suivre en temps réel.
- Le préréglage de passion est volontairement discret : l’intérêt apparaît sélectionné à l’étape 4 et peut être retiré.
- Une relecture éditoriale personnelle reste utile pour confirmer le ton de marque avant publication.
- Aucun second commit et aucun push ne seront réalisés avant validation utilisateur.
