/**
 * MAIN.JS OPTIMIZADO - CURSO PYTHON BÁSICO
 * Versión 2.0.0 - Código modular y optimizado
 */

'use strict';

// ========================================
// CONFIGURACIÓN Y CONSTANTES
// ========================================

const CONFIG = {
    animationDuration: 300,
    scrollOffset: 100,
    backToTopThreshold: 300,
    storageKeys: {
        darkMode: 'python-course-dark-mode',
        completedActivities: 'python-course-completed-activities',
        userProgress: 'python-course-user-progress'
    }
};

// ========================================
// UTILIDADES
// ========================================

const Utils = {
    /**
     * Debounce function para optimizar eventos
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function para limitar la frecuencia de ejecución
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Verificar si un elemento está en el viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Obtener datos del localStorage de forma segura
     */
    getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn(`Error reading from localStorage: ${error.message}`);
            return defaultValue;
        }
    },

    /**
     * Guardar datos en localStorage de forma segura
     */
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`Error writing to localStorage: ${error.message}`);
            return false;
        }
    }
};

// ========================================
// GESTIÓN DE TEMA OSCURO/CLARO
// ========================================

const ThemeManager = {
    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.initThemeToggle();
        this.loadSavedTheme();
    },

    initThemeToggle() {
        if (!this.themeToggle) {
            this.createThemeToggle();
        }
        
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Cambiar tema';
        themeToggle.setAttribute('aria-label', 'Cambiar entre tema claro y oscuro');
        
        const header = document.querySelector('.header .container');
        if (header) {
            header.appendChild(themeToggle);
            this.themeToggle = themeToggle;
        }
    },

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        this.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        Utils.setStorage(CONFIG.storageKeys.darkMode, isDark);
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { isDark } 
        }));
    },

    loadSavedTheme() {
        const isDark = Utils.getStorage(CONFIG.storageKeys.darkMode, false);
        if (isDark) {
            document.body.classList.add('dark-theme');
            if (this.themeToggle) {
                this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }
};

// ========================================
// NAVEGACIÓN Y SCROLL
// ========================================

const NavigationManager = {
    init() {
        this.navLinks = document.querySelectorAll('.main-nav a');
        this.sections = document.querySelectorAll('section[id]');
        this.initScrollSpy();
        this.initSmoothScrolling();
    },

    initScrollSpy() {
        const scrollHandler = Utils.throttle(() => {
            this.updateActiveNavLink();
        }, 100);

        window.addEventListener('scroll', scrollHandler, { passive: true });
        this.updateActiveNavLink(); // Llamar una vez al cargar
    },

    updateActiveNavLink() {
        const scrollPosition = window.scrollY + CONFIG.scrollOffset;
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    },

    initSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Ajuste para header fijo
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Actualizar URL sin recargar
                        history.pushState(null, '', href);
                    }
                }
            });
        });
    }
};

// ========================================
// GESTIÓN DE MÓDULOS ACORDEÓN
// ========================================

