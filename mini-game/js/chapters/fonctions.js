(function () {
    var L = MG.lines;

    MG.register({
        id: 'fonctions',
        title: 'Les fonctions',
        course: 'les_fonctions',
        description: 'Fonctions nommées et fléchées, fonctions de première classe, ordre supérieur et fermetures (<i>closures</i>).',
        levels: [
            {
                id: 'f1',
                title: 'La machine à additionner',
                mission: "<p>L'Agence a besoin d'un outil de calcul. Écris une fonction nommée <code>addition(a, b)</code> qui <b>retourne</b> la somme de ses deux paramètres.</p>",
                concepts: "<p>Une <b>fonction nommée</b> se déclare avec <code>function</code>, une liste de paramètres et un corps. Le mot-clé <code>return</code> renvoie le résultat à l'appelant :</p>" +
                    "<pre>function double(n) {\n  return n * 2;\n}\ndouble(4); // 8</pre>" +
                    "<p>Attention : afficher avec <code>console.log</code> n'est <b>pas</b> retourner une valeur.</p>",
                hints: ["Sans <code>return</code>, une fonction renvoie <code>undefined</code>."],
                starter: L('function addition(a, b) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'addition', args: [2, 3], expected: 5 },
                    { fn: 'addition', args: [-1, 1], expected: 0 },
                    { fn: 'addition', args: [10, 32], expected: 42, hidden: true }
                ]
            },
            {
                id: 'f2',
                title: 'Flèche express',
                mission: "<p>Déclare une <b>fonction fléchée</b> stockée dans la constante <code>carre</code> qui retourne le carré d'un nombre.</p>",
                concepts: "<p>Une <b>fonction fléchée</b> est une écriture courte d'une fonction anonyme, souvent stockée dans une variable :</p>" +
                    "<pre>const triple = (n) =&gt; n * 3;\nconst somme = (a, b) =&gt; {\n  return a + b;\n};</pre>" +
                    "<p>Sans accolades, la valeur de l'expression est retournée automatiquement.</p>",
                hints: ["La syntaxe est <code>(paramètre) =&gt; expression</code>."],
                starter: L('const carre = null; // remplace null par une fonction fléchée', ''),
                rules: [{ re: /=>/, message: 'Utilise une fonction fléchée (=>).' }],
                tests: [
                    { label: 'carre(4)', run: 'return carre(4);', expected: 16 },
                    { label: 'carre(-3)', run: 'return carre(-3);', expected: 9 },
                    { label: 'carre(0)', run: 'return carre(0);', expected: 0, hidden: true }
                ]
            },
            {
                id: 'f3',
                title: 'Une fonction comme argument',
                mission: "<p>Écris <code>appliquer(fn, valeur)</code> : elle reçoit <b>une fonction</b> et une valeur, et retourne le résultat de l'appel de la fonction avec cette valeur.</p>",
                concepts: "<p>En JavaScript, les fonctions sont des <b>valeurs comme les autres</b> (fonctions de première classe) : on peut les stocker dans une variable, les passer en paramètre ou les retourner.</p>" +
                    "<pre>function executer(action) {\n  return action();\n}\nexecuter(() =&gt; 'fait !');  // 'fait !'</pre>",
                hints: ["Le paramètre <code>fn</code> est une fonction : il suffit de l'appeler avec des parenthèses."],
                starter: L('function appliquer(fn, valeur) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'appliquer', args: [{ $fn: 'x => x * 2' }, 21], expected: 42 },
                    { fn: 'appliquer', args: [{ $fn: 's => s.toUpperCase()' }, 'ok'], expected: 'OK' },
                    { fn: 'appliquer', args: [{ $fn: 'n => n + 1' }, 0], expected: 1, hidden: true }
                ]
            },
            {
                id: 'f4',
                title: 'Répéter une action',
                mission: "<p>Écris <code>repeter(n, action)</code> qui appelle <code>action</code> <b>n fois</b> en lui passant à chaque fois l'indice courant (0, 1, 2, ...). La fonction ne retourne rien de particulier.</p>",
                concepts: "<p>Une <b>fonction d'ordre supérieur</b> prend une fonction en paramètre et/ou en retourne une. C'est le principe de <code>map</code>, <code>filter</code>, <code>setTimeout</code>, etc.</p>" +
                    "<pre>function pourChaque(tab, action) {\n  for (let i = 0; i &lt; tab.length; i++) {\n    action(tab[i]);\n  }\n}</pre>",
                hints: ["Tu peux utiliser une boucle <code>for (let i = 0; i &lt; n; i++)</code> et appeler <code>action(i)</code> à chaque tour."],
                starter: L('function repeter(n, action) {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'repeter(3, i => v.push(i))', run: 'const v = []; repeter(3, i => v.push(i)); return v;', expected: [0, 1, 2] },
                    { label: 'repeter(0, ...) ne fait rien', run: 'const v = []; repeter(0, i => v.push(i)); return v;', expected: [] },
                    { label: 'repeter(5, ...)', run: 'let total = 0; repeter(5, i => { total += i; }); return total;', expected: 10, hidden: true }
                ]
            },
            {
                id: 'f5',
                title: "L'usine à fonctions",
                mission: "<p>Écris <code>multiplicateur(n)</code> qui <b>retourne une nouvelle fonction</b>. Cette fonction prend un nombre <code>x</code> et retourne <code>x * n</code>.</p>",
                concepts: "<p>Une fonction peut <b>retourner une autre fonction</b>. La fonction retournée « se souvient » des variables de la fonction qui l'a créée : c'est une <b>fermeture</b> (<i>closure</i>).</p>" +
                    "<pre>function ajouteur(a) {\n  return (b) =&gt; a + b;\n}\nconst plus5 = ajouteur(5);\nplus5(2); // 7</pre>",
                hints: ["<code>multiplicateur(3)</code> doit renvoyer une fonction ; <code>multiplicateur(3)(5)</code> vaut alors 15."],
                starter: L('function multiplicateur(n) {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'multiplicateur(3)(5)', run: 'return multiplicateur(3)(5);', expected: 15 },
                    { label: 'multiplicateur(2)(21)', run: 'return multiplicateur(2)(21);', expected: 42 },
                    { label: 'deux multiplicateurs indépendants', run: 'const a = multiplicateur(2); const b = multiplicateur(10); return [a(1), b(1)];', expected: [2, 10], hidden: true }
                ]
            },
            {
                id: 'f6',
                title: 'Le compteur secret',
                mission: "<p>Écris <code>creerCompteur()</code> qui retourne une fonction. Chaque appel de cette fonction retourne <b>1, puis 2, puis 3...</b> Deux compteurs créés séparément doivent être indépendants, et personne ne doit pouvoir modifier la valeur de l'extérieur.</p>",
                concepts: "<p>Une fermeture permet de créer des <b>variables privées</b> : la variable existe tant que la fonction qui l'utilise existe, mais reste inaccessible de l'extérieur.</p>" +
                    "<pre>function creerBoite() {\n  let contenu = 0;     // privé\n  return () =&gt; contenu++;\n}</pre>",
                hints: ["Déclare une variable avec <code>let</code> <b>dans</b> <code>creerCompteur</code>, mais <b>en dehors</b> de la fonction retournée.", "La fonction retournée incrémente la variable puis la retourne."],
                starter: L('function creerCompteur() {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'trois appels successifs', run: 'const c = creerCompteur(); c(); c(); return c();', expected: 3 },
                    { label: 'premier appel', run: 'return creerCompteur()();', expected: 1 },
                    { label: 'compteurs indépendants', run: 'const a = creerCompteur(); const b = creerCompteur(); a(); a(); return [a(), b()];', expected: [3, 1], hidden: true }
                ]
            },
            {
                id: 'f7',
                title: 'Composer des fonctions',
                mission: "<p>Écris <code>composer(f, g)</code> qui retourne une nouvelle fonction : elle applique d'abord <code>g</code> à son argument, puis applique <code>f</code> au résultat (autrement dit <code>f(g(x))</code>).</p>",
                concepts: "<p>Combiner les trois idées du chapitre : une fonction reçoit des fonctions en paramètres <b>et</b> en retourne une nouvelle, qui utilise une fermeture sur <code>f</code> et <code>g</code>.</p>" +
                    "<pre>const inc = x =&gt; x + 1;\nconst dbl = x =&gt; x * 2;\n// composer(inc, dbl)(5) === inc(dbl(5)) === 11</pre>",
                hints: ["La fonction retournée prend un paramètre <code>x</code> et retourne <code>f(g(x))</code>."],
                starter: L('function composer(f, g) {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'composer(x => x + 1, x => x * 2)(5)', run: 'return composer(x => x + 1, x => x * 2)(5);', expected: 11 },
                    { label: "composer(s => s + '!', s => s.toUpperCase())('hey')", run: "return composer(s => s + '!', s => s.toUpperCase())('hey');", expected: 'HEY!' },
                    { label: "l'ordre compte", run: 'return composer(x => x * 2, x => x + 1)(5);', expected: 12, hidden: true }
                ],
                success: "Tu maîtrises les fonctions de première classe et les fermetures."
            }
        ]
    });
})();
