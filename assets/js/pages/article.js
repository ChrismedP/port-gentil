/* Page Article (article.html?id=...) */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;
  var idx = Math.max(0, PG.news.findIndex(function (n) { return n.id === PG.param('id'); }));
  var n = PG.news[idx];

  document.title = n.title + ' — Mairie de Port-Gentil';
  $('art-cat').textContent = n.cat; $('art-cat-crumb').textContent = n.cat;
  $('art-title').textContent = n.title;
  $('art-date').textContent = 'Publié le ' + PG.fmtDate(n.date) + ' · ' + n.read + ' min de lecture';
  $('art-img').src = PG.img(n.img); $('art-img').alt = n.title;
  $('art-caption').textContent = 'Photo : Mairie de Port-Gentil — illustration provisoire';

  /* Contenu : l'article inaugural est rédigé en entier, les autres reçoivent un gabarit à partir de leur chapô */
  var body;
  if (n.id === 'inauguration-boulevard-maritime') {
    body = '<p class="chapo">' + n.excerpt + '</p>' +
      '<p>Après dix-huit mois de travaux, le nouveau boulevard maritime a été inauguré en présence des élus, des habitants et des entreprises ayant participé au chantier. La promenade relie désormais le centre-ville au Cap Lopez par un itinéraire continu, éclairé et sécurisé.</p>' +
      '<h2>Un projet résilient face à l\'érosion marine</h2>' +
      '<p>Le front de mer est protégé par un nouvel enrochement et un mur de soutènement conçus pour résister aux fortes houles. Les réseaux d\'eaux pluviales ont été entièrement repris afin de limiter les inondations dans les quartiers bas.</p>' +
      '<blockquote>« Ce boulevard appartient à tous les Port-Gentillais. C\'est un lieu de promenade, de sport et de rencontre, mais aussi une protection pour nos quartiers. »<cite>— Citation à valider par le Cabinet du Maire</cite></blockquote>' +
      '<h2>Les nouveaux équipements de la promenade</h2>' +
      '<ul><li>2,4 km de promenade piétonne et une piste cyclable sécurisée</li><li>180 candélabres solaires autonomes</li><li>Deux aires de jeux pour enfants et des bancs ombragés</li><li>Des points d\'eau potable et des sanitaires publics</li></ul>' +
      '<div class="gallery"><img src="assets/img/bancs-promenade-sm.webp" data-full="assets/img/bancs-promenade.webp" alt="Bancs de la promenade"><img src="assets/img/piste-cyclable-solaire-sm.webp" data-full="assets/img/piste-cyclable-solaire.webp" alt="Piste cyclable solaire"><img src="assets/img/aire-de-jeux-littoral-sm.webp" data-full="assets/img/aire-de-jeux-littoral.webp" alt="Aire de jeux du littoral"></div>' +
      '<p>La Mairie rappelle que la promenade est un espace partagé : les deux-roues motorisés y sont interdits et les usagers sont invités à respecter la propreté des lieux.</p>';
  } else {
    body = '<p class="chapo">' + n.excerpt + '</p>' +
      '<p>Texte de l\'article à rédiger par le service communication. Ce paragraphe illustre la mise en page d\'un article : interlignage confortable, largeur de lecture limitée et hiérarchie claire des intertitres.</p>' +
      '<h2>Ce qu\'il faut retenir</h2>' +
      '<ul><li>Premier point clé de l\'annonce</li><li>Deuxième point : dates, lieux et publics concernés</li><li>Troisième point : comment participer ou s\'informer</li></ul>' +
      '<p>Pour toute question, les services municipaux restent à votre disposition à l\'Hôtel de Ville et dans les mairies d\'arrondissement.</p>';
  }
  body += '<div class="tags-list"><a href="actualites.html#flux">#PortGentil</a><a href="actualites.html#flux">#' + n.cat.replace(/[^A-Za-zÀ-ÿ]/g, '') + '</a><a href="actualites.html#flux">#ÎleMandji</a></div>';
  $('art-body').innerHTML = body;

  /* Encadré latéral */
  $('art-aside').innerHTML = (n.id === 'inauguration-boulevard-maritime' ?
    '<div class="side-card side-card--navy" data-reveal><h3>Fiche technique</h3><ul class="info-list">' +
      '<li>' + I('route') + '<span><strong style="color:#fff">2,4 km</strong> de promenade</span></li>' +
      '<li>' + I('sun') + '<span><strong style="color:#fff">180</strong> candélabres solaires</span></li>' +
      '<li>' + I('wallet') + '<span><strong style="color:#fff">4,2 Md FCFA</strong> d\'investissement</span></li>' +
      '<li>' + I('calendar') + '<span>18 mois de travaux</span></li></ul>' +
      '<a class="btn btn--accent btn--sm btn--block" style="margin-top:1rem" href="actions.html#front-de-mer">' + I('map') + 'Voir sur la carte</a></div>' : '') +
    '<div class="side-card" data-reveal><h3>Documents</h3><div class="docs"><a class="doc" href="#" data-dl style="padding:.8rem"><span class="doc__icon" style="width:40px;height:40px">PDF</span><div><div class="doc__title" style="font-size:.88rem">Dossier de presse</div><div class="doc__meta">1,2 Mo</div></div></a></div></div>' +
    '<div class="side-card" data-reveal><h3>Contact presse</h3><p style="font-size:.9rem;color:var(--text-soft)">Service communication<br><a class="link" href="mailto:presse@ville-portgentil.ga">presse@ville-portgentil.ga</a></p></div>';

  /* Précédent / suivant */
  var prev = PG.news[idx - 1], next = PG.news[idx + 1];
  $('prevnext').innerHTML = (prev ? '<a href="article.html?id=' + prev.id + '" data-reveal><small>' + I('arrow-left', 'i--sm') + 'Plus récent</small><strong>' + prev.title + '</strong></a>' : '<span></span>') +
    (next ? '<a href="article.html?id=' + next.id + '" data-reveal><small>Plus ancien ' + I('arrow-right', 'i--sm') + '</small><strong>' + next.title + '</strong></a>' : '');

  /* Articles liés */
  var rel = PG.news.filter(function (o) { return o.id !== n.id && o.cat === n.cat; });
  rel = rel.concat(PG.news.filter(function (o) { return o.id !== n.id && o.cat !== n.cat; })).slice(0, 3);
  $('related').innerHTML = rel.map(PG.tpl.newsCard).join('');

  /* Partage */
  var url = encodeURIComponent(location.href), txt = encodeURIComponent(n.title);
  $('share-fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  $('share-wa').href = 'https://wa.me/?text=' + txt + '%20' + url;
  $('share-link').addEventListener('click', function () {
    var done = function () { PG.toast('Lien copié dans le presse-papiers.'); };
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done();
  });
  document.addEventListener('click', function (e) { if (e.target.closest('[data-dl]')) { e.preventDefault(); PG.toast('Prototype : le fichier sera disponible dans la version définitive.'); } });

  /* Barre de lecture */
  var bar = $('read-bar'), art = document.querySelector('article');
  window.addEventListener('scroll', function () {
    var r = art.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    bar.style.width = (p * 100) + '%';
  }, { passive: true });

  /* Visionneuse */
  var lb = $('lightbox');
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.gallery img');
    if (img) { lb.querySelector('img').src = img.getAttribute('data-full'); lb.querySelector('img').alt = img.alt; lb.classList.add('is-open'); return; }
    if (e.target.closest('#lightbox')) lb.classList.remove('is-open');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('is-open'); });
})();