const AccordionManager = {
    init() {
        this.modules = document.querySelectorAll('.module');
        this.initAccordion();
        this.setDefaultActiveModule();
    },

    initAccordion() {
        this.modules.forEach(module => {
            const header = module.querySelector('h3');
            if (header) {
                header.addEventListener('click', () => {
                    this.toggleModule(module);
                });
                
                // Mejorar accesibilidad
                header.setAttribute('role', 'button');
                header.setAttribute('tabindex', '0');
                header.setAttribute('aria-expanded', 'false');
                
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleModule(module);
                    }
                });
            }
        });
    },

    toggleModule(activeModule) {
        // Cerrar otros módulos
        this.modules.forEach(module => {
            if (module !== activeModule) {
                module.classList.remove('active');
                const header = module.querySelector('h3');
                if (header) {
                    header.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Alternar módulo actual
        activeModule.classList.toggle('active');
        const header = activeModule.querySelector('h3');
        const isActive = activeModule.classList.contains('active');
        
        if (header) {
            header.setAttribute('aria-expanded', isActive.toString());
        }

        // Scroll suave al módulo si se abre
        if (isActive) {
            setTimeout(() => {
                activeModule.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, CONFIG.animationDuration);
        }
    },

    setDefaultActiveModule() {
        // Activar primer módulo por defecto
        if (this.modules.length > 0) {
            this.toggleModule(this.modules[0]);
        }
    }
};

// ========================================
// BOTÓN VOLVER ARRIBA
// ========================================

const BackToTopManager = {
    init() {
        this.button = document.getElementById('back-to-top');
        if (!this.button) return;
        
        this.initScrollListener();
        this.initClickHandler();
    },

    initScrollListener() {
        const scrollHandler = Utils.throttle(() => {
            this.toggleVisibility();
        }, 100);

        window.addEventListener('scroll', scrollHandler, { passive: true });
        this.toggleVisibility(); // Verificar estado inicial
    },

    toggleVisibility() {
        const shouldShow = window.pageYOffset > CONFIG.backToTopThreshold;
        
        if (shouldShow) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },

    initClickHandler() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Focus en el header para accesibilidad
            const header = document.querySelector('.header h1');
            if (header) {
                header.focus();
            }
        });
    }
};

// ========================================
// MENÚ MÓVIL
// ========================================

const MobileMenuManager = {
    init() {
        this.createMobileMenuButton();
        this.initMobileMenuToggle();
        this.initClickOutsideHandler();
        this.initResponsiveHandler();
    },

    createMobileMenuButton() {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.setAttribute('aria-label', 'Menú de navegación');
        menuButton.setAttribute('aria-expanded', 'false');
        
        const nav = document.querySelector('.main-nav');
        if (nav) {
            nav.insertBefore(menuButton, nav.firstChild);
            this.menuButton = menuButton;
            this.navList = nav.querySelector('ul');
        }
    },

    initMobileMenuToggle() {
        if (!this.menuButton || !this.navList) return;
        
        this.menuButton.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Cerrar menú al hacer clic en enlaces
        this.navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });
    },

    toggleMobileMenu() {
        const isOpen = this.menuButton.classList.contains('active');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    openMobileMenu() {
        this.menuButton.classList.add('active');
        this.menuButton.setAttribute('aria-expanded', 'true');
        this.navList.style.display = 'flex';
        this.navList.setAttribute('aria-hidden', 'false');
    },

    closeMobileMenu() {
        this.menuButton.classList.remove('active');
        this.menuButton.setAttribute('aria-expanded', 'false');
        this.navList.style.display = 'none';
        this.navList.setAttribute('aria-hidden', 'true');
    },

    initClickOutsideHandler() {
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.main-nav');
            
            if (!nav.contains(e.target) && 
                this.menuButton && 
                this.menuButton.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    },

    initResponsiveHandler() {
        const resizeHandler = Utils.debounce(() => {
            if (window.innerWidth > 768) {
                this.navList.style.display = 'flex';
                this.navList.setAttribute('aria-hidden', 'false');
                this.menuButton.classList.remove('active');
                this.menuButton.setAttribute('aria-expanded', 'false');
            } else if (!this.menuButton.classList.contains('active')) {
                this.navList.style.display = 'none';
                this.navList.setAttribute('aria-hidden', 'true');
            }
        }, 250);

        window.addEventListener('resize', resizeHandler);
    }
};

// ========================================
// ANIMACIONES DE SCROLL
// ========================================

const AnimationManager = {
    init() {
        this.animatedElements = document.querySelectorAll(
            '.section, .info-card, .module, .resource-card'
        );
        
        this.initScrollAnimations();
        this.setInitialStates();
    },

    setInitialStates() {
        this.animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        });
    },

    initScrollAnimations() {
        const animateHandler = Utils.throttle(() => {
            this.animateOnScroll();
        }, 100);

        window.addEventListener('scroll', animateHandler, { passive: true });
        window.addEventListener('load', () => this.animateOnScroll());
    },

    animateOnScroll() {
        this.animatedElements.forEach(element => {
            if (Utils.isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
};

// ========================================
// GESTIÓN DE PROGRESO DEL USUARIO
// ========================================

const ProgressManager = {
    init() {
        this.loadUserProgress();
        this.initProgressTracking();
    },

    loadUserProgress() {
        const progress = Utils.getStorage(CONFIG.storageKeys.userProgress, {});
        this.userProgress = progress;
        
        // Aplicar progreso guardado a la UI
        this.updateProgressUI();
    },

    saveUserProgress() {
        Utils.setStorage(CONFIG.storageKeys.userProgress, this.userProgress);
    },

    updateProgress(moduleId, sessionId, completed = true) {
        if (!this.userProgress[moduleId]) {
            this.userProgress[moduleId] = {};
        }
        
        this.userProgress[moduleId][sessionId] = {
            completed,
            completedAt: new Date().toISOString()
        };
        
        this.saveUserProgress();
        this.updateProgressUI();
    },

    updateProgressUI() {
        // Implementar lógica para actualizar indicadores de progreso en la UI
        const progressElements = document.querySelectorAll('[data-progress]');
        
        progressElements.forEach(element => {
            const moduleId = element.dataset.module;
            const sessionId = element.dataset.session;
            
            if (this.userProgress[moduleId] && 
                this.userProgress[moduleId][sessionId] && 
                this.userProgress[moduleId][sessionId].completed) {
                element.classList.add('completed');
            }
        });
    },

    initProgressTracking() {
        // Escuchar eventos de progreso
        document.addEventListener('sessionCompleted', (e) => {
            const { moduleId, sessionId } = e.detail;
            this.updateProgress(moduleId, sessionId, true);
        });
    }
};

// ========================================
// INICIALIZACIÓN PRINCIPAL
// ========================================

class CourseApp {
    constructor() {
        this.init();
    }

    init() {
        // Verificar que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            console.log('🚀 Inicializando Curso Python Básico v2.0.0...');
            
            // Inicializar componentes
            ThemeManager.init();
            NavigationManager.init();
            AccordionManager.init();
            BackToTopManager.init();
            MobileMenuManager.init();
            AnimationManager.init();
            ProgressManager.init();
            
            // Añadir clase de carga completa
            document.body.classList.add('loaded');
            
            // Disparar evento de inicialización
            document.dispatchEvent(new CustomEvent('courseAppReady'));
            
            console.log('✅ Aplicación inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error durante la inicialización:', error);
        }
    }

    // Método para recargar componentes específicos
    reloadComponent(componentName) {
        switch (componentName) {
            case 'theme':
                ThemeManager.init();
                break;
            case 'navigation':
                NavigationManager.init();
                break;
            case 'accordion':
                AccordionManager.init();
                break;
            default:
                console.warn(`Componente desconocido: ${componentName}`);
        }
    }
}

// ========================================
// INICIALIZAR APLICACIÓN
// ========================================

// Inicializar la aplicación
const app = new CourseApp();

// Exportar para uso en consola del navegador
window.CourseApp = {
    app,
    Utils,
    ThemeManager,
    NavigationManager,
    AccordionManager,
    BackToTopManager,
    MobileMenuManager,
    AnimationManager,
    ProgressManager,
    CONFIG
};

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.warn('⚠️ Error registrando Service Worker:', error);
            });
    });
}

