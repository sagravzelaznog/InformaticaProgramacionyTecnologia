/**
 * session.js - Funcionalidades específicas para las páginas de sesión
 * Incluye interacciones para mejorar la experiencia del usuario en las lecciones
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initSessionNavigation();
    initCodeCopyButtons();
    initActivityTracking();
    initBackToTop();
    initMobileMenu();
    
    // Resaltar la sección activa en la navegación
    highlightActiveSection();
    
    // Inicializar tooltips si existen
    if (typeof tippy === 'function') {
        initTooltips();
    }
});

/**
 * Inicializa la navegación entre secciones de la sesión
 */
function initSessionNavigation() {
    const navLinks = document.querySelectorAll('.session-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Desplazamiento suave
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, '', `${window.location.pathname}${targetId}`);
            }
        });
    });
    
    // Manejar el botón de retroceder/adelantar del navegador
    window.addEventListener('popstate', function() {
        const hash = window.location.hash || '#objetivo';
        const targetSection = document.querySelector(hash);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            updateActiveNavLink(hash);
        }
    });
}

/**
 * Actualiza el enlace de navegación activo
 */
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.session-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Resalta la sección actualmente visible
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('.session-section');
    const navLinks = document.querySelectorAll('.session-nav a');
    
    function onScroll() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', onScroll);
    onScroll(); // Llamar una vez al cargar la página
}

/**
 * Añade botones de copiar al portapapeles a los bloques de código
 */
function initCodeCopyButtons() {
    // Crear contenedor para el botón de copiar
    const style = document.createElement('style');
    style.textContent = `
        .code-block {
            position: relative;
        }
        .copy-button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            color: white;
            padding: 0.25rem 0.5rem;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        pre:hover .copy-button {
            opacity: 1;
        }
        .copy-button.copied {
            background: #4CAF50;
        }
        .copy-button i {
            font-size: 0.9em;
        }
    `;
    document.head.appendChild(style);
    
    // Añadir botón de copiar a cada bloque de código
    document.querySelectorAll('pre').forEach((pre, index) => {
        // Crear botón
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.title = 'Copiar al portapapeles';
        button.innerHTML = '<i class="far fa-copy"></i>';
        
        // Añadir funcionalidad
        button.addEventListener('click', function() {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                // Feedback visual
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
        
        // Añadir contenedor y botón al DOM
        const container = document.createElement('div');
        container.className = 'code-block';
        pre.parentNode.insertBefore(container, pre);
        container.appendChild(pre);
        pre.appendChild(button);
    });
}

/**
 * Inicializa el seguimiento de actividades completadas
 */
function initActivityTracking() {
    const activities = document.querySelectorAll('.activity');
    const storageKey = 'completedActivities';
    
    // Cargar actividades completadas
    let completedActivities = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const sessionId = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Marcar actividades completadas
    activities.forEach((activity, index) => {
        const activityId = `${sessionId}-activity-${index}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `activity-${index}`;
        checkbox.className = 'activity-checkbox';
        
        // Verificar si la actividad ya estaba marcada como completada
        if (completedActivities[activityId]) {
            checkbox.checked = true;
            activity.classList.add('completed');
        }
        
        // Añadir evento para guardar el estado
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                activity.classList.add('completed');
                completedActivities[activityId] = true;
            } else {
                activity.classList.remove('completed');
                delete completedActivities[activityId];
            }
            
            localStorage.setItem(storageKey, JSON.stringify(completedActivities));
            updateProgress();
        });
        
        // Insertar el checkbox en la actividad
        const header = activity.querySelector('h3');
        if (header) {
            const label = document.createElement('label');
            label.htmlFor = `activity-${index}`;
            label.className = 'activity-checkbox-label';
            label.innerHTML = '<span class="checkmark"></span>';
            
            header.insertBefore(checkbox, header.firstChild);
            header.insertBefore(label, checkbox.nextSibling);
        }
    });
    
    // Actualizar la barra de progreso
    function updateProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        const totalActivities = activities.length;
        const completed = document.querySelectorAll('.activity.completed').length;
        const percentage = Math.round((completed / totalActivities) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${completed} de ${totalActivities} actividades completadas`;
        }
    }
    
    updateProgress();
}

/**
 * Inicializa el botón de volver arriba
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Inicializa el menú móvil
 */
function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Menú de navegación');
    
    const nav = document.querySelector('.session-nav .container');
    if (nav) {
        nav.insertBefore(menuButton, nav.firstChild);
        
        const navList = nav.querySelector('ul');
        if (navList) {
            // Ocultar menú por defecto en móviles
            if (window.innerWidth <= 768) {
                navList.style.display = 'none';
            }
            
            // Alternar menú
            menuButton.addEventListener('click', function() {
                this.classList.toggle('active');
                navList.style.display = this.classList.contains('active') ? 'flex' : 'none';
            });
            
            // Cerrar menú al hacer clic en un enlace (en móviles)
            navList.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        menuButton.click();
                    }
                });
            });
            
            // Ajustar menú al cambiar el tamaño de la ventana
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navList.style.display = 'flex';
                    menuButton.classList.remove('active');
                } else if (!menuButton.classList.contains('active')) {
                    navList.style.display = 'none';
                }
            });
        }
    }
}

/**
 * Inicializa tooltips (si está disponible Tippy.js)
 */
function initTooltips() {
    // Ejemplo de tooltips para elementos con el atributo data-tippy-content
    tippy('[data-tippy-content]', {
        animation: 'scale',
        arrow: true,
        theme: 'light',
        delay: [100, 200],
        duration: [200, 150],
        interactive: true
    });
}

// Exportar funciones para uso en la consola del navegador
window.SessionUtils = {
    initSessionNavigation,
    initCodeCopyButtons,
    initActivityTracking,
    initBackToTop,
    initMobileMenu,
    initTooltips
};
