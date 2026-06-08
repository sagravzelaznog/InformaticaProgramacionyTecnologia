// ================================================================
// CONFIGURACIÓN GLOBAL DEL QUIZ
// ================================================================

const quizData = [
    {
        id: 1,
        question: "¿Qué significa HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correctAnswer: 0,
        explanation: "HTML significa 'HyperText Markup Language' - el estándar para estructurar contenido web."
    },
    {
        id: 2,
        question: "¿Cuál es la función principal del modelo cliente-servidor?",
        options: [
            "Decorar páginas web",
            "El cliente solicita recursos y el servidor los proporciona",
            "Crear bases de datos",
            "Compilar código HTML"
        ],
        correctAnswer: 1,
        explanation: "El modelo cliente-servidor es fundamental: el navegador (cliente) solicita contenido al servidor web."
    },
    {
        id: 3,
        question: "¿Cuál es la etiqueta correcta para un encabezado principal?",
        options: [
            "&lt;heading&gt;",
            "&lt;header&gt;",
            "&lt;h1&gt;",
            "&lt;title&gt;"
        ],
        correctAnswer: 2,
        explanation: "La etiqueta &lt;h1&gt; se utiliza para el encabezado de mayor importancia (nivel 1)."
    },
    {
        id: 4,
        question: "¿Qué etiqueta define metadatos en HTML?",
        options: [
            "&lt;metadata&gt;",
            "&lt;meta&gt;",
            "&lt;info&gt;",
            "&lt;head&gt;"
        ],
        correctAnswer: 1,
        explanation: "La etiqueta &lt;meta&gt; se usa para proporcionar metadatos como charset, viewport, etc."
    },
    {
        id: 5,
        question: "¿Cuál de las siguientes es una etiqueta autofrenada?",
        options: [
            "&lt;div&gt;",
            "&lt;p&gt;",
            "&lt;img&gt;",
            "&lt;section&gt;"
        ],
        correctAnswer: 2,
        explanation: "La etiqueta &lt;img&gt; es autofrenada (self-closing) porque no tiene contenido entre apertura y cierre."
    }
];

// Variables de estado del quiz
let currentQuestion = 0;
let score = 0;
let answeredQuestions = [];
let quizStarted = false;

// ================================================================
// FUNCIÓN: Iniciar Quiz
// ================================================================

function iniciarQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const startBtn = document.querySelector('.btn-start-quiz');
    
    if (!quizStarted) {
        quizStarted = true;
        currentQuestion = 0;
        score = 0;
        answeredQuestions = [];
        
        startBtn.style.display = 'none';
        quizContainer.innerHTML = '';
        
        mostrarPregunta();
    }
}

// ================================================================
// FUNCIÓN: Mostrar Pregunta Actual
// ================================================================

function mostrarPregunta() {
    const quizContainer = document.getElementById('quiz-container');
    const pregunta = quizData[currentQuestion];
    
    // Calcular progreso
    const progreso = Math.floor(((currentQuestion + 1) / quizData.length) * 100);
    document.getElementById('progress').textContent = `${currentQuestion + 1}/${quizData.length}`;
    
    // HTML de la pregunta
    let html = `
        <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progreso}%"></div>
        </div>
        
        <div class="quiz-question active">
            <div class="quiz-question-number">Pregunta ${currentQuestion + 1} de ${quizData.length}</div>
            <div class="quiz-question-text">${pregunta.question}</div>
            
            <div class="quiz-options">
    `;
    
    // Agregar opciones
    pregunta.options.forEach((option, index) => {
        html += `
            <div class="quiz-option" onclick="seleccionarOpcion(${index})">
                <div class="quiz-option-text">${option}</div>
            </div>
        `;
    });
    
    html += `
            </div>
            <div class="quiz-feedback"></div>
            <button class="btn-next-question" onclick="siguientePregunta()" disabled>
                Siguiente Pregunta →
            </button>
        </div>
    `;
    
    quizContainer.innerHTML = html;
}

// ================================================================
// FUNCIÓN: Seleccionar Opción
// ================================================================

