/* Page Agenda : liste groupée par mois, calendrier, export .ics */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;
  var anim = function () { return window.gsap && document.documentElement.classList.contains('anim'); };
  var events = PG.events.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  var cats = ['Tous'].concat(events.map(function (e) { return e.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  var st = { cat: 'Tous', view: 'list', month: new Date(2026, 9, 1) };

  $('ev-cats').innerHTML = cats.map(function (c, i) { return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-c="' + c + '">' + c + '</button>'; }).join('');
  function filtered() { return events.filter(function (e) { return st.cat === 'Tous' || e.cat === st.cat; }); }

  function row(e) {
    var d = PG.parseDate(e.date);
    return '<article class="event" id="' + e.id + '">' +
      '<div class="event__date"><div><div class="event__day">' + d.getDate() + '</div><div class="event__month">' + PG.monthsShort[d.getMonth()] + '</div></div></div>' +
      '<div><span class="tag">' + e.cat + '</span><h3 class="event__title" style="margin-top:.6rem">' + e.title + '</h3>' +
      '<div class="event__meta"><span>' + I('clock', 'i--sm') + e.time + '</span><span>' + I('map-pin', 'i--sm') + e.place + '</span></div>' +
      '<div class="event__actions"><button class="btn btn--sm" type="button" data-ics="' + e.id + '">' + I('calendar-plus') + 'Ajouter à mon agenda</button>' +
      '<button class="btn btn--ghost btn--sm" type="button" data-cta="' + e.id + '">' + e.cta + '</button></div></div></article>';
  }
  function renderList() {
    var groups = {};
    filtered().forEach(function (e) { var d = PG.parseDate(e.date), k = PG.months[d.getMonth()] + ' ' + d.getFullYear(); (groups[k] = groups[k] || []).push(e); });
    $('view-list').innerHTML = Object.keys(groups).map(function (k) {
      return '<div class="month-group"><h3 style="text-transform:capitalize">' + k + '</h3><div class="agenda__list">' + groups[k].map(row).join('') + '</div></div>';
    }).join('') || '<p class="empty">Aucun événement dans cette catégorie.</p>';
    if (anim()) gsap.fromTo('#view-list .event, #view-list h3', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, stagger: .05, ease: 'expo.out' });
  }
  function renderCal() {
    var m = st.month, y = m.getFullYear(), mo = m.getMonth();
    $('cal-title').textContent = PG.months[mo] + ' ' + y;
    var first = new Date(y, mo, 1), start = (first.getDay() + 6) % 7, days = new Date(y, mo + 1, 0).getDate();
    var today = new Date(), html = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(function (d) { return '<div class="calendar__dow">' + d + '</div>'; }).join('');
    var cells = Math.ceil((start + days) / 7) * 7;
    for (var c = 0; c < cells; c++) {
      var date = new Date(y, mo, c - start + 1), out = date.getMonth() !== mo;
      var iso = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      var evs = filtered().filter(function (e) { return e.date === iso || (e.end && iso > e.date && iso <= e.end); });
      var isToday = date.toDateString() === today.toDateString();
      html += '<div class="calendar__day' + (out ? ' is-out' : '') + (isToday ? ' is-today' : '') + '"><span class="calendar__num">' + date.getDate() + '</span>' +
        evs.map(function (e) { return '<a class="calendar__ev" href="#' + e.id + '" data-goto="' + e.id + '" title="' + PG.esc(e.title) + '">' + e.title + '</a>'; }).join('') + '</div>';
    }
    $('cal-grid').innerHTML = html;
  }
  function render() { if (st.view === 'list') renderList(); else renderCal(); if (window.ScrollTrigger) ScrollTrigger.refresh(); }

  $('ev-cats').addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (!b) return; st.cat = b.getAttribute('data-c'); this.querySelectorAll('[data-c]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); render(); });
  document.querySelectorAll('[data-view]').forEach(function (b) {
    b.addEventListener('click', function () {
      st.view = b.getAttribute('data-view');
      document.querySelectorAll('[data-view]').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      $('view-list').hidden = st.view !== 'list'; $('view-cal').hidden = st.view !== 'cal';
      render();
    });
  });
  $('cal-prev').addEventListener('click', function () { st.month = new Date(st.month.getFullYear(), st.month.getMonth() - 1, 1); renderCal(); });
  $('cal-next').addEventListener('click', function () { st.month = new Date(st.month.getFullYear(), st.month.getMonth() + 1, 1); renderCal(); });
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-goto]');
    if (g) { e.preventDefault(); e.stopPropagation(); document.querySelector('[data-view="list"]').click(); setTimeout(function () { PG.scrollTo(document.getElementById(g.getAttribute('data-goto'))); }, 100); }
  }, true);

  /* Export .ics (fonctionne réellement) */
  function ics(e) {
    var d = e.date.replace(/-/g, ''), end = (e.end || e.date).replace(/-/g, '');
    var m = /(\d+) h (\d+)/.exec(e.time), body;
    if (m) {
      var hh = String(m[1]).padStart(2, '0'), mm = m[2];
      body = 'DTSTART;TZID=Africa/Libreville:' + d + 'T' + hh + mm + '00\r\nDURATION:PT2H';
    } else {
      var next = PG.parseDate(e.end || e.date); next.setDate(next.getDate() + 1);
      body = 'DTSTART;VALUE=DATE:' + d + '\r\nDTEND;VALUE=DATE:' + next.getFullYear() + String(next.getMonth() + 1).padStart(2, '0') + String(next.getDate()).padStart(2, '0');
    }
    return 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Mairie de Port-Gentil//Agenda//FR\r\nBEGIN:VEVENT\r\nUID:' + e.id + '@ville-portgentil.ga\r\nDTSTAMP:20261011T000000Z\r\n' + body +
      '\r\nSUMMARY:' + e.title + '\r\nLOCATION:' + e.place + ', Port-Gentil\r\nEND:VEVENT\r\nEND:VCALENDAR';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ics]');
    if (b) {
      var ev = PG.find(PG.events, b.getAttribute('data-ics'));
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([ics(ev)], { type: 'text/calendar;charset=utf-8' }));
      a.download = ev.id + '.ics'; document.body.appendChild(a); a.click(); a.remove();
      PG.toast('Événement ajouté : ouvrez le fichier pour l\'enregistrer dans votre agenda.');
      return;
    }
    var c = e.target.closest('[data-cta]');
    if (c) PG.toast('Prototype : l\'inscription sera disponible dans la version définitive.');
  });

  render();
})();
