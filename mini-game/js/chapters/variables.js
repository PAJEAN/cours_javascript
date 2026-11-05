(function () {
    var L = MG.lines;

    MG.register({
        id: 'variables',
        title: 'Les variables',
        course: 'les_variables',
        description: "Afficher dans la console, déclarer avec <code>const</code> et <code>let</code>, manipuler nombres et chaînes, comparer avec <code>==</code> et <code>===</code>.",
        levels: [
            {
                id: 'v1',
                title: 'Premier contact',
                mission: "<p>Bienvenue à l'Agence. Pour t'identifier, le terminal attend un message de ta part : affiche <strong>Bonjour le monde</strong> dans la console.</p>",
                concepts: "<p><code>console.log(...)</code> affiche une valeur dans la console du navigateur (touche <kbd>F12</kbd>). Un texte s'écrit entre guillemets simples ou doubles, et chaque instruction se termine par un <code>;</code>.</p>" +
                    "<pre>console.log('Salut !');</pre>" +
                    "<p>Ici, la console du jeu est simulée : ce que tu affiches apparaît dans le résultat des tests.</p>",
                hints: ["Le texte à afficher est une <em>chaîne de caractères</em> : n'oublie pas les guillemets et respecte exactement la casse et les espaces."],
                starter: L('// Écris ton code ici', ''),
                tests: [
                    { label: "console.log('Bonjour le monde')", run: 'return null;', logs: ['Bonjour le monde'] }
                ],
                success: "Tu viens d'exécuter ton premier programme."
            },
            {
                id: 'v2',
                title: 'Les constantes',
                mission: "<p>Ton dossier d'agent est vide. Déclare deux <strong>constantes</strong> :</p><ul><li><code>agent</code> qui contient le texte <code>\"Ada\"</code> ;</li><li><code>matricule</code> qui contient le <em>nombre</em> <code>42</code>.</li></ul>",
                concepts: "<p>Le mot-clé <code>const</code> déclare une variable dont la valeur <b>ne pourra pas être réassignée</b>. C'est le choix par défaut.</p>" +
                    "<pre>const ville = 'Paris';\nconst population = 2100000;</pre>" +
                    "<p>Un texte est de type <code>string</code> (entre guillemets), un nombre est de type <code>number</code> (sans guillemets).</p>",
                hints: ["<code>42</code> et <code>\"42\"</code> n'ont pas le même type. Le matricule doit être un nombre."],
                starter: L('// Déclare tes constantes ici', ''),
                rules: [
                    { re: /\bconst\s+agent\b/, message: 'Déclare agent avec const.' },
                    { re: /\bconst\s+matricule\b/, message: 'Déclare matricule avec const.' },
                    { re: /\bvar\b/, forbid: true, message: "N'utilise pas var." }
                ],
                tests: [
                    { label: 'agent vaut "Ada"', run: 'return agent;', expected: 'Ada' },
                    { label: 'matricule vaut le nombre 42', run: 'return matricule;', expected: 42 }
                ]
            },
            {
                id: 'v3',
                title: 'Une valeur qui change',
                mission: "<p>Ton agent démarre avec <code>energie = 10</code>. Après une mission, il gagne 5 points puis en perd 3. Modifie la variable avec les opérateurs <code>+=</code> et <code>-=</code> pour qu'elle vaille 12 à la fin.</p>",
                concepts: "<p><code>let</code> déclare une variable dont la valeur <b>peut changer</b>. Les opérateurs d'affectation combinée raccourcissent le code :</p>" +
                    "<pre>let score = 0;\nscore += 10;   // score = score + 10\nscore -= 4;    // score = score - 4</pre>" +
                    "<p>Essayer de réassigner une <code>const</code> provoque une erreur : <code>TypeError: Assignment to constant variable</code>.</p>",
                hints: ["Tu n'as pas besoin de toucher à la première ligne : ajoute simplement deux instructions en dessous."],
                starter: L('let energie = 10;', '', '// Ajoute tes instructions ici', ''),
                rules: [
                    { re: /energie\s*\+=\s*5/, message: 'Utilise energie += 5.' },
                    { re: /energie\s*-=\s*3/, message: 'Utilise energie -= 3.' }
                ],
                tests: [
                    { label: 'energie vaut 12', run: 'return energie;', expected: 12 }
                ]
            },
            {
                id: 'v4',
                title: 'Le message codé',
                mission: "<p>Construis la variable <code>presentation</code> pour qu'elle contienne exactement :<br><code>Je m'appelle Ada et j'ai 36 ans.</code><br>en utilisant les variables <code>prenom</code> et <code>age</code> (pas de texte écrit « en dur » pour le prénom ou l'âge).</p>",
                concepts: "<p>Les <b>gabarits de chaîne</b> (<i>template literals</i>) s'écrivent avec des accents graves <code>`</code> et permettent d'insérer des valeurs avec <code>${...}</code> :</p>" +
                    "<pre>const nom = 'Ada';\nconst message = `Salut ${nom} !`;</pre>" +
                    "<p>Dans une chaîne entourée de guillemets doubles, l'apostrophe ne pose pas de problème ; dans un gabarit non plus.</p>",
                hints: ["Commence par ouvrir un gabarit avec un accent grave, écris le texte, puis remplace Ada et 36 par <code>${prenom}</code> et <code>${age}</code>."],
                starter: L('const prenom = \'Ada\';', 'const age = 36;', '', 'const presentation = \'\'; // à compléter', ''),
                rules: [
                    { re: /\$\{\s*prenom\s*\}/, message: 'Utilise ${prenom} dans un gabarit de chaîne.' },
                    { re: /\$\{\s*age\s*\}/, message: 'Utilise ${age} dans un gabarit de chaîne.' }
                ],
                tests: [
                    { label: 'presentation', run: 'return presentation;', expected: "Je m'appelle Ada et j'ai 36 ans." }
                ]
            },
            {
                id: 'v5',
                title: 'Le mot de passe en majuscules',
                mission: "<p>Le coffre n'accepte que des mots de passe en <strong>MAJUSCULES</strong>. À partir de la constante <code>mot</code> :</p><ul><li><code>motDePasse</code> doit contenir le mot en majuscules ;</li><li><code>taille</code> doit contenir son nombre de caractères.</li></ul>",
                concepts: "<p>Les chaînes de caractères possèdent des <b>propriétés</b> et des <b>méthodes</b> :</p>" +
                    "<pre>const s = 'bonjour';\ns.length;          // 7 (propriété, sans parenthèses)\ns.toUpperCase();   // 'BONJOUR' (méthode, avec parenthèses)</pre>",
                hints: ["<code>length</code> est une propriété, <code>toUpperCase()</code> est une méthode : seule la seconde s'appelle avec des parenthèses."],
                starter: L("const mot = 'javascript';", '', 'const motDePasse = null; // à compléter', 'const taille = null;     // à compléter', ''),
                rules: [
                    { re: /toUpperCase\s*\(/, message: 'Utilise la méthode toUpperCase().' },
                    { re: /\.length\b/, message: 'Utilise la propriété length.' }
                ],
                tests: [
                    { label: 'motDePasse', run: 'return motDePasse;', expected: 'JAVASCRIPT' },
                    { label: 'taille', run: 'return taille;', expected: 10 }
                ]
            },
            {
                id: 'v6',
                title: 'Piège de saisie',
                mission: "<p>Un formulaire renvoie toujours du texte. Ici, <code>quantite</code> vaut <code>'5'</code> (une chaîne) et <code>bonus</code> vaut <code>3</code>. Calcule la variable <code>somme</code> pour qu'elle contienne le <em>nombre</em> 8, et non la chaîne <code>'53'</code>.</p>",
                concepts: "<p>L'opérateur <code>+</code> <b>concatène</b> dès qu'un des opérandes est une chaîne :</p>" +
                    "<pre>'5' + 3;          // '53'\nNumber('5') + 3;  // 8</pre>" +
                    "<p><code>Number()</code>, <code>parseInt()</code> et <code>parseFloat()</code> convertissent un texte en nombre.</p>",
                hints: ["Convertis d'abord <code>quantite</code> en nombre avant de l'additionner."],
                starter: L("const quantite = '5';", 'const bonus = 3;', '', 'const somme = null; // à compléter', ''),
                tests: [
                    { label: 'somme vaut le nombre 8', run: 'return somme;', expected: 8 }
                ]
            },
            {
                id: 'v7',
                title: 'Le coffre capricieux',
                mission: "<p>Dernier verrou du chapitre : choisis une valeur pour <code>cle</code> telle que :</p><ul><li><code>cle == 0</code> est <b>vrai</b> ;</li><li><code>cle === 0</code> est <b>faux</b> ;</li><li><code>typeof cle</code> vaut <code>'string'</code>.</li></ul>",
                concepts: "<p><code>==</code> compare avec <b>conversion implicite</b> de type, <code>===</code> compare la valeur <b>et</b> le type (égalité stricte).</p>" +
                    "<pre>5 == '5';    // true\n5 === '5';   // false</pre>" +
                    "<p>Bonne pratique : utilise presque toujours <code>===</code>.</p>",
                hints: ["Une chaîne « vide » ou qui ressemble à un nombre devient égale à <code>0</code> après conversion."],
                starter: L('const cle = null; // remplace null', ''),
                tests: [
                    { label: 'cle == 0', run: 'return cle == 0;', expected: true },
                    { label: 'cle === 0', run: 'return cle === 0;', expected: false },
                    { label: "typeof cle === 'string'", run: "return typeof cle === 'string';", expected: true, hidden: true }
                ],
                success: "Tu comprends maintenant pourquoi <code>===</code> est recommandé."
            }
        ]
    });
})();
