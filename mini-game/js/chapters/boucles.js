(function () {
    var L = MG.lines;

    MG.register({
        id: 'boucles',
        title: 'Les boucles',
        course: 'les_boucles',
        description: '<code>for</code>, <code>for...of</code>, <code>for...in</code> et <code>while</code> : répéter, parcourir et résoudre de petits problèmes algorithmiques.',
        levels: [
            {
                id: 'b1',
                title: 'Additions en série',
                mission: "<p>Écris <code>sommeJusqua(n)</code> qui retourne la somme des entiers de 1 à <code>n</code> (0 si <code>n</code> vaut 0). Utilise une boucle <code>for</code>.</p>",
                concepts: "<p>La boucle <code>for</code> comporte trois parties : initialisation, condition de poursuite, étape.</p>" +
                    "<pre>for (let i = 0; i &lt; 3; i++) {\n  console.log(i);  // 0, 1, 2\n}</pre>" +
                    "<p>On accumule généralement un résultat dans une variable déclarée <b>avant</b> la boucle.</p>",
                hints: ["Déclare <code>let total = 0;</code> avant la boucle, puis ajoute <code>i</code> à chaque tour."],
                starter: L('function sommeJusqua(n) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bfor\s*\(/, message: 'Utilise une boucle for.' }],
                tests: [
                    { fn: 'sommeJusqua', args: [5], expected: 15 },
                    { fn: 'sommeJusqua', args: [1], expected: 1 },
                    { fn: 'sommeJusqua', args: [0], expected: 0 },
                    { fn: 'sommeJusqua', args: [100], expected: 5050, hidden: true }
                ]
            },
            {
                id: 'b2',
                title: 'La table de multiplication',
                mission: "<p>Écris <code>table(n)</code> qui retourne un tableau contenant <code>n × 1</code>, <code>n × 2</code>, ... jusqu'à <code>n × 10</code>.</p>",
                concepts: "<p>Une boucle sert souvent à <b>construire un tableau</b> : on le crée vide, puis on ajoute les éléments avec <code>push()</code>.</p>" +
                    "<pre>const carres = [];\nfor (let i = 1; i &lt;= 3; i++) {\n  carres.push(i * i);\n}\n// [1, 4, 9]</pre>",
                hints: ["Attention aux bornes : <code>i</code> doit aller de 1 à 10 <b>inclus</b>."],
                starter: L('function table(n) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bfor\s*\(/, message: 'Utilise une boucle for.' }],
                tests: [
                    { fn: 'table', args: [2], expected: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
                    { fn: 'table', args: [7], expected: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] },
                    { fn: 'table', args: [0], expected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], hidden: true }
                ]
            },
            {
                id: 'b3',
                title: 'Les voyelles',
                mission: "<p>Écris <code>compterVoyelles(texte)</code> qui retourne le nombre de voyelles (<code>a e i o u</code>, en minuscules ou majuscules, sans tenir compte des accents) d'une chaîne. Utilise <code>for...of</code>.</p>",
                concepts: "<p><code>for...of</code> parcourt les <b>valeurs</b> d'un objet itérable : tableau, mais aussi <b>chaîne de caractères</b>.</p>" +
                    "<pre>for (const lettre of 'abc') {\n  console.log(lettre);  // 'a', 'b', 'c'\n}</pre>" +
                    "<p><code>'aeiou'.includes(lettre)</code> vaut <code>true</code> si <code>lettre</code> est dans la chaîne.</p>",
                hints: ["Convertis chaque lettre en minuscules avec <code>toLowerCase()</code> avant de la tester."],
                starter: L('function compterVoyelles(texte) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bfor\s*\(\s*(const|let|var)\s+\w+\s+of\b/, message: 'Utilise une boucle for...of.' }],
                tests: [
                    { fn: 'compterVoyelles', args: ['bonjour'], expected: 3 },
                    { fn: 'compterVoyelles', args: ['JavaScript'], expected: 3 },
                    { fn: 'compterVoyelles', args: [''], expected: 0 },
                    { fn: 'compterVoyelles', args: ['AEIOU'], expected: 5, hidden: true },
                    { fn: 'compterVoyelles', args: ['rythme'], expected: 1, hidden: true }
                ]
            },
            {
                id: 'b4',
                title: "Doubler jusqu'au bout",
                mission: "<p>Écris <code>puissanceDeDeux(n)</code> qui retourne la <b>plus petite puissance de 2 supérieure ou égale</b> à <code>n</code> (avec <code>n ≥ 1</code>). Exemples : 5 → 8, 8 → 8, 100 → 128. Utilise <code>while</code>.</p>",
                concepts: "<p>La boucle <code>while</code> répète tant que sa condition est vraie. On l'utilise quand on ignore le nombre de tours à l'avance.</p>" +
                    "<pre>let x = 1;\nwhile (x &lt; 50) {\n  x = x * 3;\n}\n// x vaut 81</pre>" +
                    "<p>⚠️ Si la condition ne devient jamais fausse, la boucle est <b>infinie</b> et le programme se bloque.</p>",
                hints: ["Pars de <code>1</code> et double tant que la valeur est strictement inférieure à <code>n</code>."],
                starter: L('function puissanceDeDeux(n) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bwhile\s*\(/, message: 'Utilise une boucle while.' }],
                tests: [
                    { fn: 'puissanceDeDeux', args: [5], expected: 8 },
                    { fn: 'puissanceDeDeux', args: [8], expected: 8 },
                    { fn: 'puissanceDeDeux', args: [1], expected: 1 },
                    { fn: 'puissanceDeDeux', args: [100], expected: 128, hidden: true },
                    { fn: 'puissanceDeDeux', args: [1025], expected: 2048, hidden: true }
                ]
            },
            {
                id: 'b5',
                title: 'Chasse aux occurrences',
                mission: "<p>Écris <code>compterOccurrences(texte, motif)</code> qui retourne le nombre de fois où <code>motif</code> apparaît dans <code>texte</code> (sans chevauchement). Exemple : <code>'ouagadougou'</code> contient 3 fois <code>'ou'</code>. Utilise <code>while</code> et <code>indexOf()</code>.</p>",
                concepts: "<p><code>texte.indexOf(motif, debut)</code> retourne l'indice de la première occurrence à partir de <code>debut</code>, ou <code>-1</code> si elle n'existe pas.</p>" +
                    "<pre>'banane'.indexOf('an');     // 1\n'banane'.indexOf('an', 2);  // 3\n'banane'.indexOf('an', 4);  // -1</pre>",
                hints: ["Tant que <code>indexOf</code> ne retourne pas <code>-1</code>, incrémente un compteur et repars juste <b>après</b> l'occurrence trouvée."],
                starter: L('function compterOccurrences(texte, motif) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bwhile\s*\(/, message: 'Utilise une boucle while.' }],
                tests: [
                    { fn: 'compterOccurrences', args: ['ouagadougou', 'ou'], expected: 3 },
                    { fn: 'compterOccurrences', args: ['banane', 'an'], expected: 2 },
                    { fn: 'compterOccurrences', args: ['abc', 'z'], expected: 0 },
                    { fn: 'compterOccurrences', args: ['aaaa', 'aa'], expected: 2, hidden: true }
                ]
            },
            {
                id: 'b6',
                title: 'La suite de Fibonacci',
                mission: "<p>Écris <code>fibonacci(n)</code> qui retourne un tableau contenant les <code>n</code> premiers termes de la suite de Fibonacci : <code>0, 1, 1, 2, 3, 5, 8...</code> (chaque terme est la somme des deux précédents). <code>fibonacci(0)</code> retourne <code>[]</code>.</p>",
                concepts: "<p>Dans une boucle, on peut lire les éléments déjà ajoutés au tableau : <code>suite[suite.length - 1]</code> est le dernier, <code>suite[suite.length - 2]</code> l'avant-dernier.</p>" +
                    "<p>Les premiers termes (0 et 1) sont des cas particuliers à traiter à part ou à initialiser avant la boucle.</p>",
                hints: ["Commence avec un tableau contenant les deux premiers termes et boucle tant qu'il n'a pas la bonne taille, puis tronque avec <code>slice(0, n)</code> pour gérer <code>n = 0</code> ou <code>n = 1</code>."],
                starter: L('function fibonacci(n) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'fibonacci', args: [6], expected: [0, 1, 1, 2, 3, 5] },
                    { fn: 'fibonacci', args: [1], expected: [0] },
                    { fn: 'fibonacci', args: [0], expected: [] },
                    { fn: 'fibonacci', args: [10], expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], hidden: true }
                ]
            },
            {
                id: 'b7',
                title: 'FizzBuzz',
                mission: "<p>Le classique des entretiens ! Écris <code>fizzbuzz(n)</code> qui retourne un tableau de <code>n</code> éléments : pour chaque nombre de 1 à <code>n</code>, mets <code>'FizzBuzz'</code> s'il est divisible par 3 <b>et</b> par 5, <code>'Fizz'</code> s'il est divisible par 3, <code>'Buzz'</code> s'il est divisible par 5, sinon le nombre lui-même.</p>",
                concepts: "<p>Cet exercice combine une <b>boucle</b>, des <b>conditions</b> et le <b>modulo</b> (<code>%</code>). L'ordre des tests est important : le cas « divisible par 3 et par 5 » doit être vérifié en premier.</p>",
                hints: ["Teste d'abord <code>i % 15 === 0</code> (ou <code>i % 3 === 0 &amp;&amp; i % 5 === 0</code>)."],
                starter: L('function fizzbuzz(n) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'fizzbuzz', args: [5], expected: [1, 2, 'Fizz', 4, 'Buzz'] },
                    { fn: 'fizzbuzz', args: [15], expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'] },
                    { fn: 'fizzbuzz', args: [0], expected: [], hidden: true }
                ]
            },
            {
                id: 'b8',
                title: 'Le panier',
                mission: "<p>Écris <code>totalPanier(panier)</code> : <code>panier</code> est un objet dont chaque propriété est un produit et chaque valeur sa quantité (ex : <code>{ pommes: 3, poires: 2 }</code>). Retourne le nombre total d'articles. Utilise <code>for...in</code>.</p>",
                concepts: "<p><code>for...in</code> parcourt les <b>clés</b> (noms de propriétés) d'un objet. On accède ensuite à la valeur avec la notation crochets.</p>" +
                    "<pre>const stock = { a: 1, b: 2 };\nfor (const cle in stock) {\n  console.log(cle, stock[cle]);  // 'a' 1, puis 'b' 2\n}</pre>",
                hints: ["À chaque tour, <code>cle</code> est le nom du produit ; la quantité est <code>panier[cle]</code>."],
                starter: L('function totalPanier(panier) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bfor\s*\(\s*(const|let|var)\s+\w+\s+in\b/, message: 'Utilise une boucle for...in.' }],
                tests: [
                    { fn: 'totalPanier', args: [{ pommes: 3, poires: 2 }], expected: 5 },
                    { fn: 'totalPanier', args: [{}], expected: 0 },
                    { fn: 'totalPanier', args: [{ lait: 1, pain: 2, oeufs: 12 }], expected: 15, hidden: true }
                ],
                success: "Tu sais maintenant répéter, parcourir et accumuler."
            }
        ]
    });
})();
