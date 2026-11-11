/* =========================================================================
   Gabarit commun : en-tête, méga-menu, tiroir mobile, recherche, pied de page,
   gabarits de cartes, formulaires, retour en haut, badge prototype.
   ========================================================================= */
(function () {
  var I = PG.icon, S = PG.site, page = document.body.getAttribute('data-page') || '';

  /* ---------- Navigation ---------- */
  PG.nav = [
    { id: 'ville', label: 'Ma Ville', href: 'ville.html', mega: {
      title: 'Île Mandji, capitale économique', text: 'Histoire, territoire, économie et art de vivre : découvrez la cité océane.',
      cta: ['Découvrir la ville', 'ville.html'], card: ['phare-cap-lopez', 'Les incontournables de l\'Île Mandji', 'ville.html#decouvrir'],
      links: [['Présentation', 'ville.html#presentation', 'Port-Gentil en un coup d\'œil', 'sparkle'], ['Histoire', 'ville.html#histoire', 'Du Cap Lopez à la métropole', 'lighthouse'], ['Territoire', 'ville.html#territoire', 'Les quatre arrondissements', 'map'], ['Économie', 'ville.html#economie', 'Pétrole, bois, économie bleue', 'chart'], ['Art de vivre', 'ville.html#culture', 'Culture, gastronomie, sports', 'music'], ['À découvrir', 'ville.html#decouvrir', 'Sites et paysages', 'map-pin']] } },
    { id: 'mairie', label: 'La Mairie', href: 'mairie.html', mega: {
      title: 'Votre Hôtel de Ville', text: 'Élus, conseil municipal, directions : comprendre qui fait quoi au service des habitants.',
      cta: ['Découvrir la Mairie', 'mairie.html'], card: ['hotel-de-ville-facade', 'Transparence & documents officiels', 'mairie.html#transparence'],
      links: [['Le Maire', 'mairie.html#le-maire', 'Mot du Maire et priorités', 'landmark'], ['La municipalité', 'mairie.html#municipalite', 'Les adjoints et leurs délégations', 'users'], ['Le Conseil municipal', 'mairie.html#conseil', 'Séances et délibérations', 'scale'], ['Les directions', 'mairie.html#directions', 'L\'organisation des services', 'building'], ['Instances citoyennes', 'mairie.html#instances', 'Comités de quartier', 'user-check'], ['Transparence', 'mairie.html#transparence', 'Arrêtés, budgets, rapports', 'file']] } },
    { id: 'services', label: 'Services', href: 'services.html', mega: {
      title: 'Vos démarches, simplement', text: 'Trouvez la bonne démarche, les pièces à fournir et faites votre demande en ligne.',
      cta: ['Tous les services', 'services.html'], card: ['guichet-accueil-services', 'Services 100 % en ligne', 'services.html#en-ligne'],
      links: [['Démarches fréquentes', 'services.html#frequentes', 'Les plus demandées', 'sparkle'], ['Par situation de vie', 'services.html#parcours', 'Naissance, mariage, entreprise…', 'heart'], ['Tous les services', 'services.html#catalogue', 'Le catalogue complet', 'grid'], ['Fiche démarche', 'demarche.html?id=acte-naissance', 'Exemple : acte de naissance', 'file'], ['Infos pratiques', 'services.html#pratique', 'Horaires et guichets', 'clock'], ['Signaler un problème', 'contact.html#signaler', 'Voirie, éclairage, déchets', 'alert']] } },
    { id: 'actions', label: 'Nos actions', href: 'actions.html', mega: {
      title: 'Port-Gentil se transforme', text: 'Suivez les chantiers, les grands projets et l\'utilisation du budget communal.',
      cta: ['Voir nos actions', 'actions.html'], card: ['apres-front-de-mer', 'Le nouveau front de mer', 'actions.html#grands-projets'],
      links: [['Carte des réalisations', 'actions.html#carte', 'Tous les projets sur la carte', 'map'], ['Travaux de proximité', 'actions.html#travaux', 'Quartier par quartier', 'hard-hat'], ['Grands projets', 'actions.html#grands-projets', 'Le Port-Gentil de demain', 'urbanisme'], ['Vie sociale & culturelle', 'actions.html#social', 'Jeunesse, santé, culture', 'heart'], ['Budget', 'actions.html#budget', 'Où vont les fonds publics', 'pie'], ['Participer', 'actions.html#participer', 'Proposer, signaler, s\'engager', 'users']] } },
    { id: 'actualites', label: 'Actualités', href: 'actualites.html', mega: {
      title: 'L\'info de votre ville', text: 'Communiqués, avis officiels, reportages et médiathèque municipale.',
      cta: ['Toutes les actualités', 'actualites.html'], card: ['regate-pirogues', '14e Régate côtière de Mandji', 'article.html?id=regate-mandji'],
      links: [['À la une', 'actualites.html#une', 'L\'essentiel du moment', 'sparkle'], ['Toutes les actualités', 'actualites.html#flux', 'Par thème et par quartier', 'newspaper'], ['Avis & communiqués', 'actualites.html#avis', 'Arrêtés et annonces légales', 'megaphone'], ['Médiathèque', 'actualites.html#mediatheque', 'Photos et vidéos', 'image'], ['Espace presse', 'actualites.html#presse', 'Kits et contacts médias', 'file'], ['Rester informé', 'actualites.html#alertes', 'Alertes et newsletter', 'bell']] } },
    { id: 'agenda', label: 'Agenda', href: 'agenda.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  /* ---------- Topbar + en-tête ---------- */
  function headerHTML() {
    var items = PG.nav.map(function (n, idx) {
      var cur = n.id === page ? ' aria-current="page"' : '';
      if (!n.mega) return '<li class="nav__item"><a class="nav__link" href="' + n.href + '"' + cur + '>' + n.label + '</a></li>';
      var m = n.mega;
      return '<li class="nav__item" data-mega>' +
        '<a class="nav__link" href="' + n.href + '"' + cur + ' aria-expanded="false" aria-controls="mega-' + idx + '">' + n.label + I('chevron-down') + '</a>' +
        '<div class="mega" id="mega-' + idx + '"><div class="container mega__inner">' +
          '<div class="mega__intro"><span class="eyebrow">' + n.label + '</span><h3>' + m.title + '</h3><p>' + m.text + '</p>' +
          '<a class="btn btn--sm" href="' + m.cta[1] + '">' + m.cta[0] + I('arrow-right', 'i--arrow') + '</a></div>' +
          '<div class="mega__links">' + m.links.map(function (l) {
            return '<a class="mega__link" href="' + l[1] + '">' + I(l[3]) + '<div><strong>' + l[0] + '</strong><span>' + l[2] + '</span></div></a>';
          }).join('') + '</div>' +
          '<a class="mega__card" href="' + m.card[2] + '"><img src="' + PG.img(m.card[0], true) + '" alt="" loading="lazy"><div><strong>' + m.card[1] + '</strong><span>Découvrir ' + I('arrow-right', 'i--sm') + '</span></div></a>' +
        '</div></div></li>';
    }).join('');

    return '<a class="skip-link" href="#main">Aller au contenu</a>' +
      '<div class="topbar"><div class="container">' +
        '<div class="topbar__left"><span class="topbar__hide-sm">République Gabonaise</span><span class="topbar__sep topbar__hide-md"></span><span class="topbar__hide-md">Province de l\'Ogooué-Maritime</span></div>' +
        '<div class="topbar__right">' +
          '<a class="topbar__urgent" href="contact.html#urgences"><span class="dot dot--live"></span>Urgences</a>' +
          '<a class="topbar__hide-sm" href="tel:' + S.phoneHref + '">' + I('phone', 'i--sm') + S.phone + '</a>' +
          '<a class="topbar__hide-md" href="' + S.social.facebook + '" target="_blank" rel="noopener">' + I('facebook', 'i--sm') + 'Facebook</a>' +
          '<a class="topbar__hide-md" href="mentions-legales.html#accessibilite">' + I('accessibility', 'i--sm') + 'Accessibilité</a>' +
        '</div></div></div>' +
      '<header class="site-header" id="site-header"><div class="container">' +
        '<a class="brand" href="index.html" aria-label="Mairie de Port-Gentil — accueil">' + PG.emblem() +
          '<span><span class="brand__name">Port-Gentil</span><span class="brand__sub">Mairie · Île Mandji</span></span></a>' +
        '<nav class="nav" aria-label="Navigation principale"><ul class="nav__list">' + items + '</ul></nav>' +
        '<div class="header__actions">' +
          '<button class="header__icon" type="button" data-search-open aria-label="Rechercher">' + I('search') + '</button>' +
          '<a class="btn btn--accent btn--sm header__cta" href="services.html#en-ligne">' + I('fingerprint') + 'E-Démarches</a>' +
          '<button class="header__icon header__burger" type="button" data-drawer-open aria-label="Ouvrir le menu">' + I('menu') + '</button>' +
        '</div></div></header>' +
      '<div class="mega-backdrop" aria-hidden="true"></div>';
  }

  function drawerHTML() {
    var items = [{ label: 'Accueil', href: 'index.html' }].concat(PG.nav).map(function (n, i) {
      if (!n.mega) return '<div class="drawer__item" style="--i:' + i + '"><a class="drawer__link" href="' + n.href + '">' + n.label + I('arrow-right') + '</a></div>';
      return '<div class="drawer__item" style="--i:' + i + '"><button class="drawer__link" type="button" aria-expanded="false">' + n.label + I('plus') + '</button>' +
        '<div class="drawer__sub"><div><a href="' + n.href + '"><strong>Vue d\'ensemble</strong></a>' +
        n.mega.links.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div></div></div>';
    }).join('');
    return '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<div class="drawer__head"><a class="brand" href="index.html">' + PG.emblem() + '<span><span class="brand__name">Port-Gentil</span><span class="brand__sub">Mairie · Île Mandji</span></span></a>' +
      '<button class="drawer__close" type="button" data-drawer-close aria-label="Fermer le menu">' + I('x') + '</button></div>' +
      '<div class="drawer__body" data-lenis-prevent>' + items + '</div>' +
      '<div class="drawer__foot" style="--i:9"><a class="btn btn--accent btn--block" href="services.html#en-ligne">' + I('fingerprint') + 'E-Démarches</a>' +
      '<a class="btn btn--ghost-light btn--block" href="tel:' + S.phoneHref + '">' + I('phone') + S.phone + '</a></div></div>';
  }

  function searchHTML() {
    return '<div class="search" id="search" role="dialog" aria-modal="true" aria-label="Recherche">' +
      '<div class="search__panel"><div class="container">' +
      '<div class="search__bar">' + I('search') + '<input class="search__input" type="search" placeholder="Une démarche, une actualité, un projet…" aria-label="Rechercher sur le site" autocomplete="off">' +
      '<button class="icon-btn" type="button" data-search-close aria-label="Fermer la recherche">' + I('x') + '</button></div></div>' +
      '<div class="search__results" data-lenis-prevent><div class="container" id="search-results"></div></div></div></div>';
  }

  function footerHTML() {
    return '<section class="footer-cta" aria-label="Contacter la mairie">' +
      '<svg class="footer-cta__waves" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true"><path fill="#fff" d="M0 224l60-21c60-22 180-64 300-64s240 42 360 48 240-26 360-42 240-16 300-16h60v191H0z"/><path fill="#fff" opacity=".5" d="M0 160l80 16c80 16 240 48 400 48s320-32 480-37 320 15 400 26l80 11v96H0z"/></svg>' +
      '<div class="container footer-cta__inner"><div><h2 data-split>Une question, une démarche ? Nos agents vous répondent.</h2>' +
      '<p>Du lundi au vendredi, de 7 h 30 à 15 h 30, à l\'Hôtel de Ville et dans les mairies d\'arrondissement.</p></div>' +
      '<div class="footer-cta__actions"><a class="btn btn--white" href="contact.html">' + I('mail') + 'Contacter la mairie</a>' +
      '<a class="btn btn--ghost-light" href="contact.html#rendez-vous">' + I('calendar') + 'Prendre rendez-vous</a></div></div></section>' +
      '<footer class="site-footer"><div class="footer__flag"></div><div class="container">' +
      '<div class="footer__main">' +
        '<div class="footer__brand"><a class="brand" href="index.html">' + PG.emblem() + '<span><span class="brand__name">Port-Gentil</span><span class="brand__sub">Mairie · Île Mandji</span></span></a>' +
        '<p>Site officiel de la Commune de Port-Gentil, capitale économique du Gabon et chef-lieu de la province de l\'Ogooué-Maritime.</p>' +
        '<div class="footer__social"><a href="' + S.social.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + I('facebook') + '</a><a href="' + S.social.youtube + '" aria-label="YouTube">' + I('youtube') + '</a><a href="' + S.social.whatsapp + '" aria-label="WhatsApp">' + I('whatsapp') + '</a></div></div>' +
        '<div><h3 class="footer__title">Démarches</h3><ul class="footer__list">' +
          [['Acte de naissance', 'demarche.html?id=acte-naissance'], ['Mariage', 'demarche.html?id=mariage'], ['Légalisation', 'demarche.html?id=legalisation'], ['Permis de construire', 'demarche.html?id=permis-construire'], ['Patente & marchés', 'demarche.html?id=patente'], ['Signaler un problème', 'contact.html#signaler']]
          .map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join('') + '</ul></div>' +
        '<div><h3 class="footer__title">La Ville</h3><ul class="footer__list">' +
          [['Ma Ville', 'ville.html'], ['La Mairie', 'mairie.html'], ['Nos actions', 'actions.html'], ['Actualités', 'actualites.html'], ['Agenda', 'agenda.html'], ['Les arrondissements', 'ville.html#territoire']]
          .map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join('') + '</ul></div>' +
        '<div><h3 class="footer__title">Nous trouver</h3><ul class="footer__contact">' +
          '<li>' + I('map-pin') + '<span>' + S.address.join('<br>') + '</span></li>' +
          '<li>' + I('phone') + '<a href="tel:' + S.phoneHref + '">' + S.phone + '</a></li>' +
          '<li>' + I('clock') + '<span>Lun – Ven : 7 h 30 – 15 h 30</span></li></ul>' +
          '<div class="footer__news"><h3 class="footer__title" style="margin:0">Lettre d\'information</h3>' +
          '<form data-newsletter><input type="email" placeholder="Votre adresse e-mail" aria-label="Adresse e-mail" required><button type="submit" aria-label="S\'abonner">' + I('send') + '</button></form></div></div>' +
      '</div>' +
      '<div class="footer__bottom"><span>© 2026 Mairie de Port-Gentil — République Gabonaise</span><ul>' +
        '<li><a href="mentions-legales.html">Mentions légales</a></li><li><a href="mentions-legales.html#donnees">Données personnelles</a></li><li><a href="mentions-legales.html#accessibilite">Accessibilité</a></li><li><a href="mentions-legales.html#plan">Plan du site</a></li></ul></div>' +
      '</div><div class="footer__giant" aria-hidden="true">Port-Gentil</div></footer>';
  }

  /* ---------- Gabarits réutilisables ---------- */
  PG.tpl = {
    newsCard: function (n) {
      return '<article class="card" data-reveal>' +
        '<div class="card__media"><img src="' + PG.img(n.img, true) + '" alt="" loading="lazy"><span class="tag tag--glass">' + n.cat + '</span></div>' +
        '<div class="card__body"><div class="card__meta"><span>' + I('calendar', 'i--sm') + PG.fmtDate(n.date) + '</span><span>' + I('clock', 'i--sm') + n.read + ' min</span></div>' +
        '<h3 class="card__title"><a href="article.html?id=' + n.id + '">' + n.title + '</a></h3>' +
        '<p class="card__excerpt">' + n.excerpt + '</p>' +
        '<div class="card__foot"><span class="card__more">Lire l\'article ' + I('arrow-right', 'i--sm') + '</span></div></div></article>';
    },
    eventRow: function (e) {
      var d = PG.parseDate(e.date);
      return '<article class="event" data-reveal>' +
        '<div class="event__date"><div><div class="event__day">' + d.getDate() + '</div><div class="event__month">' + PG.monthsShort[d.getMonth()] + '</div></div></div>' +
        '<div><span class="tag">' + e.cat + '</span><h3 class="event__title" style="margin-top:.6rem"><a href="agenda.html#' + e.id + '">' + e.title + '</a></h3>' +
        '<div class="event__meta"><span>' + I('clock', 'i--sm') + e.time + '</span><span>' + I('map-pin', 'i--sm') + e.place + '</span></div></div>' +
        '<span class="event__go">' + I('arrow-right') + '</span></article>';
    },
    projectCard: function (p) {
      return '<article class="card project" data-reveal>' +
        '<div class="card__media"><img src="' + PG.img(p.img, true) + '" alt="" loading="lazy"><span class="tag tag--glass">' + p.cat + '</span></div>' +
        '<div class="card__body"><div class="card__meta"><span>' + I('map-pin', 'i--sm') + p.arr + '</span><span>' + I('calendar', 'i--sm') + 'Fin : ' + p.end + '</span></div>' +
        '<h3 class="card__title"><a href="actions.html#' + p.id + '">' + p.title + '</a></h3>' +
        '<div class="project__progress"><div class="project__row"><span>Avancement</span><strong data-count="' + p.progress + '" data-suffix=" %">' + p.progress + ' %</strong></div>' +
        '<div class="progress"><div class="progress__bar" data-progress style="--value:' + p.progress + '%"></div></div></div>' +
        '<div class="card__foot"><span class="muted" style="font-size:.85rem">Budget : <strong style="color:var(--navy-900)">' + p.budget + '</strong></span><span class="card__more">Détails ' + I('arrow-right', 'i--sm') + '</span></div></div></article>';
    },
    demarcheTile: function (d) {
      return '<a class="tile" href="demarche.html?id=' + d.id + '" data-reveal>' +
        '<span class="tile__icon">' + I(d.icon) + '</span>' + I('arrow-up-right', 'tile__arrow') +
        '<span class="tile__title">' + d.title + '</span><span class="tile__text">' + d.desc + '</span>' +
        '<span class="tile__meta">' + I('clock', 'i--sm') + d.delay + (d.online ? '<span class="tile__online">En ligne</span>' : '') + '</span></a>';
    }
  };

  /* ---------- Injection ---------- */
  var headSlot = document.getElementById('site-top');
  var footSlot = document.getElementById('site-bottom');
  if (headSlot) headSlot.outerHTML = headerHTML();
  if (footSlot) footSlot.outerHTML = footerHTML();
  document.body.insertAdjacentHTML('beforeend', drawerHTML() + searchHTML() +
    '<button class="to-top" type="button" aria-label="Revenir en haut de page"><svg class="ring" viewBox="0 0 62 62" aria-hidden="true"><circle cx="31" cy="31" r="29"/></svg>' + I('arrow-up') + '</button>' +
    '<div class="proto-badge" hidden><span class="dot"></span>Prototype — contenus à valider<button type="button" aria-label="Masquer">' + I('x', 'i--sm') + '</button></div>' +
    '<div class="toast" role="status" aria-live="polite">' + I('check') + '<span></span></div>');

  var header = document.getElementById('site-header');
  var backdrop = document.querySelector('.mega-backdrop');

  /* ---------- Comportement de l'en-tête au défilement ---------- */
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY, anyOpen = header.classList.contains('is-open');
    header.classList.toggle('is-scrolled', y > 24);
    if (!anyOpen) {
      if (y > lastY + 4 && y > 420) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 420) header.classList.remove('is-hidden');
    }
    document.body.classList.toggle('header-visible', !header.classList.contains('is-hidden') && y > 24);
    lastY = y;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    toTop.style.setProperty('--p', max > 0 ? Math.min(y / max, 1) : 0);
    toTop.classList.toggle('is-visible', y > 900);
    ticking = false;
  }
  var toTop = document.querySelector('.to-top');
  window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { PG.scrollTo(0); });

  PG.scrollTo = function (target) {
    if (PG.lenis) PG.lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -110, duration: 1.4 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else { var el = typeof target === 'string' ? document.querySelector(target) : target; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' }); }
  };

  /* Ancres internes : défilement doux */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (!a) return;
    var url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
    var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    closeAll();
    PG.scrollTo(target);
    history.replaceState(null, '', url.hash);
  });

  /* ---------- Méga-menu ---------- */
  var openTimer, closeTimer;
  function openMega(item) {
    document.querySelectorAll('.nav__item.is-open').forEach(function (o) { if (o !== item) { o.classList.remove('is-open'); o.querySelector('.nav__link').setAttribute('aria-expanded', 'false'); } });
    item.classList.add('is-open'); item.querySelector('.nav__link').setAttribute('aria-expanded', 'true');
    header.classList.add('is-open'); backdrop.classList.add('is-visible');
  }
  function closeMega() {
    document.querySelectorAll('.nav__item.is-open').forEach(function (o) { o.classList.remove('is-open'); o.querySelector('.nav__link').setAttribute('aria-expanded', 'false'); });
    header.classList.remove('is-open'); backdrop.classList.remove('is-visible');
  }
  document.querySelectorAll('[data-mega]').forEach(function (item) {
    item.addEventListener('mouseenter', function () { clearTimeout(closeTimer); openTimer = setTimeout(function () { openMega(item); }, 90); });
    item.addEventListener('mouseleave', function () { clearTimeout(openTimer); closeTimer = setTimeout(closeMega, 180); });
    item.querySelector('.nav__link').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); openMega(item); var f = item.querySelector('.mega a'); if (f) f.focus(); }
    });
    item.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) { closeTimer = setTimeout(closeMega, 50); } });
  });
  backdrop.addEventListener('click', closeMega);

  /* ---------- Tiroir mobile ---------- */
  var drawer = document.getElementById('drawer');
  function openDrawer() { drawer.classList.add('is-open'); document.documentElement.style.overflow = 'hidden'; if (PG.lenis) PG.lenis.stop(); setTimeout(function () { drawer.querySelector('.drawer__close').focus(); }, 400); }
  function closeDrawer() { drawer.classList.remove('is-open'); document.documentElement.style.overflow = ''; if (PG.lenis) PG.lenis.start(); }
  document.querySelector('[data-drawer-open]').addEventListener('click', openDrawer);
  drawer.querySelector('[data-drawer-close]').addEventListener('click', closeDrawer);
  drawer.querySelectorAll('button.drawer__link').forEach(function (b) {
    b.addEventListener('click', function () { var it = b.parentElement, o = !it.classList.contains('is-open'); it.classList.toggle('is-open', o); b.setAttribute('aria-expanded', o); });
  });

  /* ---------- Recherche instantanée ---------- */
  var search = document.getElementById('search'), sInput = search.querySelector('input'), sOut = document.getElementById('search-results');
  var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  var index = [].concat(
    PG.demarches.map(function (d) { return { g: 'Démarches', t: d.title, s: d.desc, h: 'demarche.html?id=' + d.id, i: d.icon }; }),
    PG.news.map(function (n) { return { g: 'Actualités', t: n.title, s: n.cat + ' · ' + PG.fmtDate(n.date), h: 'article.html?id=' + n.id, i: 'newspaper' }; }),
    PG.events.map(function (e) { return { g: 'Agenda', t: e.title, s: PG.fmtDate(e.date) + ' · ' + e.place, h: 'agenda.html#' + e.id, i: 'calendar' }; }),
    PG.projects.map(function (p) { return { g: 'Projets', t: p.title, s: p.cat + ' · ' + p.arr, h: 'actions.html#' + p.id, i: 'hard-hat' }; }),
    PG.nav.map(function (n) { return { g: 'Pages', t: n.label, s: n.mega ? n.mega.text : '', h: n.href, i: 'arrow-right' }; })
  );
  function hl(text, q) {
    if (!q) return text;
    var nt = norm(text), i = nt.indexOf(q);
    return i < 0 ? text : text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
  }
  function renderSearch() {
    var q = norm(sInput.value.trim()), res;
    if (!q) res = index.filter(function (r) { return r.g === 'Démarches'; }).slice(0, 6).map(function (r) { return Object.assign({}, r, { g: 'Démarches les plus demandées' }); });
    else res = index.filter(function (r) { return norm(r.t + ' ' + r.s).indexOf(q) > -1; }).slice(0, 14);
    if (!res.length) { sOut.innerHTML = '<p class="search__empty">Aucun résultat pour « ' + PG.esc(sInput.value) + ' ». Essayez « naissance », « marché » ou « travaux ».</p>'; return; }
    var groups = {};
    res.forEach(function (r) { (groups[r.g] = groups[r.g] || []).push(r); });
    sOut.innerHTML = Object.keys(groups).map(function (g) {
      return '<div class="search__group"><h4>' + g + '</h4>' + groups[g].map(function (r) {
        return '<a class="search__item" href="' + r.h + '">' + I(r.i) + '<div><strong>' + hl(r.t, q) + '</strong><span>' + r.s + '</span></div></a>';
      }).join('') + '</div>';
    }).join('');
  }
  function openSearch() { search.classList.add('is-open'); renderSearch(); if (PG.lenis) PG.lenis.stop(); setTimeout(function () { sInput.focus(); }, 150); }
  function closeSearch() { search.classList.remove('is-open'); if (PG.lenis) PG.lenis.start(); }
  PG.openSearch = function (q) { if (q != null) sInput.value = q; openSearch(); };
  document.querySelectorAll('[data-search-open]').forEach(function (b) { b.addEventListener('click', function () { openSearch(); }); });
  search.querySelector('[data-search-close]').addEventListener('click', closeSearch);
  search.addEventListener('click', function (e) { if (e.target === search) closeSearch(); });
  sInput.addEventListener('input', renderSearch);

  function closeAll() { closeMega(); closeDrawer(); closeSearch(); }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName))) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Toast & formulaires ---------- */
  var toast = document.querySelector('.toast'), toastT;
  PG.toast = function (msg) { toast.querySelector('span').textContent = msg; toast.classList.add('is-visible'); clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove('is-visible'); }, 4200); };

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.matches('[data-newsletter]')) { e.preventDefault(); PG.toast('Merci ! Vous recevrez bientôt la lettre d\'information de la ville.'); f.reset(); return; }
    if (!f.matches('[data-form]')) return;
    e.preventDefault();
    var ok = true, first = null;
    f.querySelectorAll('.field').forEach(function (fd) {
      var input = fd.querySelector('input, select, textarea');
      if (!input) return;
      var valid = input.checkValidity();
      fd.classList.toggle('is-invalid', !valid);
      if (!valid) { ok = false; first = first || input; }
    });
    if (!ok) { first.focus(); return; }
    var ref = 'PG-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 89999);
    var success = f.parentElement.querySelector('.form-success');
    if (success) {
      var r = success.querySelector('[data-ref]'); if (r) r.textContent = ref;
      f.hidden = true; success.hidden = false;
      if (window.gsap) gsap.from(success, { opacity: 0, y: 30, duration: .8, ease: 'expo.out' });
    }
    PG.toast(f.getAttribute('data-form') || 'Votre demande a bien été transmise.');
  });
  document.addEventListener('input', function (e) { var fd = e.target.closest('.field.is-invalid'); if (fd && e.target.checkValidity()) fd.classList.remove('is-invalid'); });

  /* ---------- Effet « lumière » au survol des tuiles ---------- */
  document.addEventListener('pointermove', function (e) {
    var t = e.target.closest && e.target.closest('.tile');
    if (!t) return;
    var r = t.getBoundingClientRect();
    t.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    t.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });

  /* ---------- Badge prototype ---------- */
  var badge = document.querySelector('.proto-badge');
  try { if (!sessionStorage.getItem('pg-proto-hidden')) badge.hidden = false; } catch (err) { badge.hidden = false; }
  badge.querySelector('button').addEventListener('click', function () { badge.hidden = true; try { sessionStorage.setItem('pg-proto-hidden', '1'); } catch (err) {} });

  /* ---------- Paramètre d'URL ---------- */
  PG.param = function (k) { return new URLSearchParams(location.search).get(k); };

  /* ---------- Accordéons (délégation : fonctionne aussi pour le contenu injecté) ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.acc__btn');
    if (!b) return;
    var acc = b.closest('.acc'), open = !acc.classList.contains('is-open');
    if (b.closest('[data-acc-single]')) b.closest('[data-acc-single]').querySelectorAll('.acc.is-open').forEach(function (o) { o.classList.remove('is-open'); o.querySelector('.acc__btn').setAttribute('aria-expanded', 'false'); });
    acc.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
    if (window.ScrollTrigger) setTimeout(function () { ScrollTrigger.refresh(); }, 520);
  });
  PG.acc = function (q, a, open) {
    return '<div class="acc' + (open ? ' is-open' : '') + '"><button class="acc__btn" type="button" aria-expanded="' + !!open + '">' + q + '<span class="acc__icon" aria-hidden="true"></span></button><div class="acc__panel"><div><p>' + a + '</p></div></div></div>';
  };

  /* ---------- Sous-navigation : section active ---------- */
  var subLinks = document.querySelectorAll('.subnav__link[href^="#"]');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (l) { var s = document.getElementById(l.getAttribute('href').slice(1)); if (s) map[s.id] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        subLinks.forEach(function (l) { l.classList.remove('is-active'); });
        var l = map[en.target.id]; if (!l) return;
        l.classList.add('is-active');
        var list = l.parentElement; list.scrollTo({ left: l.offsetLeft - list.clientWidth / 2 + l.clientWidth / 2, behavior: 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
