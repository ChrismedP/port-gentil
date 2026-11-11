/* Page Ma Ville : chronologie déplaçable, carte des arrondissements */
(function () {
  var I = PG.icon;

  /* Chronologie : boutons, glisser à la souris, barre de progression */
  var track = document.getElementById('history-track'), bar = document.getElementById('history-bar');
  function updBar() {
    var max = track.scrollWidth - track.clientWidth;
    bar.style.width = (max > 0 ? 15 + 85 * track.scrollLeft / max : 100) + '%';
  }
  track.addEventListener('scroll', updBar, { passive: true }); updBar();
  document.querySelectorAll('[data-hist]').forEach(function (b) {
    b.addEventListener('click', function () {
      var step = track.querySelector('.era').offsetWidth + 20;
      track.scrollBy({ left: step * +b.getAttribute('data-hist'), behavior: 'smooth' });
    });
  });
  var down = false, sx = 0, sl = 0;
  track.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = track.scrollLeft; track.classList.add('is-dragging'); });
  window.addEventListener('pointermove', function (e) { if (down) track.scrollLeft = sl - (e.clientX - sx); });
  window.addEventListener('pointerup', function () { if (down) { down = false; track.classList.remove('is-dragging'); } });

  /* Arrondissements (découpage et quartiers à valider) */
  var arr = [
    { n: 1, sup: 'er', title: 'Centre-ville & port', x: 52, y: 47, text: 'Cœur administratif et commercial : Hôtel de Ville, port de commerce, grands marchés et services.', q: ['Centre-ville', 'Zone portuaire', 'Front de mer'] },
    { n: 2, sup: 'e', title: 'Grand Village & Balise', x: 44, y: 56, text: 'Quartiers résidentiels denses et animés, autour des grands axes et du canal de la Balise.', q: ['Grand Village', 'Balise', 'Camp Boiro'] },
    { n: 3, sup: 'e', title: 'Quartiers sud', x: 50, y: 67, text: 'Zones résidentielles en développement, équipements sportifs et scolaires.', q: ['Bac Aviation', 'PG1', 'Le Badamier'] },
    { n: 4, sup: 'e', title: 'N\'Tchengué & littoral sud', x: 57, y: 90, text: 'Porte sud de la ville, zones industrielles et nouveaux quartiers le long de la route côtière.', q: ['N\'Tchengué', 'Zone industrielle', 'Littoral sud'] }
  ];
  var tabs = document.getElementById('arr-tabs'), spots = document.getElementById('hotspots'), panel = document.getElementById('terr-panel');
  tabs.innerHTML = arr.map(function (a, i) { return '<button class="tab" role="tab" aria-selected="' + (i === 0) + '" data-arr="' + i + '">' + a.n + '<sup>' + a.sup + '</sup> arr.</button>'; }).join('');
  spots.innerHTML = arr.map(function (a, i) { return '<button class="hotspot' + (i === 0 ? ' is-active' : '') + '" style="left:' + a.x + '%;top:' + a.y + '%" data-arr="' + i + '" aria-label="' + a.n + a.sup + ' arrondissement">' + a.n + '</button>'; }).join('');
  function show(i) {
    var a = arr[i];
    tabs.querySelectorAll('[data-arr]').forEach(function (t) { t.setAttribute('aria-selected', +t.getAttribute('data-arr') === i); });
    spots.querySelectorAll('[data-arr]').forEach(function (t) { t.classList.toggle('is-active', +t.getAttribute('data-arr') === i); });
    panel.innerHTML = '<div class="terr-panel__num">0' + a.n + '</div><h3>' + a.n + '<sup>' + a.sup + '</sup> arrondissement — ' + a.title + '</h3><p>' + a.text + '</p>' +
      '<ul>' + a.q.map(function (q) { return '<li class="tag">' + q + '</li>'; }).join('') + '</ul>' +
      '<div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem"><a class="btn" href="contact.html">' + I('mail') + 'Contacter la mairie d\'arrondissement</a></div>' +
      '<p class="note-provisoire">' + I('info', 'i--sm') + 'Découpage et quartiers à valider</p>';
    if (window.gsap && document.documentElement.classList.contains('anim')) gsap.fromTo(panel.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: .06, duration: .8, ease: 'expo.out' });
  }
  [tabs, spots].forEach(function (c) { c.addEventListener('click', function (e) { var b = e.target.closest('[data-arr]'); if (b) show(+b.getAttribute('data-arr')); }); });
  show(0);
})();
