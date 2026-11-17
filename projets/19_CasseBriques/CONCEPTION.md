# Casse-briques : document de conception du projet fil rouge

> Document de travail (pour l'enseignant). Il décrit le plan, l'avancement (§0) et la référence commune guides ↔ corrections (§12).

## 0. REPRISE RAPIDE (à lire en premier sur un autre ordinateur)

### État au 16/11/2026

| Élément | État |
|---|---|
| Cours (`cours/pages/*.html`) : ancres sur tous les titres, nouvelles sections (clavier, `localStorage`, minuteurs, animation canvas, `Math`, `some`/`find`) | ✅ fait |
| `corrections/etape_00.html` … `etape_13.html` (jeu complet à chaque étape, testés) | ✅ fait |
| `niveaux/niveaux.json` (3 niveaux, étape 12) | ✅ fait |
| `guides/css/guide.css`, `index.html` (sommaire élèves) | ✅ fait |
| `guides/etape_00.html` (**gabarit** des guides) | ✅ fait |
| `guides/etape_01.html` (validé) | ✅ fait |
| `guides/etape_02.html` … `etape_13.html` | 🟡 rédigés (17/11), **à relire** (pas ouverts dans un navigateur) |
| `README.md` du projet (cahier des charges, badges bonus) | ❌ à écrire |
| Liens `index.html` et navigation « Étape suivante » | ✅ fait (liens et ancres de cours vérifiés par script) |

⚠ **Rien n'est commité** : tout est non suivi / modifié dans git. Sur l'ordinateur actuel, faire `git add -A && git commit && git push` avant de changer de machine (ou copier le dossier). **Les corrections sont dans un dépôt public** : voir §6 avant de pousser (`.gitignore` ou branche privée).

### Prochaine tâche : rédiger `guides/etape_01.html` … `etape_13.html`

1. Copier `guides/etape_00.html` comme modèle (structure, classes CSS : `course-box`, `pseudo`, `substep`, `checklist`, `bonus-box`, `step-nav`, `<details>` pour les indices, `exercise-box`/`nota-bene-box` du cours).
2. Reprendre **exactement** les numéros de sous-étapes du tableau §12 (ex. 3.1, 3.2…). Ils doivent correspondre aux bannières `/* ══ N.k · … ══ */` de `corrections/etape_NN.html` (l'en-tête de chaque correction liste aussi les sous-étapes et les liens de cours à reprendre dans la boîte « Dans le cours »).
3. Règles de rédaction (voir §4 et §5) :
   - **jamais de code solution** dans un guide : seulement un exemple sur une notion *voisine* (portrait, voiture…), puis un bloc `<div class="pseudo">` décrivant ce qu'il faut faire, puis « À toi de jouer » ;
   - 1 à 2 indices repliés par sous-étape, du plus vague au plus précis ;
   - checklist de validation, erreurs fréquentes, missions bonus de l'étape (tableau §10) ;
   - classe débutante : prévoir un squelette à trous (`// TODO`) dans un `<details>` pour les étapes difficiles (6, 7, 9) ;
   - liens de cours : `../../../cours/pages/<page>.html#<ancre>` (ancres listées au §2 ; vérifier qu'elles existent).
4. Points d'attention propres à certaines étapes :
   - **2.4** : montrer volontairement la traînée (pas de `clearRect` encore), c'est ce qui motive l'étape 3 ;
   - **4** et **5.3** : l'ordre des `if / else if` compte (plafond, raquette, sol) ;
   - **5.4** : direction selon la zone de la raquette (3 zones : < 0,33 gauche, > 0,66 droite) ;
   - **9** : insister sur `this` ; erreur classique `requestAnimationFrame(this.boucle)` (à mettre dans « Erreurs fréquentes ») ; liste de briques plate + `some()` ;
   - **10** : un seul attribut `etat` (`menu`/`jeu`/`pause`/`fin`) remplace le booléen `enCours` ;
   - **12** : nécessite Live Server (`fetch`) ; le JSON est fourni ; dans le projet des élèves, il est à côté du HTML (`fetch('niveaux.json')`) alors que la correction utilise `../niveaux/niveaux.json` ;
   - **13** : fournir la structure (`Capsule`, objet `EFFETS`), faire coder 1 effet en guidé, laisser les autres au catalogue §10.
5. À chaque guide terminé : mettre à jour `index.html` (lien) et le lien « Étape suivante » du guide précédent.

### Vérifier le travail

- Servir le dépôt : `cd <racine du dépôt> && python3 -m http.server 8000`, puis ouvrir `http://localhost:8000/projets/19_CasseBriques/` (ou Live Server).
- Les corrections 0 à 11 s'ouvrent aussi en `file://` ; les 12 et 13 exigent un serveur.
- Vérifier les ancres de cours d'un guide : ouvrir chaque lien `…#ancre` et contrôler que l'élément existe (`document.querySelector('#ancre')`).
- Tests automatiques utilisés (jetés, non conservés) : Playwright (`playwright-core@1.47` si Node 18) avec Chromium, auto-jeu en appelant `mettreAJour()` en boucle (l'état global est accessible : variables à l'étape 8 et avant, objet `jeu` à partir de l'étape 9) pour vérifier victoire, défaite, pause, record, niveaux, effets.

### Décisions déjà prises (ne pas les rediscuter)

- Jeu : casse-briques ; guides HTML au style du cours ; élèves codent dans leur IDE avec l'extension *Live Server*.
- Deux classes de 12 h (une à l'aise, une débutante) : même guide, tronc commun jusqu'à l'étape 8 (jeu jouable), objets (9) guidés pour les débutants, étapes 12-13 et missions bonus pour les rapides.
- Pas de solution dans les guides : pseudo-code + indices ; corrections gardées par l'enseignant et dévoilées en séance.
- Dossier du projet : `projets/19_CasseBriques` (`17_DoodleJump` et `18_ChuckNorris` existent déjà).
- Pas de modules ES, scripts classiques ; collisions simples (centre de la balle).


## 1. Objectifs pédagogiques

- Faire pratiquer **tous les chapitres du cours** dans un seul projet cohérent, dans l'ordre du cours quand c'est possible.
- Livrer **un jeu jouable dès l'étape 8**, puis l'enrichir : la motivation reste forte même si un élève n'atteint pas la fin.
- Différencier **deux publics** (2 classes × 12 h) avec le même guide : tronc commun + parcours avancé.

## 2. Constat sur le cours existant

Le cours ne couvrait pas plusieurs notions nécessaires au jeu. Elles ont été **ajoutées au cours** (le guide du projet pointe donc toujours vers le cours, sans encadré « Nouveau ») :

| Notion ajoutée | Étape | Page du cours (ancre) |
|---|---|---|
| Événements `keydown` / `keyup`, `event.key`, état des touches, souris | 5 | `l_interactivite.html#evenements-clavier` |
| `localStorage`, `JSON.stringify` / `JSON.parse` | 11 | `l_interactivite.html#localstorage` |
| `setTimeout` / `setInterval` | 3 | `l_asynchronicite.html#minuteurs` |
| `fetch` d'un fichier local + Live Server | 12 | `l_asynchronicite.html#appels-ajax` (encadré) |
| `clearRect`, `requestAnimationFrame`, `cancelAnimationFrame` (+ démo animée et exercice) | 3 | `le_dessin_et_les_canvas.html#animer-un-dessin` |
| Objet `Math` (`random`, `floor`, `min`, `max`, `abs`) | 4, 5, bonus | `les_variables.html#objet-math` |
| `some`, `find`, `includes`, `forEach` | 7, 12 | `les_tableaux.html#cells52-1` |

**Ancres** : tous les titres (`h2`/`h3`/`h4`) des pages du cours ont maintenant un `id`. Les pages à base de cellules de code (`les_conditions`, `les_boucles`, `les_tableaux`) n'ont pas de titres : on y utilise les `id` des cellules (`#cells64`…), déjà présents.

| Besoin du projet | Lien (depuis `projets/19_CasseBriques/etapes/`, préfixe `../../../cours/pages/`) |
|---|---|
| Page HTML, `<script>`, console | `la_creation_d_une_page_web.html#anatomie-de-la-page-web`, `#objet-console` |
| `let` / `const`, nombres, `Math` | `les_variables.html#mot-cle-let`, `#mot-cle-const`, `#nombres`, `#objet-math` |
| Fonctions, flèches, callbacks | `les_fonctions.html#fonctions-nommees`, `#fonctions-flechees`, `#fonction-de-premiere-classe` |
| Tableaux 2D | `les_tableaux.html#cells44` (tableau imbriqué) |
| `filter`, `some`, `find`, `forEach` | `les_tableaux.html#cells53`, `#cells52-1` |
| `if` / `else`, `&&` / `\|\|` | `les_conditions.html#cells61`, `#cells62`, `#cells63` |
| `switch`, ternaire | `les_conditions.html#cells64`, `#cells65` |
| `for`, `for...of`, `while` | `les_boucles.html#cells68`, `#cells69`, `#cells71` |
| Classes, `extends`, `this` | `les_objets.html#heritage-et-prototypes`, `#attributs-et-methodes-statiques`, `#mot-cle-this` |
| Événements, DOM | `l_interactivite.html#gestionnaire-d-evenements`, `#evenements-clavier`, `#trouver-les-elements` |
| Canvas | `le_dessin_et_les_canvas.html#element-canvas`, `#rectangle`, `#arcs-de-cercle`, `#remplissage`, `#ecrire-du-texte`, `#animer-un-dessin` |
| Promesses, `fetch` | `l_asynchronicite.html#promesses`, `#appels-ajax` |

## 3. Plan des étapes (≈ 1 h chacune)

| # | Étape | Résultat visible | Chapitres du cours mobilisés |
|---|---|---|---|
| 0 | Mettre en place la page | Page HTML + `<canvas>` + `game.js` ; « Bonjour » dans la console | Création d'une page web (anatomie, `console`) |
| 1 | Dessiner le décor | Balle, raquette, fond dessinés | Canvas (rectangle, arc, remplissage), Variables |
| 2 | L'état du jeu | La balle se déplace d'un pas (`x += dx`) | Variables, Fonctions (`draw()`) |
| 3 | La boucle de jeu | Balle animée sans traînée | Fonctions, Asynchronicité (`requestAnimationFrame`), canvas (`clearRect`) |
| 4 | Les rebonds | La balle rebondit sur 3 murs ; perdue en bas | Conditions |
| 5 | Piloter la raquette | Raquette au clavier, rebond dessus, direction de la balle selon la zone touchée | Interactivité (événements), Conditions |
| 6 | Les briques | Grille de briques affichée | Tableaux (2D), Boucles imbriquées |
| 7 | Casser les briques | Collision balle/brique, la brique disparaît | Boucles, Conditions, Tableaux |
| 8 | Score et vies | Score, vies, victoire/défaite (**jeu jouable**) | Variables, Canvas (texte), Conditions |
| 9 | Passer en objets | Même jeu, code en classes `Ball`, `Paddle`, `Brick`, `Game` | Objets (classes, `this`, méthodes) |
| 10 | Menu, pause, rejouer | Écran titre, bouton pause, rejouer | Interactivité (DOM, événements) |
| 11 | Highscore | Meilleur score conservé au rechargement | `localStorage`, DOM |
| 12 | ⭐ Niveaux | Niveaux chargés depuis un fichier JSON (Live Server), briques à plusieurs vies | Asynchronicité (`fetch`, Promesses), Tableaux (`filter`, `some`, `map`) |
| 13 | ⭐ Arcade : effets bonus | Au choix dans le catalogue de missions bonus (§10) | Tout le cours |

Chaque étape (0-11) contient en plus une ou deux **missions bonus** courtes (§10) pour occuper les élèves rapides *sans* les faire avancer plus vite que la classe.

### Répartition du temps (12 h)

| | Classe à l'aise | Classe débutante |
|---|---|---|
| Étapes 0-3 | 2 h (survol, on peut sauter 0) | 4 h |
| Étapes 4-8 | 3 h | 5 h (étapes 6-7 = les plus dures, prévoir plus de temps) |
| Étape 9 (objets) | 2 h (refactoring complet) | 1 h (**guidé : lecture + complétion**) |
| Étapes 10-11 | 1 h | 2 h (étape 10 simplifiée, 11 optionnelle) |
| Étapes 12-13 (niveaux + bonus) | 3 h | 0 h (missions bonus facultatives) |
| Bilan / rendu | 1 h | — (inclus dans les étapes) |

La classe débutante doit garantir la fin de l'étape 8 (jeu jouable) ; la classe à l'aise vise l'étape 13 avec au moins deux effets bonus.

## 4. Différenciation

- **Même sujet, trois niveaux d'aide** par étape (les élèves réfléchissent : on ne leur donne jamais le code solution) :
  1. *Pseudo-code* de l'algorithme (toujours visible) ;
  2. *Indices* en `<details>` repliés, de plus en plus précis ;
  3. *Squelette à trous* (`// TODO`) pour la classe débutante uniquement.
- **Solutions** : voir §6 (enseignant uniquement, dévoilées au fil du cours).
- **Pré-requis débutants** : renvoyer vers les niveaux du `mini-game/` du chapitre concerné avant l'étape (ex. boucles → `mini-game/boucles.html`).
- **Parcours avancé** : étapes 3-5 en « version libre » (énoncé + pseudo-code seul), puis refactoring MVC (cf. `projets/12_Snake`) à la place de l'étape 9.

## 5. Format d'une page d'étape

Pages HTML dans le style du cours (`cours/css/style.css`), toutes construites sur le même gabarit :

1. **Objectif** : capture ou GIF du résultat attendu.
2. **Rappels de cours** : liens `../../../cours/pages/….html#ancre` (table des ancres en §2) + 2-3 lignes de rappel.
3. **Pas à pas** : 3-6 sous-étapes, chacune avec explication, exemple de code d'une notion *voisine* (pas la réponse), **pseudo-code** de ce qu'il faut écrire, puis « À toi de jouer ».
4. **Indices** repliés (`<details>`), du plus vague au plus précis. Pas de solution dans la page.
5. **Checklist de validation** : « la balle rebondit à gauche, à droite, en haut ? »
6. **Erreurs fréquentes** (console, `undefined`, `this`…).
7. **Missions bonus ⭐** (§10) : 1-2 par étape.
8. Navigation *Étape précédente / suivante*.

Principe de rédaction : expliquer la notion avec un exemple *différent* du jeu (ex. une voiture qui avance), puis demander de l'appliquer au casse-briques. Cela évite le copier-coller.

Exemple de pseudo-code (étape 4, rebonds) tel qu'il apparaîtrait dans le guide :

```
à chaque image :
    si la balle dépasse le bord gauche OU le bord droit :
        inverser la vitesse horizontale
    si la balle dépasse le bord haut :
        inverser la vitesse verticale
    si la balle dépasse le bord bas :
        la partie est perdue
```

## 6. Les solutions

Choix retenu : **le guide ne contient que du pseudo-code et des indices ; les solutions sont dans un dossier à part que vous dévoilez vous-même**, comme pour `projets/17_DoodleJump` (`guides/` + `corrections/`).

- Un fichier par étape : `corrections/etape_XX.html`, qui est un **jeu complet et fonctionnel à la fin de l'étape** (HTML + JS, commentaires pédagogiques). Il sert à la fois de correction et de point de reprise pour un élève resté bloqué : il repart de la correction de l'étape N pour attaquer l'étape N+1.
- **Raccord avec les guides** : les sous-étapes ont un numéro unique `N.k` (« 5.2 · Déplacer la raquette »), identique dans le guide (pastille bleue) et dans la correction. Dans chaque correction :
  - l'en-tête liste les sous-étapes de l'étape, celles qui sont inchangées, et les liens de cours ;
  - chaque bloc de code est introduit par une bannière `/* ══ N.k · Titre ══ */` : le numéro dit **à quelle étape le code a été introduit** ;
  - une ligne modifiée par une étape ultérieure porte un commentaire avec le numéro de la sous-étape qui la modifie (`// 8.2`, `// 4.3 modifié par 8.2`) ;
  - à partir de l'étape 9, le code est réorganisé en classes : les commentaires `(ex 5.2)` indiquent d'où vient chaque méthode.
  Pour projeter la correction d'une étape, il suffit de chercher le numéro de la sous-étape (`Ctrl+F` « 5.2 »).
- Chaque correction a été exécutée dans un navigateur et testée automatiquement (victoire, défaite, pause, record, niveaux, effets) avant d'être ajoutée.
- Les élèves ne les ont pas tant que vous ne les avez pas publiées : le dépôt étant public (`PAJEAN/cours_javascript`), **gardez les corrections non encore présentées hors du dépôt** (branche privée ou dossier ignoré par `.gitignore`), puis ajoutez le fichier de l'étape au dépôt au moment où vous le projetez.
- Pendant la séance : vous projetez la correction, vous la commentez et vous montrez *une* façon de faire (il y en a d'autres) ; cela évite de bloquer ceux qui ont une solution différente mais correcte.
- Alternative légère, cohérente avec le cours : dans la page d'étape, un bouton « Afficher la réponse » protégé par un mot de passe (`data-pw`) que vous donnez à l'oral. Moins strict (le code reste lisible dans la source de la page), mais sans manipulation de dépôt.

## 7. Arborescence (état actuel)

```
projets/19_CasseBriques/
├── index.html                 # sommaire du projet pour les élèves (liens vers les guides)
├── CONCEPTION.md              # ce document
├── guides/
│   ├── etape_00.html          # écrit ; etape_01 … etape_13 restent à rédiger (même gabarit)
│   └── css/guide.css          # pseudo-code, pastilles de sous-étapes, encadrés
├── corrections/
│   └── etape_00.html … etape_13.html   # écrits et testés (enseignant)
└── niveaux/
    └── niveaux.json           # 3 niveaux de l'étape 12 (fournis aux élèves)
```

## 8. Évaluation (suggestion)

- Rendu : dossier de code + court rapport (choix d'implémentation, difficultés, une capture), comme pour `projets/12_Snake`.
- Barème : étapes validées (checklists), qualité du code (nommage, fonctions courtes, pas de duplication), autonomie, missions bonus réalisées.
- Option : « démo » de 5 minutes en fin de projet.

## 9. Points techniques

- **Serveur local** : les élèves utilisent l'extension VS Code *Live Server* (ils codent dans leur IDE). Elle est requise dès l'étape 12 (`fetch` d'un JSON) ; on peut l'utiliser dès l'étape 0 pour habituer les élèves (rechargement automatique de la page).
- **Modules ES** (`import`/`export`) : non utilisés, tout reste en scripts classiques (plus simple pour des débutants).
- **Collisions** : volontairement simples (centre de la balle contre rectangle de la brique) ; la prise en compte du rayon est une mission bonus.
- **Vitesse** : en pixels par image au début (simple), puis `deltaTime` en mission bonus, car `requestAnimationFrame` dépend du taux de rafraîchissement de l'écran (cf. encadré dans le cours).
- **Tests automatiques** : possibles (comme `mini-game`) sur des fonctions pures extraites (`collision(balle, brique)`), pas sur le rendu canvas ; à envisager seulement à partir de l'étape 9.

## 10. Missions bonus

Principe : des missions **courtes, indépendantes et ordonnées par difficulté** (★ à ★★★) pour les élèves rapides. Elles sont rattachées à une étape (elles ne dépendent que de ce qui est déjà construit) et décrites en pseudo-code + une phrase de cours. Idée de gamification : un tableau de « badges » à cocher dans le `README.md`, pris en compte dans l'évaluation (autonomie / extension personnelle).

### Missions rattachées aux étapes

| Après l'étape | Mission | Niv. | Notion |
|---|---|---|---|
| 1 | Dégradé, ombre, balle « emoji » ou image à la place du cercle | ★ | Canvas |
| 3 | Vitesse indépendante de l'écran (`deltaTime`) | ★★★ | `requestAnimationFrame(t)` |
| 4 | Angle de départ aléatoire de la balle | ★ | `Math.random` |
| 5 | Piloter la raquette à la souris (en plus du clavier) | ★★ | `mousemove` |
| 5 | Angle de rebond continu : proportionnel à la distance au centre de la raquette (au lieu de 3 zones) | ★★★ | Calcul, `Math` |
| 6 | Couleur de brique par rangée, ou motifs (pyramide, damier) | ★★ | Boucles, conditions |
| 7 | La balle accélère à chaque brique cassée (avec plafond) | ★ | `Math.min` |
| 8 | Combo : points multipliés si plusieurs briques sans toucher la raquette | ★★ | Variables |
| 9 | Hériter de `Brique` : `BriqueBonus` (couleur différente, 50 points) | ★★ | `extends`, `super` |
| 10 | Compte à rebours « 3, 2, 1 » avant de lancer la balle | ★★ | `setTimeout` |
| 11 | Tableau des 5 meilleurs scores avec pseudo | ★★ | `localStorage`, JSON, tableaux |

### Catalogue « effets bonus » (étape 13)

Une brique cassée a une chance (ex. 25 %) de lâcher une **capsule** qui tombe ; la rattraper avec la raquette déclenche l'effet pour quelques secondes (compteur d'images, comme dans la correction, ou `setTimeout`). Structure commune : un tableau `capsules`, une classe `Capsule` avec `type`, et un objet `EFFETS` qui associe chaque type à une fonction d'activation (fonctions de première classe). La correction de l'étape 13 fournit trois effets de référence (raquette large, vie en plus, multi-balles) ; les autres sont à la charge des élèves.

| Effet | Niv. | Idée d'implémentation |
|---|---|---|
| Raquette plus large / plus étroite (malus) | ★ | Modifier `paddle.width` puis la rétablir |
| Vie supplémentaire | ★ | `vies++` |
| Balle lente / rapide | ★ | Multiplier `dx`, `dy` |
| Multi-balles (×3) | ★★ | `balles` devient un tableau ; la partie est perdue quand `balles.length === 0` (`filter`) |
| Balle de feu (traverse les briques) | ★★ | Ne pas inverser la vitesse lors d'une collision |
| Raquette collante (la balle reste dessus, clic pour relancer) | ★★ | Un état `collee` |
| Laser (barre d'espace = tir qui casse une brique) | ★★★ | Tableau de projectiles, collisions |
| Briques explosives (détruisent les voisines) | ★★★ | Parcours de la grille 2D |
| Effet de particules à la destruction d'une brique | ★★★ | Tableau de particules, durée de vie, `filter` |
| Sons (`new Audio('…')`) | ★★ | Événements du jeu |
| Mode « chaos » : touches inversées pendant 5 s | ★★ | État + `setTimeout` |

Les effets sont indépendants entre eux : un élève peut en choisir deux ou trois selon son niveau, ce qui évite d'avoir à tous les corriger.

## 11. Avancement et prochaines étapes

Voir le **§0 (Reprise rapide)** en haut de ce document : il contient l'état d'avancement et la liste détaillée des tâches restantes.

## 12. Référence commune guides ↔ corrections

Les numéros ci-dessous sont ceux des pastilles dans les guides et des bannières dans les corrections.

| Étape | Sous-étapes | Fichier de correction |
|---|---|---|
| 0 · Mettre en place la page | 0.1 Structure HTML · 0.2 Canvas et style · 0.3 Le style (`style.css`) · 0.4 Script · 0.5 Contexte + console | `etape_00.html` |
| 1 · Dessiner le décor | 1.1 Constantes · 1.2 Balle · 1.3 Raquette | `etape_01.html` |
| 2 · L'état du jeu | 2.1 Variables d'état · 2.2 `dessiner()` · 2.3 `mettreAJour()` · 2.4 Test à la main (traînée) | `etape_02.html` |
| 3 · La boucle de jeu | 3.1 `boucle()` : mettre à jour, effacer, dessiner · 3.2 `requestAnimationFrame` · 3.3 Lancer la boucle · 3.4 Régler la vitesse | `etape_03.html` |
| 4 · Les rebonds | 4.1 Murs gauche/droit · 4.2 Plafond · 4.3 Sol = perdu · 4.4 Message de fin et arrêt de la boucle | `etape_04.html` |
| 5 · Piloter la raquette | 5.1 État des touches · 5.2 Déplacer la raquette (bornes) · 5.3 Rebond sur la raquette · 5.4 Diriger la balle | `etape_05.html` |
| 6 · Les briques | 6.1 Constantes de la grille · 6.2 Tableau 2D · 6.3 Dessiner les briques | `etape_06.html` |
| 7 · Casser les briques | 7.1 `balleToucheBrique()` · 7.2 Parcours et destruction · 7.3 Victoire | `etape_07.html` |
| 8 · Score et vies | 8.1 Score · 8.2 Vies et `replacerBalle()` · 8.3 Affichage · 8.4 Écran de fin | `etape_08.html` |
| 9 · Passer en objets | 9.1 `Raquette` · 9.2 `Balle` · 9.3 `Brique` (+ `static`) · 9.4 `Jeu` · 9.5 Démarrage | `etape_09.html` |
| 10 · Menu, pause, rejouer | 10.1 États du jeu · 10.2 Écran titre / lancer · 10.3 Pause · 10.4 Rejouer | `etape_10.html` |
| 11 · Highscore | 11.1 Lire · 11.2 Enregistrer · 11.3 Afficher | `etape_11.html` |
| 12 · Niveaux | 12.1 Format JSON · 12.2 `fetch` · 12.3 Grille → briques · 12.4 Briques à plusieurs coups · 12.5 Enchaîner les niveaux | `etape_12.html` |
| 13 · Arcade | 13.1 Tableau de balles · 13.2 `Capsule` · 13.3 Lâcher une capsule · 13.4 Objet `EFFETS` · 13.5 Les trois effets | `etape_13.html` |

Notes de conception issues de la réalisation :
- **Direction de la balle (5.4)** : sans elle, la balle garde toujours la même direction horizontale et le joueur ne peut pas la diriger. La version retenue (trois zones sur la raquette) reste accessible aux débutants ; l'angle continu est une mission bonus.
- **Collisions des briques** : « centre de la balle dans la brique » (§9). À l'étape 12, le rebond devient vertical ou horizontal selon le côté touché (12.4) : indispensable pour les briques à deux coups, sinon une balle entrant par le côté les toucherait deux fois.
- **Étape 9** : la liste de briques devient plate (plus de tableau 2D) et le compteur `briquesRestantes` est remplacé par `some()` ; c'est un bon prétexte pour revenir sur les méthodes de tableaux.
- **Étape 13** : la durée d'un effet est un compteur d'images (et non `setTimeout`) pour qu'elle s'arrête pendant la pause.
- **`this`** : l'étape 9 est l'occasion d'illustrer l'erreur classique `requestAnimationFrame(this.boucle)` (guide : section « Erreurs fréquentes »).
