/* =========================================================================
   Données du prototype — simulent le futur CMS.
   ⚠ Tous les contenus (chiffres, téléphones, horaires, noms, dates) sont
   PROVISOIRES et doivent être validés par la Mairie de Port-Gentil.
   ========================================================================= */
window.PG = window.PG || {};

PG.img = function (name, small) { return 'assets/img/' + name + (small ? '-sm' : '') + '.webp'; };

PG.site = {
  name: 'Mairie de Port-Gentil',
  mayor: 'Pascal Houangni Ambouroue',
  mayorInitials: 'PHA',
  phone: '+241 (0)11 55 20 24',
  phoneHref: '+24111552024',
  email: 'contact@ville-portgentil.ga',
  address: ['Hôtel de Ville de Port-Gentil', 'Centre-ville, Île Mandji', 'Port-Gentil — Gabon'],
  hours: [['Lundi – Vendredi', '7 h 30 – 15 h 30'], ['Samedi (état civil)', '8 h 00 – 12 h 00'], ['Dimanche', 'Fermé']],
  emergency: [
    { label: 'Pompiers', number: '18', icon: 'flame' },
    { label: 'Police', number: '177', icon: 'shield' },
    { label: 'SAMU', number: '1300', icon: 'cross' }
  ],
  social: { facebook: 'https://www.facebook.com/LADRECMAIRIEDEPOG', youtube: '#', whatsapp: '#' },
  arrondissements: ['1er arrondissement', '2e arrondissement', '3e arrondissement', '4e arrondissement']
};

/* ---------- Actualités ---------- */
PG.news = [
  { id: 'inauguration-boulevard-maritime', cat: 'Travaux & chantiers', date: '2026-10-06', read: 5, img: 'inauguration-promenade-nuit1', featured: true,
    title: '𝐔𝐧𝐞 𝐝𝐞́𝐥𝐞́𝐠𝐚𝐭𝐢𝐨𝐧 𝐝𝐞 𝐥𝐚 𝐌𝐚𝐢𝐫𝐢𝐞 𝐝𝐞 𝐏𝐨𝐫𝐭-𝐆𝐞𝐧𝐭𝐢𝐥 𝐞𝐧 𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐝’𝐞́𝐭𝐮𝐝𝐞 𝐚𝐮 𝐆𝐡𝐚𝐧𝐚',
    excerpt: '2,4 km de front de mer réaménagé, une piste cyclable, 180 candélabres solaires et des aires de jeux : la nouvelle promenade est ouverte au public.' },
  
    { id: 'regate-mandji', cat: 'Culture & fêtes', date: '2026-10-02', read: 3, img: 'regate-pirogues2',
    title: 'Lancement de la 14e Régate côtière et du Festival des Arts de Mandji',
    excerpt: 'Pirogues traditionnelles, concerts et artisanat : le programme complet de la grande fête de la mer.' },

  { id: 'carrefours-sud', cat: 'Travaux & chantiers', date: '2026-09-28', read: 4, img: 'ingenieurs-voirie3',
    title: 'Carrefours sud : les nouvelles voies de desserte industrielle sont ouvertes',
    excerpt: 'Fluidifier l\'accès à la zone portuaire et désengorger le centre-ville aux heures de pointe.' },

  { id: 'budget-participatif', cat: 'Vie municipale', date: '2026-09-24', read: 4, img: 'assemblee-budget-participatif2',
    title: 'Budget participatif : 12 projets retenus par les comités de quartier',
    excerpt: 'Éclairage, aires de jeux, points d\'eau : les habitants ont voté pour les équipements de proximité.' },

  { id: 'filiere-bois-formation', cat: 'Économie & mer', date: '2026-09-19', read: 3, img: 'terminal-bois-logistique',
    title: 'Filière bois et logistique : un partenariat de formation pour 300 jeunes',
    excerpt: 'La commune et les opérateurs du port s\'engagent pour l\'emploi des jeunes de l\'Île Mandji.' },
  { id: 'etat-civil-24h', cat: 'Vie municipale', date: '2026-09-15', read: 2, img: 'accueil-etat-civil',
    title: 'État civil : les certificats de résidence délivrés en 24 h ouvrées',
    excerpt: 'Grâce au guichet unique numérique, les délais de délivrance sont divisés par trois.' },
  { id: 'prix-innovation-bleue', cat: 'Économie & mer', date: '2026-09-10', read: 4, img: 'portrait-entrepreneure',
    title: 'Prix de l\'Innovation bleue : rencontre avec la lauréate 2026',
    excerpt: 'Océanographe et entrepreneure, elle développe une solution de suivi de la qualité des eaux de la rade.' },
  { id: 'ville-propre', cat: 'Environnement', date: '2026-09-06', read: 2, img: 'journee-ville-propre',
    title: '« Port-Gentil Ville Propre » : plus de 80 tonnes de déchets collectées',
    excerpt: 'Bilan de la grande journée citoyenne qui a mobilisé plus de 1 200 bénévoles dans les quatre arrondissements.' },
  { id: 'digue-nord', cat: 'Environnement', date: '2026-08-30', read: 5, img: 'port-industriel',
    title: 'Plan climat littoral : la digue nord entre dans sa phase finale',
    excerpt: 'Un ouvrage essentiel pour protéger le port et les quartiers bas face à l\'érosion marine.' }
];

