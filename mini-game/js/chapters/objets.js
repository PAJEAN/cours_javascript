(function () {
    var L = MG.lines;

    MG.register({
        id: 'objets',
        title: 'Les objets',
        course: 'les_objets',
        description: 'Création d\'objets, <code>class</code>, héritage avec <code>extends</code>, <code>this</code>, attributs statiques et copie d\'objets.',
        levels: [
            {
                id: 'o1',
                title: 'La fiche agent',
                mission: "<p>Écris <code>creerPersonne(nom, age)</code> qui retourne un objet possédant deux propriétés : <code>nom</code> et <code>age</code>.</p>",
                concepts: "<p>Un <b>objet littéral</b> regroupe des couples clé / valeur :</p>" +
                    "<pre>const chat = { nom: 'Mistigri', age: 3 };\nchat.nom;        // 'Mistigri'\nchat['age'];     // 3\nchat.poids = 4;  // ajoute une propriété</pre>" +
                    "<p>Si la variable porte le même nom que la clé, on peut écrire <code>{ nom, age }</code>.</p>",
                hints: ["Retourne simplement <code>{ nom: nom, age: age }</code> (ou la version abrégée)."],
                starter: L('function creerPersonne(nom, age) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'creerPersonne', args: ['Ada', 36], expected: { nom: 'Ada', age: 36 } },
                    { fn: 'creerPersonne', args: ['Linus', 54], expected: { nom: 'Linus', age: 54 } },
                    { fn: 'creerPersonne', args: ['Grace', 85], expected: { nom: 'Grace', age: 85 }, hidden: true }
                ]
            },
            {
                id: 'o2',
                title: 'Un an plus tard',
                mission: "<p>Écris <code>vieillir(personne)</code> qui retourne un <b>nouvel objet</b> identique à <code>personne</code> mais dont l'âge est augmenté de 1. L'objet d'origine ne doit pas être modifié.</p>",
                concepts: "<p>Un objet passé à une fonction est transmis <b>par référence</b> : modifier ses propriétés modifie l'objet de l'appelant. Pour travailler sur une copie, on peut utiliser <code>Object.assign()</code> ou l'opérateur de décomposition :</p>" +
                    "<pre>const copie = { ...original };\nconst modifie = { ...original, age: 40 };\nObject.assign({}, original, { age: 40 });</pre>",
                hints: ["<code>{ ...personne, age: personne.age + 1 }</code> crée une copie en remplaçant la propriété <code>age</code>."],
                starter: L('function vieillir(personne) {', '  // à compléter', '}', ''),
                tests: [
                    { fn: 'vieillir', args: [{ nom: 'Ada', age: 36 }], expected: { nom: 'Ada', age: 37 }, argsAfter: [{ nom: 'Ada', age: 36 }] },
                    { fn: 'vieillir', args: [{ nom: 'Bob', age: 0, ville: 'Lyon' }], expected: { nom: 'Bob', age: 1, ville: 'Lyon' }, argsAfter: [{ nom: 'Bob', age: 0, ville: 'Lyon' }], hidden: true }
                ]
            },
            {
                id: 'o3',
                title: "L'usine à rectangles",
                mission: "<p>Complète la classe <code>Rectangle</code> :</p><ul><li>le constructeur reçoit <code>largeur</code> et <code>hauteur</code> et les stocke dans des attributs du même nom ;</li><li><code>aire()</code> retourne la surface ;</li><li><code>perimetre()</code> retourne le périmètre.</li></ul>",
                concepts: "<p>Une <b>classe</b> est un modèle pour créer des objets. Le mot-clé <code>this</code> désigne l'objet en cours :</p>" +
                    "<pre>class Chien {\n  constructor(nom) {\n    this.nom = nom;\n  }\n  aboyer() {\n    return this.nom + ' dit Wouf !';\n  }\n}\nnew Chien('Rex').aboyer();</pre>",
                hints: ["Dans le constructeur : <code>this.largeur = largeur;</code>. Dans les méthodes, utilise <code>this.largeur</code> et <code>this.hauteur</code>."],
                starter: L(
                    'class Rectangle {',
                    '  constructor(largeur, hauteur) {',
                    '    // à compléter',
                    '  }',
                    '',
                    '  aire() {',
                    '    // à compléter',
                    '  }',
                    '',
                    '  perimetre() {',
                    '    // à compléter',
                    '  }',
                    '}',
                    ''),
                tests: [
                    { label: 'new Rectangle(3, 4) : largeur et hauteur', run: 'const r = new Rectangle(3, 4); return [r.largeur, r.hauteur];', expected: [3, 4] },
                    { label: 'new Rectangle(3, 4).aire()', run: 'return new Rectangle(3, 4).aire();', expected: 12 },
                    { label: 'new Rectangle(3, 4).perimetre()', run: 'return new Rectangle(3, 4).perimetre();', expected: 14 },
                    { label: 'new Rectangle(10, 1)', run: 'const r = new Rectangle(10, 1); return [r.aire(), r.perimetre()];', expected: [10, 22], hidden: true }
                ]
            },
            {
                id: 'o4',
                title: 'Le carré est un rectangle',
                mission: "<p>La classe <code>Rectangle</code> est fournie. Écris la classe <code>Carre</code> qui <b>hérite</b> de <code>Rectangle</code> : son constructeur ne reçoit qu'un seul paramètre <code>cote</code>.</p>",
                concepts: "<p><code>extends</code> permet à une classe d'hériter des attributs et des méthodes d'une autre. Dans le constructeur d'une classe fille, <code>super(...)</code> appelle le constructeur de la classe mère et doit être appelé <b>avant</b> d'utiliser <code>this</code>.</p>" +
                    "<pre>class Animal {\n  constructor(nom) { this.nom = nom; }\n}\nclass Chat extends Animal {\n  constructor(nom) {\n    super(nom);\n  }\n}</pre>",
                hints: ["Le constructeur de <code>Carre</code> appelle <code>super(cote, cote)</code>. Pas besoin de redéfinir <code>aire()</code> !"],
                starter: L(
                    'class Rectangle {',
                    '  constructor(largeur, hauteur) {',
                    '    this.largeur = largeur;',
                    '    this.hauteur = hauteur;',
                    '  }',
                    '',
                    '  aire() {',
                    '    return this.largeur * this.hauteur;',
                    '  }',
                    '',
                    '  perimetre() {',
                    '    return 2 * (this.largeur + this.hauteur);',
                    '  }',
                    '}',
                    '',
                    '// Écris la classe Carre ici',
                    ''),
                rules: [
                    { re: /class\s+Carre\s+extends\s+Rectangle\b/, message: 'Déclare class Carre extends Rectangle.' },
                    { re: /\bsuper\s*\(/, message: 'Appelle super(...) dans le constructeur.' }
                ],
                tests: [
                    { label: 'new Carre(5).aire()', run: 'return new Carre(5).aire();', expected: 25 },
                    { label: 'new Carre(3) instanceof Rectangle', run: 'return new Carre(3) instanceof Rectangle;', expected: true },
                    { label: 'new Carre(2).perimetre()', run: 'return new Carre(2).perimetre();', expected: 8, hidden: true }
                ]
            },
            {
                id: 'o5',
                title: 'Le compteur chaînable',
                mission: "<p>Crée un objet littéral <code>compteur</code> avec :</p><ul><li>une propriété <code>valeur</code> initialisée à <code>0</code> ;</li><li>une méthode <code>incrementer()</code> qui ajoute 1 à <code>valeur</code> et <b>retourne l'objet lui-même</b>, pour pouvoir écrire <code>compteur.incrementer().incrementer()</code>.</li></ul>",
                concepts: "<p>Dans une <b>méthode</b>, <code>this</code> désigne l'objet sur lequel on l'appelle :</p>" +
                    "<pre>const lampe = {\n  allumee: false,\n  basculer() {\n    this.allumee = !this.allumee;\n    return this;\n  }\n};</pre>" +
                    "<p>⚠️ Une fonction fléchée n'a <b>pas</b> son propre <code>this</code> : pour une méthode d'objet, utilise la syntaxe classique.</p>",
                hints: ["Écris la méthode sous la forme <code>incrementer() { ... }</code> et termine-la par <code>return this;</code>."],
                starter: L('const compteur = {', '  // à compléter', '};', ''),
                rules: [{ re: /\bthis\b/, message: 'Utilise this dans la méthode.' }],
                tests: [
                    { label: 'valeur initiale', run: 'return compteur.valeur;', expected: 0 },
                    { label: 'compteur.incrementer().incrementer().valeur', run: 'return compteur.incrementer().incrementer().valeur;', expected: 2 },
                    { label: 'incrementer() retourne compteur', run: 'return compteur.incrementer() === compteur;', expected: true, hidden: true }
                ]
            },
            {
                id: 'o6',
                title: 'Matricules uniques',
                mission: "<p>Complète la classe <code>Agent</code> : chaque nouvel agent reçoit un attribut <code>id</code> unique (1 pour le premier créé, 2 pour le deuxième, ...). La classe expose aussi un attribut <b>statique</b> <code>Agent.total</code> qui indique combien d'agents ont été créés.</p>",
                concepts: "<p>Un attribut <b>statique</b> appartient à la <b>classe</b> et non à ses instances ; on y accède avec le nom de la classe.</p>" +
                    "<pre>class Chien {\n  static nombre = 0;\n  constructor() {\n    Chien.nombre++;\n  }\n}\nnew Chien();\nChien.nombre;  // 1</pre>",
                hints: ["Déclare <code>static total = 0;</code> dans la classe, incrémente-le dans le constructeur puis recopie-le dans <code>this.id</code>."],
                starter: L(
                    'class Agent {',
                    '  // à compléter',
                    '',
                    '  constructor() {',
                    '    // à compléter',
                    '  }',
                    '}',
                    ''),
                tests: [
                    { label: 'new Agent().id', run: 'return new Agent().id;', expected: 1 },
                    { label: 'trois agents créés', run: 'const a = new Agent(); const b = new Agent(); const c = new Agent(); return [a.id, b.id, c.id, Agent.total];', expected: [1, 2, 3, 3] },
                    { label: 'Agent.total au départ', run: 'return Agent.total;', expected: 0, hidden: true }
                ]
            },
            {
                id: 'o7',
                title: 'Photocopie intégrale',
                mission: "<p>Écris <code>copierProfil(profil)</code> qui retourne une copie <b>indépendante</b> de l'objet, y compris pour les objets imbriqués (ex : <code>adresse</code>). Modifier la copie ne doit jamais modifier l'original.</p>",
                concepts: "<p>Une copie <b>superficielle</b> (<code>{ ...obj }</code>, <code>Object.assign</code>) copie les primitives par valeur mais les objets imbriqués <b>par référence</b> : ils restent partagés.</p>" +
                    "<p><code>structuredClone()</code> réalise une copie <b>profonde</b>. Elle copie les données, mais ni les méthodes ni la chaîne de prototypes.</p>" +
                    "<pre>const a = { ville: { nom: 'Paris' } };\nconst b = structuredClone(a);\nb.ville.nom = 'Lyon';\na.ville.nom;  // 'Paris'</pre>",
                hints: ["Une fonction native fait tout le travail : <code>structuredClone(profil)</code>."],
                starter: L('function copierProfil(profil) {', '  // à compléter', '}', ''),
                tests: [
                    { label: "copierProfil(p) a les mêmes valeurs", run: "const p = { nom: 'Ada', adresse: { ville: 'Paris' } }; return copierProfil(p);", expected: { nom: 'Ada', adresse: { ville: 'Paris' } } },
                    { label: "modifier la copie ne change pas l'original", run: "const p = { nom: 'Ada', adresse: { ville: 'Paris' } }; const c = copierProfil(p); c.adresse.ville = 'Lyon'; return p.adresse.ville;", expected: 'Paris' },
                    { label: 'la copie est un nouvel objet', run: "const p = { a: 1 }; return copierProfil(p) !== p;", expected: true, hidden: true },
                    { label: 'les tableaux imbriqués sont copiés', run: "const p = { tags: ['a'] }; const c = copierProfil(p); c.tags.push('b'); return p.tags.length;", expected: 1, hidden: true }
                ],
                success: "Tu sais créer, hériter et copier des objets."
            }
        ]
    });
})();
