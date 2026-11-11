/* Page Services */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;

  /* Recherche → panneau de recherche global */
  $('svc-search').addEventListener('submit', function (e) { e.preventDefault(); PG.openSearch(this.querySelector('input').value); });

  /* Démarches fréquentes */
  $('freq-grid').innerHTML = PG.demarches.filter(function (d) { return d.popular; }).concat([PG.find(PG.demarches, 'rdv-elu')]).map(PG.tpl.demarcheTile).join('');

  /* Situations de vie */
  var list = $('life-list'), panel = $('life-panel');
  list.innerHTML = PG.lifeEvents.map(function (l, i) {
    return '<button class="life__btn" role="tab" id="life-' + l.id + '" aria-selected="' + (i === 0) + '" data-life="' + l.id + '">' + I(l.icon) + l.label + I('arrow-right') + '</button>';
  }).join('');
  function showLife(id) {
    var l = PG.find(PG.lifeEvents, id);
    var items = PG.demarches.filter(function (d) { return d.life && d.life.indexOf(id) > -1; });
    panel.innerHTML = '<img src="' + PG.img(l.img) + '" alt="">' +
      '<div class="life__content"><span class="tag tag--glass">' + items.length + ' démarches liées</span><h3 style="margin-top:1rem">' + l.label + '</h3>' +
      '<div class="life__links">' + items.map(function (d) { return '<a href="demarche.html?id=' + d.id + '">' + I(d.icon) + d.title + '</a>'; }).join('') + '</div></div>';
    panel.setAttribute('aria-labelledby', 'life-' + id);
    if (window.gsap && document.documentElement.classList.contains('anim')) {
      gsap.fromTo(panel.querySelector('img'), { scale: 1.12, opacity: .4 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out' });
      gsap.fromTo(panel.querySelectorAll('.life__content > *, .life__links a'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .05, ease: 'expo.out' });
    }
  }
  list.addEventListener('click', function (e) {
    var b = e.target.closest('[data-life]'); if (!b) return;
    list.querySelectorAll('[data-life]').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
    showLife(b.getAttribute('data-life'));
  });
  showLife(PG.lifeEvents[0].id);

  /* Catalogue */
  var nav = $('cat-nav'), cur = PG.serviceCats[0].id, onlyOnline = $('only-online');
  nav.innerHTML = PG.serviceCats.map(function (c, i) {
    var n = PG.demarches.filter(function (d) { return d.cat === c.id; }).length;
    return '<button class="catalog__cat" role="tab" aria-selected="' + (i === 0) + '" data-cat="' + c.id + '">' + I(c.icon) + c.label + '<span>' + n + '</span></button>';
  }).join('');
  function renderCat() {
    var c = PG.find(PG.serviceCats, cur);
    $('cat-title').textContent = c.label;
    var items = PG.demarches.filter(function (d) { return d.cat === cur && (!onlyOnline.checked || d.online); });
    $('cat-list').innerHTML = items.length ? items.map(function (d) {
      return '<article class="service-row">' + I(d.icon) + '<div><h4><a href="demarche.html?id=' + d.id + '">' + d.title + '</a></h4><p>' + d.desc + '</p></div>' +
        '<div class="service-row__meta">' + I('clock', 'i--sm') + d.delay + (d.online ? '<span class="tile__online">En ligne</span>' : '') + I('chevron-right') + '</div></article>';
    }).join('') : '<p class="empty">Aucune démarche en ligne dans cette catégorie pour le moment.<br>Rendez-vous au guichet ou prenez rendez-vous.</p>';
    if (window.gsap && document.documentElement.classList.contains('anim')) gsap.fromTo('#cat-list > *', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6, stagger: .05, ease: 'expo.out' });
  }
  nav.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    cur = b.getAttribute('data-cat');
    nav.querySelectorAll('[data-cat]').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
    renderCat();
  });
  onlyOnline.addEventListener('change', renderCat);
  renderCat();

  /* Suivi de dossier (simulation) */
  $('track-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var ref = this.querySelector('input').value.trim().toUpperCase() || 'PG-2026-00000';
    var steps = [['Demande reçue', 'Le 6 octobre 2026 à 10 h 14'], ['Pièces vérifiées', 'Par le service de l\'état civil'], ['Document signé', 'Le 8 octobre 2026'], ['Disponible au guichet', 'Hôtel de Ville — guichet n° 3']];
    var at = 2 + (ref.charCodeAt(ref.length - 1) % 2);
    $('track-result').innerHTML = '<p style="margin-bottom:1rem;font-weight:700;color:var(--navy-900)">Dossier ' + PG.esc(ref) + '</p>' + steps.map(function (s, i) {
      var st = i < at ? 'is-done' : i === at ? 'is-current' : '';
      return '<div class="ts ' + st + '"><span class="ts__dot">' + I(i === at ? 'clock' : 'check') + '</span><div><strong>' + s[0] + '</strong><span>' + (i <= at ? s[1] : 'À venir') + '</span></div></div>';
    }).join('');
    if (window.gsap) gsap.from('#track-result > *', { opacity: 0, x: 20, stagger: .08, duration: .6, ease: 'expo.out' });
  });

  /* Horaires & arrondissements */
  $('hours').innerHTML = PG.site.hours.map(function (h) { return '<li><span>' + h[0] + '</span><strong>' + h[1] + '</strong></li>'; }).join('');
  $('arr-grid').innerHTML = [1, 2, 3, 4].map(function (n) {
    return '<div class="arr-card" data-reveal><div class="arr-card__num">' + n + '<sup>' + (n === 1 ? 'er' : 'e') + '</sup></div><h4>Mairie du ' + n + (n === 1 ? 'er' : 'e') + ' arrondissement</h4><p>État civil de proximité, légalisations, certificats de résidence.</p><p style="margin-top:.8rem"><a class="link" href="contact.html">Contacter ' + I('arrow-right', 'i--sm') + '</a></p></div>';
  }).join('');

  /* FAQ */
  $('faq').innerHTML = [
    ['Puis-je demander un acte pour un membre de ma famille ?', 'Oui, sur présentation d\'une procuration légalisée et de la pièce d\'identité du demandeur et du mandataire.'],
    ['Combien coûte un acte d\'état civil ?', 'Les tarifs sont fixés par délibération du Conseil municipal. Ils sont affichés au guichet et sur chaque fiche démarche.'],
    ['Comment payer en ligne ?', 'Le paiement par mobile money (Airtel Money, Moov Money) sera proposé dans une prochaine version du portail. En attendant, le règlement s\'effectue au guichet.'],
    ['Je n\'ai pas accès à Internet, comment faire ?', 'Les agents d\'accueil de l\'Hôtel de Ville et des mairies d\'arrondissement vous accompagnent dans toutes vos démarches.'],
    ['Combien de temps est valable un certificat de résidence ?', 'En général trois mois. Certains organismes peuvent exiger un document de moins d\'un mois.']
  ].map(function (q, i) { return PG.acc(q[0], q[1], i === 0); }).join('');
})();
