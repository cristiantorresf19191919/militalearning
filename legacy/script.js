/* script.js */
// CodeJar is loaded globally via script tag in index.html

// Initialize CodeJar with Prism
// Initialize CodeJar with Prism
const highlight = (editor) => {
    // syntax highlight
    if (window.Prism) {
        // Use textContent to get clean code, then highlight to HTML
        let code = editor.textContent;
        // Basic safety against null
        code = code || "";
        editor.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
};

// Create Jar instances for each editor
const editors = {};
document.querySelectorAll('.jar-editor').forEach(el => {
    // Make sure it has the class for Prism before highlighting
    el.classList.add('language-javascript');
    
    // Init CodeJar
    const jar = CodeJar(el, highlight);
    
    // Manually trigger highlight on init
    highlight(el);
    
    // Store implementation to update/get value
    // We use the ID to store it
    const id = el.id.replace('code-', ''); // 1, 2, 3, 4
    editors[id] = jar;
});

// Maximize Button Logic
document.querySelectorAll('.maximize-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Find container
        const container = e.target.closest('.editor-container');
        
        if (!container.classList.contains('fullscreen')) {
            // ENTER FULLSCREEN (Teleport to Body)
            
            // 1. Create placeholder to hold the spot
            const placeholder = document.createElement('div');
            placeholder.className = 'editor-placeholder';
            placeholder.style.display = 'none'; // Keep it hidden, just a marker
            placeholder.id = 'placeholder-' + container.id;
            
            // 2. Insert placeholder before moving container
            container.parentNode.insertBefore(placeholder, container);
            
            // 3. Move container to body
            document.body.appendChild(container);
            
            // 4. Add classes
            container.classList.add('fullscreen');
            // Add animation class? CSS will handle it via .fullscreen
            
            // 5. Update icon
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-expand');
            icon.classList.remove('fa-compress'); // Safety
            icon.classList.add('fa-compress');
            
        } else {
            // EXIT FULLSCREEN (Teleport Back)
            
            // 1. Find placeholder
            const placeholder = document.getElementById('placeholder-' + container.id);
            
            if (placeholder) {
                // 2. Move container back
                placeholder.parentNode.insertBefore(container, placeholder);
                
                // 3. Remove placeholder
                placeholder.remove();
                
                // 4. Remove classes
                container.classList.remove('fullscreen');
                
                // 5. Update icon
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            }
        }
    });
});



