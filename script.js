/* =========================================================
   TrouveUnCadeau — script.js
   Base de données : 160+ idées cadeaux
   Logique : questionnaire 4 étapes + recommandation
   ========================================================= */

'use strict';

/* =========================================================
   BASE DE DONNÉES CADEAUX — V2
   Structure complète (Amélioration N°6 — préparation affiliation) :
   {
     id          : number        — identifiant unique
     titre       : string        — nom du cadeau
     emoji       : string        — icône emoji
     desc        : string        — description courte
     genre       : string[]      — 'homme'|'femme'|'couple'|'enfant'
     age         : string[]      — tranches adultes ou enfant selon le profil
     budget      : string        — '<20'|'20-50'|'50-100'|'>100'
     interets    : string[]      — centres d'intérêt correspondants
     originalite : number        — score 1-10
     image       : string        — URL image produit (optionnel, '' si vide)
     affiliateLink: string       — lien affilié (optionnel, '' = recherche Amazon)
   }
   budget : '<20' | '20-50' | '50-100' | '>100'
   genre  : 'homme' | 'femme' | 'couple' | 'enfant'
   ========================================================= */
const CADEAUX = [

  /* ── JEUX VIDÉO ── */
  { id:1, titre:"Manette DualSense PS5", emoji:"🎮", desc:"La manette emblématique de la PS5 avec retour haptique et gâchettes adaptatives pour une immersion totale.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video"], originalite:7 },
  { id:2, titre:"Manette sans fil Xbox officielle", emoji:"🕹️", desc:"Une deuxième manette pour jouer ensemble ou remplacer celle du quotidien. Vérifier la compatibilité avec la console ou le PC utilisé.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["jeux-video"], originalite:6 },
  { id:3, titre:"Clavier mécanique gaming AZERTY", emoji:"🖥️", desc:"Pour une personne qui apprécie la sensation des touches mécaniques pendant le jeu. Vérifier la disposition AZERTY et le type de connexion avant de choisir.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video"], originalite:5 },
  { id:4, titre:"Nintendo Switch Lite", emoji:"🎯", desc:"Console portable légère et colorée, parfaite pour jouer partout. Large catalogue de jeux exclusifs.", genre:["homme","femme","enfant"], age:["18-25","26-35","36-50"], budget:">100", interets:["jeux-video"], originalite:7 },
  { id:5, titre:"Figurine Amiibo collector", emoji:"🏆", desc:"Figurines NFC officielles Nintendo qui débloquent des bonus dans les jeux. Un objet de collection autant que fonctionnel.", genre:["homme","femme"], age:["18-25","26-35"], budget:"20-50", interets:["jeux-video"], originalite:8 },
  { id:6, titre:"Chaise gaming ergonomique", emoji:"🪑", desc:"Siège conçu pour les longues sessions de jeu avec soutien lombaire et accoudoirs réglables.", genre:["homme"], age:["18-25","26-35","36-50"], budget:">100", interets:["jeux-video"], originalite:5 },
  { id:7, titre:"Casque gaming sans fil", emoji:"🎧", desc:"Son surround immersif et micro intégré pour communiquer avec son équipe. Compatible PC, console et mobile.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video","musique"], originalite:6 },
  { id:8, titre:"Tapis de souris XXL gaming", emoji:"🖱️", desc:"Surface ultra-lisse de grande taille pour des mouvements précis. Design cool et bordures anti-effilochage.", genre:["homme"], age:["18-25","26-35"], budget:"<20", interets:["jeux-video","technologie"], originalite:5 },
  { id:9, titre:"Jeu de société Minecraft Builders & Biomes", emoji:"🎲", desc:"L’univers Minecraft autour d’une table, pour partager une partie sans écran. Vérifier l’âge recommandé et le nombre de joueurs de cette édition.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["jeux-video"], originalite:6 },
  { id:10, titre:"Beau livre illustré sur l’histoire des jeux vidéo", emoji:"📖", desc:"Pour retrouver les consoles, les jeux et les moments qui ont marqué sa passion, à travers un livre à feuilleter tranquillement.", genre:["homme","femme"], age:["26-35","36-50"], budget:"20-50", interets:["jeux-video","lecture"], originalite:7 },

  /* ── MANGA / ANIME ── */
  { id:11, titre:"Coffret manga One Piece", emoji:"📦", desc:"Pour poursuivre sa découverte de One Piece ou compléter sa bibliothèque. Vérifier les tomes inclus afin de ne pas offrir ceux que la personne possède déjà.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["manga"], originalite:8 },
  { id:12, titre:"Figurine Funko Pop Naruto Uzumaki", emoji:"🗿", desc:"Une figurine à exposer pour une personne qui aime Naruto. Vérifier le personnage, l’édition et les doublons dans sa collection.", genre:["homme","femme"], age:["18-25","26-35"], budget:"<20", interets:["manga"], originalite:6 },
  { id:13, titre:"Coffret Dragon Ball intégrale Box 2", emoji:"🍜", desc:"Pour retrouver Dragon Ball dans un coffret à conserver. Vérifier les épisodes inclus, la langue et le support compatible avec son lecteur.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["manga","cinema"], originalite:7 },
  { id:14, titre:"Artbook Akira Toriyama The World", emoji:"🐉", desc:"Un artbook japonais consacré à l'univers graphique d'Akira Toriyama, avec illustrations et travaux emblématiques.", genre:["homme","femme"], age:["26-35","36-50"], budget:"20-50", interets:["manga","lecture"], originalite:9 },
  { id:15, titre:"T-shirt manga Naruto officiel", emoji:"👕", desc:"Une façon de porter son attachement à Naruto au quotidien. Choisir la taille et le motif selon les goûts de la personne.", genre:["homme","femme"], age:["18-25","26-35"], budget:"20-50", interets:["manga"], originalite:6 },
  { id:16, titre:"Tasse thermo manga", emoji:"☕", desc:"Tasse à café qui révèle un dessin de manga lorsqu'elle est chaude. Original et pratique pour les fans.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["manga"], originalite:8 },
  { id:17, titre:"Coffret de marqueurs pour dessin manga", emoji:"✏️", desc:"Pour mettre en couleur ses personnages et pratiquer le dessin manga. Vérifier les pointes et utiliser un papier adapté aux marqueurs.", genre:["homme","femme"], age:["18-25","26-35"], budget:"20-50", interets:["manga"], originalite:9 },
  { id:18, titre:"Coussin-peluche Totoro", emoji:"🛏️", desc:"Pour ajouter une touche Totoro à un canapé ou à une chambre. Vérifier les dimensions et les consignes d’âge pour un enfant.", genre:["femme"], age:["18-25"], budget:"20-50", interets:["manga"], originalite:7 },

  /* ── TECHNOLOGIE ── */
  { id:19, titre:"Écouteurs Bluetooth ANC", emoji:"🎵", desc:"Réduction de bruit active, autonomie 30h et son cristallin. Parfait pour le télétravail et les transports.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["technologie","musique"], originalite:6 },
  { id:20, titre:"Montre connectée sport", emoji:"⌚", desc:"Suivi du rythme cardiaque, GPS intégré, notifications smartphone. L'accessoire high-tech pour rester connecté.", genre:["homme","femme"], age:["26-35","36-50"], budget:">100", interets:["technologie","sport"], originalite:6 },
  { id:21, titre:"Chargeur sans fil rapide", emoji:"⚡", desc:"Pad de recharge Qi ultra-rapide compatible avec tous les smartphones modernes. Design épuré et compact.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["technologie"], originalite:5 },
  { id:22, titre:"Enceinte Bluetooth étanche", emoji:"🔊", desc:"Son puissant à 360°, résistante à l'eau IPX7, autonomie 24h. La compagne idéale des aventures extérieures.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["technologie","musique","voyage"], originalite:6 },
  { id:23, titre:"Mini projecteur portable", emoji:"📽️", desc:"Projecteur de poche qui diffuse jusqu'à 100 pouces d'image. Parfait pour les soirées cinéma improvisées.", genre:["homme","femme","couple"], age:["26-35","36-50"], budget:">100", interets:["technologie","cinema"], originalite:9 },
  { id:24, titre:"Lampe LED bureau connectée", emoji:"💡", desc:"Éclairage intelligent réglable via smartphone avec modes focus, lecture et ambiance. Économise l'énergie.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["technologie"], originalite:6 },
  { id:25, titre:"Kit domotique Matter pour débuter", emoji:"🏠", desc:"Pour découvrir la maison connectée avec du matériel Matter. Vérifier les appareils inclus et les équipements nécessaires à leur installation.", genre:["homme"], age:["26-35","36-50"], budget:"50-100", interets:["technologie"], originalite:7 },
  { id:26, titre:"Câble USB-C 3-en-1 renforcé", emoji:"🔌", desc:"Câble ultra-résistant compatible Lightning, USB-C et micro-USB. Ne jamais rompre en plein voyage.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["technologie","voyage"], originalite:4 },
  { id:27, titre:"Disque dur SSD externe 1To", emoji:"💾", desc:"Stockage ultra-rapide et compact pour sauvegarder photos, vidéos et projets. Résistant aux chocs.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["technologie"], originalite:5 },
  { id:28, titre:"Robot aspirateur connecté", emoji:"🤖", desc:"Cartographie intelligente de votre logement et nettoyage autonome programmable depuis l'appli.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:["technologie"], originalite:8 },

  /* ── VOYAGE ── */
  { id:29, titre:"Valise cabine ultra-légère", emoji:"🧳", desc:"Bagage à main en polycarbonate ultra-résistant avec roulettes 360° silencieuses. Coloris tendance.", genre:["homme","femme"], age:["26-35","36-50"], budget:">100", interets:["voyage"], originalite:6 },
  { id:30, titre:"Livre 1000 idées de vacances en France", emoji:"🗺️", desc:"Des pistes à feuilleter pour imaginer sa prochaine escapade en France, du court séjour aux vacances plus longues.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["voyage","lecture"], originalite:5 },
  { id:31, titre:"Sac à dos voyage anti-vol", emoji:"🎒", desc:"Sac 30L avec compartiments cachés, port USB intégré et tissu anti-coupure. Sécurité en voyage garantie.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["voyage","sport"], originalite:7 },
  { id:32, titre:"Carte du monde à gratter", emoji:"🌍", desc:"Poster doré à gratter au fil de ses voyages pour visualiser tous les pays visités. Déco murale unique.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["voyage"], originalite:8 },
  { id:33, titre:"Adaptateur universel de voyage", emoji:"🔌", desc:"Un seul adaptateur pour voyager dans 150 pays avec 4 ports USB et 1 USB-C intégrés.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["voyage","technologie"], originalite:5 },
  { id:34, titre:"Trousse de toilette voyage nomade", emoji:"🧴", desc:"Set compact avec flacons TSA-approved, pochette waterproof et miroir pliable. Tout pour voyager léger.", genre:["homme","femme"], age:["26-35","36-50"], budget:"20-50", interets:["voyage"], originalite:6 },
  { id:35, titre:"Caméra d’action 4K étanche", emoji:"🪂", desc:"Pour rapporter des images de sorties sportives et de voyages. Vérifier les fixations, les accessoires et les conditions d’étanchéité du modèle.", genre:["homme","femme"], age:["18-25","26-35"], budget:">100", interets:["voyage","sport"], originalite:10 },
  { id:36, titre:"Set de deux valises rigides COOLIFE", emoji:"🛁", desc:"Deux bagages pour préparer les voyages à partager. Vérifier les dimensions acceptées par les compagnies et le contenu exact du lot.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage"], originalite:7 },
  { id:37, titre:"Carnet de voyage cuir personnalisé", emoji:"📒", desc:"Carnet relié en cuir gravé avec ses initiales, avec pochettes et rubans marque-pages. Élégant et pratique.", genre:["femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["voyage","lecture"], originalite:8 },

  /* ── LECTURE ── */
  { id:38, titre:"Télécommande tourne-page pour liseuse", emoji:"📱", desc:"Une télécommande compacte pour tourner les pages d'une liseuse sans sortir les mains de la couverture.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["lecture"], originalite:6 },
  { id:39, titre:"Liseuse Kindle Paperwhite", emoji:"📖", desc:"Écran E-Ink sans reflets, autonomie de semaines, étanche. La liseuse de référence pour lire partout.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["lecture","technologie"], originalite:6 },
  { id:40, titre:"Coffret Trilogie italienne", emoji:"📚", desc:"Trois romans réunis dans un coffret physique élégant pour prolonger le plaisir de lecture.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["lecture"], originalite:8 },
  { id:41, titre:"Marque-pages personnalisé gravé", emoji:"🔖", desc:"Marque-pages en métal gravé avec un message, une date ou un prénom. Cadeau intime et élégant.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:["lecture"], originalite:7 },
  { id:42, titre:"Coffret illustré La Belle et la Bête", emoji:"🏪", desc:"Une édition illustrée présentée en coffret, pensée comme un bel objet à offrir aux amateurs de classiques.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["lecture"], originalite:6 },
  { id:43, titre:"Lampe de lecture à clip rechargeable", emoji:"🔦", desc:"Mini lampe LED ultra-fine qui s'adapte sur tous les livres. Lire la nuit sans déranger personne.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"<20", interets:["lecture"], originalite:6 },
  { id:44, titre:"Dictionnaire illustré Larousse", emoji:"📕", desc:"Pour une personne curieuse des mots qui apprécie un ouvrage de référence à feuilleter. Vérifier l’édition et l’année proposées.", genre:["homme","femme"], age:["36-50","50+"], budget:"50-100", interets:["lecture"], originalite:5 },
  { id:45, titre:"Harry Potter illustré par MinaLima", emoji:"✍️", desc:"Pour redécouvrir Harry Potter à travers le travail graphique de MinaLima. Vérifier le tome et la langue pour compléter la bonne collection.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["lecture"], originalite:9 },

  /* ── CUISINE ── */
  { id:46, titre:"Robot pâtissier multifonction", emoji:"👨‍🍳", desc:"Pour préparer plus facilement pâtes et pâtisseries à la maison. Vérifier la capacité, les accessoires et l’espace disponible sur le plan de travail.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:["cuisine"], originalite:9 },
  { id:47, titre:"Grand livre de cuisine du monde", emoji:"🌏", desc:"Des recettes pour explorer d’autres cuisines et imaginer de prochains repas, seul ou avec des proches.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine","voyage"], originalite:7 },
  { id:48, titre:"Robot cuiseur multifonction", emoji:"🥘", desc:"Cuisine, mixe, pétrit, cuit à la vapeur. Le compagnon idéal pour cuisiner plus vite et mieux.", genre:["femme","homme"], age:["26-35","36-50","50+"], budget:">100", interets:["cuisine"], originalite:6 },
  { id:49, titre:"Set de couteaux japonais", emoji:"🔪", desc:"Coffret de 3 couteaux en acier japonais VG-10 avec étui en bois. Précision et esthétique à la japonaise.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine"], originalite:8 },
  { id:50, titre:"Coffret de 24 épices du monde", emoji:"🌶️", desc:"Pour explorer de nouveaux assaisonnements et varier ses recettes. Vérifier les épices du coffret et les éventuels allergènes.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine","voyage"], originalite:9 },
  { id:51, titre:"Machine à pâtes fraîches", emoji:"🍝", desc:"Lamineuse à pâtes en inox chromé pour faire ses propres spaghettis, tagliatelles et ravioles maison.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine"], originalite:7 },
  { id:52, titre:"Tablier de cuisine personnalisé", emoji:"👨‍🍳", desc:"Tablier en coton épais brodé avec son prénom ou une citation amusante. Cadeau utile et original.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:53, titre:"Coffret dégustation huiles d'olive", emoji:"🫒", desc:"5 huiles d'olive d'exception de différentes régions avec carnet de dégustation et guide de présentation.", genre:["homme","femme"], age:["36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:9 },
  { id:54, titre:"Wok pro en fonte émaillée", emoji:"🥣", desc:"Wok 32cm en fonte avec couvercle, idéal pour la cuisine asiatique. Chauffe uniformément et dure toute une vie.", genre:["homme","femme"], age:["26-35","36-50"], budget:"50-100", interets:["cuisine"], originalite:6 },

  /* ── ANIMAUX ── */
  { id:55, titre:"Caméra Reolink 4K avec détection des animaux", emoji:"📸", desc:"Pour un propriétaire qui souhaite observer ses animaux à distance. Vérifier l’installation, la connexion et les fonctions incluses sans abonnement.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["animaux"], originalite:10 },
  { id:56, titre:"Coffret de jouets et friandises pour chien", emoji:"🐾", desc:"Des jeux et petites récompenses à partager avec son chien. À choisir selon sa taille, ses habitudes de mastication et ses éventuelles restrictions alimentaires.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["animaux"], originalite:7 },
  { id:57, titre:"Samsung Galaxy SmartTag2", emoji:"📍", desc:"Une balise Bluetooth compacte à glisser dans un support de collier compatible pour retrouver plus facilement le compagnon équipé.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["animaux","technologie"], originalite:8 },
  { id:58, titre:"Kit d’empreinte de patte avec cadre", emoji:"🎨", desc:"Pour garder un souvenir de son compagnon avec une empreinte à encadrer. Suivre la notice et respecter le confort de l’animal.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["animaux"], originalite:10 },
  { id:59, titre:"Distributeur automatique de nourriture pour animaux", emoji:"🥣", desc:"Pour organiser les repas de son animal lorsque les horaires changent. Vérifier la compatibilité avec sa nourriture et ne pas le substituer à une présence régulière.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["animaux"], originalite:4 },
  { id:60, titre:"Fontaine à eau pour chat", emoji:"💧", desc:"Fontaine filtrante à circulation d'eau pour encourager l'hydratation du chat. Design élégant et silencieux.", genre:["femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["animaux","technologie"], originalite:6 },
  { id:61, titre:"Guide illustré du langage du chien", emoji:"📘", desc:"Un livre à feuilleter pour mieux observer les postures et les réactions de son chien, avec des repères à mettre en pratique au quotidien.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"<20", interets:["animaux","lecture"], originalite:6 },

  /* ── SPORT ── */
  { id:62, titre:"Haltères réglables pour musculation", emoji:"💪", desc:"Pour varier les exercices de renforcement à la maison sans multiplier les haltères. Le poids et la prise en main doivent correspondre à la personne.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:63, titre:"Montre GPS de running", emoji:"🏃", desc:"Analyse de la foulée, suivi du rythme cardiaque, plans d'entraînement. L'outil des coureurs sérieux.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["sport","technologie"], originalite:7 },
  { id:64, titre:"Tapis de yoga premium antidérapant", emoji:"🧘", desc:"Tapis 6mm en caoutchouc naturel avec sac de transport. Grip parfait même en séance intense.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:65, titre:"Kit de slackline pour débuter", emoji:"🧗", desc:"Pour découvrir l’équilibre en plein air, avec une installation basse et adaptée. Une idée à offrir avec le temps de lire les consignes et de s’exercer progressivement.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["sport"], originalite:8 },
  { id:66, titre:"Foam roller massage musculaire", emoji:"🏋️", desc:"Rouleau de massage musculaire professionnel pour récupérer après l'effort et libérer les tensions.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["sport"], originalite:6 },
  { id:67, titre:"Vélo électrique pliable", emoji:"🚴", desc:"Vélo électrique 250W avec batterie amovible, pliable en 15 secondes. Révolutionnaire pour les trajets urbains.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:">100", interets:["sport","technologie","voyage"], originalite:9 },
  { id:68, titre:"Kit musculation résistances élastiques", emoji:"🏅", desc:"Set de 5 bandes élastiques de résistances variées pour s'entraîner efficacement n'importe où.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["sport"], originalite:5 },
  { id:69, titre:"Ceinture cardio Bluetooth et ANT+", emoji:"📊", desc:"Pour suivre sa fréquence cardiaque pendant l’entraînement avec un appareil compatible. Vérifier les connexions prises en charge avant de l’offrir.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["sport","technologie"], originalite:7 },

  /* ── MUSIQUE ── */
  { id:70, titre:"Ukulélé soprano débutant", emoji:"🎸", desc:"Petit instrument facile à apprendre avec accordeur et médiators inclus. Parfait pour débuter la musique.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["musique"], originalite:8 },
  { id:71, titre:"Vinyle Discovery de Daft Punk", emoji:"💿", desc:"Pour retrouver Discovery sur une platine vinyle et prendre le temps d’écouter l’album. Une attention à réserver à quelqu’un qui possède le matériel adapté.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["musique"], originalite:8 },
  { id:72, titre:"Mini-enceinte Bluetooth portable", emoji:"🎧", desc:"Pour emporter de la musique d’une pièce à l’autre ou en déplacement, sans installer un système audio encombrant.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["musique"], originalite:4 },
  { id:73, titre:"Enceinte karaoké avec deux microphones", emoji:"🎤", desc:"Pour improviser des duos et des soirées chantées à la maison. Les deux microphones permettent de partager le moment plutôt que d’attendre son tour.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["musique"], originalite:9 },
  { id:74, titre:"Platine vinyle Audio-Technica Bluetooth", emoji:"📻", desc:"Une platine à entraînement direct avec Bluetooth et USB pour écouter et numériser sa collection de vinyles.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:">100", interets:["musique","technologie"], originalite:8 },
  { id:75, titre:"Kit microphone USB pour le chant", emoji:"🎵", desc:"Pour enregistrer sa voix ou essayer le chant sur ordinateur. Une porte d’entrée pratique pour quelqu’un qui aime créer ses propres morceaux.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["musique"], originalite:9 },
  { id:76, titre:"Enceinte portable rétro Bluetooth", emoji:"📯", desc:"Enceinte vintage style années 60 avec son stéréo puissant et connexion Bluetooth moderne.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["musique","technologie"], originalite:7 },

  /* ── CINÉMA ── */
  { id:77, titre:"Coffret Blu-ray Le Hobbit et Le Seigneur des Anneaux", emoji:"📺", desc:"Pour retrouver les deux sagas lors de soirées cinéma à la maison. Vérifier que la personne dispose d’un lecteur Blu-ray compatible.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["cinema"], originalite:4 },
  { id:78, titre:"Coffret Blu-Ray saga Star Wars", emoji:"🚀", desc:"L'intégrale des 9 films + les films dérivés en Blu-Ray avec documentaires exclusifs sur la création.", genre:["homme","femme"], age:["26-35","36-50"], budget:"50-100", interets:["cinema"], originalite:7 },
  { id:79, titre:"Jeu de quiz sur le cinéma", emoji:"🎟️", desc:"Pour confronter ses souvenirs de films et discuter cinéma autour d’une partie. Une petite attention facile à sortir entre passionnés.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["cinema"], originalite:6 },
  { id:80, titre:"Beau livre illustré sur l’histoire du cinéma", emoji:"📽️", desc:"Pour parcourir l’histoire du cinéma à travers ses images et ses grandes étapes, en découvrant de nouvelles pistes de films à regarder.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cinema","lecture"], originalite:7 },
  { id:81, titre:"Machine à popcorn rétro", emoji:"🍿", desc:"Pour préparer du popcorn avant de lancer un film et donner un petit rituel aux soirées cinéma à la maison.", genre:["femme"], age:["18-25","26-35"], budget:"20-50", interets:["cinema"], originalite:8 },
  { id:82, titre:"Clavier Bluetooth rétro pour écrire", emoji:"🎬", desc:"Pour donner du caractère à son espace d’écriture tout en tapant sur un clavier Bluetooth. Vérifier la disposition des touches et la compatibilité avec ses appareils.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["lecture","technologie"], originalite:9 },
  { id:83, titre:"Affiche de film personnalisée", emoji:"🖼️", desc:"Pour transformer une idée ou un souvenir en affiche de cinéma à personnaliser. Prévoir les éléments demandés par le vendeur et vérifier le délai de fabrication.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cinema"], originalite:9 },

  /* ── COUPLES ── */
  { id:84, titre:"Panier pique-nique premium pour deux", emoji:"🏡", desc:"Pour préparer une sortie à deux avec la vaisselle réunie dans un panier. Vérifier le contenu et l’encombrement avant de l’offrir.", genre:["couple"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage"], originalite:8 },
  { id:85, titre:"Appareil à raclette et fondue familial", emoji:"🍷", desc:"Pour préparer une raclette ou une fondue à partager à table. Une idée pour les personnes qui aiment recevoir et cuisiner sans quitter leurs invités.", genre:["couple"], age:["26-35","36-50","50+"], budget:">100", interets:["cuisine"], originalite:8 },
  { id:86, titre:"Tour de potier de table avec accessoires", emoji:"🏺", desc:"Pour s’initier au façonnage de l’argile à la maison et expérimenter ensemble. Vérifier les fournitures nécessaires et le mode de séchage des créations.", genre:["couple"], age:["26-35","36-50"], budget:"50-100", interets:["creatif-diy"], originalite:9 },
  { id:87, titre:"Coffret de jeux d’escape room", emoji:"🔐", desc:"Des énigmes à résoudre ensemble à la maison, sans réserver de sortie. Vérifier le nombre de joueurs et les scénarios déjà connus.", genre:["couple","homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["jeux-video"], originalite:8 },
  { id:88, titre:"Coffret sommelier électrique 5-en-1", emoji:"🍾", desc:"Pour faciliter l’ouverture et le service des bouteilles lors d’un repas. Un ensemble d’accessoires à offrir à quelqu’un qui apprécie les arts de la table.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine"], originalite:7 },
  { id:89, titre:"Siège massant shiatsu chauffant", emoji:"💆", desc:"Pour installer un moment de détente sur un siège compatible. Consulter les dimensions, les précautions et les contre-indications de la notice avant usage.", genre:["couple"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:7 },
  { id:90, titre:"Bracelet femme personnalisé en argent 925", emoji:"💍", desc:"Un bracelet en argent avec prénoms gravés et pierres de naissance pour une attention vraiment personnelle.", genre:["couple","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:[], originalite:8 },

  /* ── ENFANTS ── */
  { id:91, titre:"LEGO Technic Ferrari FXX K 10+", emoji:"🧱", desc:"Une voiture de course LEGO Technic avec moteur V12 et mécanismes mobiles, adaptée dès 10 ans.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["technologie","jeux-video"], originalite:6 },
  { id:92, titre:"Microscope junior éducatif", emoji:"🔬", desc:"Microscope 40-400x avec préparations, plaque LED et livret d'expériences. Éveiller la curiosité scientifique.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["technologie","lecture"], originalite:9 },
  { id:93, titre:"Kit robotique débutant", emoji:"🤖", desc:"Robot programmable par blocs visuels pour initier les enfants au code de façon ludique et progressive.", genre:["enfant"], age:["18-25"], budget:">100", interets:["technologie","jeux-video"], originalite:9 },
  { id:94, titre:"Encyclopédie pop-up des animaux", emoji:"📗", desc:"Pour découvrir les animaux en explorant les pages animées avec un adulte. Choisir selon l’âge conseillé et manipuler les éléments délicats avec soin.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:["lecture","animaux"], originalite:8 },
  { id:95, titre:"Set de snorkeling pour enfant", emoji:"🏊", desc:"Pour découvrir l’observation sous l’eau lors d’une sortie encadrée. Vérifier la taille, l’âge du fabricant et les consignes ; ce matériel n’est pas un équipement de sécurité.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["sport"], originalite:6 },
  { id:96, titre:"Tente de jeu intérieure", emoji:"⛺", desc:"Tipi ou château de tente qui se monte en 2 minutes. Un espace d'imagination et de jeu pour les enfants.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:[], originalite:7 },
  { id:97, titre:"Chevalet et coffret de peinture lavable", emoji:"🎨", desc:"Un espace pour peindre et expérimenter les couleurs. Vérifier les dimensions, l’âge recommandé et protéger le sol pendant l’activité.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:["manga"], originalite:7 },
  { id:98, titre:"Rollers enfant réglables lumineux", emoji:"🚲", desc:"Des rollers ajustables avec roues lumineuses et maintien renforcé pour accompagner la progression de l'enfant.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:99, titre:"Coffret magie (50 tours)", emoji:"🪄", desc:"Kit du magicien avec baguette, cartes truquées, livret explicatif et costume. Émerveiller petits et grands.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:["cinema","jeux-video"], originalite:8 },
  { id:100, titre:"Table lumineuse de dessin A3", emoji:"✏️", desc:"Tablette LED pour dessiner, calquer et tracer. Idéale pour les enfants créatifs et passionnés de dessin.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["manga","lecture"], originalite:7 },

  /* ── 50 ANS ET + ── */
  { id:101, titre:"Beau livre The Stanley Kubrick Archives", emoji:"🖌️", desc:"Pour explorer l’univers de Kubrick à travers un ouvrage illustré que l’on peut consulter film après film.", genre:["femme","homme"], age:["50+"], budget:"50-100", interets:["lecture","cinema"], originalite:8 },
  { id:102, titre:"Coffret de thés du monde", emoji:"🍵", desc:"Pour découvrir plusieurs thés et comparer leurs parfums au fil des pauses. Une attention pour quelqu’un qui aime prendre le temps de préparer sa tasse.", genre:["femme"], age:["36-50","50+"], budget:"20-50", interets:["voyage","cuisine"], originalite:8 },
  { id:103, titre:"Grand Atlas géographique du monde", emoji:"📰", desc:"Pour explorer les pays, les reliefs et les cartes du monde depuis son fauteuil. Un bel objet à consulter par curiosité ou avant un voyage.", genre:["homme","femme"], age:["36-50","50+"], budget:"50-100", interets:["lecture"], originalite:4 },
  { id:104, titre:"Bain de pieds massant premium", emoji:"🌊", desc:"Pour aménager une pause détente à la maison autour d’un bain de pieds. Vérifier les fonctions et précautions de la notice, sans attendre un effet thérapeutique.", genre:["femme","couple"], age:["36-50","50+"], budget:">100", interets:[], originalite:7 },
  { id:105, titre:"Refroidisseur électrique et carafe à décanter", emoji:"🍷", desc:"Un appareil de service avec contrôle de température, aérateur et carafe en verre pour les amateurs d'œnologie.", genre:["homme","femme"], age:["50+"], budget:">100", interets:["cuisine"], originalite:10 },
  { id:106, titre:"Mini-serre de semis avec éclairage", emoji:"🌱", desc:"Deux plateaux de culture avec couvercles ventilés et éclairage horticole pour démarrer ses semis à l'intérieur.", genre:["femme","homme"], age:["36-50","50+"], budget:"20-50", interets:["jardinage"], originalite:8 },
  { id:107, titre:"Puzzle 1000 pièces panoramique", emoji:"🧩", desc:"Puzzle de grande taille représentant un paysage spectaculaire. Des heures de détente et de concentration.", genre:["femme","homme"], age:["36-50","50+"], budget:"<20", interets:["lecture"], originalite:5 },
  { id:108, titre:"Radio DAB+ design rétro", emoji:"📻", desc:"Poste de radio design avec réception FM et DAB+ numérique, son chaud et excellent. Style intemporel.", genre:["homme","femme"], age:["36-50","50+"], budget:"50-100", interets:["musique"], originalite:7 },

  /* ── PETITS BUDGETS (<20€) UNIVERSELS ── */
  { id:109, titre:"Coffret de bougies en cire végétale", emoji:"🕯️", desc:"Pour accompagner une soirée calme d’une lumière douce. À choisir en tenant compte des parfums appréciés et à utiliser sous surveillance.", genre:["femme","couple"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:[], originalite:5 },
  { id:110, titre:"Porte-monnaie cuir mini", emoji:"👛", desc:"Porte-cartes compact en cuir pleine fleur avec protection RFID. Design minimaliste et chic.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:[], originalite:4 },
  { id:111, titre:"Mug personnalisé avec message", emoji:"☕", desc:"Grande tasse en céramique avec un message ou une illustration choisie. Cadeau intime et quotidien.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:[], originalite:5 },
  { id:112, titre:"Carnet bullet journal pointé", emoji:"📔", desc:"Carnet pointé A5 de qualité avec couverture souple et papier 100g. Parfait pour l'organisation créative.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["lecture"], originalite:5 },
  { id:113, titre:"Set de stylos calligraphie", emoji:"✒️", desc:"Coffret de 6 stylos de calligraphie avec différentes pointes. Apprendre l'art de la belle écriture.", genre:["femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["lecture","manga"], originalite:7 },
  { id:114, titre:"Mangeoire en bois pour oiseaux", emoji:"🌵", desc:"Pour observer les oiseaux du jardin et suivre leurs habitudes. Installer la mangeoire à un emplacement adapté et l’entretenir régulièrement.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:["animaux"], originalite:5 },
  { id:115, titre:"Carte scratch « 100 films à voir »", emoji:"🎥", desc:"Affiche à gratter au fil des films vus. Un défi cinéphile affiché au mur et à compléter tout au long de l'année.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["cinema"], originalite:8 },

  /* ── GRANDS BUDGETS (>100€) ORIGINAUX ── */
  { id:116, titre:"Volant de simulation avec pédalier", emoji:"🏎️", desc:"Pour retrouver des sensations de conduite dans ses jeux de course. Vérifier la compatibilité console ou PC et la fixation au bureau.", genre:["homme"], age:["26-35","36-50","50+"], budget:">100", interets:["jeux-video","auto-moto","technologie"], originalite:10 },
  { id:117, titre:"Jumelles de voyage premium", emoji:"🎈", desc:"Pour observer les paysages et les animaux au cours d’une promenade. Vérifier le poids et le grossissement ; ne jamais regarder le soleil.", genre:["couple","femme","homme"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage"], originalite:10 },
  { id:118, titre:"Paddle gonflable complet", emoji:"🏄", desc:"Pour découvrir ou pratiquer la balade sur l’eau avec un équipement transportable. Vérifier les dimensions, la charge admise et le matériel de sécurité nécessaire.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["sport","voyage"], originalite:9 },
  { id:119, titre:"Cave à vin compacte", emoji:"🍇", desc:"Pour organiser quelques bouteilles dans un espace dédié à la maison. Vérifier l’encombrement et les conditions d’installation avant de l’offrir.", genre:["couple","homme","femme"], age:["36-50","50+"], budget:">100", interets:["cuisine"], originalite:9 },
  { id:120, titre:"Toile photo personnalisée grand format", emoji:"🖼️", desc:"Pour mettre un souvenir commun en valeur sur une grande toile. Une photo suffisamment définie et un format adapté au mur feront toute la différence.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:8 },

  /* ── BONUS : idées génériques multi-profils ── */
  { id:121, titre:"Pochette isotherme lunch box", emoji:"🍱", desc:"Sac repas thermique élégant pour emporter son déjeuner au bureau. Mode et pratique à la fois.", genre:["homme","femme"], age:["26-35","36-50"], budget:"<20", interets:["cuisine","sport"], originalite:5 },
  { id:122, titre:"Tapis d’acupression avec coussin", emoji:"🌿", desc:"Pour essayer un rituel de détente à la maison avec un tapis et son coussin. Consulter les précautions du fabricant ; aucun bénéfice médical n’est promis.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:[], originalite:6 },
  { id:123, titre:"Livre de coloriage manga tout public", emoji:"🖍️", desc:"Pour colorier des personnages et des scènes inspirés du manga, en choisissant librement ses associations de couleurs.", genre:["femme","homme"], age:["26-35","36-50","50+"], budget:"<20", interets:["lecture","manga"], originalite:6 },
  { id:124, titre:"Coffret bain premium (sels, huiles)", emoji:"🛁", desc:"Set de bain luxueux avec sels de l'Himalaya, huile de bain aromatique et gant de gommage.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:[], originalite:5 },
  { id:125, titre:"Micro-cravate pour smartphone", emoji:"🎙️", desc:"Pour enregistrer plus clairement une voix pendant une vidéo ou une interview. Vérifier la connectique et la compatibilité du téléphone.", genre:["homme","femme"], age:["26-35","36-50"], budget:"<20", interets:["photo-video","musique","technologie"], originalite:6 },
  { id:126, titre:"Coffret d’apprentissage d’une langue", emoji:"🗣️", desc:"Pour commencer ou reprendre une langue avec un support que l’on peut utiliser à son rythme. Vérifier la langue étudiée et le niveau du coffret.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["voyage","lecture"], originalite:7 },
  { id:127, titre:"Coffret de recettes cocktails avec shaker", emoji:"🍹", desc:"Pour apprendre à assembler et présenter des boissons avec un shaker et des recettes. Une activité à essayer ensemble, selon les goûts de chacun.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:128, titre:"Coffret d’arômes pour apprendre la dégustation", emoji:"🌾", desc:"Pour exercer son nez à reconnaître différents arômes et comparer ses impressions à plusieurs. Un coffret de découverte plutôt qu’une bouteille supplémentaire.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine"], originalite:9 },
  { id:129, titre:"Portefeuille minimaliste en cuir végétal", emoji:"👜", desc:"Portefeuille ultra-mince en cuir végétal certifié avec protection des cartes sans contact.", genre:["homme","femme"], age:["26-35","36-50"], budget:"50-100", interets:[], originalite:6 },
  { id:130, titre:"Kit cosmétiques bio DIY", emoji:"🧴", desc:"Coffret pour fabriquer ses propres crèmes et baumes naturels à la maison. Écologie et créativité.", genre:["femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["animaux","sport"], originalite:8 },
  { id:131, titre:"Drone photo/vidéo compact", emoji:"🚁", desc:"Mini drone pliable avec caméra 4K stabilisée. Pour filmer et photographier ses aventures du ciel.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["technologie","voyage","sport"], originalite:9 },
  { id:132, titre:"Sac à main femme en cuir pleine fleur", emoji:"👜", desc:"Un grand sac à main vintage en cuir pleine fleur avec bandoulière et cadre métallique.", genre:["femme"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:8 },
  { id:133, titre:"Coussin massant shiatsu chauffant", emoji:"💆", desc:"Pour faire une pause avec un coussin massant que l’on installe selon sa notice. Vérifier les zones d’usage autorisées et les contre-indications.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:134, titre:"Set écriture fontaine + encres", emoji:"🖊️", desc:"Stylo plume moyen de gamme avec 6 encres aux couleurs rares. La renaissance de l'écriture à la main.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["lecture"], originalite:8 },
  { id:135, titre:"Bandeau audio Bluetooth confortable", emoji:"🎙️", desc:"Pour écouter de la musique ou un livre audio avec un bandeau plutôt qu’un casque classique. À choisir selon les habitudes et le confort recherchés.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["lecture","musique"], originalite:6 },
  { id:136, titre:"Tableau ardoise personnalisé famille", emoji:"🏠", desc:"Grand tableau ardoise avec cadre en bois gravé du nom de famille. Pratique, déco et émouvant.", genre:["couple","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:[], originalite:7 },
  { id:137, titre:"Lunettes de soleil polarisées premium", emoji:"🕶️", desc:"Montures en acétate avec verres polarisés haute protection UV400. Style et fonctionnel sous le soleil.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["voyage","sport"], originalite:5 },
  { id:138, titre:"Montre automatique au style vintage", emoji:"⌚", desc:"Pour quelqu’un qui apprécie les mécanismes horlogers et le style vintage. Vérifier le diamètre, le bracelet et les consignes d’entretien du modèle.", genre:["homme"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:8 },
  { id:139, titre:"Carnet de recettes familiales personnalisé", emoji:"📓", desc:"Recueil relié où noter et transmettre les recettes de famille de génération en génération. Cadeau du cœur.", genre:["femme","homme"], age:["36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:9 },
  { id:140, titre:"Cadre photo numérique Wi-Fi", emoji:"🎁", desc:"Pour faire défiler les souvenirs et renouveler facilement les photos affichées à la maison. Vérifier la connexion et les conditions de l’application.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:[], originalite:7 },

  /* ── IDÉES BONUS pour diversifier ── */
  { id:141, titre:"Coffret de beaux livres sur les musées", emoji:"🏛️", desc:"Pour parcourir des collections et préparer de futures visites depuis chez soi. Une idée pour les amateurs de beaux livres et de découvertes culturelles.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["lecture","voyage"], originalite:7 },
  { id:142, titre:"Paire de bâtons de randonnée", emoji:"🏅", desc:"Pour accompagner les sorties à pied avec des appuis supplémentaires. Vérifier le réglage, la taille et les conditions d’utilisation.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["sport","voyage"], originalite:8 },
  { id:143, titre:"Powerbank solaire outdoor", emoji:"☀️", desc:"Batterie externe rechargeable au soleil, étanche et robuste. Indispensable pour les aventuriers connectés.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["technologie","voyage","sport"], originalite:7 },
  { id:144, titre:"Maillot officiel du PSG", emoji:"⚽", desc:"Pour afficher son attachement au PSG les jours de match. Vérifier la saison du modèle et la taille souhaitée avant de commander.", genre:["homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["sport"], originalite:6 },
  { id:145, titre:"Coffret de verres de dégustation", emoji:"🍺", desc:"Pour servir une dégustation dans des verres dédiés et prendre le temps de comparer les impressions autour d’une table.", genre:["homme","couple"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:146, titre:"Jeu de société coopératif MicroMacro", emoji:"🎲", desc:"Pour résoudre ensemble des enquêtes en observant une grande carte illustrée. Un jeu coopératif à sortir lors d’une soirée, en vérifiant les thèmes et l’âge indiqué.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["jeux-video"], originalite:8 },
  { id:147, titre:"Casque de réalité virtuelle standalone", emoji:"🥽", desc:"Immersion totale dans des univers virtuels : jeux, voyages, sport, créativité. La technologie de demain.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["technologie","jeux-video","cinema"], originalite:9 },
  { id:148, titre:"Kit aquarelle professionnelle", emoji:"🎨", desc:"Set complet : 24 pigments fins, pinceaux différents, papier grain, bloc et palette en céramique.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["manga","lecture"], originalite:7 },
  { id:149, titre:"Stabilisateur trois axes pour smartphone", emoji:"📱", desc:"Pour réaliser des vidéos au téléphone avec des mouvements plus réguliers. Vérifier le poids et le format du smartphone pris en charge.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["voyage","technologie"], originalite:8 },
  { id:150, titre:"Kit d’outils pour bonsaï", emoji:"🌸", desc:"Pour entretenir un bonsaï avec des outils adaptés aux petits gestes de taille. À offrir à une personne qui possède déjà cet arbre ou souhaite apprendre à en prendre soin.", genre:["femme","homme"], age:["36-50","50+"], budget:"20-50", interets:["jardinage"], originalite:7 },
  { id:151, titre:"Kit de pâtisserie pour macarons", emoji:"🍬", desc:"Pour essayer les macarons à la maison avec des accessoires dédiés. Vérifier le contenu du kit et prévoir les ingrédients séparément.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:152, titre:"Station de recharge rapide pour manette PS5", emoji:"🎮", desc:"Un support de charge rapide assorti à la DualSense pour ranger et recharger une manette entre deux parties.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video"], originalite:5 },
  { id:153, titre:"Aquarium nano 9 L avec éclairage LED", emoji:"🐠", desc:"Un aquarium compact avec filtration intégrée et éclairage LED pour créer un petit espace aquatique à la maison.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["animaux","technologie"], originalite:8 },
  { id:154, titre:"Livre recettes boulangerie artisanale", emoji:"🥖", desc:"Guide complet pour faire ses propres pains, croissants et viennoiseries maison comme un boulanger.", genre:["femme","homme"], age:["26-35","36-50","50+"], budget:"<20", interets:["cuisine"], originalite:6 },
  { id:155, titre:"Mini DAC USB pour casque", emoji:"🎼", desc:"Pour relier un casque à une source USB compatible et compléter une installation d’écoute. Vérifier les connecteurs et appareils pris en charge.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["musique","technologie"], originalite:6 },
  { id:156, titre:"Jardin aromatique intérieur", emoji:"🫧", desc:"Pour cultiver des aromatiques à portée de la cuisine. Vérifier les consommables nécessaires, l’éclairage et la place disponible.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["jardinage","cuisine"], originalite:9 },
  { id:157, titre:"Coussin shiatsu chauffant pour dos et épaules", emoji:"💼", desc:"Pour s’accorder une pause avec un coussin massant utilisé selon les indications du fabricant. Vérifier les précautions et le confort avant de l’adopter.", genre:["femme","homme"], age:["36-50","50+"], budget:"50-100", interets:["sport"], originalite:6 },
  { id:158, titre:"Fujifilm Instax Mini avec films", emoji:"📷", desc:"Pour prendre des photos instantanées et conserver des souvenirs sur papier. Vérifier la quantité de films incluse et leur coût de renouvellement.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["voyage","cinema","technologie"], originalite:9 },
  { id:159, titre:"Panneau lumineux LED personnalisé", emoji:"💡", desc:"Enseigne lumineuse LED avec un mot, prénom ou slogan choisi. Décoration unique et moderne.", genre:["femme","homme"], age:["18-25","26-35"], budget:"50-100", interets:["cinema","musique"], originalite:8 },
  { id:160, titre:"Coffret carafe et verres à whisky", emoji:"🥃", desc:"Pour présenter et partager une dégustation avec une carafe et des verres assortis. Un cadeau centré sur le service et les arts de la table.", genre:["homme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:8 },

  /* ── COMPLÉMENTS ENFANT V1.2 ── */
  { id:161, titre:"Livre d'éveil sensoriel", emoji:"📘", desc:"Livre souple avec textures, couleurs contrastées et activités adaptées aux premières découvertes.", genre:["enfant"], age:["0-3"], budget:"<20", interets:["lecture"], originalite:7 },
  { id:162, titre:"Porteur évolutif enfant", emoji:"🚗", desc:"Porteur stable et transformable pour développer l'équilibre et accompagner les premières aventures.", genre:["enfant"], age:["0-3","4-7"], budget:"50-100", interets:["sport"], originalite:7 },
  { id:163, titre:"Tour d'observation Montessori", emoji:"🪜", desc:"Marchepied sécurisé et réglable pour participer aux activités du quotidien à hauteur d'adulte.", genre:["enfant"], age:["0-3","4-7"], budget:">100", interets:["cuisine"], originalite:8 },
  { id:164, titre:"Coffret créatif lavable", emoji:"🖍️", desc:"Pour proposer une activité manuelle adaptée aux plus jeunes. Vérifier l’âge minimal, les matériaux et les consignes de nettoyage du coffret.", genre:["enfant"], age:["4-7","8-12"], budget:"<20", interets:["manga"], originalite:7 },
  { id:165, titre:"Blocs de construction en mousse modulables", emoji:"🏠", desc:"De grands éléments en mousse à assembler pour imaginer des constructions. Vérifier l’âge recommandé, l’espace et les conditions de surveillance.", genre:["enfant"], age:["4-7","8-12"], budget:">100", interets:[], originalite:8 },

];

/* =========================================================
   CATALOGUE PRODUITS AMAZON — V1.4
   Les remplacements conservent les filtres existants.
   Chaque lien a été vérifié sur une fiche produit Amazon.fr.
   Le fallback de recherche reste géré par getProductUrl().
   ========================================================= */
const AMAZON_PRODUCT_LINKS = {
  1: 'https://www.amazon.fr/dp/B094WLFGD3?tag=trouvetonca05-21',
  2: 'https://www.amazon.fr/dp/B0F2N6R6WS?tag=trouvetonca05-21',
  3: 'https://www.amazon.fr/dp/B0FXBH9PXS?tag=trouvetonca05-21',
  4: 'https://www.amazon.fr/dp/B07V5JJ4ZD?tag=trouvetonca05-21',
  5: 'https://www.amazon.fr/dp/B0CJ3FDKN6?tag=trouvetonca05-21',
  6: 'https://www.amazon.fr/dp/B0H6ZWSNPC?tag=trouvetonca05-21',
  7: 'https://www.amazon.fr/dp/B0DHY29PSM?tag=trouvetonca05-21',
  8: 'https://www.amazon.fr/dp/B08KQJ9BGL?tag=trouvetonca05-21',
  9: 'https://www.amazon.fr/dp/B07PXSJMHF?tag=trouvetonca05-21',
  10: 'https://www.amazon.fr/dp/222649023X?tag=trouvetonca05-21',
  11: 'https://www.amazon.fr/dp/2344050124?tag=trouvetonca05-21',
  12: 'https://www.amazon.fr/dp/B07XB241MQ?tag=trouvetonca05-21',
  13: 'https://www.amazon.fr/dp/B003G5MU2M?tag=trouvetonca05-21',
  14: 'https://www.amazon.fr/dp/408858130X?tag=trouvetonca05-21',
  15: 'https://www.amazon.fr/dp/B0F491D9TC?tag=trouvetonca05-21',
  16: 'https://www.amazon.fr/dp/B08GCBVPBX?tag=trouvetonca05-21',
  17: 'https://www.amazon.fr/dp/B0CL42TSYL?tag=trouvetonca05-21',
  18: 'https://www.amazon.fr/dp/B09T3CDZHF?tag=trouvetonca05-21',
  19: 'https://www.amazon.fr/dp/B0DT4F2NM9?tag=trouvetonca05-21',
  20: 'https://www.amazon.fr/dp/B0FQ5XDGZ8?tag=trouvetonca05-21',
  21: 'https://www.amazon.fr/dp/B07THHQMHM?tag=trouvetonca05-21',
  22: 'https://www.amazon.fr/dp/B0BDKWL2FT?tag=trouvetonca05-21',
  23: 'https://www.amazon.fr/dp/B0CKHL1VMM?tag=trouvetonca05-21',
  24: 'https://www.amazon.fr/dp/B07SQ2FZTK?tag=trouvetonca05-21',
  25: 'https://www.amazon.fr/dp/B0FJ1S47KD?tag=trouvetonca05-21',
  26: 'https://www.amazon.fr/dp/B0DWJSGQHC?tag=trouvetonca05-21',
  27: 'https://www.amazon.fr/dp/B0CGW1FQV4?tag=trouvetonca05-21',
  28: 'https://www.amazon.fr/dp/B0DWKBMSWG?tag=trouvetonca05-21',
  29: 'https://www.amazon.fr/dp/B0D17KCXVQ?tag=trouvetonca05-21',
  30: 'https://www.amazon.fr/dp/2816125548?tag=trouvetonca05-21',
  31: 'https://www.amazon.fr/dp/B0F5Q25RRV?tag=trouvetonca05-21',
  32: 'https://www.amazon.fr/dp/B089NRZR43?tag=trouvetonca05-21',
  33: 'https://www.amazon.fr/dp/B0B2DRC76L?tag=trouvetonca05-21',
  34: 'https://www.amazon.fr/dp/B0843W9RB9?tag=trouvetonca05-21',
  35: 'https://www.amazon.fr/dp/B0DKJGPQKT?tag=trouvetonca05-21',
  36: 'https://www.amazon.fr/dp/B0CVWVT7RD?tag=trouvetonca05-21',
  37: 'https://www.amazon.fr/dp/B0FGFZM6D1?tag=trouvetonca05-21',
  38: 'https://www.amazon.fr/dp/B0FK9KMG8K?tag=trouvetonca05-21',
  39: 'https://www.amazon.fr/dp/B0CFPWLGF2?tag=trouvetonca05-21',
  40: 'https://www.amazon.fr/dp/2413087958?tag=trouvetonca05-21',
  41: 'https://www.amazon.fr/dp/B0GKYG95ZT?tag=trouvetonca05-21',
  42: 'https://www.amazon.fr/dp/2080166859?tag=trouvetonca05-21',
  43: 'https://www.amazon.fr/dp/B0C3BC4QG2?tag=trouvetonca05-21',
  44: 'https://www.amazon.fr/dp/2036076572?tag=trouvetonca05-21',
  45: 'https://www.amazon.fr/dp/2075145938?tag=trouvetonca05-21',
  46: 'https://www.amazon.fr/dp/B0DGTHGL8V?tag=trouvetonca05-21',
  47: 'https://www.amazon.fr/dp/2501184661?tag=trouvetonca05-21',
  48: 'https://www.amazon.fr/dp/B09MWMJG76?tag=trouvetonca05-21',
  49: 'https://www.amazon.fr/dp/B0CKZ1MJ7Y?tag=trouvetonca05-21',
  50: 'https://www.amazon.fr/dp/B0DJRG3JWM?tag=trouvetonca05-21',
  51: 'https://www.amazon.fr/dp/B08BRH4GQF?tag=trouvetonca05-21',
  52: 'https://www.amazon.fr/dp/B0GY8417KJ?tag=trouvetonca05-21',
  53: 'https://www.amazon.fr/dp/B0G22WVZJQ?tag=trouvetonca05-21',
  54: 'https://www.amazon.fr/dp/B093T42RGG?tag=trouvetonca05-21',
  55: 'https://www.amazon.fr/dp/B0C33SR9RL?tag=trouvetonca05-21',
  56: 'https://www.amazon.fr/dp/B0CRHLKVG6?tag=trouvetonca05-21',
  57: 'https://www.amazon.fr/dp/B0CHN2D8KM?tag=trouvetonca05-21',
  58: 'https://www.amazon.fr/dp/B0DB4SFLKT?tag=trouvetonca05-21',
  59: 'https://www.amazon.fr/dp/B0D472DQCS?tag=trouvetonca05-21',
  60: 'https://www.amazon.fr/dp/B0H294BZK4?tag=trouvetonca05-21',
  61: 'https://www.amazon.fr/dp/2379223262?tag=trouvetonca05-21',
  62: 'https://www.amazon.fr/dp/B08YRH2DBP?tag=trouvetonca05-21',
  63: 'https://www.amazon.fr/dp/B0953X73TP?tag=trouvetonca05-21',
  64: 'https://www.amazon.fr/dp/B0FC5W5SVR?tag=trouvetonca05-21',
  65: 'https://www.amazon.fr/dp/B07MS1CR8V?tag=trouvetonca05-21',
  66: 'https://www.amazon.fr/dp/B06Y97NVKZ?tag=trouvetonca05-21',
  67: 'https://www.amazon.fr/dp/B0H69QSDX9?tag=trouvetonca05-21',
  68: 'https://www.amazon.fr/dp/B0FCMNVTMG?tag=trouvetonca05-21',
  69: 'https://www.amazon.fr/dp/B0DJP4GC59?tag=trouvetonca05-21',
  70: 'https://www.amazon.fr/dp/B087WYBQJM?tag=trouvetonca05-21',
  71: 'https://www.amazon.fr/dp/B099ZRXZ6Q?tag=trouvetonca05-21',
  72: 'https://www.amazon.fr/dp/B07F9NGRKF?tag=trouvetonca05-21',
  73: 'https://www.amazon.fr/dp/B0D48LQ6Z5?tag=trouvetonca05-21',
  74: 'https://www.amazon.fr/dp/B08CRRSYB8?tag=trouvetonca05-21',
  75: 'https://www.amazon.fr/dp/B0875T3D9R?tag=trouvetonca05-21',
  76: 'https://www.amazon.fr/dp/B0FRF3XGQ4?tag=trouvetonca05-21',
  77: 'https://www.amazon.fr/dp/B01KWEBOYO?tag=trouvetonca05-21',
  78: 'https://www.amazon.fr/dp/B082WXD4ZH?tag=trouvetonca05-21',
  79: 'https://www.amazon.fr/dp/B0GC71C7HK?tag=trouvetonca05-21',
  80: 'https://www.amazon.fr/dp/2956650416?tag=trouvetonca05-21',
  81: 'https://www.amazon.fr/dp/B0CPYR8Z1N?tag=trouvetonca05-21',
  82: 'https://www.amazon.fr/dp/B0FFN496H6?tag=trouvetonca05-21',
  83: 'https://www.amazon.fr/dp/B0CTKJQSXC?tag=trouvetonca05-21',
  84: 'https://www.amazon.fr/dp/B07K1K9CWP?tag=trouvetonca05-21',
  85: 'https://www.amazon.fr/dp/B0HC3MNTLN?tag=trouvetonca05-21',
  86: 'https://www.amazon.fr/dp/B0GC3CFT8H?tag=trouvetonca05-21',
  87: 'https://www.amazon.fr/dp/B07D7GRM7W?tag=trouvetonca05-21',
  88: 'https://www.amazon.fr/dp/B0BVQLRBXW?tag=trouvetonca05-21',
  89: 'https://www.amazon.fr/dp/B08J3YJYV2?tag=trouvetonca05-21',
  90: 'https://www.amazon.fr/dp/B09HT295KJ?tag=trouvetonca05-21',
  91: 'https://www.amazon.fr/dp/B0DWDRX69Q?tag=trouvetonca05-21',
  92: 'https://www.amazon.fr/dp/B0FR97CZV3?tag=trouvetonca05-21',
  93: 'https://www.amazon.fr/dp/B07KG4JHBH?tag=trouvetonca05-21',
  94: 'https://www.amazon.fr/dp/2092549626?tag=trouvetonca05-21',
  95: 'https://www.amazon.fr/dp/B0GVSNZ47B?tag=trouvetonca05-21',
  96: 'https://www.amazon.fr/dp/B08M38NJXN?tag=trouvetonca05-21',
  97: 'https://www.amazon.fr/dp/B0GS5Z12RT?tag=trouvetonca05-21',
  98: 'https://www.amazon.fr/dp/B09VNSQHG4?tag=trouvetonca05-21',
  99: 'https://www.amazon.fr/dp/B0DG61SYJ4?tag=trouvetonca05-21',
  100: 'https://www.amazon.fr/dp/B0BS16KX9D?tag=trouvetonca05-21',
  101: 'https://www.amazon.fr/dp/3836508893?tag=trouvetonca05-21',
  102: 'https://www.amazon.fr/dp/B0D5MFLFM2?tag=trouvetonca05-21',
  103: 'https://www.amazon.fr/dp/2344078010?tag=trouvetonca05-21',
  104: 'https://www.amazon.fr/dp/B0GQLJLKKY?tag=trouvetonca05-21',
  105: 'https://www.amazon.fr/dp/B0FKMJYB3G?tag=trouvetonca05-21',
  106: 'https://www.amazon.fr/dp/B0CSFN8L5T?tag=trouvetonca05-21',
  107: 'https://www.amazon.fr/dp/B0BC4QYY47?tag=trouvetonca05-21',
  108: 'https://www.amazon.fr/dp/B0F7ZS5YGK?tag=trouvetonca05-21',
  109: 'https://www.amazon.fr/dp/B0GQ2X66FN?tag=trouvetonca05-21',
  110: 'https://www.amazon.fr/dp/B07DLSV3ZV?tag=trouvetonca05-21',
  111: 'https://www.amazon.fr/dp/B0DTQG1RJ8?tag=trouvetonca05-21',
  112: 'https://www.amazon.fr/dp/B07Y7KM9L9?tag=trouvetonca05-21',
  113: 'https://www.amazon.fr/dp/B08VN4KV4G?tag=trouvetonca05-21',
  114: 'https://www.amazon.fr/dp/B0FVZHZR5X?tag=trouvetonca05-21',
  115: 'https://www.amazon.fr/dp/B08CBJKXNH?tag=trouvetonca05-21',
  116: 'https://www.amazon.fr/dp/B0F2FSTKM9?tag=trouvetonca05-21',
  117: 'https://www.amazon.fr/dp/B005M1VGMS?tag=trouvetonca05-21',
  118: 'https://www.amazon.fr/dp/B0BHD9K72D?tag=trouvetonca05-21',
  119: 'https://www.amazon.fr/dp/B0FV3RV4LX?tag=trouvetonca05-21',
  120: 'https://www.amazon.fr/dp/B0C33XSYBP?tag=trouvetonca05-21',
  121: 'https://www.amazon.fr/dp/B0B56CHMSC?tag=trouvetonca05-21',
  122: 'https://www.amazon.fr/dp/B077H4T8DB?tag=trouvetonca05-21',
  123: 'https://www.amazon.fr/dp/B0D7M6X48K?tag=trouvetonca05-21',
  124: 'https://www.amazon.fr/dp/B07H4N9VTX?tag=trouvetonca05-21',
  125: 'https://www.amazon.fr/dp/B0F637SV1K?tag=trouvetonca05-21',
  126: 'https://www.amazon.fr/dp/2700580621?tag=trouvetonca05-21',
  127: 'https://www.amazon.fr/dp/B0CB169DP3?tag=trouvetonca05-21',
  128: 'https://www.amazon.fr/dp/2906518522?tag=trouvetonca05-21',
  129: 'https://www.amazon.fr/dp/B0GVN7X3FY?tag=trouvetonca05-21',
  130: 'https://www.amazon.fr/dp/B000S2R9QS?tag=trouvetonca05-21',
  131: 'https://www.amazon.fr/dp/B0H9L48WR4?tag=trouvetonca05-21',
  132: 'https://www.amazon.fr/dp/B0GTV86MSS?tag=trouvetonca05-21',
  133: 'https://www.amazon.fr/dp/B0GWC3NC3H?tag=trouvetonca05-21',
  134: 'https://www.amazon.fr/dp/B0DVZGCXKY?tag=trouvetonca05-21',
  135: 'https://www.amazon.fr/dp/B0FLX8G7ZP?tag=trouvetonca05-21',
  136: 'https://www.amazon.fr/dp/B0DP7QPF1D?tag=trouvetonca05-21',
  137: 'https://www.amazon.fr/dp/B0BWF6B7HR?tag=trouvetonca05-21',
  138: 'https://www.amazon.fr/dp/B0H13THFDJ?tag=trouvetonca05-21',
  139: 'https://www.amazon.fr/dp/2383558079?tag=trouvetonca05-21',
  140: 'https://www.amazon.fr/dp/B0D2CXTVT6?tag=trouvetonca05-21',
  141: 'https://www.amazon.fr/dp/2213671117?tag=trouvetonca05-21',
  142: 'https://www.amazon.fr/dp/B07CZJH2HK?tag=trouvetonca05-21',
  143: 'https://www.amazon.fr/dp/B0GVJF7QYV?tag=trouvetonca05-21',
  144: 'https://www.amazon.fr/dp/B0FNRPFXBB?tag=trouvetonca05-21',
  145: 'https://www.amazon.fr/dp/B0FQPHYK3H?tag=trouvetonca05-21',
  146: 'https://www.amazon.fr/dp/B08NW1KH8S?tag=trouvetonca05-21',
  147: 'https://www.amazon.fr/dp/B09MJRPRR4?tag=trouvetonca05-21',
  148: 'https://www.amazon.fr/dp/B0H141BK91?tag=trouvetonca05-21',
  149: 'https://www.amazon.fr/dp/B0D4QD3VP5?tag=trouvetonca05-21',
  150: 'https://www.amazon.fr/dp/B08B696JCC?tag=trouvetonca05-21',
  151: 'https://www.amazon.fr/dp/B0C14H5GYD?tag=trouvetonca05-21',
  152: 'https://www.amazon.fr/dp/B09KNW2ZJF?tag=trouvetonca05-21',
  153: 'https://www.amazon.fr/dp/B0D412RH1X?tag=trouvetonca05-21',
  154: 'https://www.amazon.fr/dp/2416003097?tag=trouvetonca05-21',
  155: 'https://www.amazon.fr/dp/B09T94C7XL?tag=trouvetonca05-21',
  156: 'https://www.amazon.fr/dp/B0FHB8JVB3?tag=trouvetonca05-21',
  157: 'https://www.amazon.fr/dp/B0DNML5CXK?tag=trouvetonca05-21',
  158: 'https://www.amazon.fr/dp/B0C2J1XGMT?tag=trouvetonca05-21',
  159: 'https://www.amazon.fr/dp/B08R9JPB1K?tag=trouvetonca05-21',
  160: 'https://www.amazon.fr/dp/B071JM2NNP?tag=trouvetonca05-21',
  161: 'https://www.amazon.fr/dp/B0C4GL9RS3?tag=trouvetonca05-21',
  162: 'https://www.amazon.fr/dp/B0D8W95PVY?tag=trouvetonca05-21',
  163: 'https://www.amazon.fr/dp/B0CXN1SZG7?tag=trouvetonca05-21',
  164: 'https://www.amazon.fr/dp/B008CPJNNU?tag=trouvetonca05-21',
  165: 'https://www.amazon.fr/dp/B0G2SBW2HN?tag=trouvetonca05-21'
};

/* =========================================================
   PROFIL ENFANT — adaptation V1.2
   Les cadeaux enfant existants reçoivent des âges cohérents.
   Quelques cadeaux déjà présents dans la base deviennent aussi
   compatibles avec les enfants, sans dupliquer les 160 entrées.
   ========================================================= */
const CHILD_AGE_OVERRIDES = {
  4:   ['8-12','13-17'],
  91:  ['8-12','13-17'],
  92:  ['8-12','13-17'],
  93:  ['8-12','13-17'],
  94:  ['4-7','8-12'],
  95:  ['4-7','8-12','13-17'],
  96:  ['0-3','4-7'],
  97:  ['4-7','8-12','13-17'],
  98:  ['4-7','8-12'],
  99:  ['4-7','8-12','13-17'],
  100: ['8-12','13-17'],
};

const CHILD_COMPATIBLE_GIFTS = {
  5:   ['8-12','13-17'],
  9:   ['8-12','13-17'],
  12:  ['8-12','13-17'],
  16:  ['8-12','13-17'],
  17:  ['8-12','13-17'],
  18:  ['4-7','8-12','13-17'],
  21:  ['13-17'],
  30:  ['13-17'],
  32:  ['8-12','13-17'],
  40:  ['13-17'],
  43:  ['8-12','13-17'],
  45:  ['13-17'],
  61:  ['8-12','13-17'],
  65:  ['8-12','13-17'],
  70:  ['8-12','13-17'],
  78:  ['13-17'],
  79:  ['13-17'],
  85:  ['8-12','13-17'],
  87:  ['8-12','13-17'],
  107: ['8-12','13-17'],
  112: ['13-17'],
  113: ['8-12','13-17'],
  115: ['8-12','13-17'],
  123: ['8-12','13-17'],
  147: ['13-17'],
  154: ['13-17'],
};

const ADULT_AGES = ['18-25','26-35','36-50','50+'];
const CHILD_AGES = ['0-3','4-7','8-12','13-17'];

function normalizeGiftDatabase() {
  if (typeof EXTRA_GIFTS !== 'undefined') {
    EXTRA_GIFTS.forEach(g => { if (!CADEAUX.some(c => c.id === g.id)) CADEAUX.push(g); });
  }
  CADEAUX.forEach(gift => {
    if (!('image' in gift)) gift.image = '';
    gift.affiliateLink = AMAZON_PRODUCT_LINKS[gift.id] || gift.affiliateLink || '';

    if (CHILD_AGE_OVERRIDES[gift.id]) {
      const hasAdultAudience = gift.genre.some(genre => genre !== 'enfant');
      gift.age = hasAdultAudience
        ? [...new Set([...gift.age, ...CHILD_AGE_OVERRIDES[gift.id]])]
        : [...CHILD_AGE_OVERRIDES[gift.id]];
    }

    if (CHILD_COMPATIBLE_GIFTS[gift.id]) {
      if (!gift.genre.includes('enfant')) gift.genre.push('enfant');
      gift.age = [...new Set([...gift.age, ...CHILD_COMPATIBLE_GIFTS[gift.id]])];
    }
    Object.assign(gift, GiftEngine.enrich(gift));
    // Corrections éditoriales ciblées après l’enrichissement historique, sans changer le moteur.
    if (gift.id === 70) gift.interets = gift.interets.filter(i => i !== 'nature-outdoor');
    if (gift.id === 95) {
      gift.interets = gift.interets.filter(i => i !== 'creatif-diy');
      gift.traits = gift.traits.filter(t => t !== 'creatif');
    }
  });
}

/* =========================================================
   IMAGES RÉELLES — mapping catégorie → mots-clés photo
   (sert à charger une vraie photo pertinente par carte ;
   remplacez ces URLs par vos propres photos produit / liens
   d'affiliation dès que vous en aurez, via le champ "image"
   de chaque cadeau dans CADEAUX)
   ========================================================= */
const IMAGE_KEYWORDS = {
  'jeux-video':  'gaming,controller',
  'manga':       'anime,manga',
  'technologie': 'technology,gadget',
  'voyage':      'travel,suitcase',
  'lecture':     'books,reading',
  'cuisine':     'cooking,kitchen',
  'animaux':     'pet,dog',
  'sport':       'fitness,sport',
  'musique':     'music,vinyl',
  'cinema':      'cinema,movie',
};

const GENRE_FALLBACK_KEYWORDS = {
  'homme':  'giftbox,present',
  'femme':  'giftbox,present',
  'couple': 'couple,gift',
  'enfant': 'toys,kids',
};

/* =========================================================
   IMAGES RÉELLES — mots-clés précis par titre, repli par catégorie
   (Le matching par titre donne une photo bien plus proche du
   produit réel que le simple repli par catégorie utilisé en v1.
   Remplacez par vos propres photos produit via le champ "image"
   de chaque cadeau dans CADEAUX dès que vous en aurez.)
   ========================================================= */
const TITLE_KEYWORDS = [
  [/manette|dualsense/i, 'gamepad,controller'],
  [/xbox|game pass/i, 'xbox,gaming'],
  [/steam/i, 'pc gaming,keyboard'],
  [/switch lite|nintendo/i, 'nintendo switch'],
  [/amiibo|figurine funko|funko pop/i, 'action figure,collectible'],
  [/chaise gaming/i, 'gaming chair'],
  [/casque gaming/i, 'gaming headset'],
  [/casque.*r[ée]alit[ée] virtuelle|r[ée]alit[ée] virtuelle/i, 'virtual reality headset'],
  [/casque/i, 'headphones'],
  [/tapis de souris/i, 'mousepad'],
  [/jeu de soci[ée]t[ée]|catan|chouette coop/i, 'board game'],
  [/histoire des jeux vid[ée]o/i, 'retro video games'],
  [/box manga|one piece/i, 'manga,comics'],
  [/crunchyroll/i, 'anime streaming'],
  [/artbook|dragon ball/i, 'manga artbook'],
  [/t-shirt manga/i, 't-shirt,apparel'],
  [/tasse thermo|mug/i, 'coffee mug'],
  [/dessin manga|cours de dessin\/peinture/i, 'drawing class'],
  [/oreiller peluche/i, 'plush pillow'],
  [/[ée]couteurs/i, 'wireless earbuds'],
  [/montre connect[ée]e|montre gps/i, 'smartwatch'],
  [/montre m[ée]canique/i, 'vintage wristwatch'],
  [/chargeur sans fil|powerbank/i, 'phone charger'],
  [/enceinte/i, 'bluetooth speaker'],
  [/projecteur/i, 'mini projector'],
  [/lampe led bureau|lampe de lecture/i, 'desk lamp'],
  [/domotique/i, 'smart home'],
  [/c[âa]ble usb/i, 'usb cable'],
  [/disque dur|ssd/i, 'external hard drive'],
  [/robot aspirateur/i, 'robot vacuum'],
  [/valise/i, 'suitcase,luggage'],
  [/lonely planet|guide.*voyage/i, 'travel guidebook'],
  [/sac à dos/i, 'travel backpack'],
  [/carte du monde/i, 'world map'],
  [/adaptateur universel/i, 'travel adapter'],
  [/trousse de toilette/i, 'toiletry bag'],
  [/parachutisme/i, 'skydiving'],
  [/spa|thalasso|bien.?[êe]tre|wellness/i, 'spa wellness'],
  [/carnet de voyage|carnet bullet|carnet de recettes/i, 'leather notebook'],
  [/kindle unlimited|liseuse/i, 'ereader'],
  [/box livres/i, 'stack of books'],
  [/marque-pages/i, 'bookmark'],
  [/librairie/i, 'bookstore'],
  [/dictionnaire/i, 'dictionary book'],
  [/pr[ée]commande livre|auteur pr[ée]f[ée]r[ée]|encyclop[ée]die|pop-up encyclop[ée]dique/i, 'hardcover book'],
  [/cours de cuisine/i, 'cooking class'],
  [/robot cuiseur/i, 'food processor'],
  [/couteaux japonais/i, 'chef knife'],
  [/[ée]pices/i, 'spices market'],
  [/p[âa]tes fra[îi]ches/i, 'pasta maker'],
  [/tablier/i, 'kitchen apron'],
  [/huiles d.olive/i, 'olive oil'],
  [/\bwok\b/i, 'wok pan'],
  [/macarons/i, 'macarons'],
  [/boulangerie/i, 'fresh bread bakery'],
  [/kombucha/i, 'kombucha bottle'],
  [/whisky/i, 'whisky glass'],
  [/bi[èe]res artisanales/i, 'craft beer'],
  [/vin|vignoble|oenologie/i, 'wine bottle'],
  [/th[ée] grand cru/i, 'tea ceremony'],
  [/photo professionnelle avec son animal|portrait.*animal/i, 'pet photography'],
  [/friandises chien|chat/i, 'dog cat treats'],
  [/gps tracker pour chien/i, 'dog collar'],
  [/croquettes/i, 'dog food bowl'],
  [/fontaine.*chat/i, 'cat drinking fountain'],
  [/langage de son chien/i, 'dog training book'],
  [/aquarium/i, 'aquarium fish tank'],
  [/salle de sport/i, 'gym fitness'],
  [/tapis de yoga/i, 'yoga mat'],
  [/escalade/i, 'rock climbing'],
  [/foam roller/i, 'foam roller fitness'],
  [/v[ée]lo électrique/i, 'electric bike'],
  [/v[ée]lo enfant/i, 'kids bicycle'],
  [/musculation|[ée]lastiques/i, 'resistance bands'],
  [/strava/i, 'running tracker'],
  [/natation enfant/i, 'swimming pool'],
  [/ukul[ée]l[ée]/i, 'ukulele'],
  [/vinyle|platine/i, 'vinyl record player'],
  [/spotify|deezer/i, 'music streaming headphones'],
  [/concert|match de foot|ligue 1/i, 'live concert crowd'],
  [/cours de chant/i, 'singing microphone'],
  [/netflix|abonnement.*podcast|audible/i, 'streaming tv'],
  [/blu-ray|star wars/i, 'movie collection'],
  [/cin[ée]ma|ugc illimit[ée]/i, 'cinema theater'],
  [/pyjama cin[ée]ma/i, 'movie night popcorn'],
  [/sc[ée]nario/i, 'screenwriting typewriter'],
  [/affiche cin[ée]ma/i, 'vintage movie poster'],
  [/week-end romantique|gîte/i, 'romantic cottage'],
  [/d[îi]ner gastronomique/i, 'fine dining restaurant'],
  [/poterie/i, 'pottery ceramics'],
  [/escape game/i, 'escape room'],
  [/massage/i, 'spa massage'],
  [/bijou/i, 'fine jewelry'],
  [/\blego\b/i, 'lego bricks'],
  [/microscope/i, 'microscope science'],
  [/kit robotique/i, 'robotics kit'],
  [/tente de jeu/i, 'kids play tent'],
  [/coffret magie/i, 'magic tricks'],
  [/table lumineuse/i, 'light table drawing'],
  [/aquarelle/i, 'watercolor painting set'],
  [/journal papier/i, 'newspaper'],
  [/jardinage|jardin botanique/i, 'garden plants'],
  [/puzzle/i, 'jigsaw puzzle'],
  [/radio dab/i, 'retro radio'],
  [/bougie/i, 'scented candle'],
  [/porte-monnaie|portefeuille/i, 'leather wallet'],
  [/plante succulente/i, 'succulent plant'],
  [/carte scratch/i, 'scratch poster'],
  [/pilotage voiture/i, 'sports car race track'],
  [/montgolfi[èe]re/i, 'hot air balloon'],
  [/surf/i, 'surfing beach'],
  [/toile photo/i, 'photo canvas print'],
  [/lunch box/i, 'lunch box'],
  [/coloriage anti-stress/i, 'coloring book'],
  [/coffret bain/i, 'bath salts'],
  [/cours de langue/i, 'language learning'],
  [/cocktails/i, 'cocktail bar'],
  [/cosm[ée]tiques bio/i, 'natural cosmetics'],
  [/drone/i, 'camera drone'],
  [/sac à main/i, 'leather handbag'],
  [/set [ée]criture|stylo.*calligraphie/i, 'fountain pen'],
  [/tableau ardoise/i, 'chalkboard'],
  [/lunettes de soleil/i, 'sunglasses'],
  [/bo[îi]te cadeau surprise/i, 'gift box'],
  [/pass mus[ée]e/i, 'museum art'],
  [/rallye|randonn[ée]e/i, 'hiking trail'],
  [/playstation/i, 'playstation console'],
  [/photographie de rue|formation photo/i, 'street photography camera'],
  [/panneau lumineux/i, 'neon sign'],
];

/**
 * Retourne une URL de vraie photo (libre de droits, servie via LoremFlickr)
 * pertinente pour un cadeau donné : on cherche d'abord un mot-clé précis
 * correspondant au titre, puis on retombe sur la catégorie générale.
 * Le paramètre "lock" fixe une image stable par cadeau (pas de changement
 * aléatoire à chaque rechargement).
 * @param {Object} gift
 * @returns {string} URL d'image
 */
function getGiftImage(gift) {
  if (gift.image && gift.image !== '') return gift.image;
  if (gift.imageFallback) return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"/>');

  let keyword = null;
  for (const [regex, kw] of TITLE_KEYWORDS) {
    if (regex.test(gift.titre)) { keyword = kw; break; }
  }
  if (!keyword) {
    keyword = (gift.interets && gift.interets.length)
      ? (IMAGE_KEYWORDS[gift.interets[0]] || 'gift,present')
      : (GENRE_FALLBACK_KEYWORDS[gift.genre[0]] || 'gift,present');
  }
  return `https://loremflickr.com/480/360/${encodeURIComponent(keyword)}?lock=${gift.id}`;
}

/* =========================================================
   CONFIGURATION AFFILIATION & MONÉTISATION
   ⚠️ À REMPLIR avant mise en ligne pour toucher des commissions.
   ========================================================= */
// Votre identifiant Amazon Associates (ex: "votreid-21"). Laissez vide
// pour des liens Amazon simples (sans commission).
const AMAZON_AFFILIATE_TAG = 'trouvetonca05-21';

function addAmazonAffiliateTag(url) {
  if (!AMAZON_AFFILIATE_TAG) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'amazon.fr' || parsed.hostname.endsWith('.amazon.fr')) {
      parsed.searchParams.set('tag', AMAZON_AFFILIATE_TAG);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Construit un lien de recherche Amazon.fr pour un titre de produit,
 * en ajoutant automatiquement votre tag d'affiliation s'il est renseigné.
 */
function buildAmazonLink(titre) {
  const base = `https://www.amazon.fr/s?k=${encodeURIComponent(titre)}`;
  return addAmazonAffiliateTag(base);
}

function getProductUrl(gift) {
  const url = gift.affiliateLink || buildAmazonLink(gift.titre);
  return addAmazonAffiliateTag(url);
}

/* =========================================================
   ANALYTICS V1.2 — événements essentiels uniquement
   ========================================================= */
function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/* =========================================================
   ÉTAT DE L'APPLICATION
   ========================================================= */
const state = {
  currentStep: 1,
  genre: null,
  age: null,
  budget: null,
  interets: [],
  occasion: null,
  unknownInterests: false,
  unknownPerson: null,
  unknownGift: null,
  mode: 'quiz'
};
let recommendationMemory;
try { recommendationMemory = GiftEngine.load(localStorage); }
catch { recommendationMemory = {history:[], feedback:{}}; }
function saveRecommendationMemory() {
  try { return GiftEngine.persist(localStorage,recommendationMemory); } catch { return false; }
}

let quizStarted = false;

/**
 * Résultats actuellement affichés (IDs) — pour éviter les doublons lors du remplacement
 * Amélioration N°1
 */
let displayedIds = [];

/**
 * Pool complet de résultats scorés (peut être > 10) — réserve pour le remplacement
 * Amélioration N°1
 */
let resultsPool = [];

/** Cadeaux refusés pendant la recherche courante. */
const rejectedIds = new Set();
/** Idées aimées dans cette recherche : visibles jusqu'à la prochaine génération, puis exclues. */
const likedIds = new Set();

/* =========================================================
   PROGRESSION
   ========================================================= */
/**
 * Met à jour la barre de progression et les indicateurs
 * @param {number} step - Étape actuelle (1-4)
 */
function updateProgress(step) {
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  const dots  = document.querySelectorAll('.step-dot');

  const pct = (step / 4) * 100;
  fill.style.width = pct + '%';
  label.textContent = `Étape ${step} sur 4`;

  dots.forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i + 1 < step) d.classList.add('done');
    if (i + 1 === step) d.classList.add('active');
  });

  document.querySelector('.progress-wrapper')
    .setAttribute('aria-valuenow', step);
}

/* =========================================================
   NAVIGATION ENTRE ÉTAPES
   ========================================================= */
function getAgesForGenre(genre) {
  return genre === 'enfant' ? CHILD_AGES : ADULT_AGES;
}

function ageLabel(age) {
  return age === '50+' ? '50 ans et +' : `${age.replace('-', ' – ')} ans`;
}

function renderAgeOptions(genre) {
  const wrap = document.getElementById('ageOptions');
  if (!wrap) return;

  const icons = genre === 'enfant' ? ['🧸','🧩','🎒','🎧'] : ['🎓','💼','🏡','🌟'];
  wrap.innerHTML = getAgesForGenre(genre).map((age, index) => `
    <button class="option-btn" data-key="age" data-value="${age}" onclick="selectOption(this, 'age', '${age}')">
      <span class="option-icon">${icons[index]}</span>
      <span class="option-label">${ageLabel(age)}</span>
    </button>`).join('');

  state.age = null;
  const next = document.getElementById('next-2');
  if (next) next.disabled = true;
}

/**
 * Sélectionne une option (radio unique par catégorie)
 */
function selectOption(btn, key, value) {
  // Désélectionner autres boutons du même groupe
  const siblings = btn.closest('.options-grid').querySelectorAll('.option-btn');
  siblings.forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Enregistrer dans l'état
  state[key] = value;

  if (key === 'genre') {
    renderAgeOptions(value);
    if (!quizStarted) {
      quizStarted = true;
      trackEvent('quiz_start', { source: 'questionnaire', genre: value });
    }
  }

  // Activer bouton suivant
  const nextBtn = document.getElementById(`next-${state.currentStep}`);
  if (nextBtn) nextBtn.disabled = false;
}

/**
 * Bascule un centre d'intérêt (multi-sélect)
 */
function toggleInterest(btn, value) {
  if (value === 'unknown') {
    state.unknownInterests = !state.unknownInterests;
    state.interets = [];
  } else {
    state.unknownInterests = false;
    state.interets = state.interets.includes(value) ? state.interets.filter(i => i !== value) : [...state.interets,value];
  }
  if (!state.unknownInterests) clearUnknownPreferences();
  const followup = document.getElementById('unknownFollowup');
  followup.classList.toggle('hidden',!state.unknownInterests);
  if (state.unknownInterests) {
    // Le dernier intérêt peut être tout en bas de l'écran : révéler aussi les questions.
    const bounds = followup.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
      followup.scrollIntoView({behavior:'instant',block:'center'});
    }
  }
  document.querySelectorAll('.interest-btn').forEach(button => {
    const selected = button.dataset.value === 'unknown' ? state.unknownInterests : state.interets.includes(button.dataset.value);
    button.classList.toggle('selected',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
}
function clearUnknownPreferences() {
  state.unknownPerson = null;
  state.unknownGift = null;
  document.getElementById('unknownFollowup').classList.add('hidden');
  document.querySelectorAll('.unknown-option-btn').forEach(button => {
    button.classList.remove('selected');
    button.setAttribute('aria-pressed','false');
  });
}
function chooseUnknownPreference(btn,key,value) {
  if (!state.unknownInterests) return;
  const field = key === 'person' ? 'unknownPerson' : 'unknownGift';
  state[field] = state[field] === value ? null : value;
  document.querySelectorAll(`.unknown-option-btn[data-unknown-key="${key}"]`).forEach(button => {
    const selected = button.dataset.value === state[field];
    button.classList.toggle('selected',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
}

/**
 * Passer à l'étape suivante
 */
function nextStep(toStep) {
  const current = document.getElementById(`step-${state.currentStep}`);
  const next    = document.getElementById(`step-${toStep}`);
  if (!current || !next) return;

  current.classList.remove('active');
  next.classList.add('active');
  state.currentStep = toStep;
  updateProgress(toStep);

  // Scroll doux vers le haut du quiz
  document.getElementById('quiz-section').scrollIntoView({ behavior:'smooth', block:'start' });
}

/**
 * Revenir à l'étape précédente
 */
function prevStep(toStep) {
  const current = document.getElementById(`step-${state.currentStep}`);
  const prev    = document.getElementById(`step-${toStep}`);
  if (!current || !prev) return;

  current.classList.remove('active');
  prev.classList.add('active');
  state.currentStep = toStep;
  updateProgress(toStep);
}

/* =========================================================
   SOUMISSION ET RECHERCHE
   ========================================================= */
const LOADING_MESSAGES = [
  "Analyse de votre profil en cours…",
  "Parcours de notre base de plus de 160 cadeaux…",
  "Sélection des idées les plus originales…",
  "Application du filtre budget…",
  "Finalisation de votre liste personnalisée…",
];

/**
 * Lance le processus de recherche avec chargement animé
 */
function submitQuiz() {
  if (!state.genre || !state.age || !state.budget) return;

  rejectedIds.clear();
  likedIds.clear();
  trackEvent('quiz_complete', {
    genre: state.genre,
    age: state.age,
    budget: state.budget,
    interest_count: state.interets.length,
  });

  // Masquer quiz, afficher loading
  document.getElementById('quiz-section').classList.add('hidden');
  const homeSections = document.getElementById('homeSections');
  if (homeSections) homeSections.classList.add('hidden');
  const loadingSection = document.getElementById('loading-section');
  loadingSection.classList.remove('hidden');

  // Animation des messages de chargement
  let msgIndex = 0;
  const msgEl = document.getElementById('loadingMsg');
  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
    msgEl.style.opacity = '0';
    setTimeout(() => {
      msgEl.textContent = LOADING_MESSAGES[msgIndex];
      msgEl.style.opacity = '1';
    }, 150);
  }, 700);

  // Courte transition visuelle, sans ralentir artificiellement l'utilisateur
  setTimeout(() => {
    clearInterval(msgInterval);
    const results = computeResults();
    showResults(results);
  }, 350);
}

/* =========================================================
   ALGORITHME DE RECOMMANDATION
   ========================================================= */
/**
 * Score de pertinence d'un cadeau par rapport à l'état utilisateur
 * @param {Object} cadeau
 * @returns {number} score (plus élevé = plus pertinent)
 */
function scoreGift(cadeau) {
  return GiftEngine.score(cadeau,state,recommendationMemory,CADEAUX);
}

/**
 * Calcule et retourne les 10 meilleurs résultats.
 * Alimente également resultsPool (tous les compatibles) pour le remplacement.
 * @returns {Array} liste de cadeaux (10 premiers)
 */
function computeResults() {
  const selection = GiftEngine.select(CADEAUX,state,recommendationMemory,
    {rejected:new Set([...rejectedIds,...likedIds])});
  resultsPool = selection.pool;
  displayedIds = selection.results.map(c => c.id);
  GiftEngine.remember(recommendationMemory,selection.results);
  saveRecommendationMemory();
  return selection.results;
}
function regenerateResults() {
  if (state.genre && state.age && state.budget) showResults(computeResults());
}
function resetRecommendationPreferences() {
  recommendationMemory = {history:[],feedback:{}};
  rejectedIds.clear();
  likedIds.clear();
  saveRecommendationMemory();
  document.querySelectorAll('.gift-feedback [aria-pressed]').forEach(btn => {
    btn.setAttribute('aria-pressed','false');
    btn.textContent = '❤️ Bonne idée';
  });
  showFavToast('Préférences réinitialisées. Vos favoris sont conservés.');
}
function giveGiftFeedback(id,kind,btn) {
  if (btn.closest('.gift-card')?.classList.contains('replacing')) return;
  GiftEngine.feedback(recommendationMemory,state,id,kind);
  const saved = saveRecommendationMemory();
  if (kind === 'good') {
    likedIds.add(id);
    btn.setAttribute('aria-pressed','true');
    btn.textContent = '❤️ Noté !';
    showFavToast(saved ? 'On affine les prochaines idées. Cliquez sur « D’autres idées ».' : 'On affine les prochaines idées pour cette visite.');
  } else {
    skipCard(id,btn);
  }
}

/* =========================================================
   AFFICHAGE DES RÉSULTATS
   ========================================================= */
/**
 * Génère les étoiles d'originalité
 */
function genStars(n) {
  const filled = Math.round(n / 2);
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

/**
 * Libellé budget lisible
 */
function budgetLabel(b) {
  const map = { '<20':'< 20€', '20-50':'20 – 50€', '50-100':'50 – 100€', '>100':'+ de 100€' };
  return map[b] || b;
}

/**
 * Libellé genre lisible
 */
function genreLabel(g) {
  const map = { homme:'Homme', femme:'Femme', couple:'Couple', enfant:'Enfant' };
  return map[g] || g;
}

/**
 * Affiche la section résultats
 */
function updateSelectionNote(results) {
  const matched = results.filter(g => !state.interets.length || state.interets.some(i => g.interets.includes(i))).length;
  document.getElementById('selectionNote').textContent =
    (state.interets.length && matched < results.length ? `${matched} idée(s) liée(s) à vos intérêts, complétées par des alternatives compatibles. ` : '') +
    'Budgets indicatifs : vérifiez les prix sur Amazon. Les avis sont liés au destinataire et à sa tranche d’âge ; réinitialisez-les pour une autre personne du même profil.';
}

function showResults(results) {
  document.getElementById('loading-section').classList.add('hidden');

  const section = document.getElementById('results-section');
  const grid    = document.getElementById('cardsGrid');
  const summary = document.getElementById('resultsSummary');
  const title   = document.getElementById('resultsTitle');

  const countLabel = results.length === 1 ? 'idée cadeau' : 'idées cadeaux';
  title.textContent = results.length
    ? `🎉 Vos ${results.length} ${countLabel}`
    : '😕 Aucune idée trouvée';

  // Résumé de la recherche
  summary.textContent = `Pour un·e ${genreLabel(state.genre)} · Budget ${budgetLabel(state.budget)}${state.interets.length ? ' · ' + state.interets.length + ' intérêt(s) sélectionné(s)' : ''}`;

  updateSelectionNote(results);

  // Vider la grille
  grid.innerHTML = '';

  if (results.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--clr-muted);grid-column:1/-1;padding:40px 0">Aucun résultat trouvé. Essayez d\'élargir vos critères.</p>';
  } else {
    results.forEach((gift, idx) => {
      const card = createCard(gift, idx + 1);
      card.style.animationDelay = `${idx * 0.06}s`;
      card.dataset.giftId = gift.id;
      grid.appendChild(card);
    });
  }
  // Mettre à jour le compteur de favoris dans le bouton
  refreshFavCount();
  refreshDecisionControls();

  section.classList.remove('hidden');
  section.scrollIntoView({ behavior:'smooth', block:'start' });
  if (results.length > 0) fireConfetti();
}

/**
 * Crée un élément carte cadeau (V2 avec toutes les améliorations)
 * @param {Object} gift   — objet cadeau
 * @param {number} num    — numéro affiché (#1-#10)
 * @param {boolean} inModal — true si affiché dans le modal favoris (cache skip/buy)
 */
function createCard(gift, num, inModal = false) {
  const card = document.createElement('article');
  card.className = 'gift-card';
  card.setAttribute('aria-label', `Idée cadeau ${num} : ${gift.titre}`);
  card.dataset.giftId = gift.id;

  // ── AMÉLIORATION N°3 : Raisons dynamiques ──
  const whyItems = buildWhyReasons(gift,!inModal);
  const whyHTML = whyItems.length ? `
    <div class="card-why">
      <p class="card-why-title">Pourquoi ce cadeau ?</p>
      <ul class="card-why-list">
        ${whyItems.map(r => `<li>✔ ${r}</li>`).join('')}
      </ul>
    </div>` : '';

  // ── AMÉLIORATION N°4 : État favori ──
  const isFav   = isFavorite(gift.id);
  const favLabel = isFav ? '❤️ Sauvegardé' : '🤍 Favori';
  const favClass = isFav ? 'btn-fav is-fav' : 'btn-fav';

  // ── AMÉLIORATION N°2 : Liens produit RÉELS ──
  // Priorité : lien d'affiliation renseigné manuellement (gift.affiliateLink),
  // sinon recherche réelle sur Amazon.fr (lien fonctionnel, pas un faux lien).
  // Astuce monétisation : remplacez par vos liens Amazon Associates / Awin.
  const productUrl = getProductUrl(gift);
  const compareUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(gift.titre)}`;

  // ── Image réelle (vraie photo) ──
  const imgUrl = getGiftImage(gift);

  // ── Boutons d'action (masqués dans le modal) ──
  const actionsHTML = inModal ? `
    <div class="card-actions">
      <a class="btn-buy" href="${productUrl}" target="_blank" rel="noopener noreferrer sponsored" aria-label="Voir le produit ${gift.titre} sur Amazon">
        🛒 Voir sur Amazon
      </a>
      <button class="btn-fav is-fav" onclick="removeFavorite(${gift.id})" aria-label="Retirer ${gift.titre} des favoris">
        💔 Retirer
      </button>
    </div>` : `
    <div class="card-actions">
      <button class="btn-skip" onclick="giveGiftFeedback(${gift.id}, 'style', this)" aria-label="Pas son style, remplacer cette idée">
        ❌ Pas son style
      </button>
      <a class="btn-buy" href="${productUrl}" target="_blank" rel="noopener noreferrer sponsored" aria-label="Voir le produit ${gift.titre} sur Amazon">
        🛒 Voir sur Amazon
      </a>
      <a class="btn-compare" href="${compareUrl}" target="_blank" rel="noopener noreferrer" aria-label="Comparer les prix de ${gift.titre}" title="Comparer les prix">
        🔎
      </a>
      <button class="${favClass}" onclick="toggleFavorite(${gift.id}, this)" aria-label="Ajouter aux favoris">
        ${favLabel}
      </button>
    </div>`;

  card.innerHTML = `
    <div class="card-image">
      <img src="${imgUrl}" alt="${gift.titre}" loading="lazy"
           onerror="this.closest('.card-image').classList.add('img-fallback')">
      <span class="card-emoji-badge">${gift.emoji}</span>
      <span class="card-num">#${num}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${gift.titre}</h3>
      ${!inModal && gift.selectionLabel ? `<p class="selection-label">${gift.selectionLabel}</p>` : ''}
      <p class="card-desc">${gift.desc}</p>
      ${whyHTML}
      <div class="card-footer">
        <span class="card-badge budget">💰 ${budgetLabel(gift.budget)}</span>
        <div class="originality">
          <span class="originality-label">Originalité :</span>
          <span class="stars">${genStars(gift.originalite)}</span>
          <span class="originality-score">${gift.originalite}/10</span>
        </div>
      </div>
      ${actionsHTML}
      <div class="card-decision-actions">
        <button type="button" class="btn-decision btn-compare-gifts${comparisonIds.includes(gift.id) ? ' selected' : ''}" data-decision-id="${gift.id}" aria-pressed="${comparisonIds.includes(gift.id)}" onclick="toggleCompareGift(${gift.id})">${comparisonIds.includes(gift.id) ? '✓ À comparer' : '⚖️ Comparer'}</button>
        <button type="button" class="btn-decision btn-final-choice${getFinalChoiceId() === gift.id ? ' selected' : ''}" data-decision-id="${gift.id}" aria-pressed="${getFinalChoiceId() === gift.id}" onclick="toggleFinalChoice(${gift.id})">${getFinalChoiceId() === gift.id ? '✓ Mon choix' : '☆ Mon choix'}</button>
      </div>
      ${inModal ? '' : `<div class="gift-feedback" aria-label="Votre avis sur ce cadeau">
        <button type="button" class="btn-feedback" aria-pressed="${GiftEngine.feedbackFor(recommendationMemory,state,gift.id) === 'good'}" onclick="giveGiftFeedback(${gift.id}, 'good', this)">❤️ Bonne idée</button>
        <button type="button" class="btn-feedback" onclick="giveGiftFeedback(${gift.id}, 'owned', this)">✓ Il/elle l’a déjà</button>
      </div>`}
    </div>
  `;

  if (gift.imageFallback) card.querySelector('.card-image').classList.add('img-fallback');
  const amazonLink = card.querySelector('.btn-buy');
  if (amazonLink) {
    amazonLink.addEventListener('click', () => {
      trackEvent('amazon_click', { gift_id: gift.id, gift_title: gift.titre, placement: inModal ? 'favorites' : 'results' });
    });
  }

  return card;
}

/* =========================================================
   AMÉLIORATION N°3 : RAISONS DYNAMIQUES
   ========================================================= */
/**
 * Génère un tableau de raisons textuelles pour justifier la recommandation
 * @param {Object} gift
 * @returns {string[]}
 */
function buildWhyReasons(gift, useProfile = true) {
  const reasons = [];
  const INTERESTS_FR = GiftEngine.INTERESTS;
  const matches = useProfile ? (state.interets || []).filter(i => gift.interets.includes(i)) : [];
  if (matches.length) reasons.push(`Correspond à : ${matches.map(i => INTERESTS_FR[i] || i).join(' · ')}`);
  else if (gift.interets.length) reasons.push(`Univers : ${gift.interets.slice(0,2).map(i => INTERESTS_FR[i] || i).join(' · ')}`);
  const traits = [['utile','Utile'],['original','Original'],['decouverte','À découvrir'],
    ['creatif','Créatif'],['decoration','Décoration'],['sentimental','Personnel']]
    .filter(([key]) => gift.traits.includes(key)).map(([,label]) => label);
  if (traits.length) reasons.push(`Type d’idée : ${traits.slice(0,2).join(' · ')}`);
  if (!reasons.length && useProfile) reasons.push('Compatible avec le destinataire, l’âge et le budget choisis');
  return reasons.slice(0,2);
}

/* =========================================================
   AMÉLIORATION N°1 : PAS POUR MOI — REMPLACEMENT
   ========================================================= */
/**
 * Remplace une carte par un nouveau cadeau compatible du pool
 * @param {number} giftId  — ID du cadeau à remplacer
 * @param {HTMLElement} btn — bouton cliqué (pour remonter à la carte)
 */
function skipCard(giftId, btn) {
  const card = btn.closest('.gift-card');
  if (!card || card.classList.contains('replacing')) return;

  rejectedIds.add(giftId);
  const rejectedGift = CADEAUX.find(c => c.id === giftId);
  trackEvent('gift_rejected', {
    gift_id: giftId,
    gift_title: rejectedGift ? rejectedGift.titre : '',
  });

  // Chercher un remplaçant dans le pool (non affiché, non encore rejeté)
  const visibleIds = displayedIds.slice();
  const replacement = GiftEngine.select(CADEAUX,state,recommendationMemory,
    {limit:1,rejected:new Set([...rejectedIds,...likedIds]),exclude:visibleIds}).results[0];

  if (!replacement) {
    displayedIds = displayedIds.filter(id => id !== giftId);
    card.remove();
    document.getElementById('resultsTitle').textContent = `Vos ${displayedIds.length} idées cadeaux`;
    updateSelectionNote(CADEAUX.filter(g => displayedIds.includes(g.id)));
    if (!displayedIds.length) showResults([]);
    showFavToast('Avis retenu. Plus d’alternative compatible pour le moment.');
    return;
  }

  // Récupérer le numéro actuel de la carte
  const numEl  = card.querySelector('.card-num');
  const cardNum = numEl ? parseInt(numEl.textContent.replace('#','')) : 1;

  // Animation de sortie/entrée
  card.classList.add('replacing');
  const reservedIndex = displayedIds.indexOf(giftId);
  if (reservedIndex !== -1) displayedIds[reservedIndex] = replacement.id;
  GiftEngine.remember(recommendationMemory,[replacement]);
  saveRecommendationMemory();

  setTimeout(() => {
    // Mettre à jour displayedIds
    const oldIdx = displayedIds.indexOf(giftId);
    if (oldIdx !== -1) displayedIds[oldIdx] = replacement.id;

    // Reconstruire la carte avec le nouveau cadeau
    const newCard = createCard(replacement, cardNum);
    newCard.dataset.giftId = replacement.id;
    newCard.style.animationDelay = '0s';
    card.replaceWith(newCard);
    updateSelectionNote(CADEAUX.filter(g => displayedIds.includes(g.id)));
  }, 220); // mi-chemin de l'animation cardOut
}

/* =========================================================
   AIDE À LA DÉCISION — comparaison temporaire et choix final local
   ========================================================= */
const comparisonIds = [];
const FINAL_CHOICE_KEY = 'ttc_final_choice_v1';
let finalChoiceId = null;
let previousCompareFocus = null;
try {
  const savedChoice = localStorage.getItem(FINAL_CHOICE_KEY);
  if (savedChoice && /^\d+$/.test(savedChoice)) finalChoiceId = Number(savedChoice);
} catch {}

function getFinalChoiceId() {
  return CADEAUX.some(gift => gift.id === finalChoiceId) ? finalChoiceId : null;
}

function refreshDecisionControls() {
  document.querySelectorAll('.btn-compare-gifts').forEach(btn => {
    const selected = comparisonIds.includes(Number(btn.dataset.decisionId));
    btn.classList.toggle('selected', selected);
    btn.setAttribute('aria-pressed',String(selected));
    btn.textContent = selected ? '✓ À comparer' : '⚖️ Comparer';
  });
  document.querySelectorAll('.btn-final-choice').forEach(btn => {
    const selected = getFinalChoiceId() === Number(btn.dataset.decisionId);
    btn.classList.toggle('selected', selected);
    btn.setAttribute('aria-pressed',String(selected));
    btn.textContent = selected ? '✓ Mon choix' : '☆ Mon choix';
  });
  for (const id of ['compareResultsBtn','compareFavoritesBtn']) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    btn.classList.toggle('hidden',comparisonIds.length === 0);
    btn.querySelector('.compare-count').textContent = `(${comparisonIds.length}/3)`;
  }
}

function toggleCompareGift(id) {
  if (!CADEAUX.some(gift => gift.id === id)) return;
  const index = comparisonIds.indexOf(id);
  if (index >= 0) comparisonIds.splice(index,1);
  else if (comparisonIds.length >= 3) {
    showFavToast('3 cadeaux maximum : retirez-en un avant d’en ajouter un autre.');
    return;
  } else comparisonIds.push(id);
  refreshDecisionControls();
  if (!document.getElementById('compareModal').classList.contains('hidden')) renderCompareModal();
  else showFavToast(index >= 0 ? 'Cadeau retiré de la comparaison.' : 'Ajouté à la comparaison.');
}

function renderCompareModal() {
  const grid = document.getElementById('compareGrid');
  grid.innerHTML = comparisonIds.length ? comparisonIds.map(id => {
    const gift = CADEAUX.find(item => item.id === id);
    if (!gift) return '';
    const interests = gift.interets.map(i => GiftEngine.INTERESTS[i] || i).join(' · ') || 'Non précisé';
    const family = gift.family && !gift.family.startsWith('type-') ? gift.family.replaceAll('-',' ') : 'Non précisé';
    const why = buildWhyReasons(gift,false).join(' · ') || 'Métadonnées limitées pour cette idée';
    const img = getGiftImage(gift);
    return `<article class="compare-card">
      <div class="compare-card-image${gift.imageFallback ? ' img-fallback' : ''}"><img src="${img}" alt="${gift.titre}" loading="lazy" onerror="this.parentElement.classList.add('img-fallback')"><span>${gift.emoji}</span></div>
      <h3>${gift.titre}</h3>
      <dl><dt>Budget éditorial</dt><dd>${budgetLabel(gift.budget)}</dd>
      <dt>Intérêts</dt><dd>${interests}</dd>
      <dt>Type</dt><dd>${family}</dd>
      <dt>Originalité éditoriale</dt><dd>${gift.originalite}/10</dd>
      <dt>Pourquoi cette idée ?</dt><dd>${why}</dd></dl>
      <a class="btn-buy" href="${getProductUrl(gift)}" target="_blank" rel="noopener noreferrer sponsored">🛒 Voir sur Amazon</a>
      <button type="button" class="btn-decision compare-final-choice${getFinalChoiceId() === id ? ' selected' : ''}" data-decision-id="${id}" aria-pressed="${getFinalChoiceId() === id}" onclick="toggleFinalChoice(${id})">${getFinalChoiceId() === id ? '✓ Mon choix' : '☆ Mon choix'}</button>
      <button type="button" class="btn-decision" onclick="toggleCompareGift(${id})">Retirer de la comparaison</button>
    </article>`;
  }).join('') : '<p class="compare-empty">Aucun cadeau à comparer. Ajoutez-en depuis les résultats ou vos favoris.</p>';
}

function openCompareModal() {
  if (!comparisonIds.length) return;
  previousCompareFocus = document.activeElement;
  renderCompareModal();
  document.getElementById('favModal').inert = true;
  document.getElementById('compareModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.querySelector('#compareModal .modal-close').focus();
}
function closeCompareModal() {
  document.getElementById('compareModal').classList.add('hidden');
  document.getElementById('favModal').inert = false;
  if (document.getElementById('favModal').classList.contains('hidden') &&
      document.getElementById('legalModal').classList.contains('hidden')) document.body.style.overflow = '';
  if (previousCompareFocus?.isConnected && !previousCompareFocus.classList.contains('hidden')) previousCompareFocus.focus();
  previousCompareFocus = null;
}

function toggleFinalChoice(id) {
  const gift = CADEAUX.find(item => item.id === id);
  if (!gift) return;
  const fromCompare = document.activeElement?.classList.contains('compare-final-choice');
  finalChoiceId = getFinalChoiceId() === id ? null : id;
  let saved = true;
  try {
    if (finalChoiceId === null) localStorage.removeItem(FINAL_CHOICE_KEY);
    else localStorage.setItem(FINAL_CHOICE_KEY,String(finalChoiceId));
  } catch { saved = false; }
  refreshDecisionControls();
  renderFinalChoiceSummary();
  if (!document.getElementById('compareModal').classList.contains('hidden')) {
    renderCompareModal();
    if (fromCompare) document.querySelector(`#compareModal .compare-final-choice[data-decision-id="${id}"]`)?.focus();
  }
  showFavToast(finalChoiceId === null ? 'Choix final retiré.' :
    (saved ? `✓ « ${gift.titre} » est votre choix. Vous pouvez le changer.` : 'Choix retenu pour cette visite (stockage indisponible).'));
}

function renderFinalChoiceSummary() {
  const box = document.getElementById('finalChoiceBox');
  const gift = CADEAUX.find(item => item.id === getFinalChoiceId());
  box.classList.toggle('hidden',!gift);
  if (!gift) { box.innerHTML = ''; return; }
  box.innerHTML = `<p><strong>✓ Mon choix :</strong> ${gift.titre}</p>
    <a href="${getProductUrl(gift)}" target="_blank" rel="noopener noreferrer sponsored">Voir sur Amazon</a>
    <button type="button" onclick="toggleFinalChoice(${gift.id})">Retirer mon choix</button>`;
}

/* =========================================================
   AMÉLIORATION N°4 : FAVORIS (localStorage)
   ========================================================= */
const FAV_KEY = 'ttc_favorites_v1';

/** Lit et normalise les IDs favoris depuis localStorage (migration V1 incluse). */
function getFavoriteIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed
      .map(item => Number(typeof item === 'object' && item !== null ? item.id : item))
      .filter(id => Number.isInteger(id) && CADEAUX.some(gift => gift.id === id)))];
  } catch { return []; }
}

/** Retourne les cadeaux favoris à jour depuis la base courante. */
function getFavorites() {
  const ids = getFavoriteIds();
  return ids.map(id => CADEAUX.find(gift => gift.id === id)).filter(Boolean);
}

/** Écrit uniquement des IDs afin d'éviter les données obsolètes. */
function saveFavorites(ids) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); } catch {}
}

/** Vérifie si un cadeau est en favori */
function isFavorite(id) {
  return getFavoriteIds().includes(id);
}

/**
 * Bascule l'état favori d'un cadeau
 * @param {number} giftId
 * @param {HTMLElement} btn
 */
function toggleFavorite(giftId, btn) {
  const gift = CADEAUX.find(c => c.id === giftId);
  if (!gift) return;

  const favoriteIds = getFavoriteIds();
  const idx = favoriteIds.indexOf(giftId);
  let action = 'removed';

  if (idx === -1) {
    // Ajouter
    favoriteIds.push(giftId);
    saveFavorites(favoriteIds);
    btn.textContent = '❤️ Sauvegardé';
    btn.classList.add('is-fav');
    showFavToast(`❤️ "${gift.titre}" ajouté aux favoris !`);
    action = 'added';
  } else {
    // Retirer
    favoriteIds.splice(idx, 1);
    saveFavorites(favoriteIds);
    btn.textContent = '🤍 Favori';
    btn.classList.remove('is-fav');
    showFavToast(`💔 "${gift.titre}" retiré des favoris.`);
  }

  trackEvent('gift_favorite', { gift_id: giftId, gift_title: gift.titre, action });
  refreshFavCount();
}

function removeFavorite(giftId) {
  const gift = CADEAUX.find(c => c.id === giftId);
  const favoriteIds = getFavoriteIds().filter(id => id !== giftId);
  saveFavorites(favoriteIds);
  refreshFavCount();

  document.querySelectorAll(`.gift-card[data-gift-id="${giftId}"] .btn-fav`).forEach(btn => {
    btn.textContent = '🤍 Favori';
    btn.classList.remove('is-fav');
  });

  if (gift) {
    trackEvent('gift_favorite', { gift_id: giftId, gift_title: gift.titre, action: 'removed' });
    showFavToast(`💔 "${gift.titre}" retiré des favoris.`);
  }
  openFavoritesModal();
}

/** Met à jour le badge compteur de favoris */
function refreshFavCount() {
  const count = getFavorites().length;
  const el    = document.getElementById('favCount');
  if (!el) return;
  el.textContent = count;
  el.classList.toggle('visible', count > 0);
}

/** Ouvre le modal favoris */
function openFavoritesModal() {
  const modal   = document.getElementById('favModal');
  const grid    = document.getElementById('favGrid');
  const emptyEl = document.getElementById('favEmpty');
  const favs    = getFavorites();

  grid.innerHTML = '';
  renderFinalChoiceSummary();

  if (favs.length === 0) {
    emptyEl.classList.remove('hidden');
  } else {
    emptyEl.classList.add('hidden');
    favs.forEach((gift, idx) => {
      const card = createCard(gift, idx + 1, true); // inModal = true
      grid.appendChild(card);
    });
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // bloquer le scroll fond
  refreshDecisionControls();
}

/** Ferme le modal favoris */
function closeFavoritesModal() {
  document.getElementById('favModal').classList.add('hidden');
  if (document.getElementById('compareModal').classList.contains('hidden')) document.body.style.overflow = '';
}

/** Efface tous les favoris */
function clearAllFavorites() {
  if (!confirm('Effacer tous vos favoris ?')) return;
  saveFavorites([]);
  refreshFavCount();
  // Mettre à jour les boutons des cartes affichées
  document.querySelectorAll('.btn-fav.is-fav').forEach(btn => {
    btn.textContent = '🤍 Favori';
    btn.classList.remove('is-fav');
  });
  openFavoritesModal(); // Rafraîchir le modal (affichera le message vide)
}

/** Toast spécifique aux favoris */
function showFavToast(msg) {
  const toast = document.getElementById('favToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =========================================================
   AMÉLIORATION N°5 : SURPRENDS-MOI
   ========================================================= */
/**
 * Génère un profil aléatoire complet et lance directement les résultats
 */
function surpriseMe() {
  const genres   = ['homme','femme','couple','enfant'];
  const budgets  = ['<20','20-50','50-100','>100'];
  const interets = Object.keys(GiftEngine.INTERESTS);

  // Ne retenir que les profils capables de fournir 10 résultats cohérents.
  const validProfiles = [];
  genres.forEach(genre => {
    getAgesForGenre(genre).forEach(age => {
      budgets.forEach(budget => {
        const count = CADEAUX.filter(gift =>
          GiftEngine.eligible(gift, {genre, age, budget}, recommendationMemory)
        ).length;
        if (count >= 10) validProfiles.push({ genre, age, budget });
      });
    });
  });

  if (validProfiles.length === 0) return;
  const profile = validProfiles[Math.floor(Math.random() * validProfiles.length)];
  state.genre  = profile.genre;
  state.age    = profile.age;
  state.budget = profile.budget;

  // Ne choisir que des intérêts représentés dans ce profil.
  const available = interets.filter(i => CADEAUX.some(g => GiftEngine.eligible(g,state,recommendationMemory) && g.interets.includes(i)));
  state.interets = available.length ? [available[Math.floor(Math.random()*available.length)]] : [];
  state.occasion = null;
  state.unknownInterests = false;
  clearUnknownPreferences();
  state.mode = 'surprise';
  rejectedIds.clear();
  likedIds.clear();
  trackEvent('surprise_click', { genre: state.genre, age: state.age, budget: state.budget });

  // Masquer le quiz, afficher le chargement
  document.getElementById('quiz-section').classList.add('hidden');
  document.getElementById('results-section').classList.add('hidden');
  const homeSections = document.getElementById('homeSections');
  if (homeSections) homeSections.classList.add('hidden');
  const loadingSection = document.getElementById('loading-section');
  loadingSection.classList.remove('hidden');

  const msgEl = document.getElementById('loadingMsg');
  msgEl.textContent = `Profil aléatoire : ${genreLabel(state.genre)}, ${state.age} ans, budget ${budgetLabel(state.budget)}…`;

  setTimeout(() => {
    const results = computeResults();
    showResults(results);
  }, 300);
}

/* =========================================================
   PARTAGE
   ========================================================= */
/**
 * Partager les résultats (copie l'URL)
 */
function shareResults() {
  const url = window.location.href;
  trackEvent('share_click', { result_count: displayedIds.length });

  if (navigator.share) {
    navigator.share({
      title: 'TrouveUnCadeau — Mes idées cadeaux personnalisées',
      text: `Découvrez mes ${displayedIds.length} idée${displayedIds.length > 1 ? 's' : ''} cadeau${displayedIds.length > 1 ? 'x' : ''} sur TrouveUnCadeau !`,
      url
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      showToast();
    }).catch(() => {
      // Fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast();
    });
  }
}

function showToast() {
  const toast = document.getElementById('shareToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =========================================================
   RÉINITIALISATION
   ========================================================= */
/**
 * Remet le quiz à zéro
 */
function restartQuiz() {
  // Réinitialiser l'état
  state.currentStep = 1;
  state.genre  = null;
  state.age    = null;
  state.budget = null;
  state.interets = [];
  state.occasion = null;
  state.mode = 'quiz';
  state.unknownInterests = false;
  clearUnknownPreferences();

  // Réinitialiser les pools de résultats (Amélioration N°1)
  displayedIds = [];
  resultsPool  = [];
  rejectedIds.clear();
  likedIds.clear();
  quizStarted = false;

  // Désélectionner toutes les options
  document.querySelectorAll('.option-btn.selected, .interest-btn.selected')
    .forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed', 'false'); });

  // Désactiver boutons suivant
  ['next-1','next-2','next-3'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = true;
  });

  // Afficher étape 1, masquer le reste
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-1').classList.add('active');
  renderAgeOptions('homme');

  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('loading-section').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');
  const homeSections = document.getElementById('homeSections');
  if (homeSections) homeSections.classList.remove('hidden');

  updateProgress(1);

  document.getElementById('quiz-section').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* =========================================================
   NOUVEAUTÉ : CADEAU DU JOUR
   Un pick déterministe qui change chaque jour à minuit —
   donne une raison de revenir tous les jours.
   ========================================================= */
function getDaySeed() {
  const d = new Date();
  return Number(`${d.getFullYear()}${d.getMonth()}${d.getDate()}`);
}

function seededIndex(seed, max) {
  // petit générateur pseudo-aléatoire déterministe
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * max);
}

function renderGiftOfDay() {
  const wrap = document.getElementById('giftOfDay');
  if (!wrap) return;
  const seed = getDaySeed();
  const gift = CADEAUX[seededIndex(seed, CADEAUX.length)];
  const img  = getGiftImage(gift);

  wrap.innerHTML = `
    <div class="gotd-image${gift.imageFallback ? ' img-fallback' : ''}">
      <img src="${img}" alt="${gift.titre}" loading="lazy" onerror="this.closest('.gotd-image').classList.add('img-fallback')">
      <span class="gotd-emoji">${gift.emoji}</span>
    </div>
    <div class="gotd-info">
      <span class="gotd-tag">🎁 Cadeau du jour</span>
      <h3>${gift.titre}</h3>
      <p>${gift.desc}</p>
      <div class="gotd-actions">
        <a class="btn-buy" href="${getProductUrl(gift)}" target="_blank" rel="noopener noreferrer sponsored">🛒 Voir sur Amazon</a>
        <span class="gotd-timer" id="gotdTimer"></span>
      </div>
    </div>`;

  wrap.querySelector('.btn-buy').addEventListener('click', () => {
    trackEvent('amazon_click', { gift_id: gift.id, gift_title: gift.titre, placement: 'gift_of_day' });
  });

  updateMidnightCountdown();
  clearInterval(window._gotdInterval);
  window._gotdInterval = setInterval(() => {
    if (getDaySeed() !== seed) renderGiftOfDay();
    else updateMidnightCountdown();
  }, 60000);
}

function updateMidnightCountdown() {
  const el = document.getElementById('gotdTimer');
  if (!el) return;
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24,0,0,0);
  const diffMs = midnight - now;
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  el.textContent = `⏳ Nouveau cadeau dans ${h}h ${m}min`;
}

/* =========================================================
   NOUVEAUTÉ : OCCASIONS RAPIDES + COMPTE À REBOURS
   Raccourcis qui pré-remplissent un profil et sautent direct
   aux résultats. Bon pour le SEO saisonnier + clics rapides.
   ========================================================= */
const OCCASIONS = [
  { key:'noel',      label:'🎄 Noël',          month:11, day:25, profile:{genre:'homme', budget:'50-100', interets:[]} },
  { key:'valentin',  label:'💖 St-Valentin',    month:1,  day:14, profile:{genre:'couple', budget:'50-100', interets:[]} },
  { key:'meres',     label:'🌷 Fête des Mères', month:4,  day:26, profile:{genre:'femme', budget:'20-50', interets:[]} },
  { key:'peres',     label:'👔 Fête des Pères', month:5,  day:15, profile:{genre:'homme', budget:'20-50', interets:[]} },
  { key:'anniv',     label:'🎂 Anniversaire',   month:null, day:null, profile:{genre:'homme', budget:'20-50', interets:[]} },
];

function daysUntil(month, day) {
  if (month === null) return null;
  const now = new Date();
  let target = new Date(now.getFullYear(), month, day);
  if (target < now) target = new Date(now.getFullYear() + 1, month, day);
  return Math.ceil((target - now) / 86400000);
}

function renderOccasions() {
  const wrap = document.getElementById('occasionsChips');
  if (!wrap) return;
  wrap.innerHTML = OCCASIONS.map(o => {
    const d = daysUntil(o.month, o.day);
    const sub = d !== null ? `<span class="occasion-days">J-${d}</span>` : '';
    return `<button class="occasion-chip" onclick='quickOccasion("${o.key}")'>${o.label}${sub}</button>`;
  }).join('');
}

function quickOccasion(key) {
  const occ = OCCASIONS.find(o => o.key === key);
  if (!occ) return;

  state.genre   = occ.profile.genre;
  state.age     = '26-35';
  state.budget  = occ.profile.budget;
  state.interets = [];
  state.occasion = key;
  state.mode = 'occasion';
  state.unknownInterests = false;
  clearUnknownPreferences();
  rejectedIds.clear();
  likedIds.clear();
  trackEvent('quiz_start', { source: 'occasion', occasion: key });
  trackEvent('quiz_complete', { source: 'occasion', occasion: key, genre: state.genre, age: state.age, budget: state.budget });

  document.getElementById('quiz-section').classList.add('hidden');
  document.getElementById('results-section').classList.add('hidden');
  const homeSections = document.getElementById('homeSections');
  if (homeSections) homeSections.classList.add('hidden');
  const loadingSection = document.getElementById('loading-section');
  loadingSection.classList.remove('hidden');
  document.getElementById('loadingMsg').textContent = `Recherche d'idées pour ${occ.label.replace(/^[^\s]+\s/,'')}…`;

  setTimeout(() => {
    const results = computeResults();
    showResults(results);
  }, 300);
}

/* =========================================================
   NOUVEAUTÉ : TENDANCES (idées les plus originales)
   Permet de parcourir sans faire le quiz → plus de clics.
   ========================================================= */
function renderTrending() {
  const wrap = document.getElementById('trendingRow');
  if (!wrap) return;
  const top = [...CADEAUX].sort((a,b) => b.originalite - a.originalite).slice(0, 8);

  wrap.innerHTML = top.map(g => {
    const img = getGiftImage(g);
    const url = getProductUrl(g);
    return `
      <a class="trend-card" data-gift-id="${g.id}" href="${url}" target="_blank" rel="noopener noreferrer sponsored" aria-label="${g.titre}">
        <div class="trend-img${g.imageFallback ? ' img-fallback' : ''}"><img src="${img}" alt="${g.titre}" loading="lazy" onerror="this.parentElement.classList.add('img-fallback')"><span>${g.emoji}</span></div>
        <p class="trend-title">${g.titre}</p>
      </a>`;
  }).join('');

  wrap.querySelectorAll('.trend-card').forEach(link => {
    link.addEventListener('click', () => {
      const gift = CADEAUX.find(g => g.id === Number(link.dataset.giftId));
      if (gift) trackEvent('amazon_click', { gift_id: gift.id, gift_title: gift.titre, placement: 'trending' });
    });
  });
}

/* =========================================================
   NOUVEAUTÉ : MODE SOMBRE
   ========================================================= */
const THEME_KEY = 'ttc_theme';

function initDarkMode() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch {}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = ['light','dark'].includes(saved) ? saved : (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* =========================================================
   NOUVEAUTÉ : CONFETTIS À L'AFFICHAGE DES RÉSULTATS
   ========================================================= */
function fireConfetti() {
  const colors = ['#172B49', '#E9911A', '#16765A', '#294466'];
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  for (let i = 0; i < 36; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.animationDuration = (1.8 + Math.random() * 1.2) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 3200);
}

/* =========================================================
   NOUVEAUTÉ : NEWSLETTER (front uniquement)
   Branchez un service (Brevo, Mailchimp, etc.) sur ce formulaire
   pour collecter réellement les emails.
   ========================================================= */
function submitNewsletter(event) {
  event.preventDefault();
  const input = document.getElementById('newsletterEmail');
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    showToast2('⚠️ Merci d\'entrer un email valide.');
    return;
  }
  showToast2('✅ Merci ! Vous recevrez nos meilleures idées cadeaux.');
  input.value = '';
}

function showToast2(msg) {
  showFavToast(msg);
}

/* =========================================================
   NOUVEAUTÉ : FAQ ACCORDÉON
   ========================================================= */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* =========================================================
   NOUVEAUTÉ : MODAL MENTIONS LÉGALES / CONFIDENTIALITÉ / CONTACT
   ========================================================= */
const LEGAL_CONTENT = {
  mentions: {
    title: '📄 Mentions légales',
    body: `<p><strong>Site :</strong> TrouveUnCadeau — <a href="https://trouveuncadeau.fr/">trouveuncadeau.fr</a></p>
           <p><strong>Contact :</strong> <a href="mailto:contact@trouveuncadeau.fr">contact@trouveuncadeau.fr</a>.</p>
           <p><strong>Éditeur :</strong> Site édité à titre non professionnel. L'éditeur a choisi de préserver son anonymat conformément aux dispositions applicables de la LCEN.</p>
           <p><strong>Hébergement :</strong> GitHub, Inc. — service GitHub Pages — 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, États-Unis.</p>`
  },
  confidentialite: {
    title: '🔒 Confidentialité',
    body: `<p><strong>Données enregistrées dans votre navigateur :</strong> TrouveUnCadeau utilise le stockage local pour mémoriser vos favoris, le cadeau marqué « Mon choix » et votre préférence de thème, les douze dernières sélections (au plus 120 identifiants de cadeaux) et vos avis (« Bonne idée », « Pas son style », « Déjà possédé »). Les avis sont regroupés par type de destinataire et tranche d’âge, avec un maximum de 24 groupes et 100 avis par groupe. Aucun nom de personne n’est demandé. Le bouton « Réinitialiser les préférences » efface cet historique et ces avis sans supprimer vos favoris ni votre choix final. Le moteur n’envoie pas ces registres d’historique et d’avis ni votre choix final à un serveur. Les événements Google Analytics déjà présents peuvent toutefois signaler une action de refus avec l’identifiant et le titre du cadeau, selon les réglages applicables. Les registres complets restent dans votre navigateur et peuvent être supprimés en effaçant les données du site.</p>
           <p><strong>Mesure d'audience :</strong> le site utilise Google Analytics afin de comprendre son utilisation et d'améliorer l'expérience proposée. Ce service peut déposer ou lire des cookies et traiter des données techniques, notamment des informations relatives au navigateur, à l'appareil et aux pages consultées.</p>
           <p><strong>Publicité :</strong> le site utilise Google AdSense. Google et ses partenaires peuvent utiliser des cookies ou technologies similaires pour diffuser, mesurer et personnaliser des annonces, selon vos choix de consentement et les réglages applicables.</p>
           <p><strong>Affiliation Amazon :</strong> certains liens vers Amazon sont des liens affiliés. Lorsque vous les utilisez, Amazon peut traiter des données conformément à sa propre politique de confidentialité. En tant que Partenaire Amazon, TrouveUnCadeau réalise un bénéfice sur les achats remplissant les conditions requises, sans modifier le prix payé.</p>
           <p><strong>Liens externes :</strong> lorsque vous quittez TrouveUnCadeau pour consulter un service tiers, les règles de confidentialité de ce service s'appliquent.</p>
           <p><strong>Vos choix et vos demandes :</strong> vous pouvez gérer ou supprimer les cookies depuis les réglages de votre navigateur et effacer les données locales du site à tout moment. Pour toute question relative à vos données personnelles, écrivez à <a href="mailto:contact@trouveuncadeau.fr">contact@trouveuncadeau.fr</a>.</p>`
  },
  contact: {
    title: '✉️ Contact',
    body: `<p>Une question, une suggestion ou un problème ? Écrivez-nous à <a href="mailto:contact@trouveuncadeau.fr">contact@trouveuncadeau.fr</a></p>`
  }
};

function openLegalModal(key) {
  const data = LEGAL_CONTENT[key];
  if (!data) return;
  document.getElementById('legalTitle').textContent = data.title;
  document.getElementById('legalBody').innerHTML = data.body;
  document.getElementById('legalModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
  document.getElementById('legalModal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* =========================================================
   NOUVEAUTÉ : BOUTON FLOTTANT "TROUVER UN CADEAU"
   Apparaît quand on scrolle loin du quiz → relance l'action.
   ========================================================= */
function initStickyCta() {
  const cta = document.getElementById('stickyCta');
  if (!cta) return;
  let lastShown = false;
  window.addEventListener('scroll', () => {
    const quiz = document.getElementById('quiz-section');
    if (!quiz) return;
    const rect = quiz.getBoundingClientRect();
    const pastHero = rect.bottom < -80;
    if (pastHero !== lastShown) {
      cta.classList.toggle('visible', pastHero);
      lastShown = pastHero;
    }
  });
  cta.addEventListener('click', () => {
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('quiz-section').scrollIntoView({ behavior:'smooth', block:'start' });
  });
}

function initFooter() {
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  const disclosure = document.getElementById('amazonDisclosure');
  if (disclosure) disclosure.classList.toggle('hidden', !AMAZON_AFFILIATE_TAG);
}

/**
 * Applique les critères explicitement transmis par un guide éditorial.
 * Le questionnaire reste la source de vérité : aucun résultat n'est lancé
 * automatiquement et chaque choix peut encore être modifié par l'utilisateur.
 */
function applyGuidePreset() {
  const params = new URLSearchParams(window.location.search);
  const genre = params.get('genre');
  const age = params.get('age');
  const interest = params.get('interet');
  const validGenres = ['homme','femme','couple','enfant'];
  const validAges = [...ADULT_AGES,...CHILD_AGES];

  if (validGenres.includes(genre)) {
    const genreButton = document.querySelector(`.option-btn[data-key="genre"][data-value="${genre}"]`);
    if (genreButton) selectOption(genreButton,'genre',genre);
  }

  if (genre && validAges.includes(age) && getAgesForGenre(genre).includes(age)) {
    const ageButton = document.querySelector(`#ageOptions .option-btn[data-value="${age}"]`);
    if (ageButton) selectOption(ageButton,'age',age);
  }

  if (interest && Object.prototype.hasOwnProperty.call(GiftEngine.INTERESTS,interest)) {
    state.interets = [interest];
    state.unknownInterests = false;
    clearUnknownPreferences();
    document.querySelectorAll('.interest-btn').forEach(button => {
      const selected = button.dataset.value === interest;
      button.classList.toggle('selected',selected);
      button.setAttribute('aria-pressed',String(selected));
    });
  }

  if (genre && age && state.genre === genre && state.age === age) nextStep(3);
}

/* =========================================================
   INITIALISATION
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  normalizeGiftDatabase();

  updateProgress(1);

  // ── Amélioration N°4 : afficher le compteur de favoris dès le chargement ──
  refreshFavCount();

  // ── Fermeture du modal favoris avec la touche Escape ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && !document.getElementById('compareModal').classList.contains('hidden')) {
      const buttons = [...document.querySelectorAll('#compareModal button, #compareModal a[href]')];
      const first = buttons[0], last = buttons.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!buttons.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') {
      if (!document.getElementById('compareModal').classList.contains('hidden')) closeCompareModal();
      else if (!document.getElementById('favModal').classList.contains('hidden')) closeFavoritesModal();
      else closeLegalModal();
    }
  });

  // ── Clic sur l'overlay du modal pour le fermer ──
  document.getElementById('favModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeFavoritesModal();
  });
  document.getElementById('compareModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCompareModal();
  });
  const legalModalEl = document.getElementById('legalModal');
  if (legalModalEl) legalModalEl.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLegalModal();
  });

  // ── Nouvelles fonctionnalités v1 ──
  initDarkMode();
  renderGiftOfDay();
  renderOccasions();
  renderTrending();
  initStickyCta();
  initFooter();
  applyGuidePreset();

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) newsletterForm.addEventListener('submit', submitNewsletter);

  console.log(`🎁 TrouveUnCadeau V2 — passe 1 — ${CADEAUX.length} idées cadeaux chargées.`);
});
