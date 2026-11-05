(function () {
    var L = MG.lines;

    MG.register({
        id: 'conditions',
        title: 'Les conditions',
        course: 'les_conditions',
        description: '<code>if / else</code>, opérateurs logiques, <code>switch</code>, opérateur ternaire et évaluation en court-circuit.',
        levels: [
            {
                id: 'c1',
                title: 'Le détecteur de signe',
                mission: "<p>Écris <code>signe(n)</code> qui retourne la chaîne <code>'positif'</code>, <code>'négatif'</code> ou <code>'nul'</code> selon le nombre reçu.</p>",
                concepts: "<p>La structure <code>if ... else if ... else</code> exécute le premier bloc dont la condition est vraie :</p>" +
                    "<pre>if (age &gt;= 18) {\n  return 'majeur';\n} else {\n  return 'mineur';\n}</pre>" +
                    "<p>Opérateurs de comparaison : <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code> <code>===</code> <code>!==</code>.</p>",
                hints: ["Teste d'abord si <code>n &gt; 0</code>, puis si <code>n &lt; 0</code>, sinon le nombre est nul."],
                starter: L('function signe(n) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'signe', args: [5], expected: 'positif' },
                    { fn: 'signe', args: [-3], expected: 'négatif' },
                    { fn: 'signe', args: [0], expected: 'nul' },
                    { fn: 'signe', args: [-0.5], expected: 'négatif', hidden: true }
                ]
            },
            {
                id: 'c2',
                title: "Contrôle à l'entrée",
                mission: "<p>Écris <code>peutEntrer(age, accompagne)</code> qui retourne <code>true</code> si la personne a <b>au moins 18 ans</b>, ou bien si elle a <b>au moins 16 ans</b> <em>et</em> est accompagnée (<code>accompagne</code> est un booléen). Sinon, retourne <code>false</code>.</p>",
                concepts: "<p>Les <b>opérateurs logiques</b> combinent des conditions : <code>&amp;&amp;</code> (ET), <code>||</code> (OU), <code>!</code> (NON).</p>" +
                    "<pre>const ok = age &gt;= 18 || (age &gt;= 16 &amp;&amp; accompagne);</pre>" +
                    "<p>Une comparaison produit déjà un booléen : inutile d'écrire <code>if (...) { return true } else { return false }</code>.</p>",
                hints: ["Tu peux écrire toute la règle en une seule expression retournée avec <code>return</code>."],
                starter: L('function peutEntrer(age, accompagne) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'peutEntrer', args: [20, false], expected: true },
                    { fn: 'peutEntrer', args: [17, true], expected: true },
                    { fn: 'peutEntrer', args: [17, false], expected: false },
                    { fn: 'peutEntrer', args: [15, true], expected: false, hidden: true },
                    { fn: 'peutEntrer', args: [18, false], expected: true, hidden: true }
                ]
            },
            {
                id: 'c3',
                title: 'Année bissextile',
                mission: "<p>Écris <code>estBissextile(annee)</code>. Une année est bissextile si elle est divisible par 4, <b>sauf</b> si elle est divisible par 100, <b>à moins</b> qu'elle ne soit aussi divisible par 400.<br>Exemples : 2024 ✅, 1900 ❌, 2000 ✅, 2023 ❌.</p>",
                concepts: "<p>L'opérateur <b>modulo</b> <code>%</code> donne le reste d'une division entière : <code>10 % 4</code> vaut <code>2</code>. Un nombre <code>n</code> est divisible par <code>d</code> si <code>n % d === 0</code>.</p>" +
                    "<p>Les opérateurs <code>&amp;&amp;</code> sont prioritaires sur <code>||</code>, mais n'hésite pas à ajouter des parenthèses pour la lisibilité.</p>",
                hints: ["Règle : <code>(annee % 4 === 0 &amp;&amp; annee % 100 !== 0) || annee % 400 === 0</code>. À toi de la retrouver avant de la lire !"],
                starter: L('function estBissextile(annee) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'estBissextile', args: [2024], expected: true },
                    { fn: 'estBissextile', args: [1900], expected: false },
                    { fn: 'estBissextile', args: [2000], expected: true },
                    { fn: 'estBissextile', args: [2023], expected: false },
                    { fn: 'estBissextile', args: [2100], expected: false, hidden: true },
                    { fn: 'estBissextile', args: [1996], expected: true, hidden: true }
                ]
            },
            {
                id: 'c4',
                title: 'Le jury',
                mission: "<p>Écris <code>mention(note)</code> qui retourne :</p><ul><li><code>'Invalide'</code> si la note est inférieure à 0 ou supérieure à 20 ;</li><li><code>'Refusé'</code> si elle est inférieure à 10 ;</li><li><code>'Passable'</code> de 10 à moins de 12 ;</li><li><code>'Assez bien'</code> de 12 à moins de 14 ;</li><li><code>'Bien'</code> de 14 à moins de 16 ;</li><li><code>'Très bien'</code> à partir de 16.</li></ul>",
                concepts: "<p>On enchaîne les <code>else if</code> : les conditions sont évaluées <b>dans l'ordre</b> et la première vraie l'emporte. Le <code>return</code> dans un bloc interrompt la fonction : plus besoin de <code>else</code> derrière.</p>" +
                    "<pre>if (t &lt; 0) return 'gel';\nif (t &lt; 20) return 'frais';\nreturn 'chaud';</pre>",
                hints: ["Traite d'abord le cas invalide, puis les seuils du plus petit au plus grand."],
                starter: L('function mention(note) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'mention', args: [8], expected: 'Refusé' },
                    { fn: 'mention', args: [10], expected: 'Passable' },
                    { fn: 'mention', args: [13.5], expected: 'Assez bien' },
                    { fn: 'mention', args: [15], expected: 'Bien' },
                    { fn: 'mention', args: [18], expected: 'Très bien' },
                    { fn: 'mention', args: [25], expected: 'Invalide', hidden: true },
                    { fn: 'mention', args: [-1], expected: 'Invalide', hidden: true },
                    { fn: 'mention', args: [16], expected: 'Très bien', hidden: true }
                ]
            },
            {
                id: 'c5',
                title: 'Le calendrier',
                mission: "<p>Écris <code>jourSemaine(n)</code> avec une instruction <b><code>switch</code></b> : <code>1</code> → <code>'lundi'</code>, <code>2</code> → <code>'mardi'</code>, ... <code>7</code> → <code>'dimanche'</code>. Toute autre valeur retourne <code>'inconnu'</code>.</p>",
                concepts: "<p><code>switch</code> compare une valeur à plusieurs cas avec l'égalité stricte. Sans <code>break</code> (ou <code>return</code>), l'exécution <b>continue</b> dans le cas suivant.</p>" +
                    "<pre>switch (couleur) {\n  case 'rouge':\n    return 'stop';\n  case 'vert':\n    return 'go';\n  default:\n    return '?';\n}</pre>",
                hints: ["N'oublie pas la clause <code>default</code> pour les valeurs inattendues."],
                starter: L('function jourSemaine(n) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bswitch\s*\(/, message: 'Utilise une instruction switch.' }],
                tests: [
                    { fn: 'jourSemaine', args: [1], expected: 'lundi' },
                    { fn: 'jourSemaine', args: [4], expected: 'jeudi' },
                    { fn: 'jourSemaine', args: [7], expected: 'dimanche' },
                    { fn: 'jourSemaine', args: [0], expected: 'inconnu' },
                    { fn: 'jourSemaine', args: [8], expected: 'inconnu', hidden: true },
                    { fn: 'jourSemaine', args: [3], expected: 'mercredi', hidden: true }
                ]
            },
            {
                id: 'c6',
                title: 'Pair ou impair ?',
                mission: "<p>Écris <code>parite(n)</code> qui retourne <code>'pair'</code> ou <code>'impair'</code>, <b>sans utiliser <code>if</code></b> : utilise l'opérateur ternaire.</p>",
                concepts: "<p>L'<b>opérateur ternaire</b> est un « if » sous forme d'expression :</p>" +
                    "<pre>condition ? valeurSiVrai : valeurSiFaux</pre>" +
                    "<pre>const statut = age &gt;= 18 ? 'majeur' : 'mineur';</pre>",
                hints: ["La condition à tester est <code>n % 2 === 0</code>."],
                starter: L('function parite(n) {', '  // à compléter', '}', ''),
                rules: [
                    { re: /\?/, message: "Utilise l'opérateur ternaire ? :" },
                    { re: /\bif\b/, forbid: true, message: "N'utilise pas if." }
                ],
                tests: [
                    { fn: 'parite', args: [4], expected: 'pair' },
                    { fn: 'parite', args: [7], expected: 'impair' },
                    { fn: 'parite', args: [0], expected: 'pair' },
                    { fn: 'parite', args: [-3], expected: 'impair', hidden: true }
                ]
            },
            {
                id: 'c7',
                title: 'Nom par défaut',
                mission: "<p>Écris <code>nomOuDefaut(nom)</code> qui retourne <code>nom</code> s'il contient quelque chose, sinon la chaîne <code>'Anonyme'</code>. Cela doit fonctionner pour <code>''</code>, <code>undefined</code> et <code>null</code>. Pas de <code>if</code> : utilise l'évaluation en court-circuit.</p>",
                concepts: "<p>Les opérateurs <code>||</code> et <code>&amp;&amp;</code> retournent <b>l'un de leurs opérandes</b>, pas forcément un booléen. <code>a || b</code> retourne <code>a</code> s'il est « vrai », sinon <code>b</code>.</p>" +
                    "<p>Les valeurs « fausses » (<i>falsy</i>) sont : <code>false</code>, <code>0</code>, <code>''</code>, <code>null</code>, <code>undefined</code> et <code>NaN</code>. Tout le reste est « vrai ».</p>",
                hints: ["<code>nom || 'Anonyme'</code> fait exactement ce qui est demandé."],
                starter: L('function nomOuDefaut(nom) {', '  // à compléter', '}', ''),
                rules: [{ re: /\bif\b/, forbid: true, message: "N'utilise pas if." }],
                tests: [
                    { fn: 'nomOuDefaut', args: ['Ada'], expected: 'Ada' },
                    { fn: 'nomOuDefaut', args: [''], expected: 'Anonyme' },
                    { fn: 'nomOuDefaut', args: [undefined], expected: 'Anonyme' },
                    { fn: 'nomOuDefaut', args: [null], expected: 'Anonyme', hidden: true }
                ],
                success: "Tu sais maintenant prendre des décisions en JavaScript."
            }
        ]
    });
})();
