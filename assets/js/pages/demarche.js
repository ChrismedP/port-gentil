/* Fiche démarche générée à partir des données (demarche.html?id=...) */
(function () {
  var $ = function (id) { return document.getElementById(id); }, I = PG.icon;
  var d = PG.find(PG.demarches, PG.param('id')) || PG.demarches[0];
  var cat = PG.find(PG.serviceCats, d.cat);

  /* Contenu détaillé : l'acte de naissance sert de modèle complet, les autres reçoivent un contenu type */
  var details = {
    'acte-naissance': {
      lead: 'Copie intégrale ou extrait avec filiation de votre acte de naissance, pour un dossier administratif, scolaire, un passeport ou un mariage.',
      cost: 'Selon barème municipal', where: 'Hôtel de Ville — service de l\'état civil, ou mairie d\'arrondissement du lieu de naissance',
      steps: [['Préparez vos pièces', 'Vérifiez la liste ci-dessous : votre pièce d\'identité et les références de l\'acte (date et lieu de naissance).'], ['Faites votre demande', 'En ligne depuis ce site, ou au guichet de l\'état civil. Un numéro de dossier vous est remis.'], ['Recherche et vérification', 'L\'agent retrouve l\'acte dans les registres et vérifie votre identité.'], ['Retrait du document', 'Vous êtes prévenu par SMS. Le document est remis au guichet sur présentation de votre numéro.']],
      docs: ['Pièce d\'identité originale en cours de validité (CNI gabonaise ou passeport)', 'Références de l\'acte : nom, prénoms, date et lieu de naissance, noms des parents', 'Procuration légalisée et pièce d\'identité du mandataire (si demande pour un tiers)', 'Livret de famille ou jugement supplétif, le cas échéant'],
      faq: [['Quelle différence entre copie intégrale et extrait ?', 'La copie intégrale reproduit l\'ensemble de l\'acte et ses mentions marginales. L\'extrait avec filiation reprend les informations essentielles, dont l\'identité des parents.'], ['Mon acte comporte une erreur, que faire ?', 'Une rectification est possible auprès du service de l\'état civil, sur présentation des justificatifs. Certaines corrections nécessitent une décision du tribunal.'], ['Je suis né(e) dans une autre commune', 'La demande doit être adressée à la mairie du lieu de naissance. Nos agents peuvent vous orienter.']]
    }
  };
  var x = details[d.id] || {
    lead: d.desc + ' Retrouvez ci-dessous les étapes, les pièces à fournir et les informations utiles.',
    cost: 'Selon barème municipal', where: 'Hôtel de Ville — ' + (cat ? cat.label.toLowerCase() : 'accueil'),
    steps: [['Préparez votre dossier', 'Rassemblez les pièces justificatives listées ci-dessous.'], ['Déposez votre demande', d.online ? 'En ligne depuis ce site ou au guichet du service concerné.' : 'Au guichet du service concerné, aux heures d\'ouverture.'], ['Instruction', 'Le service vérifie votre dossier et peut vous contacter pour un complément.'], ['Réponse', 'Vous êtes informé de la décision ou de la mise à disposition du document.']],
    docs: ['Pièce d\'identité en cours de validité', 'Justificatif de domicile de moins de trois mois', 'Formulaire de demande complété', 'Tout document spécifique demandé par le service'],
    faq: [['Puis-je faire cette démarche pour un tiers ?', 'Oui, avec une procuration légalisée et les pièces d\'identité du demandeur et du mandataire.'], ['Combien de temps faut-il compter ?', 'Le délai indicatif est de ' + d.delay.toLowerCase() + ' à compter du dépôt d\'un dossier complet.']]
  };

  document.title = d.title + ' — Mairie de Port-Gentil';
  $('dem-cat-link').textContent = cat ? cat.label : 'Services';
  $('dem-icon').innerHTML = I(d.icon);
  $('dem-tags').innerHTML = '<span class="tag">' + (cat ? cat.label : '') + '</span>' + (d.online ? ' <span class="tag tag--green">Disponible en ligne</span>' : '');
  $('dem-title').textContent = d.title;
  $('dem-lead').textContent = x.lead;
  $('dem-facts').innerHTML = [['clock', 'Délai', d.delay], ['wallet', 'Coût', x.cost], ['map-pin', 'Où', 'Hôtel de Ville'], ['smartphone', 'En ligne', d.online ? 'Oui' : 'Au guichet']]
    .map(function (f) { return '<div class="fact">' + I(f[0]) + '<div><small>' + f[1] + '</small><strong>' + f[2] + '</strong></div></div>'; }).join('');
  $('dem-where').textContent = x.where;

  $('dem-steps').innerHTML = x.steps.map(function (s) { return '<div class="step"><div><h4>' + s[0] + '</h4><p>' + s[1] + '</p></div></div>'; }).join('');

  $('dem-docs').innerHTML = x.docs.map(function (t) { return '<label><input type="checkbox"><span class="box">' + I('check') + '</span><span>' + t + '</span></label>'; }).join('');
  function updChk() {
    var all = $('dem-docs').querySelectorAll('input'), n = $('dem-docs').querySelectorAll('input:checked').length;
    $('chk-count').textContent = n + ' / ' + all.length + ' pièces prêtes';
    $('chk-bar').style.setProperty('--value', (n / all.length * 100) + '%');
    if (n === all.length) PG.toast('Votre dossier est complet, vous pouvez faire votre demande !');
  }
  $('dem-docs').addEventListener('change', updChk); updChk();

  $('dem-faq').innerHTML = x.faq.map(function (q, i) { return PG.acc(q[0], q[1], i === 0); }).join('');

  $('dem-online-text').textContent = d.online ? 'Faites votre demande en ligne en quelques minutes et suivez son avancement.' : 'Cette démarche se fait au guichet. Prenez rendez-vous pour éviter l\'attente.';
  $('dem-actions').innerHTML = (d.online ? '<a class="btn btn--accent btn--block" href="contact.html?demarche=' + d.id + '#demande">' + I('fingerprint') + 'Faire la demande en ligne</a>' : '') +
    '<a class="btn btn--ghost-light btn--block" href="contact.html#rendez-vous">' + I('calendar') + 'Prendre rendez-vous</a>';

  $('dem-related').innerHTML = PG.demarches.filter(function (o) { return o.cat === d.cat && o.id !== d.id; }).slice(0, 4).map(function (o) {
    return '<a class="mega__link" href="demarche.html?id=' + o.id + '">' + I(o.icon) + '<div><strong>' + o.title + '</strong><span>' + o.delay + '</span></div></a>';
  }).join('') || '<p class="muted">Aucune démarche liée.</p>';

  document.getElementById('feedback').addEventListener('click', function (e) {
    if (!e.target.closest('[data-fb]')) return;
    this.innerHTML = '<strong>' + I('check') + ' Merci pour votre retour ! Il nous aide à améliorer nos services.</strong>';
  });
})();
