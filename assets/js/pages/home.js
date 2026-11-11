/* Page d'accueil : rendu des blocs alimentés par les données */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon, S = PG.site;

  /* Infos flash (contenu dupliqué pour une boucle continue) */
  var flash = ['<a href="actualites.html#avis">Avis de houle : baignade interdite au Cap Lopez jusqu\'à dimanche</a>']
    .concat(PG.news.slice(0, 5).map(function (n) { return '<a href="article.html?id=' + n.id + '">' + n.title + '</a>'; }));
  $('ticker').innerHTML = flash.join('') + flash.join('');

  /* Accès rapides */
  var quick = PG.demarches.filter(function (d) { return d.popular; }).slice(0, 7).concat([PG.find(PG.demarches, 'rdv-elu')]);
  $('quick-grid').innerHTML = quick.map(PG.tpl.demarcheTile).join('');

  /* Actualités */
  var feat = PG.news[0];
  $('news-feature').innerHTML =
    '<article class="card card--feature" data-reveal>' +
      '<div class="card__media"><img src="' + PG.img(feat.img) + '" alt="" loading="lazy"><span class="tag tag--navy">À la une</span></div>' +
      '<div class="card__body"><div class="card__meta"><span class="tag">' + feat.cat + '</span><span>' + I('calendar', 'i--sm') + PG.fmtDate(feat.date) + '</span></div>' +
      '<h3 class="card__title"><a href="article.html?id=' + feat.id + '">' + feat.title + '</a></h3>' +
      '<p class="card__excerpt">' + feat.excerpt + '</p>' +
      '<div class="card__foot"><span class="btn btn--sm">Lire l\'article' + I('arrow-right', 'i--arrow') + '</span></div></div></article>';
  $('news-grid').innerHTML = PG.news.slice(1, 4).map(PG.tpl.newsCard).join('');

  /* Chantiers */
  $('works-grid').innerHTML = PG.projects.slice(0, 4).map(PG.tpl.projectCard).join('');

  /* Agenda */
  $('agenda-list').innerHTML = PG.events.filter(function (e) { return !e.featured; }).slice(0, 4).map(PG.tpl.eventRow).join('');

  /* Démarches en ligne */
  var online = PG.demarches.filter(function (d) { return d.online; }).length;
  $('online-count').setAttribute('data-count', online); $('online-count').textContent = online;

  /* Horaires, ouverture en temps réel (heure de Libreville) */
  $('hours').innerHTML = S.hours.map(function (h) { return '<li><span>' + h[0] + '</span><strong>' + h[1] + '</strong></li>'; }).join('');
  function localParts() {
    var f = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Africa/Libreville', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false });
    var p = {}; f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return p;
  }
  function updateClock() {
    var p = localParts(), h = +p.hour, m = +p.minute, day = p.weekday.replace('.', '');
    var t = h * 60 + m, isWeek = ['lun', 'mar', 'mer', 'jeu', 'ven'].indexOf(day) > -1, isSat = day === 'sam';
    var open = (isWeek && t >= 450 && t < 930) || (isSat && t >= 480 && t < 720);
    var el = $('open-state');
    el.className = 'open-state ' + (open ? 'is-open' : 'is-closed');
    el.innerHTML = '<span class="dot"></span>' + (open ? 'Ouvert en ce moment' : 'Fermé actuellement');
    var lbl = document.querySelector('[data-open-label]'); if (lbl) lbl.textContent = open ? 'Guichets ouverts' : 'Démarches en ligne 24 h/24';
    var c = document.querySelector('[data-clock]'); if (c) c.textContent = p.hour + ':' + p.minute;
  }
  updateClock(); setInterval(updateClock, 30000);

  /* Urgences */
  $('urgent-list').innerHTML = S.emergency.map(function (e) {
    return '<a class="urgent" href="tel:' + e.number + '">' + I(e.icon) + '<span>' + e.label + '</span><strong>' + e.number + '</strong></a>';
  }).join('') + '<a class="urgent" href="tel:' + S.phoneHref + '" style="background:var(--ocean-100);color:var(--ocean-700)">' + I('phone') + '<span>Standard de la Mairie</span><strong style="font-size:1rem">' + S.phone + '</strong></a>';
})();
