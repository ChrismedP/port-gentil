/* Page Contact : onglets de demande, créneaux, géolocalisation, carte */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon, S = PG.site;

  /* Urgences */
  $('urgent-strip').innerHTML = S.emergency.map(function (e) {
    return '<a class="urgent" href="tel:' + e.number + '">' + I(e.icon) + '<span>' + e.label + '</span><strong>' + e.number + '</strong></a>';
  }).join('') + '<a class="urgent" href="tel:' + S.phoneHref + '" style="background:var(--ocean-100);color:var(--ocean-700)">' + I('phone') + '<span>Standard</span><strong style="font-size:1rem">' + S.phone + '</strong></a>';
  $('addr').innerHTML = S.address.join('<br>');

  /* Onglets ↔ ancre */
  var tabs = document.querySelectorAll('[data-tab]');
  function show(id, scroll) {
    if (!$(id) || !$(id).classList.contains('help-panel')) return false;
    tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-tab') === id); });
    document.querySelectorAll('.help-panel').forEach(function (p) { p.hidden = p.id !== id; });
    if (window.gsap && document.documentElement.classList.contains('anim')) gsap.fromTo('#' + id, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'expo.out' });
    if (scroll) PG.scrollTo(document.querySelector('.help-tabs'));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    return true;
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.getAttribute('data-tab')); history.replaceState(null, '', '#' + t.getAttribute('data-tab')); }); });
  var h = location.hash.slice(1);
  if (h && show(h)) setTimeout(function () { PG.scrollTo(document.querySelector('.help-tabs')); }, 1300);
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), true); });
  /* Liens internes vers un onglet (ex. « Prendre rendez-vous » du pied de page) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]'); if (!a) return;
    var url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname) return;
    var id = url.hash.slice(1);
    if ($(id) && $(id).classList.contains('help-panel')) { e.preventDefault(); e.stopPropagation(); show(id, true); history.replaceState(null, '', '#' + id); }
  }, true);

  /* Pré-remplissage depuis les autres pages */
  var objet = PG.param('objet');
  var objets = { projet: 'Proposition de projet de quartier', benevole: 'Inscription au réseau de bénévoles', evenement: 'Proposition d\'événement pour l\'agenda' };
  if (objet && objets[objet]) $('c-obj').value = objets[objet];
  $('d-doc').innerHTML = '<option value="">Choisir un document</option>' + PG.demarches.filter(function (d) { return d.online && d.cat === 'etat-civil'; })
    .map(function (d) { return '<option value="' + d.id + '"' + (PG.param('demarche') === d.id ? ' selected' : '') + '>' + d.title + '</option>'; }).join('');

  /* Créneaux de rendez-vous */
  var slots = ['8 h 00', '8 h 30', '9 h 00', '9 h 30', '10 h 00', '10 h 30', '11 h 00', '13 h 30', '14 h 00', '14 h 30'];
  $('slots').innerHTML = slots.map(function (s, i) {
    return '<label><input type="radio" name="slot" ' + (i === 0 ? 'required ' : '') + ([2, 5, 8].indexOf(i) > -1 ? 'disabled' : '') + '><span>' + s + '</span></label>';
  }).join('');
  var dt = new Date(); dt.setDate(dt.getDate() + 1);
  $('r-date').min = dt.toISOString().slice(0, 10);

  /* Géolocalisation */
  $('geo-btn').addEventListener('click', function () {
    var input = $('s-lieu');
    if (!navigator.geolocation) { PG.toast('La géolocalisation n\'est pas disponible sur cet appareil.'); return; }
    input.value = 'Localisation en cours…';
    navigator.geolocation.getCurrentPosition(function (p) {
      input.value = 'GPS : ' + p.coords.latitude.toFixed(5) + ', ' + p.coords.longitude.toFixed(5);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, function () { input.value = ''; PG.toast('Position indisponible : saisissez l\'adresse manuellement.'); });
  });

  /* Nom du fichier choisi */
  [['s-photo', 'photo-name'], ['d-id', 'id-name']].forEach(function (p) {
    $(p[0]).addEventListener('change', function () { if (this.files[0]) $(p[1]).textContent = this.files[0].name; });
  });

  /* Carte */
  var annexes = [
    { n: 'Hôtel de Ville', a: 'Centre-ville', lat: -0.7175, lng: 8.7735, main: true },
    { n: 'Mairie du 1er arrondissement', a: 'Centre-ville & port', lat: -0.7140, lng: 8.7700 },
    { n: 'Mairie du 2e arrondissement', a: 'Grand Village', lat: -0.7300, lng: 8.7700 },
    { n: 'Mairie du 3e arrondissement', a: 'Quartiers sud', lat: -0.7450, lng: 8.7760 },
    { n: 'Mairie du 4e arrondissement', a: 'N\'Tchengué', lat: -0.7600, lng: 8.7830 }
  ];
  $('annexes').innerHTML = annexes.slice(1).map(function (x, i) {
    return '<div class="arr-card" data-reveal><div class="arr-card__num" style="font-size:2rem">' + (i + 1) + '<sup>' + (i === 0 ? 'er' : 'e') + '</sup></div><h4>' + x.n + '</h4><p>' + x.a + ' · Lun – Ven 7 h 30 – 15 h 00</p></div>';
  }).join('');
  if (window.L) {
    var map = L.map('contact-map', { scrollWheelZoom: false }).setView([-0.735, 8.776], 13);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Fond de carte &copy; Esri, contributeurs OpenStreetMap' }).addTo(map);
    annexes.forEach(function (x, i) {
      var icon = L.divIcon({ className: '', html: '<div class="pin' + (x.main ? ' is-active' : '') + '"><span>' + (x.main ? '★' : i) + '</span></div>', iconSize: [38, 38], iconAnchor: [19, 38], popupAnchor: [0, -36] });
      var m = L.marker([x.lat, x.lng], { icon: icon }).bindPopup('<div class="popup"><div><strong>' + x.n + '</strong><p>' + x.a + '</p></div></div>').addTo(map);
      if (x.main) m.openPopup();
    });
  }
})();
