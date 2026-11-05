(function () {
    var L = MG.lines;

    MG.register({
        id: 'asynchronicite',
        title: "L'asynchronicité",
        course: 'l_asynchronicite',
        description: 'Promesses, <code>.then()</code> / <code>.catch()</code>, <code>Promise.all</code> et <code>async / await</code> : attendre sans bloquer.',
        levels: [
            {
                id: 'a1',
                title: 'Patienter un instant',
                mission: "<p>Écris <code>attendre(ms)</code> qui retourne une <b>promesse</b> résolue après <code>ms</code> millisecondes.</p>",
                concepts: "<p>Une <b>promesse</b> (<i>Promise</i>) représente une valeur qui sera disponible plus tard. On la crée avec <code>new Promise((resolve, reject) =&gt; { ... })</code> : on appelle <code>resolve(valeur)</code> en cas de succès, <code>reject(erreur)</code> en cas d'échec.</p>" +
                    "<pre>const p = new Promise((resolve) =&gt; {\n  setTimeout(() =&gt; resolve('fini'), 500);\n});\np.then(msg =&gt; console.log(msg));</pre>" +
                    "<p><code>setTimeout(fonction, delai)</code> exécute la fonction après <code>delai</code> millisecondes.</p>",
                hints: ["Appelle <code>resolve()</code> à l'intérieur d'un <code>setTimeout</code>."],
                starter: L('function attendre(ms) {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'attendre(10) retourne une Promise', run: 'return attendre(10) instanceof Promise;', expected: true },
                    { label: 'attendre(100) dure au moins 100 ms', run: 'const t = Date.now(); await attendre(100); return Date.now() - t >= 95;', expected: true },
                    { label: 'attendre(0) se termine', run: 'await attendre(0); return "ok";', expected: 'ok', hidden: true }
                ]
            },
            {
                id: 'a2',
                title: 'Le calcul différé',
                mission: "<p>Écris <code>doublerApres(n, ms)</code> qui retourne une promesse résolue, après <code>ms</code> millisecondes, avec la valeur <code>n * 2</code>.</p>",
                concepts: "<p>Une promesse peut être résolue avec une <b>valeur</b> : celle-ci est transmise à la fonction passée à <code>.then()</code>.</p>" +
                    "<pre>new Promise(resolve =&gt; resolve(42))\n  .then(valeur =&gt; console.log(valeur)); // 42</pre>",
                hints: ["Reprends ta solution précédente et donne une valeur à <code>resolve</code>."],
                starter: L('function doublerApres(n, ms) {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'await doublerApres(21, 50)', run: 'return await doublerApres(21, 50);', expected: 42 },
                    { label: 'doublerApres(4, 10).then(...)', run: 'return await new Promise(r => doublerApres(4, 10).then(r));', expected: 8 },
                    { label: 'doublerApres(-5, 0)', run: 'return await doublerApres(-5, 0);', expected: -10, hidden: true }
                ]
            },
            {
                id: 'a3',
                title: 'Division risquée',
                mission: "<p>Écris <code>diviser(a, b)</code> qui retourne une promesse :</p><ul><li>résolue avec <code>a / b</code> en temps normal ;</li><li><b>rejetée</b> avec <code>new Error('Division par zéro')</code> si <code>b</code> vaut 0.</li></ul>",
                concepts: "<p>Une promesse peut avoir trois états : <i>pending</i> (en attente), <i>fulfilled</i> (résolue) ou <i>rejected</i> (rejetée). On gère l'échec avec <code>.catch()</code> :</p>" +
                    "<pre>new Promise((resolve, reject) =&gt; {\n  reject(new Error('Oups'));\n}).catch(e =&gt; console.log(e.message)); // 'Oups'</pre>",
                hints: ["Dans la fonction passée à <code>new Promise</code>, teste <code>b === 0</code> puis appelle <code>reject(...)</code>, sinon <code>resolve(a / b)</code>."],
                starter: L('function diviser(a, b) {', '  // à compléter', '}', ''),
                tests: [
                    { label: 'await diviser(10, 2)', run: 'return await diviser(10, 2);', expected: 5 },
                    { label: 'diviser(1, 0) est rejetée avec le bon message', run: "try { await diviser(1, 0); return 'résolue'; } catch (e) { return e.message; }", expected: 'Division par zéro' },
                    { label: 'diviser(9, 3)', run: 'return await diviser(9, 3);', expected: 3, hidden: true }
                ]
            },
            {
                id: 'a4',
                title: 'La chaîne de traitement',
                mission: "<p>Écris <code>traiter(promesse)</code> : elle reçoit une promesse qui produira un nombre et retourne une promesse qui produit <code>(nombre + 1) * 2</code>. Utilise deux appels <code>.then()</code> enchaînés.</p>",
                concepts: "<p><code>.then()</code> retourne <b>une nouvelle promesse</b> : on peut donc les enchaîner. La valeur retournée par un <code>.then</code> est transmise au suivant.</p>" +
                    "<pre>Promise.resolve(1)\n  .then(n =&gt; n + 1)    // 2\n  .then(n =&gt; n * 10)   // 20\n  .then(console.log);</pre>",
                hints: ["N'oublie pas de <code>return</code> la promesse obtenue en fin de fonction."],
                starter: L('function traiter(promesse) {', '  // à compléter', '}', ''),
                rules: [{ re: /\.then\s*\([\s\S]*\.then\s*\(/, message: 'Enchaîne deux appels à .then().' }],
                tests: [
                    { label: 'traiter(Promise.resolve(4))', run: 'return await traiter(Promise.resolve(4));', expected: 10 },
                    { label: 'traiter(Promise.resolve(0))', run: 'return await traiter(Promise.resolve(0));', expected: 2 },
                    { label: 'traiter(promesse différée)', run: 'return await traiter(new Promise(r => setTimeout(() => r(9), 30)));', expected: 20, hidden: true }
                ]
            },
            {
                id: 'a5',
                title: 'Filet de sécurité',
                mission: "<p>Écris <code>valeurOuDefaut(promesse)</code> qui retourne une promesse : elle produit la valeur de <code>promesse</code> si elle réussit, ou la chaîne <code>'défaut'</code> si elle est rejetée.</p>",
                concepts: "<p><code>.catch()</code> intercepte une erreur et peut retourner une <b>valeur de remplacement</b> : la promesse résultante est alors considérée comme résolue.</p>" +
                    "<pre>Promise.reject(new Error('x'))\n  .catch(() =&gt; 'secours')\n  .then(v =&gt; console.log(v)); // 'secours'</pre>",
                hints: ["Ajoute simplement un <code>.catch(...)</code> à la promesse reçue, et retourne le résultat."],
                starter: L('function valeurOuDefaut(promesse) {', '  // à compléter', '}', ''),
                rules: [{ re: /\.catch\s*\(|\btry\b/, message: 'Gère l\'erreur avec .catch() (ou try / catch).' }],
                tests: [
                    { label: "valeurOuDefaut(Promise.resolve('ok'))", run: "return await valeurOuDefaut(Promise.resolve('ok'));", expected: 'ok' },
                    { label: "valeurOuDefaut(Promise.reject(new Error('x')))", run: "return await valeurOuDefaut(Promise.reject(new Error('x')));", expected: 'défaut' },
                    { label: 'valeurOuDefaut(promesse rejetée plus tard)', run: "return await valeurOuDefaut(new Promise((_, rej) => setTimeout(() => rej('non'), 20)));", expected: 'défaut', hidden: true }
                ]
            },
            {
                id: 'a6',
                title: 'Tous en parallèle',
                mission: "<p>La fonction <code>chargerUtilisateur(id)</code> est fournie : elle met 150 ms à répondre. Écris <code>chargerTout(ids)</code> qui retourne une promesse produisant le tableau des résultats, <b>dans l'ordre des ids</b>, en lançant tous les chargements <b>en parallèle</b> (4 utilisateurs doivent prendre ≈ 150 ms, pas 600 ms).</p>",
                concepts: "<p><code>Promise.all([p1, p2, p3])</code> retourne une promesse qui attend que <b>toutes</b> les promesses soient terminées (ou qu'une échoue) et produit le <b>tableau</b> de leurs résultats, dans l'ordre.</p>" +
                    "<pre>const resultats = await Promise.all([p1, p2, p3]);\n// ou\nPromise.all([p1, p2, p3]).then(resultats =&gt; ...);</pre>" +
                    "<p>Combine-la avec <code>map()</code> pour transformer un tableau de valeurs en tableau de promesses.</p>",
                hints: ["<code>ids.map(chargerUtilisateur)</code> lance tous les chargements d'un coup et retourne un tableau de promesses.", "Passe ce tableau à <code>Promise.all</code> et retourne le résultat."],
                starter: L(
                    'function chargerUtilisateur(id) {',
                    '  return new Promise(resolve => {',
                    "    setTimeout(() => resolve('Utilisateur ' + id), 150);",
                    '  });',
                    '}',
                    '',
                    'function chargerTout(ids) {',
                    '  // à compléter',
                    '}',
                    ''),
                rules: [{ re: /Promise\.all\s*\(/, message: 'Utilise Promise.all().' }],
                tests: [
                    { label: 'chargerTout([1, 2, 3, 4]) : résultats dans l\'ordre', run: 'return await chargerTout([1, 2, 3, 4]);', expected: ['Utilisateur 1', 'Utilisateur 2', 'Utilisateur 3', 'Utilisateur 4'] },
                    { label: 'chargerTout([1, 2, 3, 4]) : exécution en parallèle (< 400 ms)', run: 'const t = Date.now(); await chargerTout([1, 2, 3, 4]); return Date.now() - t < 400;', expected: true },
                    { label: 'chargerTout([]) ', run: 'return await chargerTout([]);', expected: [], hidden: true }
                ]
            },
            {
                id: 'a7',
                title: 'Async / await',
                mission: "<p>La fonction <code>obtenirNombre(n)</code> est fournie : elle retourne une promesse résolue avec <code>n</code> après 50 ms. Écris une fonction <code>async</code> nommée <code>additionAsync(a, b)</code> qui utilise <code>await</code> pour retourner <code>obtenirNombre(a) + obtenirNombre(b)</code> (la somme des <em>valeurs</em>, pas des promesses !).</p>",
                concepts: "<p><code>async / await</code> est une écriture plus lisible des promesses. Une fonction <code>async</code> retourne toujours une promesse, et <code>await</code> met la fonction en pause jusqu'à ce que la promesse soit terminée :</p>" +
                    "<pre>async function afficher() {\n  const valeur = await Promise.resolve(42);\n  console.log(valeur);  // 42\n}</pre>" +
                    "<p><code>await</code> n'est utilisable que dans une fonction <code>async</code> (ou au niveau principal d'un module).</p>",
                hints: ["Place <code>await</code> devant <b>chaque</b> appel de <code>obtenirNombre</code>."],
                starter: L(
                    'function obtenirNombre(n) {',
                    '  return new Promise(resolve => setTimeout(() => resolve(n), 50));',
                    '}',
                    '',
                    '// Écris additionAsync ici',
                    ''),
                rules: [
                    { re: /\basync\b/, message: 'Déclare la fonction avec async.' },
                    { re: /\bawait\b/, message: 'Utilise await.' }
                ],
                tests: [
                    { label: 'await additionAsync(2, 3)', run: 'return await additionAsync(2, 3);', expected: 5 },
                    { label: 'additionAsync(1, 1) retourne une Promise', run: 'return additionAsync(1, 1) instanceof Promise;', expected: true },
                    { label: 'additionAsync(-4, 4)', run: 'return await additionAsync(-4, 4);', expected: 0, hidden: true }
                ],
                success: "Tu sais maintenant attendre sans bloquer. Mission accomplie, agent ! 🏆"
            }
        ]
    });
})();
