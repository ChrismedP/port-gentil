/* Page La Mairie */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;
  var anim = function () { return window.gsap && document.documentElement.classList.contains('anim'); };

  /* Adjoints : noms à confirmer par la Mairie */
  var deleg = ['Finances, budget et marchés publics', 'Urbanisme, travaux et voirie', 'Affaires sociales, santé et solidarité', 'Jeunesse, sports et vie associative', 'Environnement, salubrité et littoral', 'Économie, commerce et économie bleue'];
  $('people').innerHTML = deleg.map(function (d, i) {
    var rank = (i + 1) + (i === 0 ? 'er' : 'e') + ' adjoint(e)';
    return '<article class="person" data-reveal><div class="person__avatar">' + (i + 1) + '</div><div><span class="person__rank">' + rank + '</span><h3>Nom à confirmer</h3><p>' + d + '</p><a href="contact.html">' + I('mail', 'i--sm') + 'Écrire à la délégation</a></div></article>';
  }).join('');

  /* Directions */
  var dirs = [
    { icon: 'stamp', name: 'État civil & citoyenneté', mission: 'Tenue des registres d\'état civil, célébration des mariages, légalisations et certificats.', div: ['Naissances', 'Mariages', 'Décès', 'Légalisations', 'Archives'] },
    { icon: 'wallet', name: 'Finances & comptabilité', mission: 'Préparation et exécution du budget, recouvrement des recettes et suivi des marchés publics.', div: ['Budget', 'Recettes', 'Marchés publics', 'Régie'] },
    { icon: 'urbanisme', name: 'Urbanisme & cadastre', mission: 'Instruction des permis, aménagement urbain, gestion foncière et voirie communale.', div: ['Permis', 'Cadastre', 'Voirie', 'Aménagement'] },
    { icon: 'heart-pulse', name: 'Affaires sociales & santé', mission: 'Accompagnement des familles, centres de santé municipaux et actions de solidarité.', div: ['Aide sociale', 'Santé', 'Personnes âgées', 'Handicap'] },
    { icon: 'trash', name: 'Hygiène & salubrité', mission: 'Collecte des déchets, curage des caniveaux, propreté du littoral et lutte anti-vectorielle.', div: ['Collecte', 'Caniveaux', 'Littoral', 'Police sanitaire'] },
    { icon: 'trophy', name: 'Jeunesse, culture & sports', mission: 'Gestion des équipements sportifs et culturels, soutien aux associations et événements.', div: ['Stades', 'Médiathèque', 'Associations', 'Événements'] },
    { icon: 'store', name: 'Économie & régie des marchés', mission: 'Gestion des marchés municipaux, commerce de proximité et économie bleue.', div: ['Marchés', 'Commerce', 'Pêche artisanale'] },
    { icon: 'globe', name: 'Numérique & communication', mission: 'Portail citoyen, systèmes d\'information, communication et relations presse.', div: ['Portail citoyen', 'SI', 'Communication', 'Presse'] }
  ];
  $('org-grid').innerHTML = dirs.map(function (d, i) {
    return '<button class="org__dir" role="tab" aria-selected="' + (i === 0) + '" data-dir="' + i + '">' + I(d.icon) + '<span><small>Direction ' + String(i + 1).padStart(2, '0') + '</small><strong>' + d.name + '</strong></span></button>';
  }).join('');
  function showDir(i) {
    var d = dirs[i];
    $('org-grid').querySelectorAll('[data-dir]').forEach(function (b) { b.setAttribute('aria-selected', +b.getAttribute('data-dir') === i); });
    $('org-panel').innerHTML = '<span class="tag">Direction ' + String(i + 1).padStart(2, '0') + '</span><h3>' + d.name + '</h3>' +
      '<h4>Mission principale</h4><p style="color:var(--text-soft)">' + d.mission + '</p>' +
      '<h4>Services rattachés</h4><ul class="tags">' + d.div.map(function (x) { return '<li class="tag tag--green">' + x + '</li>'; }).join('') + '</ul>' +
      '<h4>Responsable</h4><p style="color:var(--text-soft)">Nom du directeur ou de la directrice à confirmer</p>' +
      '<a class="btn btn--sm" style="margin-top:1.5rem" href="contact.html">' + I('mail') + 'Contacter la direction</a>';
    if (anim()) gsap.fromTo('#org-panel > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: .04, duration: .6, ease: 'expo.out' });
  }
  $('org-grid').addEventListener('click', function (e) { var b = e.target.closest('[data-dir]'); if (b) showDir(+b.getAttribute('data-dir')); });
  showDir(0);

  /* Documents officiels (exemples) */
  var docs = [
    { y: 2026, t: 'Délibération', title: 'Adoption du budget primitif 2026', d: '2026-02-20', s: '1,4 Mo' },
    { y: 2026, t: 'Arrêté', title: 'Arrêté municipal relatif à la salubrité urbaine et au tri des déchets', d: '2026-04-08', s: '320 Ko' },
    { y: 2026, t: 'Délibération', title: 'Création du budget participatif des quartiers', d: '2026-05-15', s: '540 Ko' },
    { y: 2026, t: 'Ordre du jour', title: 'Ordre du jour — session ordinaire du 23 octobre 2026', d: '2026-10-09', s: '180 Ko' },
    { y: 2026, t: 'Arrêté', title: 'Réglementation temporaire de la circulation — carrefours sud', d: '2026-09-02', s: '210 Ko' },
    { y: 2025, t: 'Rapport', title: 'Rapport d\'activité de la Commune 2025', d: '2025-12-18', s: '6,8 Mo' },
    { y: 2025, t: 'Délibération', title: 'Compte administratif de l\'exercice 2024', d: '2025-06-27', s: '2,1 Mo' },
    { y: 2025, t: 'Arrêté', title: 'Organisation des marchés municipaux et droits de place', d: '2025-03-11', s: '290 Ko' },
    { y: 2024, t: 'Rapport', title: 'Plan d\'aménagement urbain 2025-2030', d: '2024-11-30', s: '12 Mo' },
    { y: 2024, t: 'Délibération', title: 'Programme d\'éclairage public solaire', d: '2024-07-05', s: '480 Ko' }
  ];
  var years = [2026, 2025, 2024], types = ['Tous', 'Délibération', 'Arrêté', 'Rapport', 'Ordre du jour'];
  var st = { y: 2026, t: 'Tous', q: '' };
  $('doc-years').innerHTML = years.map(function (y) { return '<button class="tab" role="tab" aria-selected="' + (y === st.y) + '" data-y="' + y + '">' + y + '</button>'; }).join('');
  $('doc-types').innerHTML = types.map(function (t) { return '<button class="chip" type="button" aria-pressed="' + (t === st.t) + '" data-t="' + t + '">' + t + '</button>'; }).join('');
  var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  function renderDocs() {
    var list = docs.filter(function (d) { return d.y === st.y && (st.t === 'Tous' || d.t === st.t) && (!st.q || norm(d.title + ' ' + d.t).indexOf(norm(st.q)) > -1); });
    $('docs').innerHTML = list.length ? list.map(function (d) {
      return '<article class="doc"><span class="doc__icon">PDF</span><div><div class="doc__title">' + d.title + '</div><div class="doc__meta"><span>' + d.t + '</span><span>' + PG.fmtDate(d.d) + '</span><span>' + d.s + '</span></div></div><a class="doc__dl" href="#transparence" aria-label="Télécharger ' + PG.esc(d.title) + '">' + I('download', 'i--sm') + 'Télécharger</a></article>';
    }).join('') : '<p class="empty">Aucun document ne correspond à votre recherche.</p>';
    if (anim()) gsap.fromTo('#docs > *', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .04, duration: .5, ease: 'expo.out' });
  }
  $('doc-years').addEventListener('click', function (e) { var b = e.target.closest('[data-y]'); if (!b) return; st.y = +b.getAttribute('data-y'); this.querySelectorAll('[data-y]').forEach(function (x) { x.setAttribute('aria-selected', x === b); }); renderDocs(); });
  $('doc-types').addEventListener('click', function (e) { var b = e.target.closest('[data-t]'); if (!b) return; st.t = b.getAttribute('data-t'); this.querySelectorAll('[data-t]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); renderDocs(); });
  $('doc-q').addEventListener('input', function () { st.q = this.value.trim(); renderDocs(); });
  renderDocs();
  document.addEventListener('click', function (e) { if (e.target.closest('.doc__dl')) { e.preventDefault(); PG.toast('Prototype : le document PDF sera disponible dans la version définitive.'); } });
})();
