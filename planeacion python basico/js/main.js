// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Botón de volver arriba
    const backToTopButton = document.getElementById('back-to-top');
    
    // Mostrar/ocultar el botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Desplazamiento suave al hacer clic en el botón
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Funcionalidad de acordeón para los módulos
    const modules = document.querySelectorAll('.module');
    
    // Al cargar la página, mostrar el primer módulo expandido
    if (modules.length > 0) {
        modules[0].classList.add('active');
    }
    
    // Alternar la visualización de las sesiones al hacer clic en el encabezado del módulo
    modules.forEach(module => {
        const header = module.querySelector('h3');
        
        header.addEventListener('click', function() {
            // Cerrar todos los módulos
            modules.forEach(m => {
                if (m !== module) {
                    m.classList.remove('active');
                }
            });
            
            // Alternar el módulo actual
            module.classList.toggle('active');
            
            // Desplazarse suavemente al módulo
            if (module.classList.contains('active')) {
                setTimeout(() => {
                    module.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
    
    // Resaltar la sección activa en la navegación
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Cerrar el menú al hacer clic en un enlace (útil en móviles)
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            // Cerrar menú móvil si está abierto
            const mobileMenu = document.querySelector('.mobile-menu-btn');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        });
    });
    
    // Añadir clase al body para mejorar la experiencia de carga
    document.body.classList.add('loaded');
});

// Función para cargar dinámicamente el contenido de las sesiones
function loadSessionContent(sessionNumber) {
    // Esta función se puede expandir para cargar contenido dinámico
    console.log(`Cargando contenido de la sesión ${sessionNumber}`);
    // Aquí iría la lógica para cargar el contenido de la sesión correspondiente
}

// Función para inicializar el modo oscuro/claro
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Cambiar tema';
    
    // Insertar el botón en el header
    const header = document.querySelector('header .container');
    if (header) {
        header.appendChild(themeToggle);
        
        // Manejar el cambio de tema
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Guardar preferencia en localStorage
            localStorage.setItem('darkMode', isDark);
        });
        
        // Cargar preferencia guardada
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Inicializar el conmutador de tema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initThemeSwitcher);

// Función para agregar un botón de menú móvil
function initMobileMenu() {
    // Crear botón de menú móvil
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Menú de navegación');
    
    // Insertar el botón antes del menú de navegación
    const nav = document.querySelector('.main-nav');
    if (nav) {
        nav.insertBefore(menuButton, nav.firstChild);
        
        // Alternar menú móvil
        menuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            const navList = this.nextElementSibling;
            if (navList && navList.tagName === 'UL') {
                navList.style.display = this.classList.contains('active') ? 'flex' : 'none';
            }
        });
        
        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
                menuButton.classList.remove('active');
                const navList = menuButton.nextElementSibling;
                if (navList && navList.tagName === 'UL') {
                    navList.style.display = 'none';
                }
            }
        });
    }
}

// Inicializar menú móvil cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Función para agregar animaciones de scroll
function initScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .info-card, .module, .resource-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Aplicar estilos iniciales
    document.querySelectorAll('.section, .info-card, .module, .resource-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
    
    // Disparar animaciones al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initScrollAnimations);