/* ---------- Agenda ---------- */
PG.events = [
  { id: 'journee-citoyenne', title: 'Journée citoyenne : nettoyage de la plage Sogara', date: '2026-10-17', time: '7 h 00', place: 'Plage Sogara', cat: 'Quartiers', cta: 'Je participe' },
  { id: 'atelier-canaux', title: 'Atelier participatif : plan d\'assainissement des canaux', date: '2026-10-21', time: '15 h 00', place: 'Mairie annexe du 3e arr.', cat: 'Quartiers', cta: 'S\'inscrire' },
  { id: 'conseil-municipal', title: 'Session ordinaire du Conseil municipal', date: '2026-10-23', time: '9 h 30', place: 'Salle des délibérations', cat: 'Institutionnel', cta: 'Ordre du jour' },
  { id: 'forum-economique', title: 'Forum économique de l\'Île Mandji : investir à Port-Gentil', date: '2026-10-29', time: '9 h 00', place: 'Centre culturel', cat: 'Économie', cta: 'S\'inscrire' },
  { id: 'semi-marathon', title: 'Semi-marathon océanique (10 km & 21 km)', date: '2026-11-08', time: '6 h 30', place: 'Départ : Place de la République', cat: 'Sport', cta: 'S\'inscrire' },
  { id: 'fete-de-la-mer', title: 'Grande Fête de la Mer & Régate de l\'Île Mandji', date: '2026-11-14', end: '2026-11-15', time: 'Tout le week-end', place: 'Front de mer', cat: 'Culture', cta: 'Programme', img: 'fete-de-la-mer-regate', featured: true }
];

