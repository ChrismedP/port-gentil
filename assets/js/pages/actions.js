/* Page Nos actions : carte Leaflet, avant/après, budget */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;
  var anim = function () { return window.gsap && document.documentElement.classList.contains('anim'); };

  /* ---------- Carte des projets ---------- */
  var cats = ['Tous'].concat(PG.projects.map(function (p) { return p.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  var arrs = PG.projects.map(function (p) { return p.arr; }).filter(function (c, i, a) { return a.indexOf(c) === i; });
  var st = { cat: 'Tous', arr: '' }, map = null, markers = {};
  $('map-cats').innerHTML = cats.map(function (c) { return '<button class="chip" type="button" aria-pressed="' + (c === 'Tous') + '" data-c="' + c + '">' + c + (c === 'Tous' ? ' (' + PG.projects.length + ')' : '') + '</button>'; }).join('');
  $('map-arr').innerHTML += arrs.map(function (a) { return '<option>' + a + '</option>'; }).join('');

  function visible() { return PG.projects.filter(function (p) { return (st.cat === 'Tous' || p.cat === st.cat) && (!st.arr || p.arr === st.arr); }); }

  function renderList() {
    var list = visible();
    $('map-list').innerHTML = list.length ? list.map(function (p) {
      return '<button class="map-item" type="button" data-p="' + p.id + '" id="' + p.id + '"><img src="' + PG.img(p.img, true) + '" alt="" loading="lazy"><span><strong>' + p.title + '</strong>' +
        '<small>' + I('map-pin', 'i--sm') + p.arr + ' · ' + p.status + ' · ' + p.progress + ' %</small><span class="progress"><span class="progress__bar" style="--value:' + p.progress + '%"></span></span></span></button>';
    }).join('') : '<p class="empty">Aucun projet pour ce filtre.</p>';
    if (map) {
      Object.keys(markers).forEach(function (id) { var on = list.some(function (p) { return p.id === id; }); if (on) markers[id].addTo(map); else markers[id].remove(); });
      if (list.length) map.flyToBounds(L.latLngBounds(list.map(function (p) { return [p.lat, p.lng]; })).pad(0.3), { duration: 1.2, maxZoom: 15 });
    }
  }
  function focus(id, fromMap) {
    var p = PG.find(PG.projects, id); if (!p) return;
    document.querySelectorAll('.map-item').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-p') === id); });
    document.querySelectorAll('.pin').forEach(function (el) { el.classList.toggle('is-active', el.getAttribute('data-p') === id); });
    var item = document.querySelector('.map-item[data-p="' + id + '"]');
    if (item && fromMap) $('map-list').scrollTo({ top: item.offsetTop - $('map-list').offsetTop - 10, behavior: 'smooth' });
    if (map) { map.flyTo([p.lat, p.lng], 15, { duration: 1.1 }); markers[id].openPopup(); }
  }

  if (window.L) {
    $('map-fallback').remove();
    map = L.map('map', { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([-0.715, 8.785], 12);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19, attribution: 'Fond de carte &copy; Esri, contributeurs OpenStreetMap'
    }).addTo(map);
    PG.projects.forEach(function (p, i) {
      var icon = L.divIcon({ className: '', html: '<div class="pin" data-p="' + p.id + '"><span>' + (i + 1) + '</span></div>', iconSize: [38, 38], iconAnchor: [19, 38], popupAnchor: [0, -36] });
      markers[p.id] = L.marker([p.lat, p.lng], { icon: icon, title: p.title })
        .bindPopup('<div class="popup"><img src="' + PG.img(p.img, true) + '" alt=""><div><strong>' + p.title + '</strong><p>' + p.cat + ' · ' + p.budget + ' · fin ' + p.end + '</p><div class="progress" style="margin-top:.6rem"><div class="progress__bar" style="--value:' + p.progress + '%"></div></div></div></div>')
        .on('click', function () { focus(p.id, true); })
        .addTo(map);
    });
    map.on('focus', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });
  } else {
    $('map-fallback').textContent = 'La carte nécessite une connexion Internet.';
  }

  $('map-cats').addEventListener('click', function (e) {
    var b = e.target.closest('[data-c]'); if (!b) return;
    st.cat = b.getAttribute('data-c'); this.querySelectorAll('[data-c]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    renderList();
  });
  $('map-arr').addEventListener('change', function () { st.arr = this.value; renderList(); });
  $('map-list').addEventListener('click', function (e) { var b = e.target.closest('[data-p]'); if (b) focus(b.getAttribute('data-p')); });
  renderList();
  if (location.hash && PG.find(PG.projects, location.hash.slice(1))) setTimeout(function () { focus(location.hash.slice(1), true); }, 1800);

  /* ---------- Avant / après ---------- */
  var ba = $('ba'), range = ba.querySelector('input');
  range.addEventListener('input', function () { ba.style.setProperty('--pos', this.value + '%'); });
  if (anim()) {
    var o = { v: 50 };
    gsap.timeline({ scrollTrigger: { trigger: ba, start: 'top 70%', once: true } })
      .to(o, { v: 22, duration: 1, ease: 'power2.inOut', onUpdate: function () { ba.style.setProperty('--pos', o.v + '%'); } })
      .to(o, { v: 78, duration: 1.2, ease: 'power2.inOut', onUpdate: function () { ba.style.setProperty('--pos', o.v + '%'); } })
      .to(o, { v: 50, duration: .9, ease: 'power2.inOut', onUpdate: function () { ba.style.setProperty('--pos', o.v + '%'); range.value = o.v; } });
  }

  /* ---------- Grands projets ---------- */
  $('projects-grid').innerHTML = ['marche-central', 'digues-cap-lopez', 'pole-numerique'].map(function (id) { return PG.tpl.projectCard(PG.find(PG.projects, id)).replace('<article ', '<article id="' + id + '-card" '); }).join('');

  /* ---------- Budget (montants fictifs) ---------- */
  var parts = [
    { l: 'Voirie & mobilité', v: 32, c: '#3aa9b8' },
    { l: 'Assainissement & littoral', v: 24, c: '#2b8563' },
    { l: 'Équipements publics', v: 18, c: '#c49a45' },
    { l: 'Éclairage solaire', v: 10, c: '#fcd116' },
    { l: 'Social & éducation', v: 10, c: '#7aa7e0' },
    { l: 'Numérique', v: 6, c: '#e5cc8f' }
  ];
  var R = 80, C = 2 * Math.PI * R, acc = 0, total = 28.4;
  $('donut').innerHTML = parts.map(function (p, i) {
    var len = C * p.v / 100, s = '<circle cx="100" cy="100" r="' + R + '" stroke="' + p.c + '" stroke-dasharray="' + (len - 1.5) + ' ' + (C - len + 1.5) + '" stroke-dashoffset="' + (-acc) + '" data-i="' + i + '"></circle>';
    acc += len; return s;
  }).join('');
  $('legend').innerHTML = parts.map(function (p, i) {
    return '<button class="legend__item" type="button" data-i="' + i + '"><span class="legend__dot" style="background:' + p.c + '"></span><span>' + p.l + '</span><strong>' + p.v + ' %</strong></button>';
  }).join('');
  function hl(i) {
    var circles = $('donut').querySelectorAll('circle');
    circles.forEach(function (c) { var on = i != null && +c.getAttribute('data-i') === i; c.classList.toggle('is-on', on); c.classList.toggle('is-dim', i != null && !on); });
    $('legend').querySelectorAll('.legend__item').forEach(function (b) { b.classList.toggle('is-on', i != null && +b.getAttribute('data-i') === i); });
    if (i == null) { $('donut-val').textContent = '28,4 Md'; $('donut-lbl').textContent = 'FCFA de budget d\'investissement 2026'; }
    else { $('donut-val').textContent = (total * parts[i].v / 100).toFixed(1).replace('.', ',') + ' Md'; $('donut-lbl').textContent = parts[i].l; }
  }
  ['mouseover', 'focusin'].forEach(function (ev) { [$('donut'), $('legend')].forEach(function (el) { el.addEventListener(ev, function (e) { var t = e.target.closest('[data-i]'); if (t) hl(+t.getAttribute('data-i')); }); }); });
  [$('donut'), $('legend')].forEach(function (el) { el.addEventListener('mouseleave', function () { hl(null); }); });
  if (anim()) {
    gsap.from('#donut circle', { strokeDasharray: '0 ' + C, duration: 1.6, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '#donut', start: 'top 80%', once: true } });
  }
})();
