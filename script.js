/* =========================================================
   TrouveTonCadeau — script.js
   Base de données : 160+ idées cadeaux
   Logique : questionnaire 4 étapes + recommandation
   ========================================================= */

'use strict';

/* =========================================================
   BASE DE DONNÉES CADEAUX
   Structure : { id, titre, emoji, desc, genre[], age[], budget, interets[], originalite }
   budget : '<20' | '20-50' | '50-100' | '>100'
   genre  : 'homme' | 'femme' | 'couple' | 'enfant'
   ========================================================= */
const CADEAUX = [

  /* ── JEUX VIDÉO ── */
  { id:1, titre:"Manette DualSense PS5", emoji:"🎮", desc:"La manette emblématique de la PS5 avec retour haptique et gâchettes adaptatives pour une immersion totale.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video"], originalite:7 },
  { id:2, titre:"Abonnement Xbox Game Pass (12 mois)", emoji:"🕹️", desc:"Accès illimité à plus de 100 jeux sans payer chacun individuellement. Idéal pour les gamers réguliers.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["jeux-video"], originalite:6 },
  { id:3, titre:"Carte cadeau Steam 50€", emoji:"🖥️", desc:"Liberté totale pour choisir ses propres jeux sur la plus grande plateforme PC du monde.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video"], originalite:5 },
  { id:4, titre:"Nintendo Switch Lite", emoji:"🎯", desc:"Console portable légère et colorée, parfaite pour jouer partout. Large catalogue de jeux exclusifs.", genre:["homme","femme","enfant"], age:["18-25","26-35","36-50"], budget:">100", interets:["jeux-video"], originalite:7 },
  { id:5, titre:"Figurine Amiibo collector", emoji:"🏆", desc:"Figurines NFC officielles Nintendo qui débloquent des bonus dans les jeux. Un objet de collection autant que fonctionnel.", genre:["homme","femme"], age:["18-25","26-35"], budget:"20-50", interets:["jeux-video"], originalite:8 },
  { id:6, titre:"Chaise gaming ergonomique", emoji:"🪑", desc:"Siège conçu pour les longues sessions de jeu avec soutien lombaire et accoudoirs réglables.", genre:["homme"], age:["18-25","26-35","36-50"], budget:">100", interets:["jeux-video"], originalite:5 },
  { id:7, titre:"Casque gaming sans fil", emoji:"🎧", desc:"Son surround immersif et micro intégré pour communiquer avec son équipe. Compatible PC, console et mobile.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video","musique"], originalite:6 },
  { id:8, titre:"Tapis de souris XXL gaming", emoji:"🖱️", desc:"Surface ultra-lisse de grande taille pour des mouvements précis. Design cool et bordures anti-effilochage.", genre:["homme"], age:["18-25","26-35"], budget:"<20", interets:["jeux-video","technologie"], originalite:5 },
  { id:9, titre:"Jeu de société Catan", emoji:"🎲", desc:"Le classique incontournable des jeux de plateau stratégiques. Des heures de plaisir en famille ou entre amis.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["jeux-video"], originalite:6 },
  { id:10, titre:"Livret 'Histoire des jeux vidéo'", emoji:"📖", desc:"Un beau livre illustré retraçant l'évolution du jeu vidéo des années 70 à nos jours.", genre:["homme","femme"], age:["26-35","36-50"], budget:"20-50", interets:["jeux-video","lecture"], originalite:7 },

  /* ── MANGA / ANIME ── */
  { id:11, titre:"Box manga collector One Piece", emoji:"📦", desc:"Coffret collector des tomes fondateurs du manga le plus vendu au monde, avec illustrations exclusives.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["manga"], originalite:8 },
  { id:12, titre:"Figurine Funko Pop anime", emoji:"🗿", desc:"Figurine vinyle chibi à l'effigie d'un personnage culte. À choisir selon son anime préféré.", genre:["homme","femme"], age:["18-25","26-35"], budget:"<20", interets:["manga"], originalite:6 },
  { id:13, titre:"Abonnement Crunchyroll (1 an)", emoji:"🍜", desc:"La plateforme de streaming de référence pour les animes, avec des simulcasts en simultané du Japon.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["manga","cinema"], originalite:7 },
  { id:14, titre:"Coffret artbook Dragon Ball", emoji:"🐉", desc:"Un livre d'art somptueux avec les dessins originaux d'Akira Toriyama, présentations des personnages et story-boards.", genre:["homme","femme"], age:["26-35","36-50"], budget:"20-50", interets:["manga","lecture"], originalite:9 },
  { id:15, titre:"T-shirt manga oversize personnalisé", emoji:"👕", desc:"T-shirt en coton épais avec impression d'un visuel manga iconique. Un vêtement du quotidien à fort caractère.", genre:["homme","femme"], age:["18-25","26-35"], budget:"20-50", interets:["manga"], originalite:6 },
  { id:16, titre:"Tasse thermo manga", emoji:"☕", desc:"Tasse à café qui révèle un dessin de manga lorsqu'elle est chaude. Original et pratique pour les fans.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["manga"], originalite:8 },
  { id:17, titre:"Cours de dessin manga en ligne", emoji:"✏️", desc:"Accès à une plateforme de cours pour apprendre à dessiner ses propres personnages manga, du débutant au confirmé.", genre:["homme","femme"], age:["18-25","26-35"], budget:"20-50", interets:["manga"], originalite:9 },
  { id:18, titre:"Oreiller peluche anime", emoji:"🛏️", desc:"Peluche géante représentant un personnage anime populaire, parfaite pour le bureau ou la chambre.", genre:["femme"], age:["18-25"], budget:"20-50", interets:["manga"], originalite:7 },

  /* ── TECHNOLOGIE ── */
  { id:19, titre:"Écouteurs Bluetooth ANC", emoji:"🎵", desc:"Réduction de bruit active, autonomie 30h et son cristallin. Parfait pour le télétravail et les transports.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["technologie","musique"], originalite:6 },
  { id:20, titre:"Montre connectée sport", emoji:"⌚", desc:"Suivi du rythme cardiaque, GPS intégré, notifications smartphone. L'accessoire high-tech pour rester connecté.", genre:["homme","femme"], age:["26-35","36-50"], budget:">100", interets:["technologie","sport"], originalite:6 },
  { id:21, titre:"Chargeur sans fil rapide", emoji:"⚡", desc:"Pad de recharge Qi ultra-rapide compatible avec tous les smartphones modernes. Design épuré et compact.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["technologie"], originalite:5 },
  { id:22, titre:"Enceinte Bluetooth étanche", emoji:"🔊", desc:"Son puissant à 360°, résistante à l'eau IPX7, autonomie 24h. La compagne idéale des aventures extérieures.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["technologie","musique","voyage"], originalite:6 },
  { id:23, titre:"Mini projecteur portable", emoji:"📽️", desc:"Projecteur de poche qui diffuse jusqu'à 100 pouces d'image. Parfait pour les soirées cinéma improvisées.", genre:["homme","femme","couple"], age:["26-35","36-50"], budget:">100", interets:["technologie","cinema"], originalite:9 },
  { id:24, titre:"Lampe LED bureau connectée", emoji:"💡", desc:"Éclairage intelligent réglable via smartphone avec modes focus, lecture et ambiance. Économise l'énergie.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["technologie"], originalite:6 },
  { id:25, titre:"Kit domotique débutant", emoji:"🏠", desc:"Prises et ampoules connectées pour automatiser sa maison. Compatible Alexa et Google Home.", genre:["homme"], age:["26-35","36-50"], budget:"50-100", interets:["technologie"], originalite:7 },
  { id:26, titre:"Câble USB-C 3-en-1 renforcé", emoji:"🔌", desc:"Câble ultra-résistant compatible Lightning, USB-C et micro-USB. Ne jamais rompre en plein voyage.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["technologie","voyage"], originalite:4 },
  { id:27, titre:"Disque dur SSD externe 1To", emoji:"💾", desc:"Stockage ultra-rapide et compact pour sauvegarder photos, vidéos et projets. Résistant aux chocs.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["technologie"], originalite:5 },
  { id:28, titre:"Robot aspirateur connecté", emoji:"🤖", desc:"Cartographie intelligente de votre logement et nettoyage autonome programmable depuis l'appli.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:["technologie"], originalite:8 },

  /* ── VOYAGE ── */
  { id:29, titre:"Valise cabine ultra-légère", emoji:"🧳", desc:"Bagage à main en polycarbonate ultra-résistant avec roulettes 360° silencieuses. Coloris tendance.", genre:["homme","femme"], age:["26-35","36-50"], budget:">100", interets:["voyage"], originalite:6 },
  { id:30, titre:"Guide Lonely Planet destination rêve", emoji:"🗺️", desc:"Le guide de voyage le plus complet et fiable pour explorer une destination selon ses envies.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["voyage","lecture"], originalite:5 },
  { id:31, titre:"Sac à dos voyage anti-vol", emoji:"🎒", desc:"Sac 30L avec compartiments cachés, port USB intégré et tissu anti-coupure. Sécurité en voyage garantie.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["voyage","sport"], originalite:7 },
  { id:32, titre:"Carte du monde à gratter", emoji:"🌍", desc:"Poster doré à gratter au fil de ses voyages pour visualiser tous les pays visités. Déco murale unique.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["voyage"], originalite:8 },
  { id:33, titre:"Adaptateur universel de voyage", emoji:"🔌", desc:"Un seul adaptateur pour voyager dans 150 pays avec 4 ports USB et 1 USB-C intégrés.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["voyage","technologie"], originalite:5 },
  { id:34, titre:"Trousse de toilette voyage nomade", emoji:"🧴", desc:"Set compact avec flacons TSA-approved, pochette waterproof et miroir pliable. Tout pour voyager léger.", genre:["homme","femme"], age:["26-35","36-50"], budget:"20-50", interets:["voyage"], originalite:6 },
  { id:35, titre:"Expérience parachutisme offerte", emoji:"🪂", desc:"Chèque-cadeau pour un saut en parachute en tandem depuis 4000m. Une adrénaline inoubliable.", genre:["homme","femme"], age:["18-25","26-35"], budget:">100", interets:["voyage","sport"], originalite:10 },
  { id:36, titre:"Coffret week-end spa (box)", emoji:"🛁", desc:"Box cadeau incluant hébergement + accès spa dans une destination au choix. Détente assurée.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage"], originalite:7 },
  { id:37, titre:"Carnet de voyage cuir personnalisé", emoji:"📒", desc:"Carnet relié en cuir gravé avec ses initiales, avec pochettes et rubans marque-pages. Élégant et pratique.", genre:["femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["voyage","lecture"], originalite:8 },

  /* ── LECTURE ── */
  { id:38, titre:"Abonnement Kindle Unlimited (6 mois)", emoji:"📱", desc:"Accès illimité à plus d'1 million d'ebooks. Idéal pour les gros lecteurs qui veulent varier les genres.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["lecture"], originalite:6 },
  { id:39, titre:"Liseuse Kindle Paperwhite", emoji:"📖", desc:"Écran E-Ink sans reflets, autonomie de semaines, étanche. La liseuse de référence pour lire partout.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["lecture","technologie"], originalite:6 },
  { id:40, titre:"Box livres mensuelle (3 mois)", emoji:"📚", desc:"Sélection surprise de 2 à 3 livres chaque mois, avec goodies exclusifs. Pour découvrir de nouveaux auteurs.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["lecture"], originalite:8 },
  { id:41, titre:"Marque-pages personnalisé gravé", emoji:"🔖", desc:"Marque-pages en métal gravé avec un message, une date ou un prénom. Cadeau intime et élégant.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:["lecture"], originalite:7 },
  { id:42, titre:"Chèque cadeau librairie indépendante", emoji:"🏪", desc:"Offrir la liberté de choisir son prochain coup de cœur dans une librairie locale. Soutenir la culture.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["lecture"], originalite:6 },
  { id:43, titre:"Lampe de lecture à clip rechargeable", emoji:"🔦", desc:"Mini lampe LED ultra-fine qui s'adapte sur tous les livres. Lire la nuit sans déranger personne.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"<20", interets:["lecture"], originalite:6 },
  { id:44, titre:"Grand dictionnaire illustré Larousse", emoji:"📕", desc:"L'édition collector du Larousse avec milliers d'illustrations, encyclopédique et indispensable.", genre:["homme","femme"], age:["36-50","50+"], budget:"50-100", interets:["lecture"], originalite:5 },
  { id:45, titre:"Précommande livre de l'auteur préféré", emoji:"✍️", desc:"Surprendre un lecteur avec le prochain roman de son auteur favori avant même sa sortie officielle.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["lecture"], originalite:9 },

  /* ── CUISINE ── */
  { id:46, titre:"Cours de cuisine gastronomique", emoji:"👨‍🍳", desc:"Session de 3h avec un chef étoilé pour apprendre les techniques de la haute cuisine française.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:["cuisine"], originalite:9 },
  { id:47, titre:"Livre 'Encyclopédie de la cuisine du monde'", emoji:"🌏", desc:"Plus de 500 recettes des 5 continents avec photos pas-à-pas. Un tour du monde gastronomique complet.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine","voyage"], originalite:7 },
  { id:48, titre:"Robot cuiseur multifonction", emoji:"🥘", desc:"Cuisine, mixe, pétrit, cuit à la vapeur. Le compagnon idéal pour cuisiner plus vite et mieux.", genre:["femme","homme"], age:["26-35","36-50","50+"], budget:">100", interets:["cuisine"], originalite:6 },
  { id:49, titre:"Set de couteaux japonais", emoji:"🔪", desc:"Coffret de 3 couteaux en acier japonais VG-10 avec étui en bois. Précision et esthétique à la japonaise.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine"], originalite:8 },
  { id:50, titre:"Box épices du monde (3 mois)", emoji:"🌶️", desc:"Sélection mensuelle d'épices rares et authentiques de producteurs locaux avec recettes associées.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine","voyage"], originalite:9 },
  { id:51, titre:"Machine à pâtes fraîches", emoji:"🍝", desc:"Lamineuse à pâtes en inox chromé pour faire ses propres spaghettis, tagliatelles et ravioles maison.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine"], originalite:7 },
  { id:52, titre:"Tablier de cuisine personnalisé", emoji:"👨‍🍳", desc:"Tablier en coton épais brodé avec son prénom ou une citation amusante. Cadeau utile et original.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:53, titre:"Coffret dégustation huiles d'olive", emoji:"🫒", desc:"5 huiles d'olive d'exception de différentes régions avec carnet de dégustation et guide de présentation.", genre:["homme","femme"], age:["36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:9 },
  { id:54, titre:"Wok pro en fonte émaillée", emoji:"🥣", desc:"Wok 32cm en fonte avec couvercle, idéal pour la cuisine asiatique. Chauffe uniformément et dure toute une vie.", genre:["homme","femme"], age:["26-35","36-50"], budget:"50-100", interets:["cuisine"], originalite:6 },

  /* ── ANIMAUX ── */
  { id:55, titre:"Session photo professionnelle avec son animal", emoji:"📸", desc:"Séance photo avec un photographe animalier professionnel. Un souvenir inoubliable avec son compagnon.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["animaux"], originalite:10 },
  { id:56, titre:"Box mensuelle friandises chien/chat", emoji:"🐾", desc:"Jouets, friandises et accessoires pour animaux livrés chaque mois. Gâter son compagnon avec plaisir.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["animaux"], originalite:7 },
  { id:57, titre:"GPS tracker pour chien", emoji:"📍", desc:"Collier GPS en temps réel pour retrouver son chien n'importe où. Application intuitive et alerte de fugue.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["animaux","technologie"], originalite:8 },
  { id:58, titre:"Portrait de son animal en aquarelle", emoji:"🎨", desc:"Commande à un artiste illustrateur qui peint le portrait de son chat ou chien façon aquarelle artistique.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["animaux"], originalite:10 },
  { id:59, titre:"Croquettes premium haut de gamme", emoji:"🥣", desc:"Alimentation naturelle sans conservateurs ni colorants artificiels pour la santé durable de son animal.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["animaux"], originalite:4 },
  { id:60, titre:"Fontaine à eau pour chat", emoji:"💧", desc:"Fontaine filtrante à circulation d'eau pour encourager l'hydratation du chat. Design élégant et silencieux.", genre:["femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["animaux","technologie"], originalite:6 },
  { id:61, titre:"Livre 'Comprendre le langage de son chien'", emoji:"📘", desc:"Guide comportementaliste qui décrypte les signaux de son chien pour mieux le comprendre et l'éduquer.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"<20", interets:["animaux","lecture"], originalite:6 },

  /* ── SPORT ── */
  { id:62, titre:"Abonnement salle de sport (3 mois)", emoji:"💪", desc:"Carte d'entrée illimitée dans un club de fitness avec accès machines, cours collectifs et piscine.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:63, titre:"Montre GPS de running", emoji:"🏃", desc:"Analyse de la foulée, suivi du rythme cardiaque, plans d'entraînement. L'outil des coureurs sérieux.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["sport","technologie"], originalite:7 },
  { id:64, titre:"Tapis de yoga premium antidérapant", emoji:"🧘", desc:"Tapis 6mm en caoutchouc naturel avec sac de transport. Grip parfait même en séance intense.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:65, titre:"Session escalade indoor + équipement", emoji:"🧗", desc:"Journée complète dans une salle d'escalade avec location de chaussons et baudrier. Une activité physique intense.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["sport"], originalite:8 },
  { id:66, titre:"Foam roller massage musculaire", emoji:"🏋️", desc:"Rouleau de massage musculaire professionnel pour récupérer après l'effort et libérer les tensions.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["sport"], originalite:6 },
  { id:67, titre:"Vélo électrique pliable", emoji:"🚴", desc:"Vélo électrique 250W avec batterie amovible, pliable en 15 secondes. Révolutionnaire pour les trajets urbains.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:">100", interets:["sport","technologie","voyage"], originalite:9 },
  { id:68, titre:"Kit musculation résistances élastiques", emoji:"🏅", desc:"Set de 5 bandes élastiques de résistances variées pour s'entraîner efficacement n'importe où.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["sport"], originalite:5 },
  { id:69, titre:"Abonnement Strava Premium (1 an)", emoji:"📊", desc:"Analyses avancées de ses performances sportives, plans d'entraînement IA et comparaisons de segments.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["sport","technologie"], originalite:7 },

  /* ── MUSIQUE ── */
  { id:70, titre:"Ukulélé soprano débutant", emoji:"🎸", desc:"Petit instrument facile à apprendre avec accordeur et médiators inclus. Parfait pour débuter la musique.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["musique"], originalite:8 },
  { id:71, titre:"Vinyle album favori (réédition)", emoji:"💿", desc:"La magie du son analogique : offrir un 33 tours de l'album qui compte le plus pour lui/elle.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["musique"], originalite:8 },
  { id:72, titre:"Abonnement Spotify Premium (3 mois)", emoji:"🎧", desc:"Écoute hors-ligne, sans publicité, en qualité maximale sur tous les appareils. La musique sans limites.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["musique"], originalite:4 },
  { id:73, titre:"Concert de l'artiste préféré", emoji:"🎤", desc:"Billets pour voir live son artiste ou groupe favori. Un moment de partage et d'émotion incomparable.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["musique"], originalite:9 },
  { id:74, titre:"Platine vinyle entrée de gamme", emoji:"📻", desc:"Tourne-disque avec préampli intégré et sortie Bluetooth. Redécouvrir la chaleur du vinyle facilement.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:">100", interets:["musique","technologie"], originalite:8 },
  { id:75, titre:"Cours de chant (5 séances)", emoji:"🎵", desc:"Chèque cadeau pour des cours de chant avec un coach vocal professionnel. Révéler sa voix intérieure.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["musique"], originalite:9 },
  { id:76, titre:"Enceinte portable rétro Bluetooth", emoji:"📯", desc:"Enceinte vintage style années 60 avec son stéréo puissant et connexion Bluetooth moderne.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["musique","technologie"], originalite:7 },

  /* ── CINÉMA ── */
  { id:77, titre:"Abonnement Netflix (6 mois)", emoji:"📺", desc:"Accès illimité aux séries, films et documentaires originaux Netflix en qualité 4K HDR.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["cinema"], originalite:4 },
  { id:78, titre:"Coffret Blu-Ray saga Star Wars", emoji:"🚀", desc:"L'intégrale des 9 films + les films dérivés en Blu-Ray avec documentaires exclusifs sur la création.", genre:["homme","femme"], age:["26-35","36-50"], budget:"50-100", interets:["cinema"], originalite:7 },
  { id:79, titre:"Abonnement UGC Illimité (1 mois)", emoji:"🎟️", desc:"Cinéma à volonté dans tous les complexes UGC de France. Voir tous les films de sa liste en un mois.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["cinema"], originalite:6 },
  { id:80, titre:"Livre 'Histoire du cinéma mondial'", emoji:"📽️", desc:"Volume illustré de 600 pages retraçant l'histoire du 7ème art depuis les Frères Lumière jusqu'à l'ère streaming.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cinema","lecture"], originalite:7 },
  { id:81, titre:"Pyjama cinéma et snacks pack", emoji:"🍿", desc:"Le kit soirée parfait : pyjama confort, popcorn aromatisé, boissons et petites douceurs pour une soirée film.", genre:["femme"], age:["18-25","26-35"], budget:"20-50", interets:["cinema"], originalite:8 },
  { id:82, titre:"Cours scénario écriture cinématographique", emoji:"🎬", desc:"Formation en ligne pour écrire son propre scénario de court ou long-métrage. Pour les passionnés créatifs.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["cinema","lecture"], originalite:9 },
  { id:83, titre:"Affiche cinéma rétro personnalisée", emoji:"🖼️", desc:"Impression de haute qualité d'un visuel personnalisé façon affiche de film avec les noms de la famille.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cinema"], originalite:9 },

  /* ── COUPLES ── */
  { id:84, titre:"Week-end romantique en gîte", emoji:"🏡", desc:"Deux nuits dans un gîte de charme à la campagne, avec petit-déjeuner et vin offerts. Bulles de sérénité.", genre:["couple"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage"], originalite:8 },
  { id:85, titre:"Dîner gastronomique restaurant étoilé", emoji:"🍷", desc:"Réservation dans un restaurant gastronomique pour une soirée d'exception. Un repas inoubliable.", genre:["couple"], age:["26-35","36-50","50+"], budget:">100", interets:["cuisine","voyage"], originalite:8 },
  { id:86, titre:"Atelier poterie duo", emoji:"🏺", desc:"Cours de poterie pour deux avec argile, tour de potier et cuisson. Une activité créative et amusante.", genre:["couple"], age:["26-35","36-50"], budget:"50-100", interets:["cuisine"], originalite:9 },
  { id:87, titre:"Escape game privatisé", emoji:"🔐", desc:"Réservation d'une salle d'escape game pour 2 joueurs uniquement. Résoudre des énigmes ensemble.", genre:["couple","homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["jeux-video"], originalite:8 },
  { id:88, titre:"Box vin découverte (6 bouteilles)", emoji:"🍾", desc:"Sélection de 6 bouteilles de vignerons indépendants avec fiches descriptives et accords mets-vins.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine","voyage"], originalite:7 },
  { id:89, titre:"Séance de massage duo spa", emoji:"💆", desc:"Massage relaxant côte à côte dans un spa haut de gamme. Déconnexion totale pour deux.", genre:["couple"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage","sport"], originalite:7 },
  { id:90, titre:"Bijou personnalisé avec date gravée", emoji:"💍", desc:"Bracelet ou collier en argent 925 gravé de la date anniversaire. Un bijou chargé de sens.", genre:["couple","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:[], originalite:8 },

  /* ── ENFANTS ── */
  { id:91, titre:"Lego Technic (18+ pièces)", emoji:"🧱", desc:"Ensemble Lego complexe pour développer la créativité, la patience et la logique des enfants dès 9 ans.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["technologie","jeux-video"], originalite:6 },
  { id:92, titre:"Microscope junior éducatif", emoji:"🔬", desc:"Microscope 40-400x avec préparations, plaque LED et livret d'expériences. Éveiller la curiosité scientifique.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["technologie","lecture"], originalite:9 },
  { id:93, titre:"Kit robotique débutant", emoji:"🤖", desc:"Robot programmable par blocs visuels pour initier les enfants au code de façon ludique et progressive.", genre:["enfant"], age:["18-25"], budget:">100", interets:["technologie","jeux-video"], originalite:9 },
  { id:94, titre:"Livre pop-up encyclopédique", emoji:"📗", desc:"Magnifique ouvrage avec illustrations qui s'animent en 3D sur les animaux, l'espace ou les dinosaures.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:["lecture","animaux"], originalite:8 },
  { id:95, titre:"Cours de natation enfant (10 séances)", emoji:"🏊", desc:"Programme d'apprentissage de la natation avec moniteur diplômé. Un investissement pour la vie.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["sport"], originalite:6 },
  { id:96, titre:"Tente de jeu intérieure", emoji:"⛺", desc:"Tipi ou château de tente qui se monte en 2 minutes. Un espace d'imagination et de jeu pour les enfants.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:[], originalite:7 },
  { id:97, titre:"Cours de dessin/peinture enfant", emoji:"🎨", desc:"Ateliers d'art plastique encadrés par un artiste. Développement de la créativité et de la confiance en soi.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:["manga"], originalite:7 },
  { id:98, titre:"Vélo enfant avec roulettes", emoji:"🚲", desc:"Vélo robuste et coloré avec stabilisateurs amovibles. Le cadeau intemporel pour apprendre à faire du vélo.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:99, titre:"Coffret magie (50 tours)", emoji:"🪄", desc:"Kit du magicien avec baguette, cartes truquées, livret explicatif et costume. Émerveiller petits et grands.", genre:["enfant"], age:["18-25"], budget:"20-50", interets:["cinema","jeux-video"], originalite:8 },
  { id:100, titre:"Table lumineuse de dessin A3", emoji:"✏️", desc:"Tablette LED pour dessiner, calquer et tracer. Idéale pour les enfants créatifs et passionnés de dessin.", genre:["enfant"], age:["18-25"], budget:"50-100", interets:["manga","lecture"], originalite:7 },

  /* ── 50 ANS ET + ── */
  { id:101, titre:"Cours de peinture aquarelle", emoji:"🖌️", desc:"Atelier découverte encadré par un artiste peintre pour s'initier à l'aquarelle en petit groupe convivial.", genre:["femme","homme"], age:["50+"], budget:"50-100", interets:["lecture","cinema"], originalite:8 },
  { id:102, titre:"Coffret thé grand cru du monde", emoji:"🍵", desc:"12 thés d'exception de Chine, Japon, Inde et Taiwan avec carnet de dégustation et infuseur de voyage.", genre:["femme"], age:["36-50","50+"], budget:"20-50", interets:["voyage","cuisine"], originalite:8 },
  { id:103, titre:"Abonnement journal papier + numérique", emoji:"📰", desc:"Combiné print + digital pour rester informé au quotidien avec un accès illimité aux archives numériques.", genre:["homme","femme"], age:["36-50","50+"], budget:"50-100", interets:["lecture"], originalite:4 },
  { id:104, titre:"Séjour thalassothérapie week-end", emoji:"🌊", desc:"Forfait soins marins complet dans une thalasso avec hébergement. Régénérer corps et esprit.", genre:["femme","couple"], age:["36-50","50+"], budget:">100", interets:["voyage","sport"], originalite:7 },
  { id:105, titre:"Coffret vin millésime de naissance", emoji:"🍷", desc:"Bouteille de vin millésimée de l'année de naissance. Un cadeau d'exception pour un anniversaire marquant.", genre:["homme","femme"], age:["50+"], budget:">100", interets:["cuisine"], originalite:10 },
  { id:106, titre:"Cours de jardinage bio", emoji:"🌱", desc:"Formation pratique au potager biologique avec un maraîcher professionnel. Légumes sains et cultivés chez soi.", genre:["femme","homme"], age:["36-50","50+"], budget:"20-50", interets:["cuisine","animaux"], originalite:8 },
  { id:107, titre:"Puzzle 1000 pièces panoramique", emoji:"🧩", desc:"Puzzle de grande taille représentant un paysage spectaculaire. Des heures de détente et de concentration.", genre:["femme","homme"], age:["36-50","50+"], budget:"<20", interets:["lecture"], originalite:5 },
  { id:108, titre:"Radio DAB+ design rétro", emoji:"📻", desc:"Poste de radio design avec réception FM et DAB+ numérique, son chaud et excellent. Style intemporel.", genre:["homme","femme"], age:["36-50","50+"], budget:"50-100", interets:["musique"], originalite:7 },

  /* ── PETITS BUDGETS (<20€) UNIVERSELS ── */
  { id:109, titre:"Bougie parfumée artisanale", emoji:"🕯️", desc:"Bougie en cire de soja avec fragrance naturelle et longue durée de combustion. Ambiance cocooning assurée.", genre:["femme","couple"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:[], originalite:5 },
  { id:110, titre:"Porte-monnaie cuir mini", emoji:"👛", desc:"Porte-cartes compact en cuir pleine fleur avec protection RFID. Design minimaliste et chic.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:[], originalite:4 },
  { id:111, titre:"Mug personnalisé avec message", emoji:"☕", desc:"Grande tasse en céramique avec un message ou une illustration choisie. Cadeau intime et quotidien.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:[], originalite:5 },
  { id:112, titre:"Carnet bullet journal pointé", emoji:"📔", desc:"Carnet pointé A5 de qualité avec couverture souple et papier 100g. Parfait pour l'organisation créative.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["lecture"], originalite:5 },
  { id:113, titre:"Set de stylos calligraphie", emoji:"✒️", desc:"Coffret de 6 stylos de calligraphie avec différentes pointes. Apprendre l'art de la belle écriture.", genre:["femme"], age:["18-25","26-35","36-50"], budget:"<20", interets:["lecture","manga"], originalite:7 },
  { id:114, titre:"Plante succulente en pot céramique", emoji:"🌵", desc:"Petite plante grasse à entretien minimal dans un pot céramique coloré. Verdure sans contrainte.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"<20", interets:["animaux"], originalite:5 },
  { id:115, titre:"Carte scratch « 100 films à voir »", emoji:"🎥", desc:"Affiche à gratter au fil des films vus. Un défi cinéphile affiché au mur et à compléter tout au long de l'année.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"<20", interets:["cinema"], originalite:8 },

  /* ── GRANDS BUDGETS (>100€) ORIGINAUX ── */
  { id:116, titre:"Expérience pilotage voiture de sport", emoji:"🏎️", desc:"Session de pilotage sur circuit fermé au volant d'une Ferrari ou Porsche avec instructeur professionnel.", genre:["homme"], age:["26-35","36-50","50+"], budget:">100", interets:["technologie","sport","voyage"], originalite:10 },
  { id:117, titre:"Vol en montgolfière au lever du soleil", emoji:"🎈", desc:"Ascension silencieuse à l'aube dans une montgolfière pour 2 personnes avec champagne et photos inclus.", genre:["couple","femme","homme"], age:["26-35","36-50","50+"], budget:">100", interets:["voyage"], originalite:10 },
  { id:118, titre:"Stage surf résidentiel une semaine", emoji:"🏄", desc:"Semaine complète hébergement + cours de surf quotidiens dans une école réputée sur la côte atlantique.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["sport","voyage"], originalite:9 },
  { id:119, titre:"Séjour vignoble & oenologie week-end", emoji:"🍇", desc:"Week-end immersif dans un domaine viticole : visite des caves, atelier dégustation et repas gastronomique.", genre:["couple","homme","femme"], age:["36-50","50+"], budget:">100", interets:["cuisine","voyage"], originalite:9 },
  { id:120, titre:"Impressante toile photo sur aluminium", emoji:"🖼️", desc:"Impression HD d'une photo personnelle sur dibond aluminium brossé. Un objet d'art unique chez soi.", genre:["homme","femme","couple"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:8 },

  /* ── BONUS : idées génériques multi-profils ── */
  { id:121, titre:"Pochette isotherme lunch box", emoji:"🍱", desc:"Sac repas thermique élégant pour emporter son déjeuner au bureau. Mode et pratique à la fois.", genre:["homme","femme"], age:["26-35","36-50"], budget:"<20", interets:["cuisine","sport"], originalite:5 },
  { id:122, titre:"Coffret wellness détox", emoji:"🌿", desc:"Box bien-être avec infusions bio, masque argile, bougies et guide méditation. Pour se ressourcer.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["sport","animaux"], originalite:6 },
  { id:123, titre:"Livre coloriage anti-stress adulte", emoji:"🖍️", desc:"Album de coloriages complexes et apaisants pour adultes. Une pause méditative accessible à tous.", genre:["femme","homme"], age:["26-35","36-50","50+"], budget:"<20", interets:["lecture","manga"], originalite:6 },
  { id:124, titre:"Coffret bain premium (sels, huiles)", emoji:"🛁", desc:"Set de bain luxueux avec sels de l'Himalaya, huile de bain aromatique et gant de gommage.", genre:["femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:[], originalite:5 },
  { id:125, titre:"Abonnement podcast premium", emoji:"🎙️", desc:"Accès à des contenus audio premium dans les domaines qui le passionnent : culture, business, bien-être.", genre:["homme","femme"], age:["26-35","36-50"], budget:"<20", interets:["lecture","cinema","musique"], originalite:6 },
  { id:126, titre:"Cours de langue en ligne (3 mois)", emoji:"🗣️", desc:"Abonnement Babbel ou Duolingo Plus pour apprendre une nouvelle langue de façon ludique et progressive.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"20-50", interets:["voyage","lecture"], originalite:7 },
  { id:127, titre:"Jeu de cartes cocktails", emoji:"🍹", desc:"Coffret de cartes recettes de 50 cocktails classiques et modernes avec accessoires de barman.", genre:["homme","femme","couple"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["cuisine","cinema"], originalite:7 },
  { id:128, titre:"Atelier vin naturel et biodynamie", emoji:"🌾", desc:"Soirée thématique avec un sommelier autour des vins nature et biodynamiques, avec dégustation guidée.", genre:["couple","homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["cuisine","voyage"], originalite:9 },
  { id:129, titre:"Portefeuille minimaliste en cuir végétal", emoji:"👜", desc:"Portefeuille ultra-mince en cuir végétal certifié avec protection des cartes sans contact.", genre:["homme","femme"], age:["26-35","36-50"], budget:"50-100", interets:[], originalite:6 },
  { id:130, titre:"Kit cosmétiques bio DIY", emoji:"🧴", desc:"Coffret pour fabriquer ses propres crèmes et baumes naturels à la maison. Écologie et créativité.", genre:["femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["animaux","sport"], originalite:8 },
  { id:131, titre:"Drone photo/vidéo compact", emoji:"🚁", desc:"Mini drone pliable avec caméra 4K stabilisée. Pour filmer et photographier ses aventures du ciel.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["technologie","voyage","sport"], originalite:9 },
  { id:132, titre:"Sac à main cuir artisanal", emoji:"👜", desc:"Sac en cuir pleine fleur fabriqué par un maroquinier artisan. Unique et durable toute une vie.", genre:["femme"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:8 },
  { id:133, titre:"Carte cadeau SPA + massage", emoji:"💆", desc:"Bon cadeau d'une journée dans un spa premium avec massage de 60 min inclus. Détente absolue.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:"50-100", interets:["sport"], originalite:5 },
  { id:134, titre:"Set écriture fontaine + encres", emoji:"🖊️", desc:"Stylo plume moyen de gamme avec 6 encres aux couleurs rares. La renaissance de l'écriture à la main.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["lecture"], originalite:8 },
  { id:135, titre:"Abonnement Audible (3 mois)", emoji:"🎙️", desc:"Écouter ses livres partout avec un catalogue de milliers de titres en français lus par des comédiens.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["lecture","musique"], originalite:6 },
  { id:136, titre:"Tableau ardoise personnalisé famille", emoji:"🏠", desc:"Grand tableau ardoise avec cadre en bois gravé du nom de famille. Pratique, déco et émouvant.", genre:["couple","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:[], originalite:7 },
  { id:137, titre:"Lunettes de soleil polarisées premium", emoji:"🕶️", desc:"Montures en acétate avec verres polarisés haute protection UV400. Style et fonctionnel sous le soleil.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"50-100", interets:["voyage","sport"], originalite:5 },
  { id:138, titre:"Montre mécanique vintage", emoji:"⌚", desc:"Montre à remontage automatique avec bracelet cuir et cadran épuré. Un héritage qui traverse les générations.", genre:["homme"], age:["26-35","36-50","50+"], budget:">100", interets:[], originalite:8 },
  { id:139, titre:"Carnet de recettes familiales personnalisé", emoji:"📓", desc:"Recueil relié où noter et transmettre les recettes de famille de génération en génération. Cadeau du cœur.", genre:["femme","homme"], age:["36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:9 },
  { id:140, titre:"Boîte cadeau surprise thématique", emoji:"🎁", desc:"Box surprise de 5 à 7 produits artisanaux sélectionnés autour d'une thématique (cocooning, aventure, gourmet…)", genre:["homme","femme","couple"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:[], originalite:7 },

  /* ── IDÉES BONUS pour diversifier ── */
  { id:141, titre:"Pass musée annuel", emoji:"🏛️", desc:"Accès illimité aux musées nationaux pendant un an. La culture à portée de main, sans se ruiner.", genre:["homme","femme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["lecture","cinema","voyage"], originalite:7 },
  { id:142, titre:"Expérience rallye sportif pédestre", emoji:"🏅", desc:"Inscription à un trail ou une course à obstacles fun. Défi sportif et communion avec la nature.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["sport","voyage"], originalite:8 },
  { id:143, titre:"Powerbank solaire outdoor", emoji:"☀️", desc:"Batterie externe rechargeable au soleil, étanche et robuste. Indispensable pour les aventuriers connectés.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["technologie","voyage","sport"], originalite:7 },
  { id:144, titre:"Paire de billets match de foot Ligue 1", emoji:"⚽", desc:"Vivre l'atmosphère électrique d'un match dans un stade, avec tout l'enthousiasme des supporters.", genre:["homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["sport"], originalite:6 },
  { id:145, titre:"Coffret dégustation bières artisanales", emoji:"🍺", desc:"12 bières de microbrasseries françaises, variées en styles et saveurs, avec carnet de notes.", genre:["homme","couple"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:146, titre:"Abonnement jeux de société (Chouette Coop)", emoji:"🎲", desc:"Location mensuelle de jeux de société modernes testés et approuvés. Découvrir sans acheter.", genre:["couple","famille","homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["jeux-video"], originalite:8 },
  { id:147, titre:"Casque de réalité virtuelle standalone", emoji:"🥽", desc:"Immersion totale dans des univers virtuels : jeux, voyages, sport, créativité. La technologie de demain.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["technologie","jeux-video","cinema"], originalite:9 },
  { id:148, titre:"Kit aquarelle professionnelle", emoji:"🎨", desc:"Set complet : 24 pigments fins, pinceaux différents, papier grain, bloc et palette en céramique.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["manga","lecture"], originalite:7 },
  { id:149, titre:"Formation photo smartphone (1 journée)", emoji:"📱", desc:"Atelier pratique pour maîtriser son smartphone en photographie. Composition, lumière et retouche mobile.", genre:["femme","homme"], age:["18-25","26-35","36-50","50+"], budget:"50-100", interets:["voyage","technologie"], originalite:8 },
  { id:150, titre:"Abonnement jardin botanique", emoji:"🌸", desc:"Accès annuel à un jardin botanique de la région. Promenades ressourçantes toute l'année.", genre:["femme","homme"], age:["36-50","50+"], budget:"20-50", interets:["animaux","voyage"], originalite:7 },
  { id:151, titre:"Coffret macarons Pierre Hermé", emoji:"🍬", desc:"Boîte de 24 macarons artisanaux aux saveurs iconiques de la maison Pierre Hermé. L'élégance sucrée.", genre:["femme","couple"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine"], originalite:7 },
  { id:152, titre:"Abonnement Playstation Plus (12 mois)", emoji:"🎮", desc:"Multijoueur en ligne, jeux gratuits mensuels et accès au catalogue de centaines de titres PS4/PS5.", genre:["homme","femme"], age:["18-25","26-35"], budget:"50-100", interets:["jeux-video"], originalite:5 },
  { id:153, titre:"Aquarium nano connecté", emoji:"🐠", desc:"Mini aquarium 20L avec éclairage LED programmable et filtre silencieux. La sérénité des poissons chez soi.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"50-100", interets:["animaux","technologie"], originalite:8 },
  { id:154, titre:"Livre recettes boulangerie artisanale", emoji:"🥖", desc:"Guide complet pour faire ses propres pains, croissants et viennoiseries maison comme un boulanger.", genre:["femme","homme"], age:["26-35","36-50","50+"], budget:"<20", interets:["cuisine"], originalite:6 },
  { id:155, titre:"Abonnement Deezer HiFi (6 mois)", emoji:"🎼", desc:"Streaming musical en qualité CD lossless. Pour les audiophiles qui ne veulent pas se contenter du MP3.", genre:["homme","femme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["musique","technologie"], originalite:6 },
  { id:156, titre:"Kit kombucha maison débutant", emoji:"🫧", desc:"Set complet avec SCOBY, thé premium et instructions pour brasser sa propre boisson probiotique maison.", genre:["femme","homme"], age:["18-25","26-35","36-50"], budget:"20-50", interets:["cuisine","animaux"], originalite:9 },
  { id:157, titre:"Coffret massage shiatsu électrique", emoji:"💼", desc:"Appareil de massage shiatsu 3D pour le dos et les épaules avec chaleur intégrée. Soulager les tensions.", genre:["femme","homme"], age:["36-50","50+"], budget:"50-100", interets:["sport"], originalite:6 },
  { id:158, titre:"Stage photographie de rue (1 week-end)", emoji:"📷", desc:"Formation intensive en photographie urbaine avec un photographe professionnel dans une grande ville.", genre:["homme","femme"], age:["18-25","26-35","36-50"], budget:">100", interets:["voyage","cinema","technologie"], originalite:9 },
  { id:159, titre:"Panneau lumineux LED personnalisé", emoji:"💡", desc:"Enseigne lumineuse LED avec un mot, prénom ou slogan choisi. Décoration unique et moderne.", genre:["femme","homme"], age:["18-25","26-35"], budget:"50-100", interets:["cinema","musique"], originalite:8 },
  { id:160, titre:"Coffret whisky dégustation (5 miniatures)", emoji:"🥃", desc:"5 mignonnettes de whiskies single malt de régions différentes avec fiches aromatiques et carnet notes.", genre:["homme"], age:["26-35","36-50","50+"], budget:"20-50", interets:["cuisine","voyage"], originalite:8 },

];

/* =========================================================
   ÉTAT DE L'APPLICATION
   ========================================================= */
const state = {
  currentStep: 1,
  genre: null,
  age: null,
  budget: null,
  interets: []
};

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

  const pct = ((step - 1) / 4) * 100;
  fill.style.width = pct + '%';
  label.textContent = `Étape ${step} sur 4`;

  dots.forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i + 1 < step) d.classList.add('done');
    if (i + 1 === step) d.classList.add('active');
  });

  document.querySelector('.progress-wrapper')
    .setAttribute('aria-valuenow', step - 1);
}

/* =========================================================
   NAVIGATION ENTRE ÉTAPES
   ========================================================= */
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

  // Activer bouton suivant
  const nextBtn = document.getElementById(`next-${state.currentStep}`);
  if (nextBtn) nextBtn.disabled = false;
}

/**
 * Bascule un centre d'intérêt (multi-sélect)
 */
function toggleInterest(btn, value) {
  btn.classList.toggle('selected');
  if (btn.classList.contains('selected')) {
    state.interets.push(value);
  } else {
    state.interets = state.interets.filter(i => i !== value);
  }
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
  "Parcours de notre base de 160 cadeaux…",
  "Sélection des idées les plus originales…",
  "Application du filtre budget…",
  "Finalisation de votre liste personnalisée…",
];

/**
 * Lance le processus de recherche avec chargement animé
 */
function submitQuiz() {
  // Masquer quiz, afficher loading
  document.getElementById('quiz-section').classList.add('hidden');
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

  // Simuler un délai de "calcul" (UX)
  setTimeout(() => {
    clearInterval(msgInterval);
    const results = computeResults();
    showResults(results);
  }, 2600);
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
  let score = 0;

  // Genre (obligatoire)
  if (cadeau.genre.includes(state.genre)) score += 30;
  else return -1; // Exclusion stricte

  // Budget (obligatoire)
  if (cadeau.budget === state.budget) score += 25;
  else return -1; // Exclusion stricte

  // Âge (important)
  if (cadeau.age.includes(state.age)) score += 20;
  else score -= 5; // Pénalité légère

  // Intérêts (bonus)
  if (state.interets.length > 0) {
    const matchCount = state.interets.filter(i => cadeau.interets.includes(i)).length;
    score += matchCount * 15;
  } else {
    // Sans filtre intérêt : pas de pénalité
    score += 5;
  }

  // Bonus originalité (légère influence)
  score += cadeau.originalite * 0.5;

  // Légère randomisation pour variété
  score += Math.random() * 5;

  return score;
}

/**
 * Calcule et retourne les 10 meilleurs résultats
 * @returns {Array} liste de cadeaux triés
 */
function computeResults() {
  const scored = CADEAUX
    .map(c => ({ ...c, score: scoreGift(c) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);

  // Prendre les 10 premiers
  return scored.slice(0, 10);
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
function showResults(results) {
  document.getElementById('loading-section').classList.add('hidden');

  const section = document.getElementById('results-section');
  const grid    = document.getElementById('cardsGrid');
  const summary = document.getElementById('resultsSummary');

  // Résumé de la recherche
  summary.textContent = `Pour un·e ${genreLabel(state.genre)} · Budget ${budgetLabel(state.budget)}${state.interets.length ? ' · ' + state.interets.length + ' intérêt(s) sélectionné(s)' : ''}`;

  // Vider la grille
  grid.innerHTML = '';

  if (results.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--clr-muted);grid-column:1/-1;padding:40px 0">Aucun résultat trouvé. Essayez d\'élargir vos critères.</p>';
  } else {
    results.forEach((gift, idx) => {
      const card = createCard(gift, idx + 1);
      card.style.animationDelay = `${idx * 0.06}s`;
      grid.appendChild(card);
    });
  }

  section.classList.remove('hidden');
  section.scrollIntoView({ behavior:'smooth', block:'start' });
}

/**
 * Crée un élément carte cadeau
 */
function createCard(gift, num) {
  const card = document.createElement('article');
  card.className = 'gift-card';
  card.setAttribute('aria-label', `Idée cadeau ${num} : ${gift.titre}`);

  card.innerHTML = `
    <div class="card-header">
      <span class="card-num">#${num}</span>
      <span class="card-emoji">${gift.emoji}</span>
      <h3 class="card-title">${gift.titre}</h3>
    </div>
    <p class="card-desc">${gift.desc}</p>
    <div class="card-footer">
      <span class="card-badge budget">💰 ${budgetLabel(gift.budget)}</span>
      <div class="originality">
        <span class="originality-label">Originalité :</span>
        <span class="stars">${genStars(gift.originalite)}</span>
        <span class="originality-score">${gift.originalite}/10</span>
      </div>
    </div>
  `;

  return card;
}

/* =========================================================
   PARTAGE
   ========================================================= */
/**
 * Partager les résultats (copie l'URL)
 */
function shareResults() {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: 'TrouveTonCadeau — Mes idées cadeaux personnalisées',
      text: `Découvrez mes 10 idées cadeaux sur TrouveTonCadeau !`,
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

  // Désélectionner toutes les options
  document.querySelectorAll('.option-btn.selected, .interest-btn.selected')
    .forEach(b => b.classList.remove('selected'));

  // Désactiver boutons suivant
  ['next-1','next-2','next-3'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = true;
  });

  // Afficher étape 1, masquer le reste
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-1').classList.add('active');

  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('loading-section').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');

  updateProgress(1);

  document.getElementById('quiz-section').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* =========================================================
   INITIALISATION
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  updateProgress(1);
  console.log(`🎁 TrouveTonCadeau — ${CADEAUX.length} idées cadeaux chargées.`);
});