/* ---------- Projets & chantiers ---------- */
PG.projects = [
  { id: 'front-de-mer', title: 'Promenade côtière & front de mer', cat: 'Équipements publics', status: 'En cours', progress: 78, budget: '4,2 Md FCFA', end: 'Déc. 2026', arr: '1er arr.', img: 'apres-front-de-mer2', lat: -0.7125, lng: 8.7642 },
  { id: 'voie-ntchengue', title: 'Réhabilitation de la voie principale de N\'Tchengué', cat: 'Voirie', status: 'En cours', progress: 86, budget: '2,8 Md FCFA', end: 'Nov. 2026', arr: '4e arr.', img: 'chantier-voirie-ntchengue2', lat: -0.7560, lng: 8.7840 },
  { id: 'lampadaires-solaires', title: '3 200 candélabres solaires autonomes', cat: 'Éclairage solaire', status: 'En cours', progress: 64, budget: '1,6 Md FCFA', end: 'Mars 2027', arr: 'Toute la commune', img: 'piste-cyclable-solaire2', lat: -0.7270, lng: 8.7720 },
  { id: 'canal-balise', title: 'Curage hydraulique du canal de la Balise', cat: 'Assainissement', status: 'En cours', progress: 55, budget: '640 M FCFA', end: 'Janv. 2027', arr: '2e arr.', img: 'inspection-travaux2', lat: -0.7330, lng: 8.7785 },
  { id: 'marche-central', title: 'Modernisation du Grand Marché central', cat: 'Équipements publics', status: 'En cours', progress: 41, budget: '3,1 Md FCFA', end: 'Juin 2027', arr: '1er arr.', img: 'marche-local', lat: -0.7195, lng: 8.7695 },
  { id: 'digues-cap-lopez', title: 'Protection littorale & digues du Cap Lopez', cat: 'Environnement', status: 'En cours', progress: 33, budget: '5,4 Md FCFA', end: '2028', arr: 'Cap Lopez', img: 'phare-cap-lopez-vagues', lat: -0.6380, lng: 8.7120 },
  { id: 'pole-numerique', title: 'Pôle numérique municipal & incubateur Mandji Tech', cat: 'Équipements publics', status: 'Études', progress: 25, budget: '1,2 Md FCFA', end: '2027', arr: '1er arr.', img: 'guichet-numerique', lat: -0.7160, lng: 8.7670 },
  { id: 'port-peche', title: 'Nouveau port de pêche & pôle halieutique', cat: 'Grands projets', status: 'Études', progress: 18, budget: '12 Md FCFA', end: '2029', arr: '3e arr.', img: 'port-terminal-aerien', lat: -0.7040, lng: 8.7620 }
];

/* ---------- Démarches ---------- */
PG.serviceCats = [
  { id: 'etat-civil', label: 'État civil & citoyenneté', icon: 'stamp' },
  { id: 'urbanisme', label: 'Urbanisme, foncier & habitat', icon: 'urbanisme' },
  { id: 'fiscalite', label: 'Fiscalité locale & marchés', icon: 'receipt' },
  { id: 'social', label: 'Action sociale & santé', icon: 'heart-pulse' },
  { id: 'salubrite', label: 'Salubrité & voirie', icon: 'trash' },
  { id: 'education', label: 'Éducation, jeunesse & sport', icon: 'graduation' },
  { id: 'culture', label: 'Culture & vie associative', icon: 'music' },
  { id: 'mer', label: 'Pêche & économie bleue', icon: 'fish' }
];

