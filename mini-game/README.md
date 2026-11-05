# Mini-jeux JavaScript

Défis progressifs, testés automatiquement, pour accompagner le cours. Aucun serveur n'est nécessaire : il suffit d'ouvrir [index.html](index.html) dans un navigateur moderne (le dossier peut être téléchargé tel quel).

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : liste des chapitres et progression |
| `<chapitre>.html` | Une page par chapitre (variables, fonctions, tableaux, conditions, boucles, objets, asynchronicite) |
| `js/engine.js` | Moteur : affichage, indices, exécution isolée dans un Web Worker, tests, progression (`localStorage`) |
| `js/chapters/*.js` | Contenu des niveaux de chaque chapitre |
| `css/game.css` | Style |

## Ajouter un niveau

Dans `js/chapters/<chapitre>.js`, ajouter un objet à `levels` :

```js
{
    id: 'f8',                       // unique dans le chapitre
    title: 'Titre du niveau',
    mission: '<p>Énoncé (HTML)</p>',
    concepts: '<p>Rappel de cours (HTML)</p>',
    hints: ['Indice 1', 'Indice 2'],  // masqués jusqu'au clic, révélés un par un
    starter: MG.lines('function f() {', '  // à compléter', '}', ''),
    rules: [{ re: /=>/, message: 'Utilise une fonction fléchée.' }],  // optionnel ; forbid: true pour interdire
    tests: [
        { fn: 'f', args: [1, 2], expected: 3 },                       // appelle f(1, 2)
        { fn: 'g', args: [{ $fn: 'x => x * 2' }, 5], expected: 10 },  // { $fn } : passe une fonction en argument
        { label: 'scénario', run: 'const c = creer(); return c();', expected: 1 },  // code libre (async accepté)
        { fn: 'f', args: [[1, 2]], expected: 3, argsAfter: [[1, 2]] },  // vérifie que l'argument n'est pas modifié
        { run: 'return 0;', logs: ['Bonjour'] },                        // vérifie l'affichage console.log
        { fn: 'f', args: [9], expected: 0, hidden: true }              // test caché (évite de coder en dur les réponses)
    ]
}
```

Chaque test réévalue le code de l'élève depuis zéro (pas d'état partagé entre tests) ; les variables déclarées au niveau principal sont accessibles dans `run`. L'exécution est interrompue après 4 secondes (boucle infinie, promesse jamais résolue).

## Ajouter un chapitre

1. Créer `js/chapters/<id>.js` avec `MG.register({ id, title, course, description, levels })` (`course` = nom de la page dans `cours/pages/`).
2. Copier une page `<chapitre>.html` existante et adapter le script et `MG.start('<id>')`.
3. Ajouter le script dans `index.html`.