function seleccionarOpcion(index) {
    const pregunta = quizData[currentQuestion];
    const opciones = document.querySelectorAll('.quiz-option');
    const feedback = document.querySelector('.quiz-feedback');
    const nextBtn = document.querySelector('.btn-next-question');
    
    // Evitar selecciones múltiples
    if (answeredQuestions.includes(currentQuestion)) {
        return;
    }
    
    // Marcar como respondida
    answeredQuestions.push(currentQuestion);
    
    // Mostrar todas las opciones con estilos
    opciones.forEach((option, i) => {
        if (i === pregunta.correctAnswer) {
            option.classList.add('correct');
            reproducirSonido('success');
        } else if (i === index && index !== pregunta.correctAnswer) {
            option.classList.add('incorrect');
            reproducirSonido('error');
        }
        option.style.pointerEvents = 'none';
    });
    
    // Mostrar feedback
    if (index === pregunta.correctAnswer) {
        score++;
        document.getElementById('score').textContent = score;
        feedback.textContent = '✓ ¡Correcto! ' + pregunta.explanation;
        feedback.classList.add('show', 'correct');
    } else {
        feedback.textContent = '✗ Incorrecto. ' + pregunta.explanation;
        feedback.classList.add('show', 'incorrect');
    }
    
    // Habilitar botón siguiente
    nextBtn.disabled = false;
}

// ================================================================
// FUNCIÓN: Siguiente Pregunta
// ================================================================

function siguientePregunta() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

// ================================================================
// FUNCIÓN: Mostrar Resultados
// ================================================================

function mostrarResultados() {
    const quizContainer = document.getElementById('quiz-container');
    const porcentaje = Math.round((score / quizData.length) * 100);
    
    let mensaje = '';
    let emoji = '';
    
    if (porcentaje === 100) {
        mensaje = '¡Perfección absoluta! Eres un maestro de HTML.';
        emoji = '🏆';
        reproducirSonido('victory');
    } else if (porcentaje >= 80) {
        mensaje = '¡Excelente! Dominas muy bien los conceptos básicos de HTML.';
        emoji = '⭐';
        reproducirSonido('success');
    } else if (porcentaje >= 60) {
        mensaje = '¡Bien hecho! Tienes una buena comprensión de HTML.';
        emoji = '👍';
        reproducirSonido('success');
    } else if (porcentaje >= 40) {
        mensaje = 'Buen intento. Repasa los temas y vuelve a intentarlo.';
        emoji = '📚';
    } else {
        mensaje = 'Necesitas repasar más. ¡No te desanimes, practica es la clave!';
        emoji = '💪';
    }
    
    const html = `
        <div class="quiz-results show">
            <div class="quiz-results-score">${emoji} ${porcentaje}%</div>
            <div class="quiz-results-message">${mensaje}</div>
            <div class="quiz-results-details">
                Acertaste ${score} de ${quizData.length} preguntas
            </div>
            <button class="btn-restart-quiz" onclick="reiniciarQuiz()">
                <i class="fas fa-redo"></i> Intentar de Nuevo
            </button>
        </div>
    `;
    
    quizContainer.innerHTML = html;
}

// ================================================================
// FUNCIÓN: Reiniciar Quiz
// ================================================================

function reiniciarQuiz() {
    quizStarted = false;
    currentQuestion = 0;
    score = 0;
    answeredQuestions = [];
    document.getElementById('score').textContent = '0';
    document.getElementById('progress').textContent = '0/5';
    const quizContainer = document.getElementById('quiz-container');
    const startBtn = document.querySelector('.btn-start-quiz');
    
    quizContainer.innerHTML = '';
    startBtn.style.display = 'inline-flex';
}

// ================================================================
// FUNCIÓN: Reproducir Sonidos
// ================================================================

function reproducirSonido(tipo) {
    // Crear contexto de audio Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch(tipo) {
        case 'success':
            // Sonido de éxito: Do-Mi-Sol
            crearBeep(audioContext, 523.25, 0.1); // Do
            setTimeout(() => crearBeep(audioContext, 659.25, 0.1), 100); // Mi
            setTimeout(() => crearBeep(audioContext, 783.99, 0.15), 200); // Sol
            break;
            
        case 'error':
            // Sonido de error: Bajo-Bajo
            crearBeep(audioContext, 200, 0.1);
            setTimeout(() => crearBeep(audioContext, 150, 0.15), 100);
            break;
            
        case 'victory':
            // Sonido de victoria
            crearBeep(audioContext, 523.25, 0.1);
            setTimeout(() => crearBeep(audioContext, 587.33, 0.1), 120);
            setTimeout(() => crearBeep(audioContext, 659.25, 0.1), 240);
            setTimeout(() => crearBeep(audioContext, 783.99, 0.3), 360);
            break;
    }
}