PG.demarches = [
  { id: 'acte-naissance', cat: 'etat-civil', icon: 'file', title: 'Copie d\'acte de naissance', desc: 'Copie intégrale ou extrait avec filiation.', delay: '48 h', online: true, popular: true, life: ['naissance'] },
  { id: 'declaration-naissance', cat: 'etat-civil', icon: 'baby', title: 'Déclaration de naissance', desc: 'À effectuer dans les délais légaux après la naissance.', delay: 'Immédiat', online: false, life: ['naissance'] },
  { id: 'mariage', cat: 'etat-civil', icon: 'heart', title: 'Célébration de mariage', desc: 'Constitution du dossier, publication des bans et réservation de la date.', delay: '1 mois', online: false, popular: true, life: ['mariage'] },
  { id: 'legalisation', cat: 'etat-civil', icon: 'pen', title: 'Légalisation de signature', desc: 'Certification de signature et copies conformes.', delay: 'Immédiat', online: false, popular: true, life: ['entreprendre', 'emmenager'] },
  { id: 'certificat-residence', cat: 'etat-civil', icon: 'home', title: 'Certificat de résidence', desc: 'Attestation de domicile pour vos démarches bancaires et administratives.', delay: '24 h', online: true, popular: true, life: ['emmenager'] },
  { id: 'certificat-celibat', cat: 'etat-civil', icon: 'user-check', title: 'Certificat de célibat', desc: 'Exigé pour certains dossiers de mariage ou d\'emploi.', delay: '48 h', online: true, life: ['mariage'] },
  { id: 'declaration-deces', cat: 'etat-civil', icon: 'file', title: 'Déclaration de décès', desc: 'Enregistrement légal et délivrance de l\'acte de décès.', delay: 'Immédiat', online: false, life: ['deces'] },
  { id: 'permis-construire', cat: 'urbanisme', icon: 'urbanisme', title: 'Permis de construire', desc: 'Dépôt et instruction de votre dossier d\'urbanisme.', delay: '2 mois', online: true, popular: true, life: ['construire'] },
  { id: 'certificat-urbanisme', cat: 'urbanisme', icon: 'map', title: 'Certificat d\'urbanisme', desc: 'Connaître les règles applicables à un terrain.', delay: '1 mois', online: true, life: ['construire'] },
  { id: 'patente', cat: 'fiscalite', icon: 'store', title: 'Patente & licence commerciale', desc: 'Déclarer et régulariser votre activité commerciale.', delay: '5 jours', online: false, popular: true, life: ['entreprendre'] },
  { id: 'place-marche', cat: 'fiscalite', icon: 'receipt', title: 'Place de marché & étalage', desc: 'Obtenir un emplacement dans un marché municipal.', delay: '10 jours', online: false, life: ['entreprendre'] },
  { id: 'aide-sociale', cat: 'social', icon: 'heart-pulse', title: 'Aide sociale municipale', desc: 'Accompagnement des familles et personnes vulnérables.', delay: 'Sur RDV', online: false },
  { id: 'signalement', cat: 'salubrite', icon: 'alert', title: 'Signaler un problème', desc: 'Voirie, éclairage, déchets, inondation : alertez les services.', delay: '72 h', online: true, popular: true },
  { id: 'collecte-encombrants', cat: 'salubrite', icon: 'trash', title: 'Enlèvement d\'encombrants', desc: 'Demander un passage pour les déchets volumineux.', delay: '1 semaine', online: true, life: ['emmenager'] },
  { id: 'inscription-scolaire', cat: 'education', icon: 'graduation', title: 'Inscription dans une école municipale', desc: 'Pré-inscription et affectation scolaire.', delay: '2 semaines', online: true, life: ['emmenager', 'naissance'] },
  { id: 'salle-municipale', cat: 'culture', icon: 'music', title: 'Réserver une salle municipale', desc: 'Pour vos événements associatifs ou familiaux.', delay: '1 semaine', online: true, life: ['mariage'] },
  { id: 'licence-peche', cat: 'mer', icon: 'fish', title: 'Autorisation de pêche artisanale', desc: 'Enregistrement des pirogues et emplacement au débarcadère.', delay: '10 jours', online: false, life: ['entreprendre'] },
  { id: 'rdv-elu', cat: 'etat-civil', icon: 'calendar', title: 'Rencontrer un élu', desc: 'Demander un rendez-vous lors des permanences.', delay: 'Sur RDV', online: true }
];

PG.lifeEvents = [
  { id: 'naissance', label: 'J\'attends un enfant', icon: 'baby', img: 'concertation-citoyenne' },
  { id: 'mariage', label: 'Je me marie', icon: 'heart', img: 'hotel-de-ville-drapeaux' },
  { id: 'emmenager', label: 'J\'emménage à Port-Gentil', icon: 'home', img: 'vue-aerienne-nuit' },
  { id: 'entreprendre', label: 'Je crée mon activité', icon: 'briefcase', img: 'marche-local' },
  { id: 'construire', label: 'Je construis ou je rénove', icon: 'urbanisme', img: 'chantier-voirie-littorale' },
  { id: 'deces', label: 'Un proche est décédé', icon: 'file', img: 'hotel-de-ville-facade' }
];

/* ---------- Utilitaires de format ---------- */
PG.months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
PG.monthsShort = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
PG.parseDate = function (s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
PG.fmtDate = function (s) { var d = PG.parseDate(s); return d.getDate() + ' ' + PG.months[d.getMonth()] + ' ' + d.getFullYear(); };
PG.find = function (list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; };
PG.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
