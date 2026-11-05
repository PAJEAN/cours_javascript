(function () {
    var L = MG.lines;

    MG.register({
        id: 'tableaux',
        title: 'Les tableaux',
        course: 'les_tableaux',
        description: 'Indices, <code>filter</code>, <code>map</code>, <code>reduce</code>, <code>slice</code>, <code>sort</code> et <code>join</code> : transformer des données sans les abîmer.',
        levels: [
            {
                id: 't1',
                title: 'Le dernier de la file',
                mission: "<p>Écris <code>dernier(tab)</code> qui retourne le <b>dernier élément</b> d'un tableau, ou <code>undefined</code> si le tableau est vide.</p>",
                concepts: "<p>Les éléments d'un tableau sont numérotés à partir de <b>0</b>. La propriété <code>length</code> donne le nombre d'éléments.</p>" +
                    "<pre>const t = ['a', 'b', 'c'];\nt[0];            // 'a'\nt.length;        // 3\nt[t.length - 1]; // 'c'</pre>" +
                    "<p>Lire un indice qui n'existe pas renvoie <code>undefined</code> (sans erreur).</p>",
                hints: ["Le dernier indice vaut <code>tab.length - 1</code>. Pour un tableau vide, cela donne l'indice <code>-1</code> qui n'existe pas : tu obtiens naturellement <code>undefined</code>."],
                starter: L('function dernier(tab) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'dernier', args: [[1, 2, 3]], expected: 3 },
                    { fn: 'dernier', args: [['a']], expected: 'a' },
                    { fn: 'dernier', args: [[]], expected: undefined },
                    { fn: 'dernier', args: [[true, false, null]], expected: null, hidden: true }
                ]
            },
            {
                id: 't2',
                title: 'Le tri des suspects',
                mission: "<p>Écris <code>pairs(nombres)</code> qui retourne un <b>nouveau tableau</b> contenant uniquement les nombres pairs, dans le même ordre. Utilise <code>filter()</code>.</p>",
                concepts: "<p><code>filter()</code> retourne un <b>nouveau tableau</b> avec les éléments pour lesquels la fonction passée en paramètre retourne une valeur « vraie ».</p>" +
                    "<pre>[5, 12, 8, 1].filter(n =&gt; n &gt; 6);  // [12, 8]</pre>" +
                    "<p>Un nombre est pair si le reste de sa division par 2 vaut 0 : <code>n % 2 === 0</code>.</p>",
                hints: ["La fonction passée à <code>filter</code> doit retourner <code>true</code> pour les éléments à garder."],
                starter: L('function pairs(nombres) {', '  // à compléter', '}', ''),
                rules: [{ re: /\.filter\s*\(/, message: 'Utilise la méthode filter().' }],
                tests: [
                    { fn: 'pairs', args: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6] },
                    { fn: 'pairs', args: [[7, 9]], expected: [] },
                    { fn: 'pairs', args: [[10, 0, -4, 3]], expected: [10, 0, -4], hidden: true }
                ]
            },
            {
                id: 't3',
                title: 'Mesurer les mots',
                mission: "<p>Écris <code>longueurs(mots)</code> qui retourne un nouveau tableau contenant la <b>longueur</b> de chaque mot. Utilise <code>map()</code>.</p>",
                concepts: "<p><code>map()</code> retourne un <b>nouveau tableau de même taille</b> dont chaque élément est le résultat de la fonction appliquée à l'élément d'origine.</p>" +
                    "<pre>[1, 2, 3].map(n =&gt; n * 10);  // [10, 20, 30]</pre>" +
                    "<p>Le tableau initial n'est pas modifié.</p>",
                hints: ["Pour une chaîne <code>s</code>, sa longueur est <code>s.length</code>."],
                starter: L('function longueurs(mots) {', '  // à compléter', '}', ''),
                rules: [{ re: /\.map\s*\(/, message: 'Utilise la méthode map().' }],
                tests: [
                    { fn: 'longueurs', args: [['chat', 'chien', 'oiseau']], expected: [4, 5, 6] },
                    { fn: 'longueurs', args: [[]], expected: [] },
                    { fn: 'longueurs', args: [['', 'a', 'javascript']], expected: [0, 1, 10], hidden: true }
                ]
            },
            {
                id: 't4',
                title: 'Faire les comptes',
                mission: "<p>Écris <code>somme(nombres)</code> qui retourne la somme des éléments d'un tableau (0 pour un tableau vide). Utilise <code>reduce()</code>.</p>",
                concepts: "<p><code>reduce()</code> <b>réduit</b> le tableau à une seule valeur en accumulant les éléments un par un :</p>" +
                    "<pre>[1, 2, 3].reduce((acc, n) =&gt; acc + n, 0);  // 6</pre>" +
                    "<p>Le deuxième argument (<code>0</code>) est la <b>valeur initiale</b>. Sans elle, <code>reduce</code> sur un tableau vide lève une erreur.</p>",
                hints: ["Donne <code>0</code> comme valeur initiale : le cas du tableau vide fonctionnera tout seul."],
                starter: L('function somme(nombres) {', '  // à compléter', '}', ''),
                rules: [{ re: /\.reduce\s*\(/, message: 'Utilise la méthode reduce().' }],
                tests: [
                    { fn: 'somme', args: [[1, 2, 3, 4]], expected: 10 },
                    { fn: 'somme', args: [[]], expected: 0 },
                    { fn: 'somme', args: [[5]], expected: 5, hidden: true },
                    { fn: 'somme', args: [[-2, 2, 40]], expected: 40, hidden: true }
                ]
            },
            {
                id: 't5',
                title: 'Copie sans casse',
                mission: "<p>Écris <code>sansPremier(tab)</code> qui retourne un tableau contenant tous les éléments <b>sauf le premier</b>, <b>sans modifier</b> le tableau d'origine.</p>",
                concepts: "<p>Certaines méthodes <b>modifient</b> le tableau (<code>splice</code>, <code>push</code>, <code>pop</code>, <code>shift</code>, <code>sort</code>...), d'autres retournent un nouveau tableau (<code>slice</code>, <code>map</code>, <code>filter</code>...).</p>" +
                    "<pre>const t = [1, 2, 3, 4];\nt.slice(1, 3);   // [2, 3] (t est inchangé)\nt.splice(1, 2);  // retourne [2, 3] ET modifie t</pre>" +
                    "<p><code>slice(début, fin)</code> : la fin est exclue, et peut être omise.</p>",
                hints: ["<code>tab.slice(1)</code> copie tout à partir de l'indice 1."],
                starter: L('function sansPremier(tab) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'sansPremier', args: [[1, 2, 3]], expected: [2, 3], argsAfter: [[1, 2, 3]] },
                    { fn: 'sansPremier', args: [['a']], expected: [], argsAfter: [['a']] },
                    { fn: 'sansPremier', args: [[9, 8, 7, 6]], expected: [8, 7, 6], argsAfter: [[9, 8, 7, 6]], hidden: true }
                ]
            },
            {
                id: 't6',
                title: 'Le classement',
                mission: "<p>Écris <code>classer(nombres)</code> qui retourne un nouveau tableau trié du <b>plus grand au plus petit</b>, sans modifier le tableau d'origine.</p>",
                concepts: "<p><code>sort()</code> trie <b>le tableau lui-même</b> et, par défaut, compare les éléments <b>comme des chaînes de caractères</b> : <code>[10, 9, 100].sort()</code> donne <code>[10, 100, 9]</code> !</p>" +
                    "<p>Pour trier des nombres, on fournit une fonction de comparaison <code>(a, b) =&gt; ...</code> qui retourne un nombre négatif, nul ou positif.</p>" +
                    "<pre>[3, 1, 2].sort((a, b) =&gt; a - b);  // croissant\n[...tab].sort(...);                // trie une copie</pre>" +
                    "<p><code>toSorted()</code> est la version qui retourne une copie triée.</p>",
                hints: ["Pour un ordre décroissant, retourne <code>b - a</code>.", "Copie d'abord le tableau avec <code>[...nombres]</code> ou <code>nombres.slice()</code>, ou utilise <code>toSorted()</code>."],
                starter: L('function classer(nombres) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'classer', args: [[10, 9, 100, 1]], expected: [100, 10, 9, 1], argsAfter: [[10, 9, 100, 1]] },
                    { fn: 'classer', args: [[]], expected: [], argsAfter: [[]] },
                    { fn: 'classer', args: [[5, -2, 5, 0]], expected: [5, 5, 0, -2], argsAfter: [[5, -2, 5, 0]], hidden: true }
                ]
            },
            {
                id: 't7',
                title: 'Le titre final',
                mission: "<p>Écris <code>titre(mots)</code> qui retourne une seule chaîne : chaque mot commence par une majuscule (le reste est inchangé) et les mots sont séparés par un espace. Exemple : <code>['le', 'petit', 'chat']</code> → <code>'Le Petit Chat'</code>.</p>",
                concepts: "<p>On enchaîne souvent les méthodes : <code>map()</code> transforme chaque élément, puis <code>join()</code> assemble le tableau en chaîne.</p>" +
                    "<pre>['a', 'b', 'c'].join('-');  // 'a-b-c'\n'chat'[0];                  // 'c'\n'chat'.slice(1);            // 'hat'</pre>",
                hints: ["Pour un mot <code>m</code> : <code>m[0].toUpperCase() + m.slice(1)</code>."],
                starter: L('function titre(mots) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'titre', args: [['le', 'petit', 'chat']], expected: 'Le Petit Chat' },
                    { fn: 'titre', args: [[]], expected: '' },
                    { fn: 'titre', args: [['javaScript']], expected: 'JavaScript', hidden: true }
                ],
                success: "Les tableaux n'ont plus de secret pour toi."
            }
        ]
    });
})();