function crearBeep(audioContext, frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// ================================================================
// FUNCIÓN: Copiar Código
// ================================================================

function copiarCodigo(btn) {
    const codeBlock = btn.closest('.code-example');
    const code = codeBlock.querySelector('code').innerText;
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(code).then(() => {
        // Cambiar texto del botón
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btn.style.background = 'var(--color-success)';
        
        // Restaurar después de 2 segundos
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('Error al copiar el código. Intenta manualmente.');
    });
}

// ================================================================
// FUNCIÓN: Abrir Evaluador
// ================================================================

function abrirEvaluador() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
        animation: slideInUp 0.3s ease-out;
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="margin: 0; color: #1f2937; font-size: 1.5rem;">Verificar Actividad</h3>
            <button onclick="this.closest('div[style*=position]').remove()" 
                    style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280;">
                ✕
            </button>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #1f2937;">
                Pega tu código HTML aquí:
            </label>
            <textarea id="user-code" 
                     placeholder="&lt;!DOCTYPE html&gt;&#10;&lt;html lang=&quot;es&quot;&gt;&#10;..."
                     style="width: 100%; height: 200px; padding: 1rem; border: 2px solid #e5e7eb; 
                             border-radius: 0.5rem; font-family: monospace; font-size: 0.9rem;
                             resize: vertical; box-sizing: border-box;">
            </textarea>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <button onclick="verificarActividad()" 
                   style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
                          color: white; border: none; padding: 0.75rem 1rem; 
                          border-radius: 0.5rem; font-weight: 700; cursor: pointer;">
                <i class="fas fa-check"></i> Verificar
            </button>
            <button onclick="this.closest('div[style*=position]').remove()"
                   style="background: #e5e7eb; color: #1f2937; border: none; 
                          padding: 0.75rem 1rem; border-radius: 0.5rem; font-weight: 700; cursor: pointer;">
                Cancelar
            </button>
        </div>
        
        <div id="validation-result" style="margin-top: 1.5rem; display: none;"></div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    document.getElementById('user-code').focus();
}

// ================================================================
// FUNCIÓN: Verificar Actividad
// ================================================================

