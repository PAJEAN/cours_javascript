/* ==== Document initialization ==== */
(() => {
    // Include header to document */
    let header = document.querySelector('#header-container');
    let title = header.textContent;
    header.outerHTML = /* html */`
        <header>
            <h1 class="title">${title}</h1>
            <div class="toolbar">
                <button class="btn" id="btn-print" title="Imprimer / Exporter en PDF">🖨️ Imprimer</button>
                <button class="btn" id="btn-theme" title="Changer le thème" data-initial="light">🌗 Thème</button>
            </div>
            <!-- Bouton retour accueil -->
            <a href="../index.html" class="back-home">🏠</a>
        </header>
    `;
})();

(() => {
    /* Theme */
    let theme_name_attribute = 'data-initial';
    const btn_theme = document.getElementById('btn-theme');
    if (!btn_theme.hasAttribute(theme_name_attribute)) {
        console.warn(`The button to change the theme does not have the ${theme_name_attribute} attribute`);
        return;
    }

    const body = document.body;
    body.classList.add(btn_theme.getAttribute(theme_name_attribute));

    btn_theme.addEventListener('click', () => {
        let old_theme = btn_theme.getAttribute(theme_name_attribute);
        let new_theme = old_theme == 'light'? 'dark': 'light';
        body.classList.remove(old_theme);
        body.classList.add(new_theme);
        btn_theme.setAttribute(theme_name_attribute, new_theme);
    });
})();

(() => {
    /* Print button */
    const btn_print = document.querySelector('#btn-print');
    btn_print.addEventListener('click', () => window.print());
})();

(() => {
    /* Auto-resize textarea on input */
    let editors = document.querySelectorAll('.editor');
    editors.forEach(editor => {
        const autoSize = () => { editor.style.height = 'auto'; editor.style.height = Math.min(editor.scrollHeight + 2, 800) + 'px'; };
        editor.addEventListener('input', autoSize);
        autoSize();
    })
})();

(() => {
    /* Toggle hidden answer */
    let btn_answers = document.querySelectorAll('.toggle-answer');
    btn_answers.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const is_hidden = answer.classList.contains('hidden');

            if (is_hidden) {
                if (button.hasAttribute('data-pw')) {
                    const code = prompt('Veuillez entrer le code', '');
                    if (code != button.getAttribute('data-pw')) {
                        return;
                    }
                }
                answer.classList.remove('hidden');
                button.textContent = "Masquer";
                let textareas = answer.querySelectorAll('textarea');
                if (textareas.length > 0) {
                    textareas.forEach(textarea => textarea.dispatchEvent(new Event('input')));
                }
            } else {
                answer.classList.add('hidden');
                button.textContent = "Réafficher";
            }
        });
    });
})();

(() => {
    /* Include template html to document */
    let template = document.querySelector('#template-container');
    template.outerHTML = /* html */`
        <template id="cell-template">
            <section class="cell">
                <header>
                    <div class="cell-title">
                        <span class="badge">
                            <span class="dot"></span>
                            <span class="title-text">JavaScript</span>
                        </span>
                    </div>
                    <div class="cell-actions">
                        <button class="btn run">
                            <span class="icon">▶</span>
                            <span class="label">Exécuter</span>
                        </button>
                        <button class="btn reset">
                            <span class="icon">⟳</span>
                            <span class="label">Réinitialiser</span>
                        </button>

                        <button class="btn clear">
                            <span class="icon">🧹</span>
                            <span class="label">Effacer</span>
                        </button>
                    </div>
                </header>
                <textarea class="editor" spellcheck="false"></textarea>
                <div class="output" aria-live="polite"></div>
            </section>
        </template>`;
})();


/* ==== Managing code cells ==== */
function createSandboxIframe() {
    /* Creating the code execution environment within an iframe */
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.style.display = 'none';
    const src = /* html */`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
            // Send message to main document.
            const send = (type, payload) => parent.postMessage({type, payload}, '*');

            // Capture console message.
            console.log = (...args) => { send('log', args.map(format)); };
            console.warn = (...args) => { send('warn', args.map(format)); };
            console.error = (...args) => { send('error', args.map(format)); };
            
            function format(v){
                try {
                    if (typeof v === 'object')
                        return JSON.stringify(v, null, 2);
                    } catch(e) {}
                return String(v);
            }

            async function run(code) {
                try {
                    const wrapped = '(async()=>{\\n' + code + '\\n})();';
                    // eval() execute a string like javascript code.
                    const result = await eval(wrapped);
                } catch (e) {
                    send('error', [String(e && e.stack ? e.stack : e)]);
                } finally {
                    send('done');
                }
            }

            // Capture message from main document.
            window.addEventListener('message', ev => {
                if (!ev.data || ev.data.type !== 'exec') return;
                run(ev.data.code);
            });
            </script>
        </body>
    </html>`;
    iframe.srcdoc = src;
    return iframe;
}

function appendLines(out, lines, cls = '') {
    /* Add a line in the result of a code cell */
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.textContent = lines.join(' ');
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
}

function attachCellBehavior(cell, title, prefilledCode) {
    /* Adds logic and interactions to the code cell */
    const editor = cell.querySelector('.editor');
    const out = cell.querySelector('.output');
    const btn_run = cell.querySelector('.run');
    const btn_reset = cell.querySelector('.reset');
    const btn_clear = cell.querySelector('.clear');
    const cell_title = cell.querySelector('.title-text');

    // Title of the cell.
    cell_title.innerHTML = title == '' ? 'JavaScript': title;

    // Auto-resize textarea on input.
    const autoSize = () => { editor.style.height = 'auto'; editor.style.height = Math.min(editor.scrollHeight + 2, 800) + 'px'; };
    editor.addEventListener('input', autoSize);
    autoSize();

    // Create the sandbox iframe.
    let iframe = createSandboxIframe();
    cell.appendChild(iframe);

    function clearOutput() {
        out.textContent = '';
    }

    function resetSandbox() {
        editor.value = prefilledCode;
    }

    function run() {
        clearOutput();
        const code = editor.value;

        // Listen for this cell's messages only while running.
        const handler = (ev) => {
            const { type, payload } = ev.data || {};                    
            if (!type) return;
            if (type === 'log') appendLines(out, payload);
            if (type === 'warn') appendLines(out, payload, 'warn');
            if (type === 'error') appendLines(out, payload, 'err');
            if (type === 'done') window.removeEventListener('message', handler);
        };
        // Add a listener to the main document.
        window.addEventListener('message', handler);
        // Send a message to the sandbox iframe.
        iframe.contentWindow.postMessage({ type: 'exec', code }, '*');
    }

    // Init buttons.
    btn_run.addEventListener('click', run);
    btn_reset.addEventListener('click', resetSandbox);
    btn_clear.addEventListener('click', clearOutput);

    // Ctrl/Cmd+Enter to run
    editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            run();
        }
    });
}

function addCell(id_cell, title = '', code = '') {
    const tpl = document.querySelector('#cell-template');
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.editor').value = code.trim();
    const cellsRoot = document.querySelector(`#${id_cell}`);
    cellsRoot.appendChild(node);
    attachCellBehavior(node, title, code.trim());
}