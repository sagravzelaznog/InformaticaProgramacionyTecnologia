// Session data for each course
const courses = {
    'html': {
        title: 'HTML5',
        path: 'HTML curso/sesion',
        sessions: 8,
        description: 'Aprende los fundamentos del marcado web con HTML5',
        icon: 'fab fa-html5'
    },
    'css': {
        title: 'CSS3',
        path: 'CSS curso/sesion',
        sessions: 6,
        description: 'Domina el diseño web con estilos CSS3 modernos',
        icon: 'fab fa-css3-alt'
    },
    'js': {
        title: 'JavaScript',
        path: 'js curso/sesion',
        sessions: 10,
        description: 'Aprende programación interactiva con JavaScript',
        icon: 'fab fa-js'
    },
    'redes': {
        title: 'Redes',
        path: 'redes curso/sesion',
        sessions: 64,
        description: 'Aprende programación interactiva con JavaScript',
        icon: 'fab fa-js'
    }
};

// Session titles and descriptions
const sessionTitles = {
    'html': [
        'Introducción a HTML5',
        'Estructura semántica',
        'Formularios HTML5',
        'Multimedia en la web',
        'Tablas avanzadas',
        'Integración con CSS',
        'Accesibilidad web',
        'HTML5 APIs'
    ],
    'css': [
        'Fundamentos de CSS',
        'Modelo de caja',
        'Flexbox',
        'Grid Layout',
        'Animaciones CSS',
        'Diseño responsivo'
    ],
    'js': [
        'La Consola y la Memoria',
        'Tomando Decisiones',
        'Las Máquinas (Funciones)',
        'Listas y Bucles',
        'Tocando el HTML',
        'Escuchando al Usuario',
        'Lógica Visual',
        'Capturando Datos',
        'Matemáticas Dinámicas',
        'Proyecto Final'
    ]
};

// Function to create a session card
function createSessionCard(course, sessionNumber) {
    const sessionTitle = sessionTitles[course][sessionNumber - 1] || `Sesión ${sessionNumber}`;
    const sessionPath = `${courses[course].path}${sessionNumber < 10 ? '0' + sessionNumber : sessionNumber}.html`;
    
    return `
        <div class="session-card">
            <a href="${sessionPath}" target="_blank">
                <div class="session-card__header">
                    <span>Sesión ${sessionNumber}</span>
                    <i class="${courses[course].icon}"></i>
                </div>
                <div class="session-card__content">
                    <h3 class="session-card__title">${sessionTitle}</h3>
                    <p class="session-card__description">
                        ${courses[course].description}
                    </p>
                    <div class="session-card__meta">
                        <span>${courses[course].title}</span>
                        <span class="session-number">#${sessionNumber}</span>
                    </div>
                </div>
            </a>
        </div>
    `;
}

// Function to load sessions for a course
function loadSessions(course) {
    const container = document.getElementById(`${course}-sessions`);
    if (!container) return;
    
    // Show loading state
    container.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
    
    // Simulate loading (in a real app, you might fetch this data)
    setTimeout(() => {
        let html = '';
        for (let i = 1; i <= courses[course].sessions; i++) {
            html += createSessionCard(course, i);
        }
        container.innerHTML = html;
    }, 300);
}

// Initialize the page
function init() {
    // Load sessions for each course
    Object.keys(courses).forEach(course => {
        loadSessions(course);
    });
    
    // Handle print button if it exists
    const printButton = document.getElementById('print-button');
    if (printButton) {
        printButton.addEventListener('click', () => window.print());
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Export for testing or future extensions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSessionCard, loadSessions, courses, sessionTitles };
}