function verificarActividad() {
    const userCode = document.getElementById('user-code').value.trim();
    const resultDiv = document.getElementById('validation-result');
    
    // Criterios de validación
    const checks = {
        doctype: /<\s*!DOCTYPE\s+html\s*>/i.test(userCode),
        html: /<html[^>]*>/i.test(userCode),
        head: /<head[^>]*>/i.test(userCode),
        body: /<body[^>]*>/i.test(userCode),
        title: /<title[^>]*>/i.test(userCode),
        h1: /<h1[^>]*>/i.test(userCode),
        paragraph: /<p[^>]*>/i.test(userCode),
        list: /(<ul[^>]*>|<ol[^>]*>)/i.test(userCode),
        copyright: /&copy;|©/i.test(userCode),
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    const percentage = Math.round((passedChecks / totalChecks) * 100);
    
    let html = `
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
                   padding: 1rem; border-radius: 0.5rem; border: 2px solid #ddd;">
            <div style="font-size: 1.5rem; font-weight: 800; color: #6366f1; margin-bottom: 0.5rem;">
                ${percentage}%
            </div>
            <div style="color: #4b5563; margin-bottom: 1rem;">
                ${passedChecks} de ${totalChecks} requisitos cumplidos
            </div>
            
            <div style="background: white; padding: 0.75rem; border-radius: 0.5rem; margin-top: 0.75rem;">
                <div style="font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">Validación detallada:</div>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem;">
    `;
    
    const checkLabels = {
        doctype: 'Declaración DOCTYPE',
        html: 'Etiqueta &lt;html&gt;',
        head: 'Etiqueta &lt;head&gt;',
        body: 'Etiqueta &lt;body&gt;',
        title: 'Etiqueta &lt;title&gt;',
        h1: 'Encabezado &lt;h1&gt; (Título principal)',
        paragraph: 'Párrafo &lt;p&gt;',
        list: 'Lista (&lt;ul&gt; o &lt;ol&gt;)',
        copyright: 'Símbolo © de derechos de autor'
    };
    
    for (const [key, passed] of Object.entries(checks)) {
        const icon = passed ? '✓' : '✗';
        const color = passed ? '#10b981' : '#ef4444';
        html += `
            <li style="padding: 0.5rem 0; color: ${color}; font-weight: 600;">
                <span>${icon}</span> ${checkLabels[key]}
            </li>
        `;
    }
    
    html += `
                </ul>
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ddd;">
    `;
    
    if (percentage === 100) {
        html += `
            <div style="color: #10b981; font-weight: 700; text-align: center;">
                🎉 ¡Excelente! Cumpliste todos los requisitos. ¡Avanza a la siguiente sesión!
            </div>
        `;
    } else if (percentage >= 80) {
        html += `
            <div style="color: #f59e0b; font-weight: 700; text-align: center;">
                ⚠️ Casi perfecto. Revisa los elementos faltantes.
            </div>
        `;
    } else {
        html += `
            <div style="color: #ef4444; font-weight: 700; text-align: center;">
                📝 Necesitas incluir más elementos HTML. Sigue la estructura recomendada.
            </div>
        `;
    }
    
    html += `
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
}

// ================================================================
// FUNCIONES DE NAVEGACIÓN
// ================================================================

function sesionAnterior() {
    alert('Esta es la primera sesión. No hay sesión anterior.');
}

function siguienteSesion() {
    // Aquí iría la navegación a sesion02.html
    // window.location.href = 'sesion02.html';
    alert('Contendrá el enlace a Sesión 2: Jerarquía y Orden');
}

// ================================================================
// FUNCIÓN: Scrollear Suave a una Sección
// ================================================================

function scrollASeccion(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ================================================================
// FUNCIÓN: Inicializar Event Listeners
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips y poppers si es necesario
    inicializarInteractividad();
    
    // Detectar cuando se hace scroll
    window.addEventListener('scroll', actualizarNavegacionScroll);
    
    // Manejar clics en enlaces de navegación
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Si es un enlace interno
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const id = this.getAttribute('href').substring(1);
                scrollASeccion(id);
            }
        });
    });
});

// ================================================================
// FUNCIÓN: Inicializar Interactividad
// ================================================================

function inicializarInteractividad() {
    // Agregar efecto de hover a tarjetas
    document.querySelectorAll('.objective-card, .requirement-item, .summary-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease-out';
        });
    });
    
    // Agregar efecto a botones
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
    
    // Animar números cuando están en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-value').forEach(element => {
        observer.observe(element);
    });
}

// ================================================================
// FUNCIÓN: Actualizar Navegación según Scroll
// ================================================================

function actualizarNavegacionScroll() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.parentElement.classList.add('active');
            link.classList.add('active');
        }
    });
}

// ================================================================
// FUNCIÓN: Manejo de Teclas de Atajo
// ================================================================

document.addEventListener('keydown', function(event) {
    // Ctrl + Shift + Q para abrir Quiz
    if (event.ctrlKey && event.shiftKey && event.key === 'Q') {
        event.preventDefault();
        iniciarQuiz();
    }
    
    // Escape para cerrar modales
    if (event.key === 'Escape') {
        document.querySelectorAll('[style*="position: fixed"]').forEach(el => {
            if (el.style.background && el.style.background.includes('rgba')) {
                el.remove();
            }
        });
    }
});

// ================================================================
// FUNCIÓN: Validación de Compatibilidad
// ================================================================

function validarCompatibilidad() {
    const soportes = {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        gradients: CSS.supports('background', 'linear-gradient(red, blue)'),
        clipPath: CSS.supports('clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'),
    };
    
    if (!soportes.flexbox || !soportes.grid) {
        console.warn('Este navegador tiene compatibilidad limitada. Se aplicarán estilos alternativos.');
    }
    
    return soportes;
}

// ================================================================
// FUNCIÓN: Guardar Progreso en LocalStorage
// ================================================================

function guardarProgreso() {
    const progreso = {
        sesion: 1,
        completado: false,
        puntajeQuiz: score,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('sesion01_progreso', JSON.stringify(progreso));
}

function cargarProgreso() {
    const progreso = localStorage.getItem('sesion01_progreso');
    if (progreso) {
        const data = JSON.parse(progreso);
        console.log('Progreso anterior:', data);
        return data;
    }
    return null;
}

// ================================================================
// FUNCIÓN: Tema Oscuro (Bonus)
// ================================================================

function activarTemaOscuro() {
    document.documentElement.style.colorScheme = 'dark';
    localStorage.setItem('tema', 'oscuro');
}

function activarTemaClaro() {
    document.documentElement.style.colorScheme = 'light';
    localStorage.setItem('tema', 'claro');
}

function detectarTemaPreferido() {
    const temaSavedado = localStorage.getItem('tema');
    if (temaSavedado) {
        temaSavedado === 'oscuro' ? activarTemaOscuro() : activarTemaClaro();
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        activarTemaOscuro();
    }
}

// ================================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ================================================================

window.addEventListener('load', function() {
    validarCompatibilidad();
    detectarTemaPreferido();
    const progreso = cargarProgreso();
    
    // Guardar progreso antes de salir
    window.addEventListener('beforeunload', guardarProgreso);
    
    // Log de inicialización
    console.log('✓ Sesión 01 cargada correctamente');
    console.log('✓ Progreso anterior:', progreso);
});

// ================================================================
// FUNCIÓN: Exportar Certificado (Bonus)
// ================================================================

function generarCertificado() {
    if (score === quizData.length) {
        const fecha = new Date().toLocaleDateString('es-ES');
        const html = `
            <div style="text-align: center; padding: 2rem; border: 3px solid #6366f1; 
                       font-family: serif; background: linear-gradient(135deg, #f9fafb, #white);">
                <h2 style="color: #6366f1; font-size: 2rem;">CERTIFICADO DE COMPETENCIA</h2>
                <p style="font-size: 1.2rem; margin: 1rem 0;">Sesión 1: El Génesis de HTML</p>
                <p style="margin: 1rem 0;">Otorgado a: ${document.querySelector('body').getAttribute('data-student') || 'Estudiante'}</p>
                <p style="margin: 1rem 0;">Fecha: ${fecha}</p>
                <p style="color: #10b981; font-weight: bold;">100% Completado ✓</p>
            </div>
        `;
        
        const ventana = window.open('', '', 'width=600, height=400');
        ventana.document.write(html);
        ventana.document.close();
    } else {
        alert('Debes completar el quiz con 100% para obtener el certificado.');
    }
}

// ================================================================
// FUNCIÓN: Compartir en Redes Sociales
// ================================================================

function compartirLogro() {
    const mensaje = `Acabo de completar la Sesión 1 del Curso HTML5 con ${score}/${quizData.length} aciertos. ¡Únete a este curso increíble! 🚀`;
    
    const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(mensaje)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(mensaje)}`
    };
    
    console.log('URLs para compartir:', urls);
    // En implementación real, estos abrirían las redes sociales
}

// ================================================================
// FUNCIÓN: Imprimir Contenido
// ================================================================

function imprimirSesion() {
    window.print();
}

// ================================================================
// FUNCIÓN: Buscar Contenido (Bonus)
// ================================================================

function buscarEnPagina(termino) {
    const sections = document.querySelectorAll('.section-content');
    const resultados = [];
    
    sections.forEach(section => {
        if (section.textContent.toLowerCase().includes(termino.toLowerCase())) {
            resultados.push({
                titulo: section.previousElementSibling.textContent,
                preview: section.textContent.substring(0, 100) + '...'
            });
        }
    });
    
    return resultados;
}

// ================================================================
// FUNCIÓN: Animar Números (Contador)
// ================================================================

function animarNumeros() {
    const numeros = document.querySelectorAll('.stat-value');
    
    numeros.forEach(numero => {
        const final = parseInt(numero.textContent);
        let actual = 0;
        const increment = Math.ceil(final / 30);
        
        const intervalo = setInterval(() => {
            actual += increment;
            if (actual >= final) {
                numero.textContent = final;
                clearInterval(intervalo);
            } else {
                numero.textContent = actual;
            }
        }, 50);
    });
}

// ================================================================
// FUNCIÓN: Sincronizar Progreso con Backend (Estructura)
// ================================================================

async function sincronizarProgreso() {
    const datos = {
        usuario: 'sagravzelaznog',
        sesion: 1,
        puntaje: score,
        completado: score === quizData.length,
        timestamp: new Date().toISOString()
    };
    
    try {
        // En implementación real, aquí iría un fetch a tu servidor
        // const respuesta = await fetch('/api/guardar-progreso', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(datos)
        // });
        // const resultado = await respuesta.json();
        
        console.log('Datos listos para sincronizar:', datos);
        return true;
    } catch (error) {
        console.error('Error al sincronizar:', error);
        return false;
    }
}

// ================================================================
// EXPORTAR FUNCIONES (Para uso en módulos)
// ================================================================

// Nota: En caso de usar módulos ES6, descomenta:
// export { iniciarQuiz, seleccionarOpcion, copiarCodigo, abrirEvaluador };