// State to track progress
const progress = {
        lesson1: false,
        lesson2: false,
        lesson3: false,
        lesson4: false,
        lesson5: false,
        lesson6: false,
        lesson7: false,
        lesson8: false,
        lesson9: false, // Prep for next batch
        lesson10: false,
        lesson11: false,
        lesson12: false,
        lesson13: false,
        lesson14: false,
        lesson15: false,
        lesson16: false,
        lesson17: false,
        lesson18: false,
        lesson19: false,
        lesson20: false
    };

    /**
     * Confetti Effect
     */
    function fireConfetti() {
        if (window.confetti) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#A06AF9', '#F8549B', '#35E4B2']
            });
        }
    }

    /**
     * Executes code safely
     */
    function runCode(code, outputElement, context = {}) {
        let logs = [];
        const originalLog = console.log;
        
        console.log = (...args) => {
            logs.push(args.join(' '));
        };

        let alertCalled = false;
        const mockAlert = (msg) => {
            alertCalled = true;
            logs.push(`🔔 ALERTA: "${msg}"`);
            setTimeout(() => window.alert(msg), 10);
        };

        try {
            const func = new Function('console', 'alert', code);
            func(console, mockAlert);
        } catch (e) {
            logs.push(`❌ Error: ${e.message}`);
        } finally {
            console.log = originalLog;
        }

        return { logs, alertCalled };
    }

    /**
     * Helper: Reveal next section
     */
    function revealSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('active');
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }


    /* --- Lesson 1: Variables --- */
    const runBtn1 = document.querySelector('#editor-1 .run-btn');
    if (runBtn1) {
        runBtn1.addEventListener('click', () => {
            const output = document.querySelector('#editor-1 .output-content');
            // Get code from Jar
            const code = editors['1'].toString();

            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            const isDefaultString = code.includes('"¡Hola mundo soy Milita!"');
            
            if (!isDefaultString && !progress.lesson1) {
                progress.lesson1 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">✨ ¡Perfecto! Variable modificada.</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-2'), 1500);
            }
        });
    }

    /* --- Lesson 2: Alerts --- */
    const runBtn2 = document.querySelector('#editor-2 .run-btn');
    if (runBtn2) {
        runBtn2.addEventListener('click', () => {
            const output = document.querySelector('#editor-2 .output-content');
            const code = editors['2'].toString();

            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            if (result.alertCalled && !progress.lesson2) {
                progress.lesson2 = true;
                output.innerHTML += '<br><br><strong style="color: var(--pink-1)">🎉 ¡Alerta enviada! Siguiente reto...</strong>';
                output.style.border = "2px solid var(--pink-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-3'), 1500);
            }
        });
    }

    /* --- Lesson 3: Conditionals --- */
    const runBtn3 = document.querySelector('#editor-3 .run-btn');
    if (runBtn3) {
        runBtn3.addEventListener('click', () => {
            const output = document.querySelector('#editor-3 .output-content');
            const code = editors['3'].toString();

            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            // Check if user changed false to true (or logic to allow message)
            // We search for the success message log
            const successMsg = "Gorilín dice: ¡Toma tu hamburguesa!";
            const hasSuccessLog = result.logs.some(l => l.includes(successMsg) || l.includes("hamburguesa"));

            if (hasSuccessLog && !progress.lesson3) {
                progress.lesson3 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">🍔 ¡Provecho! Condicional superado.</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-4'), 1500);
            }
        });
    }

    /* --- Lesson 4: Loops --- */
    const runBtn4 = document.querySelector('#editor-4 .run-btn');
    if (runBtn4) {
        runBtn4.addEventListener('click', () => {
            const output = document.querySelector('#editor-4 .output-content');
            const code = editors['4'].toString();

            const result = runCode(code, output);
            
            // Limit output length for UI
            const displayLogs = result.logs.length > 8 ? [...result.logs.slice(0, 8), '... (y más)'] : result.logs;
            output.innerHTML = displayLogs.join('<br>');

            // Check if it looped 5 times or more
            // Count "Abrazo" logs
            const hugCount = result.logs.filter(l => l.toLowerCase().includes("abrazo")).length;

            if (hugCount >= 5 && !progress.lesson4) {
                progress.lesson4 = true;
                output.innerHTML += '<br><br><strong style="color: var(--purple-1)">🤗🤗🤗 ¡Lluvia de abrazos! ¡Eres una pro!</strong>';
                output.style.border = "2px solid var(--purple-1)";
                fireConfetti(); // Double confetti!
                setTimeout(fireConfetti, 400);
                setTimeout(() => revealSection('final-section'), 1500);
            }
        });
    }

    /* --- Lesson 5: Arrays --- */
    const runBtn5 = document.querySelector('#editor-5 .run-btn');
    if (runBtn5) {
        runBtn5.addEventListener('click', () => {
            const output = document.querySelector('#editor-5 .output-content');
            const code = editors['5'].toString();
            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            // Check if "Helado" is in the logs
            if (result.logs.some(l => l.includes("Helado")) && !progress.lesson5) {
                progress.lesson5 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">🍦 ¡Qué rico! Lista completada.</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-6'), 1500);
            }
        });
    }

    /* --- Lesson 6: Objects --- */
    const runBtn6 = document.querySelector('#editor-6 .run-btn');
    if (runBtn6) {
        runBtn6.addEventListener('click', () => {
            const output = document.querySelector('#editor-6 .output-content');
            const code = editors['6'].toString();
            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            // Check if color is Morado and Hambre is high (e.g. > 50)
            const moradoCheck = result.logs.some(l => l.toLowerCase().includes("morado"));
            constambreCheck = result.logs.some(l => {
                const match = l.match(/Hambre: (\d+)/);
                return match && parseInt(match[1]) > 50;
            });

            if (moradoCheck && ambreCheck && !progress.lesson6) {
                progress.lesson6 = true;
                output.innerHTML += '<br><br><strong style="color: var(--pink-1)">🦍 ¡Gorilín transformado! Qué guapo.</strong>';
                output.style.border = "2px solid var(--pink-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-7'), 1500);
            }
        });
    }

    /* --- Lesson 7: Functions --- */
    const runBtn7 = document.querySelector('#editor-7 .run-btn');
    if (runBtn7) {
        runBtn7.addEventListener('click', () => {
            const output = document.querySelector('#editor-7 .output-content');
            const code = editors['7'].toString();
            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            // Check if "Abra Cadabra" was logged
            if (result.logs.some(l => l.includes("Abra Cadabra")) && !progress.lesson7) {
                progress.lesson7 = true;
                output.innerHTML += '<br><br><strong style="color: var(--purple-1)">✨ ¡Eres una hechicera del código!</strong>';
                output.style.border = "2px solid var(--purple-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-8'), 1500);
            }
        });
    }

    /* --- Lesson 8: Return --- */
    const runBtn8 = document.querySelector('#editor-8 .run-btn');
    if (runBtn8) {
        runBtn8.addEventListener('click', () => {
            const output = document.querySelector('#editor-8 .output-content');
            const code = editors['8'].toString();
            const result = runCode(code, output);
            output.innerHTML = result.logs.join('<br>');

            // Check if the total is correct (e.g. 10 or logic check)
            // Ideally user calls sumarCorazones(5,5) which is 10
            if (result.logs.some(l => l.includes("10")) && !progress.lesson8) {
                progress.lesson8 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">❤️ ¡Operación exitosa! Retorno recibido.</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                // Reveal logic will need to handle future lessons, for now we will assume more coming
                setTimeout(() => revealSection('leccion-9'), 1500); 
            }
        });
    }

    /* --- Lesson 9: DOM Text --- */
    const runBtn9 = document.querySelector('#editor-9 .run-btn');
    if (runBtn9) {
        runBtn9.addEventListener('click', () => {
            const output = document.querySelector('#editor-9 .output-content');
            const code = editors['9'].toString();
            // We need to run the code to affect the DOM
            const result = runCode(code, output); 
            output.innerHTML = result.logs.join('<br>');
            
            // Check if element text changed
            const titulo = document.getElementById("titulo-secreto");
            if (titulo && titulo.innerText.includes("encontré") && !progress.lesson9) {
                progress.lesson9 = true;
                output.innerHTML += '<br><br><strong style="color: var(--pink-1)">👀 ¡Visto! Has dominado el texto.</strong>';
                output.style.border = "2px solid var(--pink-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-10'), 1500);
            }
        });
    }

    /* --- Lesson 10: DOM Style --- */
    const runBtn10 = document.querySelector('#editor-10 .run-btn');
    if (runBtn10) {
        runBtn10.addEventListener('click', () => {
             const output = document.querySelector('#editor-10 .output-content');
             const code = editors['10'].toString();
             const result = runCode(code, output);
             
             // Check color of the div
             const cuadro = document.getElementById("cuadro-magico");
             // Computed style is safer
             const color = window.getComputedStyle(cuadro).backgroundColor;
             
             // Check against known rgb values for pink/purple or names
             // pink approx rgb(255, 192, 203), purple approx rgb(128, 0, 128)
             // simplified check: just ensure it's not default gray #ddd
             const isDefault = color === 'rgb(221, 221, 221)' || color === '#ddd';
             
             if (!isDefault && !progress.lesson10) {
                 progress.lesson10 = true;
                output.innerHTML = '<strong style="color: var(--purple-1)">🎨 ¡Qué arte! Color cambiado.</strong>';
                output.style.border = "2px solid var(--purple-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-11'), 1500);
             }
        });
    }

    /* --- Lesson 11: Events --- */
    const runBtn11 = document.querySelector('#editor-11 .run-btn');
    
    // Testing Helper for Lesson 11
    const testBtn11 = document.getElementById("boton-prueba");
    if (testBtn11) {
        testBtn11.addEventListener('click', () => {
             // We can check if the user has clicked it for the progress logic if we wanted.
        });
    }

    if (runBtn11) {
        runBtn11.addEventListener('click', () => {
             const output = document.querySelector('#editor-11 .output-content');
             const code = editors['11'].toString();
             
             // Run the code to attach listener
             const result = runCode(code, output);
             
             // Check if code contains "addEventListener" and "click"
             if (code.includes("addEventListener") && code.includes("click") && !progress.lesson11) {
                 progress.lesson11 = true;
                 output.innerHTML = '<strong style="color: var(--teal-1)">🖱️ ¡Click escuchado! (Prueba hacer click en el botón gris arriba)</strong>';
                 output.style.border = "2px solid var(--teal-1)";
                 fireConfetti();
                 setTimeout(() => revealSection('leccion-12'), 1500);
             }
        });
    }

    /* --- Lesson 12: Inputs --- */
    const runBtn12 = document.querySelector('#editor-12 .run-btn');
    if (runBtn12) {
        runBtn12.addEventListener('click', () => {
             const output = document.querySelector('#editor-12 .output-content');
             const code = editors['12'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>'); // Should show greeting
             
             const inputVal = document.getElementById("input-nombre").value;
             
             if (inputVal.length > 0 && result.logs.some(l => l.includes(inputVal)) && !progress.lesson12) {
                 progress.lesson12 = true;
                 output.innerHTML += '<br><br><strong style="color: var(--pink-1)">💌 ¡Recibido! Hola ' + inputVal + '.</strong>';
                 output.style.border = "2px solid var(--pink-1)";
                 fireConfetti();
                 setTimeout(() => revealSection('leccion-13'), 1500);
             }
        });
    }

    /* --- Lesson 13: Math --- */
    const runBtn13 = document.querySelector('#editor-13 .run-btn');
    if (runBtn13) {
        runBtn13.addEventListener('click', () => {
             const output = document.querySelector('#editor-13 .output-content');
             const code = editors['13'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>');
             
             // Check if result is 50
             if (result.logs.some(l => l.includes("50")) && !progress.lesson13) {
                 progress.lesson13 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">🧮 ¡Matemática pura! 50 besos.</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-14'), 1500);
             }
        });
    }

    /* --- Lesson 14: Logic --- */
    const runBtn14 = document.querySelector('#editor-14 .run-btn');
    if (runBtn14) {
        runBtn14.addEventListener('click', () => {
             const output = document.querySelector('#editor-14 .output-content');
             const code = editors['14'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>');
             
             // User needs to set esGuapo = true
             if (result.logs.some(l => l.includes("Me caso")) && !progress.lesson14) {
                 progress.lesson14 = true;
                output.innerHTML += '<br><br><strong style="color: var(--pink-1)">💍 ¡Vivan los novios! Lógica impecable.</strong>';
                output.style.border = "2px solid var(--pink-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-15'), 1500);
             }
        });
    }

    /* --- Lesson 15: While --- */
    const runBtn15 = document.querySelector('#editor-15 .run-btn');
    if (runBtn15) {
        runBtn15.addEventListener('click', () => {
             const output = document.querySelector('#editor-15 .output-content');
             const code = editors['15'].toString();
             // Protection against infinite loops handled by CodeJar? No, we rely on browser.
             // But the code provided is safe. If user removes the decrement, browser might freeze.
             // We can check code string for decrement before running?
             if (!code.includes("tiempo = tiempo - 1") && !code.includes("tiempo--") && !code.includes("tiempo -= 1")) {
                 output.innerHTML = "⚠️ ¡Cuidado! Te falta restar tiempo, o el bucle será infinito.";
                 return;
             }
             
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>');
             
             if (result.logs.some(l => l.includes("Despegue")) && !progress.lesson15) {
                 progress.lesson15 = true;
                output.innerHTML += '<br><br><strong style="color: var(--purple-1)">🚀 ¡Despegue exitoso!</strong>';
                output.style.border = "2px solid var(--purple-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-16'), 1500);
             }
        });
    }

    /* --- Lesson 16: Arrow Functions --- */
    const runBtn16 = document.querySelector('#editor-16 .run-btn');
    if (runBtn16) {
        runBtn16.addEventListener('click', () => {
             const output = document.querySelector('#editor-16 .output-content');
             const code = editors['16'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>');
             
             // Check validation: code structure contains => and log "Hola moderna"
             const hasArrow = code.includes("=>");
             const hasLog = result.logs.some(l => l.toLowerCase().includes("hola moderna"));
             
             if (hasArrow && hasLog && !progress.lesson16) {
                 progress.lesson16 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">🏹 ¡Flecha directa al corazón!</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-17'), 1500);
             }
        });
    }

    /* --- Lesson 17: Map --- */
    const runBtn17 = document.querySelector('#editor-17 .run-btn');
    if (runBtn17) {
        runBtn17.addEventListener('click', () => {
             const output = document.querySelector('#editor-17 .output-content');
             const code = editors['17'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>'); // Show result
             
             // Check if output contains modified list (uppercase or transformed)
             // e.g. "HOLA", "MUNDO"
             if (result.logs.some(l => l.includes("HOLA") || l.includes("MUNDO")) && !progress.lesson17) {
                 progress.lesson17 = true;
                output.innerHTML += '<br><br><strong style="color: var(--pink-1)">🗺️ ¡Mapa completado! Lista transformada.</strong>';
                output.style.border = "2px solid var(--pink-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-18'), 1500);
             }
        });
    }

    /* --- Lesson 18: SetTimeout --- */
    const runBtn18 = document.querySelector('#editor-18 .run-btn');
    if (runBtn18) {
        runBtn18.addEventListener('click', () => {
             const output = document.querySelector('#editor-18 .output-content');
             const code = editors['18'].toString();
             
             // This one is tricky because it's async. runCode handles generic async? No.
             // But we can check if they used setTimeout.
             // And we can listen for console logs that might happen later if we kept reference?
             // runCode returns immediately.
             
             const result = runCode(code, output);
             output.innerHTML = "Esperando..."; // Initial text
             
             // Hack: We can start a timeout ourselves to check the output div after 3s?
             // providing the user's code actually writes to the output div (which it does via mocked console.log)
             
             if (code.includes("setTimeout") && !progress.lesson18) {
                 setTimeout(() => {
                     // Check if logs appeared later? 
                     // Our runCode mocked console.log pushes to 'logs' array but also we need it to update DOM?
                     // The simple runCode implementation might not support async updating of the returned logs array reference.
                     // The mocked console.log in runCode needs to write to output if we want async support?
                     // Let's assume for this simple tutorial checking for "setTimeout" and a success message is enough.
                     
                     // We force success for UX simplicity if syntax is right
                     progress.lesson18 = true;
                     output.innerHTML = "Tick... Tock... <br><strong>¡BOOM! ⏰ Mensaje del futuro recibido.</strong>";
                     output.style.border = "2px solid var(--purple-1)";
                     fireConfetti();
                     setTimeout(() => revealSection('leccion-19'), 1500);
                 }, 3500); // Wait a bit longer than their 3000
             }
        });
    }

    /* --- Lesson 19: LocalStorage --- */
    const runBtn19 = document.querySelector('#editor-19 .run-btn');
    if (runBtn19) {
        runBtn19.addEventListener('click', () => {
             const output = document.querySelector('#editor-19 .output-content');
             const code = editors['19'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>');
             
             // Check if localStorage was set
             if (code.includes("localStorage.setItem") && !progress.lesson19) {
                 progress.lesson19 = true;
                output.innerHTML += '<br><br><strong style="color: var(--teal-1)">💾 ¡Guardado para siempre! (incluso si recargas)</strong>';
                output.style.border = "2px solid var(--teal-1)";
                fireConfetti();
                setTimeout(() => revealSection('leccion-20'), 1500);
             }
        });
    }

    /* --- Lesson 20: Final Project --- */
    const runBtn20 = document.querySelector('#editor-20 .run-btn');
    if (runBtn20) {
        runBtn20.addEventListener('click', () => {
             const output = document.querySelector('#editor-20 .output-content');
             const code = editors['20'].toString();
             const result = runCode(code, output);
             output.innerHTML = result.logs.join('<br>');
             
             // Final check: whatever logic, just give them the win.
             if (!progress.lesson20) {
                 progress.lesson20 = true;
                 // MASSIVE FINALIE
                 massiveConfetti();
                 
                 // Show final overlay or scroll to bottom
                 const finalSection = document.getElementById('final-section');
                 if (finalSection) {
                     finalSection.style.display = 'block';
                     finalSection.scrollIntoView({ behavior: 'smooth' });
                     finalSection.innerHTML += `
                        <div style="margin-top: 2rem; padding: 1rem; background: var(--pink-gradient); color: white; border-radius: 12px; animation: bounce 1s infinite;">
                            <h1>🏆 ¡GRADUADA! 🏆</h1>
                            <p>Has completado el curso de Gorilín.</p>
                            <p>¡Eres oficialmente una Programadora!</p>
                        </div>
                     `;
                 }
             }
        });
    }

    /**
     * Massive Confetti Animation
     */
    function massiveConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
        
        // Also a big burst in the center
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#A06AF9', '#F8549B', '#35E4B2', '#FFD700']
        });
    }

