/* Page Actualités */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;
  var anim = function () { return window.gsap && document.documentElement.classList.contains('anim'); };

  $('alert-bar').querySelector('button').addEventListener('click', function () { $('alert-bar').remove(); });

  /* À la une */
  var f = PG.news[0];
  $('headline-main').innerHTML = '<img src="' + PG.img(f.img) + '" alt=""><div><span class="tag tag--glass">' + f.cat + '</span><h3><a href="article.html?id=' + f.id + '">' + f.title + '</a></h3><p>' + f.excerpt + '</p>' +
    '<div class="card__meta" style="color:#cfdae7;margin-top:1rem"><span>' + I('calendar', 'i--sm') + PG.fmtDate(f.date) + '</span><span>' + I('clock', 'i--sm') + f.read + ' min de lecture</span></div></div>';
  $('headline-side').innerHTML = PG.news.slice(1, 5).map(function (n) {
    return '<article class="mini" data-reveal><img src="' + PG.img(n.img, true) + '" alt="" loading="lazy"><div><small>' + n.cat + ' · ' + PG.fmtDate(n.date) + '</small><h4><a href="article.html?id=' + n.id + '">' + n.title + '</a></h4></div></article>';
  }).join('');

  /* Fil filtrable */
  var cats = ['Tous les thèmes'].concat(PG.news.map(function (n) { return n.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  var st = { cat: cats[0], q: '', limit: 6 };
  $('news-cats').innerHTML = cats.map(function (c, i) { return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-c="' + c + '">' + c + '</button>'; }).join('');
  var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  function render() {
    var list = PG.news.filter(function (n) { return (st.cat === cats[0] || n.cat === st.cat) && (!st.q || norm(n.title + ' ' + n.excerpt).indexOf(norm(st.q)) > -1); });
    $('news-list').innerHTML = list.length ? list.slice(0, st.limit).map(PG.tpl.newsCard).join('') : '<p class="empty" style="grid-column:1/-1">Aucune actualité ne correspond à votre recherche.</p>';
    $('load-more').parentElement.hidden = list.length <= st.limit;
    $('news-list').querySelectorAll('[data-reveal]').forEach(function (el) { el.removeAttribute('data-reveal'); });
    if (anim()) gsap.fromTo('#news-list > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, stagger: .06, ease: 'expo.out' });
  }
  $('news-cats').addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (!b) return; st.cat = b.getAttribute('data-c'); st.limit = 6; this.querySelectorAll('[data-c]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); render(); });
  $('news-q').addEventListener('input', function () { st.q = this.value.trim(); render(); });
  $('load-more').addEventListener('click', function () { st.limit += 6; render(); if (window.ScrollTrigger) ScrollTrigger.refresh(); });
  render();

  /* Avis officiels */
  var avis = [
    ['Avis', 'Interdiction temporaire de baignade au Cap Lopez (fortes houles)', '2026-10-08', '240 Ko'],
    ['Arrêté', 'Plan de circulation modifié durant le goudronnage de l\'axe Tobia – Balise', '2026-09-30', '185 Ko'],
    ['Recrutement', '20 postes d\'agents de salubrité et de médiateurs de propreté urbaine', '2026-09-22', '310 Ko'],
    ['Appel d\'offres', 'Fourniture d\'équipements d\'hydro-curage des bassins d\'orage', '2026-09-12', '520 Ko']
  ];
  $('avis-list').innerHTML = avis.map(function (a) {
    return '<article class="doc" data-reveal><span class="doc__icon">' + I('megaphone') + '</span><div><div class="doc__title">' + a[1] + '</div><div class="doc__meta"><span class="tag" style="padding:.15rem .55rem">' + a[0] + '</span><span>Publié le ' + PG.fmtDate(a[2]) + '</span><span>PDF · ' + a[3] + '</span></div></div><a class="doc__dl" href="#avis">' + I('download', 'i--sm') + 'Télécharger</a></article>';
  }).join('');
  document.addEventListener('click', function (e) {
    if (e.target.closest('.doc__dl') || e.target.closest('[data-press]')) { e.preventDefault(); PG.toast('Prototype : le fichier sera disponible dans la version définitive.'); }
  });

  /* Vidéo (modale) */
  var modal = $('video-modal');
  function openM() { modal.classList.add('is-open'); modal.querySelector('.modal__close').focus(); }
  function closeM() { modal.classList.remove('is-open'); }
  $('video-open').addEventListener('click', openM);
  $('video-open').addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openM(); } });
  modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.modal__close')) closeM(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeM(); });
})();
