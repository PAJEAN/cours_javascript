/*
 * Moteur commun des mini-jeux JavaScript.
 * Aucune dépendance et aucun serveur : fonctionne en ouvrant simplement les pages (file://).
 *
 * Un chapitre est décrit par un fichier js/chapters/*.js qui appelle MG.register({...}).
 * Les solutions des élèves sont exécutées dans un Web Worker (avec délai maximal)
 * puis comparées aux tests définis dans chaque niveau.
 */
(function (global) {
    'use strict';

    /* ==================================================================
     * Exécution et vérification (s'exécute dans le Worker)
     * Cette fonction doit rester autonome : elle est sérialisée avec toString().
     * ================================================================== */
    function workerMain(self) {
        function fmt(v, seen) {
            seen = seen || [];
            if (v === undefined) return 'undefined';
            if (v === null) return 'null';
            if (typeof v === 'string') return JSON.stringify(v);
            if (typeof v === 'number') return Object.is(v, -0) ? '-0' : String(v);
            if (typeof v === 'function') return 'ƒ ' + (v.name || 'anonyme');
            if (typeof v !== 'object') return String(v);
            if (typeof v.$fn === 'string') return v.$fn;
            if (seen.indexOf(v) !== -1) return '[Circular]';
            seen = seen.concat([v]);
            if (v instanceof Promise) return 'Promise';
            if (Array.isArray(v)) return '[' + v.map(function (x) { return fmt(x, seen); }).join(', ') + ']';
            if (v instanceof Error) return v.name + ': ' + v.message;
            if (v instanceof Set) return 'Set(' + fmt(Array.from(v), seen) + ')';
            if (v instanceof Map) return 'Map(' + fmt(Array.from(v), seen) + ')';
            var name = v.constructor && v.constructor.name;
            var body = '{' + Object.keys(v).map(function (k) { return k + ': ' + fmt(v[k], seen); }).join(', ') + '}';
            return name && name !== 'Object' ? name + ' ' + body : body;
        }

        function deepEqual(a, b) {
            if (a === b || Object.is(a, b)) return true;
            if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
            if (Array.isArray(a) !== Array.isArray(b)) return false;
            if (a instanceof Set || a instanceof Map) {
                return a.constructor === b.constructor && deepEqual(Array.from(a), Array.from(b));
            }
            var ka = Object.keys(a), kb = Object.keys(b);
            if (ka.length !== kb.length) return false;
            return ka.every(function (k) {
                return Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]);
            });
        }

        // Les fonctions ne pouvant pas être transmises à un Worker, un test les décrit par { $fn: "x => x + 1" }.
        function revive(v) {
            if (Array.isArray(v)) return v.map(revive);
            if (v && typeof v === 'object') {
                if (typeof v.$fn === 'string') return (0, eval)('(' + v.$fn + ')');
                var out = {};
                Object.keys(v).forEach(function (k) { out[k] = revive(v[k]); });
                return out;
            }
            return v;
        }

        self.onmessage = async function (e) {
            var code = e.data.code;
            var tests = e.data.tests;
            var results = [];
            for (var i = 0; i < tests.length; i++) {
                var t = tests[i];
                // const : chaque test garde son propre tableau, même si un timer tardif appelle console.log.
                const logs = [];
                const log = function () {
                    logs.push(Array.prototype.map.call(arguments, function (x) {
                        return typeof x === 'string' ? x : fmt(x);
                    }).join(' '));
                };
                var fakeConsole = { log: log, info: log, warn: log, error: log };
                var rawArgs = t.args || [];
                var r = {
                    label: t.hidden ? 'Test caché' : (t.label || (t.fn + '(' + rawArgs.map(function (a) { return fmt(a); }).join(', ') + ')')),
                    hidden: !!t.hidden,
                    ok: false,
                    problems: []
                };
                try {
                    var args = revive(rawArgs);
                    var body = t.run || ('return ' + t.fn + '(...__args);');
                    var factory = new Function('console', '__args', code + '\n;return (async () => {\n' + body + '\n})();');
                    var got = await factory(fakeConsole, args);
                    var ok = true;
                    if ('expected' in t) {
                        r.got = fmt(got);
                        r.expected = fmt(t.expected);
                        if (!deepEqual(got, revive(t.expected))) ok = false;
                    }
                    if ('argsAfter' in t && !deepEqual(args, t.argsAfter)) {
                        ok = false;
                        r.problems.push('Les arguments ont été modifiés : ' + fmt(args) + ' au lieu de ' + fmt(t.argsAfter) + '.');
                    }
                    if ('logs' in t && !deepEqual(logs, t.logs)) {
                        ok = false;
                        r.problems.push('Affichage console obtenu : ' + fmt(logs) + ' — attendu : ' + fmt(t.logs) + '.');
                    }
                    r.ok = ok;
                } catch (err) {
                    r.error = (err && err.name ? err.name + ' : ' : '') + (err && err.message ? err.message : String(err));
                }
                r.logs = logs;
                if (r.hidden) {
                    delete r.got; delete r.expected; delete r.logs;
                    r.problems = [];
                    r.error = r.error ? 'Une erreur est survenue.' : undefined;
                }
                results.push(r);
                if (r.error && /^SyntaxError/.test(r.error)) break;
            }
            self.postMessage({ results: results });
        };
    }

    /* ==================================================================
     * Données et stockage
     * ================================================================== */
    var MG = {
        chapters: [],
        workerMain: workerMain,
        register: function (chapter) { MG.chapters.push(chapter); },
        // Assemble des lignes de code (évite les problèmes de guillemets et d'accents graves).
        lines: function () { return Array.prototype.join.call(arguments, '\n'); }
    };

    var STORE_KEY = 'mgjs:v1';

    function loadStore() {
        try { return JSON.parse(global.localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
    }
    function saveStore(s) {
        try { global.localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* stockage indisponible */ }
    }
    function chapterState(store, chapter) {
        store.levels = store.levels || {};
        store.levels[chapter.id] = store.levels[chapter.id] || {};
        return store.levels[chapter.id];
    }
    function countDone(chapter) {
        var st = (loadStore().levels || {})[chapter.id] || {};
        return chapter.levels.filter(function (l) { return st[l.id] && st[l.id].done; }).length;
    }
    MG.countDone = countDone;

    /* ==================================================================
     * Exécution côté page
     * ================================================================== */
    MG.run = function (code, tests, timeout) {
        return new Promise(function (resolve) {
            var worker, url, timer;
            try {
                var src = '(' + workerMain.toString() + ')(self);';
                url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
                worker = new Worker(url);
            } catch (err) {
                resolve({ fatal: "Ton navigateur n'a pas pu lancer l'exécution du code (" + err.message + ')' });
                return;
            }
            var finish = function (data) {
                clearTimeout(timer);
                worker.terminate();
                URL.revokeObjectURL(url);
                resolve(data);
            };
            timer = setTimeout(function () { finish({ timeout: true }); }, timeout || 4000);
            worker.onmessage = function (e) { finish(e.data); };
            worker.onerror = function (e) { finish({ fatal: e.message || 'Erreur inconnue.' }); };
            worker.postMessage({ code: code, tests: tests });
        });
    };

    function stripComments(code) {
        return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
    }

    MG.checkRules = function (code, rules) {
        var clean = stripComments(code);
        return (rules || []).filter(function (r) {
            return r.forbid ? r.re.test(clean) : !r.re.test(clean);
        }).map(function (r) { return r.message; });
    };

    /* ==================================================================
     * Interface
     * ================================================================== */
    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function el(tag, attrs, html) {
        var node = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (k) {
            if (k === 'class') node.className = attrs[k];
            else node.setAttribute(k, attrs[k]);
        });
        if (html !== undefined) node.innerHTML = html;
        return node;
    }

    function isFree() { return !!loadStore().free; }

    function isUnlocked(chapter, index) {
        if (index === 0 || isFree()) return true;
        var st = (loadStore().levels || {})[chapter.id] || {};
        var prev = chapter.levels[index - 1];
        return !!(st[prev.id] && st[prev.id].done);
    }

    /* ---------- Page de chapitre ---------- */
    MG.start = function (chapterId) {
        var chapter = MG.chapters.filter(function (c) { return c.id === chapterId; })[0];
        var root = document.getElementById('game');
        if (!chapter || !root) return;
        document.title = chapter.title + ' — Mini-jeux JavaScript';

        function currentIndex() {
            var n = parseInt(location.hash.slice(1), 10) - 1;
            if (isNaN(n) || n < 0 || n >= chapter.levels.length) n = 0;
            while (n > 0 && !isUnlocked(chapter, n)) n--;
            return n;
        }

        function navItem(level, i, state, index) {
            var done = !!(state[level.id] && state[level.id].done);
            var unlocked = isUnlocked(chapter, i);
            var li = el('li', { class: (i === index ? 'current ' : '') + (done ? 'done' : '') + (unlocked ? '' : ' locked') });
            var icon = done ? '✅' : (unlocked ? '▶️' : '🔒');
            li.innerHTML = unlocked
                ? '<a href="#' + (i + 1) + '">' + icon + ' ' + esc(level.title) + '</a>'
                : '<span>' + icon + ' ' + esc(level.title) + '</span>';
            return li;
        }

        function render() {
            var index = currentIndex();
            var level = chapter.levels[index];
            var state = chapterState(loadStore(), chapter);
            var saved = state[level.id] || {};
            var hintShown = 0;

            root.innerHTML = '';

            root.appendChild(el('header', { class: 'mg-top' },
                '<a href="index.html">← Accueil</a>' +
                '<h1>' + esc(chapter.title) + '</h1>' +
                '<a href="../cours/pages/' + chapter.course + '.html" target="_blank" rel="noopener">📖 Voir le cours</a>'));

            var layout = el('div', { class: 'mg-layout' });
            root.appendChild(layout);

            /* Liste des niveaux */
            var nav = el('nav', { class: 'mg-levels' }, '<h2>Niveaux</h2>');
            var ol = el('ol');
            nav.appendChild(ol);
            layout.appendChild(nav);
            function renderNav() {
                var st = chapterState(loadStore(), chapter);
                ol.innerHTML = '';
                chapter.levels.forEach(function (l, i) { ol.appendChild(navItem(l, i, st, index)); });
            }
            renderNav();

            /* Niveau courant */
            var main = el('main', { class: 'mg-level' });
            layout.appendChild(main);

            main.appendChild(el('h2', {}, 'Niveau ' + (index + 1) + ' / ' + chapter.levels.length + ' — ' + esc(level.title)));
            main.appendChild(el('section', { class: 'mg-mission' }, '<h3>🎯 Mission</h3>' + level.mission));
            main.appendChild(el('details', { class: 'mg-concepts', open: '' },
                '<summary>📚 Concepts à connaître</summary><div>' + level.concepts + '</div>'));

            /* Indices : masqués tant que l'élève ne clique pas */
            var hints = level.hints || [];
            if (hints.length) {
                var hintBox = el('section', { class: 'mg-hints' });
                var hintBtn = el('button', { type: 'button', class: 'mg-btn secondary' }, "💡 Afficher l'indice");
                var hintList = el('div', { class: 'mg-hint-list', hidden: '' });
                hintBtn.addEventListener('click', function () {
                    hintShown++;
                    hintList.hidden = false;
                    hintList.appendChild(el('div', { class: 'mg-hint' },
                        '<strong>Indice' + (hints.length > 1 ? ' ' + hintShown + ' / ' + hints.length : '') + ' :</strong> ' + hints[hintShown - 1]));
                    if (hintShown >= hints.length) hintBtn.hidden = true;
                    else hintBtn.textContent = '💡 Indice suivant (' + (hintShown + 1) + ' / ' + hints.length + ')';
                });
                hintBox.appendChild(hintBtn);
                hintBox.appendChild(hintList);
                main.appendChild(hintBox);
            }

            /* Éditeur */
            var editorBox = el('section', { class: 'mg-editor' }, '<h3>⌨️ Ton code</h3>');
            var area = el('textarea', { spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', rows: '14' });
            area.value = saved.code !== undefined ? saved.code : level.starter;
            editorBox.appendChild(area);
            var actions = el('div', { class: 'mg-actions' });
            var runBtn = el('button', { type: 'button', class: 'mg-btn' }, '▶ Tester ma solution <small>(Ctrl+Entrée)</small>');
            var resetBtn = el('button', { type: 'button', class: 'mg-btn secondary' }, '↺ Code de départ');
            actions.appendChild(runBtn);
            actions.appendChild(resetBtn);
            editorBox.appendChild(actions);
            main.appendChild(editorBox);

            var output = el('section', { class: 'mg-output', 'aria-live': 'polite' });
            main.appendChild(output);

            function persistCode(done) {
                var s = loadStore();
                var cs = chapterState(s, chapter);
                cs[level.id] = { done: done || !!(cs[level.id] && cs[level.id].done), code: area.value };
                saveStore(s);
            }

            area.addEventListener('input', function () { persistCode(false); });
            area.addEventListener('keydown', function (e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    var s = area.selectionStart, end = area.selectionEnd;
                    area.value = area.value.slice(0, s) + '  ' + area.value.slice(end);
                    area.selectionStart = area.selectionEnd = s + 2;
                    persistCode(false);
                } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    runBtn.click();
                }
            });
            resetBtn.addEventListener('click', function () {
                if (area.value === level.starter || confirm('Remplacer ton code par le code de départ ?')) {
                    area.value = level.starter;
                    persistCode(false);
                    output.innerHTML = '';
                }
            });

            runBtn.addEventListener('click', async function () {
                runBtn.disabled = true;
                output.innerHTML = '<p class="mg-wait">Exécution…</p>';
                var code = area.value;
                var ruleErrors = MG.checkRules(code, level.rules);
                var res = await MG.run(code, level.tests);
                runBtn.disabled = false;
                output.innerHTML = '';

                if (res.timeout) {
                    output.appendChild(el('div', { class: 'mg-error' },
                        "⏱️ Ton code met trop de temps à s'exécuter : y a-t-il une boucle infinie ou une promesse qui ne se termine jamais ?"));
                    return;
                }
                if (res.fatal) {
                    output.appendChild(el('div', { class: 'mg-error' }, '⚠️ ' + esc(res.fatal)));
                    return;
                }

                var results = res.results;
                var passed = results.filter(function (r) { return r.ok; }).length;
                var allOk = passed === level.tests.length && ruleErrors.length === 0;

                output.appendChild(el('h3', {}, 'Résultat : ' + passed + ' / ' + level.tests.length + ' tests réussis'));

                ruleErrors.forEach(function (m) {
                    output.appendChild(el('div', { class: 'mg-error' }, '📏 Consigne non respectée : ' + esc(m)));
                });

                var ul = el('ul', { class: 'mg-tests' });
                results.forEach(function (r) {
                    var li = el('li', { class: r.ok ? 'ok' : 'ko' });
                    var html = (r.ok ? '✅ ' : '❌ ') + (r.hidden ? '🔒 ' + esc(r.label) : '<code>' + esc(r.label) + '</code>');
                    if (!r.ok) {
                        if (r.error) html += '<div class="detail">💥 ' + esc(r.error) + '</div>';
                        else if (r.expected !== undefined && !r.hidden) {
                            html += '<div class="detail">Obtenu : <code>' + esc(r.got) + '</code> — Attendu : <code>' + esc(r.expected) + '</code></div>';
                        }
                        r.problems.forEach(function (p) { html += '<div class="detail">' + esc(p) + '</div>'; });
                    }
                    if (r.logs && r.logs.length) {
                        html += '<div class="detail console">Console : ' + r.logs.map(esc).join(' ⏎ ') + '</div>';
                    }
                    li.innerHTML = html;
                    ul.appendChild(li);
                });
                output.appendChild(ul);

                if (allOk) {
                    persistCode(true);
                    renderNav();
                    var next = index + 1 < chapter.levels.length;
                    var box = el('div', { class: 'mg-success' },
                        '<strong>🎉 Niveau validé !</strong>' + (level.success ? '<p>' + level.success + '</p>' : ''));
                    box.appendChild(el('a', { class: 'mg-btn', href: next ? '#' + (index + 2) : 'index.html' },
                        next ? 'Niveau suivant →' : "🏁 Chapitre terminé — retour à l'accueil"));
                    output.appendChild(box);
                }
            });
        }

        global.addEventListener('hashchange', function () { render(); global.scrollTo(0, 0); });
        render();
    };

    /* ---------- Page d'accueil ---------- */
    MG.hub = function () {
        var root = document.getElementById('game');
        if (!root) return;

        function render() {
            root.innerHTML = '';
            root.appendChild(el('section', { class: 'mg-intro' },
                '<h2>Bienvenue, agent 👋</h2>' +
                "<p>Chaque chapitre correspond à une page du cours. Résous les niveaux dans l'ordre : " +
                'tu écris du JavaScript, le jeu le <strong>teste automatiquement</strong> et débloque la suite.</p>' +
                '<p class="muted">Tout fonctionne hors ligne ; ta progression est enregistrée dans ce navigateur.</p>'));

            var grid = el('div', { class: 'mg-grid' });
            MG.chapters.forEach(function (c, i) {
                var done = countDone(c);
                var total = c.levels.length;
                grid.appendChild(el('a', { class: 'mg-card' + (done === total ? ' complete' : ''), href: c.id + '.html' },
                    '<span class="num">' + (i + 1) + '</span>' +
                    '<h3>' + esc(c.title) + '</h3>' +
                    '<p>' + c.description + '</p>' +
                    '<div class="bar"><div style="width:' + Math.round(100 * done / total) + '%"></div></div>' +
                    '<small>' + done + ' / ' + total + ' niveaux' + (done === total ? ' 🏆' : '') + '</small>'));
            });
            root.appendChild(grid);

            var tools = el('section', { class: 'mg-tools' });
            var free = el('label', {}, '<input type="checkbox"> Mode libre (déverrouiller tous les niveaux)');
            var cb = free.querySelector('input');
            cb.checked = isFree();
            cb.addEventListener('change', function () {
                var s = loadStore(); s.free = cb.checked; saveStore(s);
            });
            var reset = el('button', { type: 'button', class: 'mg-btn secondary' }, 'Réinitialiser ma progression');
            reset.addEventListener('click', function () {
                if (confirm('Effacer toute ta progression et ton code enregistré ?')) {
                    saveStore({});
                    render();
                }
            });
            tools.appendChild(free);
            tools.appendChild(reset);
            root.appendChild(tools);
        }
        render();
    };

    global.MG = MG;
    if (typeof module !== 'undefined' && module.exports) module.exports = MG;
})(typeof window !== 'undefined' ? window : globalThis);
