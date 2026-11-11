# Mairie de Port-Gentil — Prototype statique (V1 de validation)

Site HTML / CSS / JavaScript sans framework, destiné à faire valider le design, les contenus et les parcours avant la version définitive (CMS).

## Ouvrir le site
- Double-cliquer sur `index.html` : tout fonctionne sans serveur.
- Une connexion Internet est nécessaire pour les polices (Google Fonts) et les fonds de carte.
- Mise en ligne pour la mairie : déposer le dossier `site/` sur Netlify, GitHub Pages ou tout hébergement statique.

## Pages
| Fichier | Contenu |
|---|---|
| `index.html` | Accueil |
| `ville.html` | Ma Ville : présentation, histoire, territoire, économie, art de vivre, sites |
| `mairie.html` | Le Maire, adjoints, conseil, directions, transparence, fonctionnement |
| `services.html` | Démarches, parcours de vie, catalogue, services en ligne, suivi de dossier |
| `demarche.html?id=…` | Fiche démarche (générée depuis les données) |
| `actions.html` | Carte des projets, travaux, grands projets, budget, participation |
| `actualites.html` / `article.html?id=…` | Actualités, avis, médiathèque, presse, article |
| `agenda.html` | Agenda liste / calendrier, export .ics |
| `contact.html` | Écrire, rendez-vous, signalement, demande de document, plan |
| `mentions-legales.html`, `404.html` | Pages légales et page d'erreur |

## Structure
```
assets/css/main.css      design system (couleurs, typo, composants, en-tête, pied de page)
assets/css/home.css      accueil (+ blocs réutilisés)
assets/css/pages.css     pages intérieures
assets/js/data.js        TOUS les contenus (actualités, agenda, projets, démarches) — simule le futur CMS
assets/js/layout.js      en-tête, méga-menu, menu mobile, recherche, pied de page, formulaires
assets/js/anim.js        animations (GSAP, ScrollTrigger, Lenis) — désactivées si « réduire les animations »
assets/js/icons.js       icônes SVG + emblème provisoire
assets/js/pages/*.js     comportements propres à chaque page
assets/img/              images WebP (grande taille + version -sm)
assets/vendor/           GSAP, ScrollTrigger, Lenis, Leaflet (copies locales)
```
Les images d'origine (JPG/PNG) sont dans `../_sources/images`.

## À valider / fournir par la Mairie
- Portrait officiel du Maire, noms des adjoints et responsables de directions.
- Armoiries officielles (l'emblème « phare » est provisoire).
- Téléphones, e-mails, adresses, horaires, numéros d'urgence.
- Découpage et quartiers des 4 arrondissements, adresses des mairies annexes.
- Liste réelle des démarches : pièces, délais, tarifs.
- Chiffres, budget, projets et chronologie historique.
- Vraies photos et vidéos (celles du prototype sont des illustrations générées).
- Textes du mot du Maire et pages légales (service juridique).

## Simulé dans ce prototype
Envoi des formulaires, suivi de dossier, téléchargements PDF, lecteur vidéo, inscriptions aux événements. L'export « Ajouter à mon agenda » (.ics), la recherche, les filtres, la carte et la géolocalisation fonctionnent réellement.
