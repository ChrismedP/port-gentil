/* =========================================================================
   Animations — GSAP + ScrollTrigger + Lenis
   Attributs disponibles :
   data-reveal[="fade|left|right|scale|clip"]  apparition au défilement
   data-split                                  titre révélé mot à mot
   data-count="1234" [data-suffix] [data-decimals]  compteur animé
   data-progress                               jauge qui se remplit
   data-parallax="0.15"                        parallaxe verticale
   data-hscroll / data-hscroll-track           section horizontale épinglée
   data-magnetic                               bouton magnétique
   Respecte prefers-reduced-motion (classe html.anim absente).
   ========================================================================= */
(function () {
  var html = document.documentElement;
  window.PG_READY = true;

  /* Typographie française : espaces insécables avant ? ! : ; et dans les guillemets */
  (function typo(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      return /^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    var n;
    while ((n = w.nextNode())) {
      var t = n.nodeValue;
      if (!/[?!:;»«]/.test(t)) continue;
      n.nodeValue = t.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');
    }
  })(document.body);
  var curtain = document.querySelector('.curtain');

  if (!html.classList.contains('anim') || !window.gsap || !window.ScrollTrigger) {
    html.classList.remove('anim');
    if (PG.onReady) PG.onReady();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out', duration: 1.1 });

  /* ---------- Défilement doux ---------- */
  if (window.Lenis) {
    var lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    PG.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Découpe des titres en mots ---------- */
  function split(el) {
    if (el.classList.contains('is-split')) return el.querySelectorAll('.split-word > span');
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/([ \t\n\r]+)/).forEach(function (part) {
            if (!part) return;
            if (/^[ \t\n\r]+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'split-word';
            var inner = document.createElement('span'); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR' && !child.classList.contains('split-word')) {
          walk(child);
        }
      });
    })(el);
    el.classList.add('is-split');
    return el.querySelectorAll('.split-word > span');
  }

  /* ---------- Intro de page (après le rideau) ---------- */
  function heroIntro() {
    var tl = gsap.timeline();
    var hero = document.querySelector('[data-hero]');
    if (!hero) return tl;
    var media = hero.querySelector('[data-hero-media]');
    if (media) tl.fromTo(media, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0);
    hero.querySelectorAll('[data-split]').forEach(function (h, i) {
      tl.fromTo(split(h), { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.045 }, 0.15 + i * 0.15);
    });
    var items = hero.querySelectorAll('[data-hero-item]');
    if (items.length) tl.fromTo(items, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.55);
    return tl;
  }

  var intro = gsap.timeline({ onComplete: function () { if (PG.onReady) PG.onReady(); } });
  if (curtain) {
    intro.fromTo('.curtain__logo', { opacity: 0, scale: .7, rotate: -20 }, { opacity: 1, scale: 1, rotate: 0, duration: .5, ease: 'back.out(1.6)' })
      .to(curtain, { yPercent: -100, duration: .9, ease: 'expo.inOut' }, '+=.08')
      .set(curtain, { display: 'none' });
    intro.add(heroIntro(), '-=.5');
  } else intro.add(heroIntro());

  /* ---------- Apparitions au défilement ---------- */
  var heroEl = document.querySelector('[data-hero]');
  var outsideHero = function (el) { return !heroEl || !heroEl.contains(el); };

  ScrollTrigger.batch(gsap.utils.toArray('[data-reveal]:not([data-reveal="clip"])').filter(outsideHero), {
    start: 'top 90%', once: true,
    onEnter: function (batch) { gsap.to(batch, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.2, stagger: 0.09, overwrite: true }); }
  });

  gsap.utils.toArray('[data-reveal="clip"]').forEach(function (el) {
    var img = el.querySelector('img');
    var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.6, ease: 'expo.inOut' });
    if (img) tl.to(img, { scale: 1, duration: 2, ease: 'expo.out' }, 0);
  });

  gsap.utils.toArray('[data-split]').filter(outsideHero).forEach(function (h) {
    var words = split(h);
    gsap.fromTo(words, { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.035, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
  });

  /* ---------- Compteurs ---------- */
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var end = parseFloat(el.getAttribute('data-count')), dec = +(el.getAttribute('data-decimals') || 0);
    var suffix = el.getAttribute('data-suffix') || '', prefix = el.getAttribute('data-prefix') || '';
    var o = { v: 0 };
    var render = function () { el.textContent = prefix + o.v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; };
    render();
    gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', onUpdate: render, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });

  /* ---------- Jauges ---------- */
  gsap.utils.toArray('[data-progress]').forEach(function (el) {
    gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
  });

  /* ---------- Parallaxe ---------- */
  gsap.utils.toArray('[data-parallax]').forEach(function (el) {
    var v = parseFloat(el.getAttribute('data-parallax')) || 0.15;
    gsap.fromTo(el, { yPercent: -v * 50 }, { yPercent: v * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Section horizontale épinglée (desktop) ---------- */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', function () {
    gsap.utils.toArray('[data-hscroll]').forEach(function (sec) {
      var track = sec.querySelector('[data-hscroll-track]');
      if (!track) return;
      var dist = function () { return Math.max(0, track.scrollWidth - sec.clientWidth); };
      gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 }
      });
    });
  });

  /* ---------- Boutons magnétiques ---------- */
  if (matchMedia('(pointer: fine)').matches) {
    gsap.utils.toArray('[data-magnetic]').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1, .4)' }), yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1, .4)' });
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .3); yTo((e.clientY - r.top - r.height / 2) * .35); });
      el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  /* ---------- Transition de sortie entre pages ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.protocol !== location.protocol || url.host !== location.host) return;
    if (!/\.html$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    if (!curtain) return;
    e.preventDefault();
    gsap.set(curtain, { display: 'grid', yPercent: 100 });
    gsap.set('.curtain__logo', { opacity: 1, scale: 1, rotate: 0 });
    gsap.to(curtain, { yPercent: 0, duration: .7, ease: 'expo.inOut', onComplete: function () { location.href = a.href; } });
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted && curtain) gsap.set(curtain, { display: 'none' }); });

  /* Recalcul quand les images sont chargées */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  /* Ancre dans l'URL à l'arrivée */
  if (location.hash) {
    var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t) setTimeout(function () { PG.scrollTo(t); }, 1300);
  }

  PG.split = split;
})();
