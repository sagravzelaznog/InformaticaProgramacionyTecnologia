// ================================================================
// MÓDULO DE INTERACCIONES - SESIÓN 01
// ================================================================
// Maneja todas las interacciones del usuario con la página
// Eventos, animaciones, efectos visuales y comportamientos dinámicos
// ================================================================

class PageInteractions {
	constructor() {
					this.config = {
									animationDuration: 300,
									scrollBehavior: 'smooth',
									enableParticles: true,
									enableTooltips: true,
									enableDarkMode: true
					};
					
					this.state = {
									darkMode: false,
									sidebarOpen: true,
									scrollPosition: 0,
									activeSection: 'objetivo',
									expandedCards: [],
									toasts: []
					};
					
					this.elements = {
									sidebar: null,
									mainContent: null,
									header: null,
									footer: null,
									sections: []
					};
	}
	
	// ================================================================
	// INICIALIZACIÓN
	// ================================================================
	
	initialize() {
					console.log('🎨 Inicializando Interacciones');
					
					// Detectar tema preferido del sistema
					this.detectSystemTheme();
					
					// Cachear elementos
					this.cacheElements();
					
					// Registrar event listeners
					this.registerEventListeners();
					
					// Inicializar componentes
					this.initializeComponents();
					
					console.log('✓ Interacciones inicializadas correctamente');
					
					return { success: true, message: 'Sistema de interacciones listo' };
	}
	
	cacheElements() {
					this.elements = {
									sidebar: document.querySelector('.sidebar'),
									mainContent: document.querySelector('.main-content'),
									header: document.querySelector('.session-header'),
									footer: document.querySelector('.main-footer'),
									sections: document.querySelectorAll('.content-section'),
									navButtons: document.querySelectorAll('.nav-btn'),
									copyButtons: document.querySelectorAll('.copy-btn'),
									quizOptions: document.querySelectorAll('.quiz-option'),
									sidebarNav: document.querySelector('.sidebar-nav')
					};
	}
	
	// ================================================================
	// DETECCIÓN DE TEMA
	// ================================================================
	
	detectSystemTheme() {
					// Verificar preferencia guardada
					const savedTheme = localStorage.getItem('theme');
					if (savedTheme) {
									this.setTheme(savedTheme);
									return;
					}
					
					// Detectar preferencia del sistema
					const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					this.setTheme(prefersDark ? 'dark' : 'light');
					
					// Escuchar cambios de tema del sistema
					window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
									this.setTheme(e.matches ? 'dark' : 'light');
					});
	}
	
	setTheme(theme) {
					this.state.darkMode = theme === 'dark';
					document.documentElement.style.colorScheme = theme;
					localStorage.setItem('theme', theme);
					
					console.log(`🌙 Tema ${theme === 'dark' ? 'oscuro' : 'claro'} activado`);
	}
	
	toggleTheme() {
					const newTheme = this.state.darkMode ? 'light' : 'dark';
					this.setTheme(newTheme);
					this.showToast(`Modo ${newTheme} activado`, 'info');
	}
	
	// ================================================================
	// REGISTRO DE EVENT LISTENERS
	// ================================================================
	
	registerEventListeners() {
					// Scroll
					window.addEventListener('scroll', () => this.handleScroll());
					
					// Redimensionamiento
					window.addEventListener('resize', () => this.handleResize());
					
					// Navegación en sidebar
					this.elements.sidebarNav?.querySelectorAll('a').forEach(link => {
									link.addEventListener('click', (e) => this.handleNavClick(e));
					});
					
					// Botones de navegación
					this.elements.navButtons.forEach(btn => {
									btn.addEventListener('click', (e) => this.handleNavButton(e));
					});
					
					// Botones de copiar código
					this.elements.copyButtons.forEach(btn => {
									btn.addEventListener('click', (e) => this.handleCopyCode(e));
					});
					
					// Secciones expandibles
					document.querySelectorAll('.section-header').forEach(header => {
									header.addEventListener('click', () => this.toggleSection(header));
					});
					
					// Teclas de atajo
					document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
					
					// Links internos
					document.querySelectorAll('a[href^="#"]').forEach(link => {
									link.addEventListener('click', (e) => this.handleInternalLink(e));
					});
					
					// Tooltips
					this.initializeTooltips();
					
					// Hover en tarjetas
					this.initializeCardHovers();
	}
	
	// ================================================================
	// MANEJO DE SCROLL
	// ================================================================
	
	handleScroll() {
					this.state.scrollPosition = window.scrollY;
					
					// Actualizar sección activa
					this.updateActiveSection();
					
					// Efectos parallax
					this.applyParallaxEffect();
					
					// Animar elementos en vista
					this.animateElementsInView();
					
					// Mostrar/ocultar botón scroll-to-top
					this.toggleScrollTopButton();
	}
	
	updateActiveSection() {
					const sections = document.querySelectorAll('.content-section');
					let currentSection = null;
					
					sections.forEach(section => {
									const rect = section.getBoundingClientRect();
									if (rect.top <= window.innerHeight / 2) {
													currentSection = section.id;
									}
					});
					
					if (currentSection && currentSection !== this.state.activeSection) {
									this.state.activeSection = currentSection;
									this.updateSidebarHighlight(currentSection);
					}
	}
	
	updateSidebarHighlight(sectionId) {
					// Remover clase activa
					document.querySelectorAll('.sidebar-nav li').forEach(li => {
									li.classList.remove('active');
					});
					
					// Agregar clase activa al link correspondiente
					const activeLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
					if (activeLink) {
									activeLink.parentElement.classList.add('active');
					}
	}
	
	applyParallaxEffect() {
					const header = document.querySelector('.session-header');
					if (!header) return;
					
					const offset = window.scrollY;
					const speedFactor = 0.5;
					
					header.style.backgroundPosition = `center ${offset * speedFactor}px`;
	}
	
	animateElementsInView() {
					const elements = document.querySelectorAll('[data-animate]');
					
					elements.forEach(el => {
									const rect = el.getBoundingClientRect();
									
									if (rect.top <= window.innerHeight * 0.8) {
													el.classList.add('animate');
									}
					});
	}
	
	toggleScrollTopButton() {
					let scrollTopBtn = document.querySelector('.scroll-top-btn');
					
					if (!scrollTopBtn && this.state.scrollPosition > 300) {
									scrollTopBtn = this.createScrollTopButton();
					}
					
					if (scrollTopBtn) {
									if (this.state.scrollPosition > 300) {
													scrollTopBtn.style.display = 'flex';
													scrollTopBtn.style.opacity = '1';
									} else {
													scrollTopBtn.style.opacity = '0';
													setTimeout(() => scrollTopBtn.style.display = 'none', 300);
									}
					}
	}
	
	createScrollTopButton() {
					const btn = document.createElement('button');
					btn.className = 'scroll-top-btn';
					btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
					btn.style.cssText = `
									position: fixed;
									bottom: 2rem;
									right: 2rem;
									width: 50px;
									height: 50px;
									background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
									color: white;
									border: none;
									border-radius: 50%;
									cursor: pointer;
									display: none;
									align-items: center;
									justify-content: center;
									opacity: 0;
									transition: all 0.3s ease;
									z-index: 99;
									box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
					`;
					
					btn.addEventListener('click', () => this.scrollToTop());
					btn.addEventListener('mouseenter', () => {
									btn.style.transform = 'scale(1.1)';
					});
					btn.addEventListener('mouseleave', () => {
									btn.style.transform = 'scale(1)';
					});
					
					document.body.appendChild(btn);
					return btn;
	}
	
	scrollToTop() {
					window.scrollTo({
									top: 0,
									behavior: 'smooth'
					});
	}
	
	// ================================================================
	// MANEJO DE RESIZE
	// ================================================================
	
	handleResize() {
					const width = window.innerWidth;
					
					// Ajustar sidebar en móviles
					if (width < 768) {
									if (this.state.sidebarOpen) {
													this.toggleSidebar();
									}
					}
	}
	
	toggleSidebar() {
					this.state.sidebarOpen = !this.state.sidebarOpen;
					
					if (this.elements.sidebar) {
									if (this.state.sidebarOpen) {
													this.elements.sidebar.style.display = 'block';
									} else {
													this.elements.sidebar.style.display = 'none';
									}
					}
	}
	
	// ================================================================
	// MANEJO DE NAVEGACIÓN
	// ================================================================
	
	handleNavClick(e) {
					const href = e.currentTarget.getAttribute('href');
					
					if (href.startsWith('#')) {
									e.preventDefault();
									const sectionId = href.substring(1);
									this.scrollToSection(sectionId);
					}
	}
	
	handleNavButton(e) {
					const btn = e.currentTarget;
					const action = btn.getAttribute('data-action') || btn.className;
					
					if (action.includes('prev')) {
									this.showToast('Esta es la primera sesión', 'info');
					} else if (action.includes('next')) {
									this.showToast('Completa el quiz para desbloquear la siguiente sesión', 'info');
					}
	}
	
	scrollToSection(sectionId) {
					const section = document.getElementById(sectionId);
					if (!section) return;
					
					section.scrollIntoView({
									behavior: 'smooth',
									block: 'start'
					});
					
					// Resaltar sección temporalmente
					this.highlightSection(section);
	}
	
	highlightSection(section) {
					const originalBg = section.style.background;
					section.style.background = 'rgba(99, 102, 241, 0.1)';
					
					setTimeout(() => {
									section.style.background = originalBg;
					}, 2000);
	}
	
	// ================================================================
	// MANEJO DE COPIAR CÓDIGO
	// ================================================================
	
	handleCopyCode(e) {
					e.preventDefault();
					e.stopPropagation();
					
					const btn = e.currentTarget;
					const codeBlock = btn.closest('.code-example');
					const code = codeBlock.querySelector('code').innerText;
					
					navigator.clipboard.writeText(code).then(() => {
									this.showCopyFeedback(btn);
									this.showToast('✓ Código copiado al portapapeles', 'success');
					}).catch(() => {
									this.showToast('✗ Error al copiar el código', 'error');
					});
	}
	
	showCopyFeedback(btn) {
					const originalHTML = btn.innerHTML;
					const originalBg = btn.style.background;
					
					btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
					btn.style.background = 'var(--color-success)';
					
					setTimeout(() => {
									btn.innerHTML = originalHTML;
									btn.style.background = originalBg;
					}, 2000);
	}
	
	// ================================================================
	// SECCIONES EXPANDIBLES
	// ================================================================
	
	toggleSection(header) {
					const section = header.closest('.content-section');
					const content = section.querySelector('.section-content');
					const isExpanded = content.style.maxHeight !== '0px';
					
					if (isExpanded) {
									this.collapseSection(content);
					} else {
									this.expandSection(content);
					}
	}
	
	expandSection(content) {
					content.style.maxHeight = content.scrollHeight + 'px';
					content.style.opacity = '1';
	}
	
	collapseSection(content) {
					content.style.maxHeight = '0';
					content.style.opacity = '0';
	}
	
	// ================================================================
	// TECLAS DE ATAJO
	// ================================================================
	
	handleKeyboardShortcuts(e) {
					// Ctrl/Cmd + K: Búsqueda
					if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
									e.preventDefault();
									this.openSearch();
					}
					
					// Ctrl/Cmd + Shift + Q: Iniciar quiz
					if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Q') {
									e.preventDefault();
									if (window.iniciarQuiz) window.iniciarQuiz();
					}
					
					// Escape: Cerrar modales
					if (e.key === 'Escape') {
									this.closeAllModals();
					}
					
					// Ctrl/Cmd + Shift + T: Toggle tema
					if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
									e.preventDefault();
									this.toggleTheme();
					}
					
					// Flechas: Navegar secciones
					if (e.key === 'ArrowDown') {
									e.preventDefault();
									this.navigateNextSection();
					} else if (e.key === 'ArrowUp') {
									e.preventDefault();
									this.navigatePreviousSection();
					}
	}
	
	openSearch() {
					this.showToast('Función de búsqueda próximamente...', 'info');
	}
	
	closeAllModals() {
					document.querySelectorAll('[style*="position: fixed"]').forEach(modal => {
									if (modal.style.background && modal.style.background.includes('rgba')) {
													modal.remove();
									}
					});
	}
	
	navigateNextSection() {
					const sections = Array.from(document.querySelectorAll('.content-section'));
					const currentIndex = sections.findIndex(s => s.id === this.state.activeSection);
					
					if (currentIndex < sections.length - 1) {
									this.scrollToSection(sections[currentIndex + 1].id);
					}
	}
	
	navigatePreviousSection() {
					const sections = Array.from(document.querySelectorAll('.content-section'));
					const currentIndex = sections.findIndex(s => s.id === this.state.activeSection);
					
					if (currentIndex > 0) {
									this.scrollToSection(sections[currentIndex - 1].id);
					}
	}
	
	// ================================================================
	// LINKS INTERNOS
	// ================================================================
	
	handleInternalLink(e) {
					const href = e.currentTarget.getAttribute('href');
					
					if (href.startsWith('#')) {
									e.preventDefault();
									const sectionId = href.substring(1);
									this.scrollToSection(sectionId);
					}
	}
	
	// ================================================================
	// TOOLTIPS
	// ================================================================
	
	initializeTooltips() {
					if (!this.config.enableTooltips) return;
					
					document.querySelectorAll('[data-tooltip]').forEach(element => {
									element.addEventListener('mouseenter', (e) => this.showTooltip(e));
									element.addEventListener('mouseleave', (e) => this.hideTooltip(e));
					});
	}
	
	showTooltip(e) {
					const element = e.currentTarget;
					const text = element.getAttribute('data-tooltip');
					
					const tooltip = document.createElement('div');
					tooltip.className = 'tooltip';
					tooltip.textContent = text;
					tooltip.style.cssText = `
									position: absolute;
									background: #1f2937;
									color: white;
									padding: 0.5rem 1rem;
									border-radius: 0.375rem;
									font-size: 0.875rem;
									white-space: nowrap;
									z-index: 1000;
									bottom: 100%;
									left: 50%;
									transform: translateX(-50%);
									margin-bottom: 0.5rem;
									opacity: 0;
									transition: opacity 0.2s;
					`;
					
					element.style.position = 'relative';
					element.appendChild(tooltip);
					
					requestAnimationFrame(() => {
									tooltip.style.opacity = '1';
					});
	}
	
	hideTooltip(e) {
					const tooltip = e.currentTarget.querySelector('.tooltip');
					if (tooltip) {
									tooltip.style.opacity = '0';
									setTimeout(() => tooltip.remove(), 200);
					}
	}
	
	// ================================================================
	// HOVER EN TARJETAS
	// ================================================================
	
	initializeCardHovers() {
					const cards = document.querySelectorAll(
									'.objective-card, .requirement-item, .summary-item, .resource-card'
					);
					
					cards.forEach(card => {
									card.addEventListener('mouseenter', () => this.elevateCard(card));
									card.addEventListener('mouseleave', () => this.resetCard(card));
					});
	}
	
	elevateCard(card) {
					card.style.transform = 'translateY(-5px)';
					card.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
	}
	
	resetCard(card) {
					card.style.transform = '';
					card.style.boxShadow = '';
	}
	
	// ================================================================
	// SISTEMA DE NOTIFICACIONES (TOASTS)
	// ================================================================
	
	showToast(message, type = 'info', duration = 3000) {
					const toast = document.createElement('div');
					const toastId = Date.now();
					
					const colors = {
									success: { bg: '#10b981', icon: 'fa-check-circle' },
									error: { bg: '#ef4444', icon: 'fa-exclamation-circle' },
									warning: { bg: '#f59e0b', icon: 'fa-exclamation-triangle' },
									info: { bg: '#06b6d4', icon: 'fa-info-circle' }
					};
					
					const config = colors[type] || colors.info;
					
					toast.style.cssText = `
									position: fixed;
									bottom: 2rem;
									right: 2rem;
									background: ${config.bg};
									color: white;
									padding: 1rem 1.5rem;
									border-radius: 0.5rem;
									box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
									z-index: 9999;
									display: flex;
									align-items: center;
									gap: 1rem;
									animation: slideInRight 0.3s ease-out;
									max-width: 400px;
									font-weight: 600;
					`;
					
					toast.innerHTML = `
									<i class="fas ${config.icon}"></i>
									<span>${message}</span>
									<button onclick="this.parentElement.remove()" style="
													background: none;
													border: none;
													color: white;
													cursor: pointer;
													font-size: 1.2rem;
													margin-left: 1rem;
									">×</button>
					`;
					
					document.body.appendChild(toast);
					this.state.toasts.push(toastId);
					
					setTimeout(() => {
									toast.style.animation = 'slideOutRight 0.3s ease-out';
									setTimeout(() => {
													toast.remove();
													this.state.toasts = this.state.toasts.filter(id => id !== toastId);
									}, 300);
					}, duration);
	}
	
	// ================================================================
	// INICIALIZACIÓN DE COMPONENTES
	// ================================================================
	
	initializeComponents() {
					// Agregar estilos para animaciones y tooltips
					this.injectStyles();
					
					// Inicializar elementos con atributos data
					this.initializeDataAttributes();
					
					// Mejorar enlaces
					this.enhanceLinks();
	}
	
	injectStyles() {
					const styles = document.createElement('style');
					styles.textContent = `
									@keyframes slideInRight {
													from {
																	opacity: 0;
																	transform: translateX(100px);
													}
													to {
																	opacity: 1;
																	transform: translateX(0);
													}
									}
									
									@keyframes slideOutRight {
													from {
																	opacity: 1;
																	transform: translateX(0);
													}
													to {
																	opacity: 0;
																	transform: translateX(100px);
													}
									}
									
									.animate {
													animation: slideInUp 0.6s ease-out forwards !important;
									}
									
									[data-animate] {
													opacity: 0;
									}
									
									.tooltip {
													animation: fadeIn 0.2s ease-out;
									}
									
									@keyframes fadeIn {
													from { opacity: 0; }
													to { opacity: 1; }
									}
									
									.section-content {
													max-height: unset;
													transition: all 0.3s ease;
													overflow: hidden;
									}
					`;
					
					document.head.appendChild(styles);
	}
	
	initializeDataAttributes() {
					// Elementos con data-animate
					document.querySelectorAll('[data-animate]').forEach(el => {
									const delay = el.getAttribute('data-delay') || '0';
									el.style.animationDelay = `${delay}ms`;
					});
	}
	
	enhanceLinks() {
					document.querySelectorAll('a[href*="http"]').forEach(link => {
									if (!link.getAttribute('target')) {
													link.setAttribute('target', '_blank');
													link.setAttribute('rel', 'noopener noreferrer');
									}
					});
	}
	
	// ================================================================
	// EFECTOS VISUALES ESPECIALES
	// ================================================================
	
	createRipple(e) {
					const button = e.currentTarget;
					const ripple = document.createElement('span');
					
					const rect = button.getBoundingClientRect();
					const size = Math.max(rect.width, rect.height);
					const x = e.clientX - rect.left - size / 2;
					const y = e.clientY - rect.top - size / 2;
					
					ripple.style.cssText = `
									position: absolute;
									width: ${size}px;
									height: ${size}px;
									background: rgba(255, 255, 255, 0.5);
									border-radius: 50%;
									left: ${x}px;
									top: ${y}px;
									pointer-events: none;
									animation: ripple 0.6s ease-out;
					`;
					
					button.style.position = 'relative';
					button.style.overflow = 'hidden';
					button.appendChild(ripple);
					
					setTimeout(() => ripple.remove(), 600);
	}
	
	// ================================================================
	// CONFETI Y EFECTOS DE CELEBRACIÓN
	// ================================================================
	
	launchConfetti() {
					const confetti = [];
					const confettiCount = 50;
					
					for (let i = 0; i < confettiCount; i++) {
									const piece = document.createElement('div');
									
									piece.style.cssText = `
													position: fixed;
													width: 10px;
													height: 10px;
													background: ${this.getRandomColor()};
													left: ${Math.random() * window.innerWidth}px;
													top: -10px;
													opacity: 1;
													pointer-events: none;
													z-index: 9998;
													border-radius: 50%;
									`;
									
									document.body.appendChild(piece);
									confetti.push({
													element: piece,
													x: parseFloat(piece.style.left),
													y: 0,
													velocityX: (Math.random() - 0.5) * 8,
													velocityY: Math.random() * 5 + 5,
													rotation: Math.random() * 360
									});
					}
					
					const animate = () => {
									confetti.forEach((c, index) => {
													c.y += c.velocityY;
													c.x += c.velocityX;
													c.rotation += 10;
													c.velocityY += 0.1; // gravedad
													
													c.element.style.left = c.x + 'px';
													c.element.style.top = c.y + 'px';
													c.element.style.transform = `rotate(${c.rotation}deg)`;
													c.element.style.opacity = Math.max(0, 1 - (c.y / window.innerHeight));
													
													if (c.y > window.innerHeight) {
																	c.element.remove();
																	confetti.splice(index, 1);
													}
									});
									
									if (confetti.length > 0) {
													requestAnimationFrame(animate);
									}
					};
					
					animate();
	}
	
	getRandomColor() {
					const colors = ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
					return colors[Math.floor(Math.random() * colors.length)];
	}
	
	// ================================================================
	// BÚSQUEDA EN LA PÁGINA
	// ================================================================
	
	searchInPage(query) {
					if (query.length < 2) {
									return { results: [], count: 0 };
					}
					
					const results = [];
					const regex = new RegExp(query, 'gi');
					const sections = document.querySelectorAll('.content-section');
					
					sections.forEach(section => {
									const text = section.textContent;
									const matches = text.match(regex);
									
									if (matches) {
													results.push({
																	title: section.querySelector('.section-header h2')?.textContent || 'Sin título',
																	sectionId: section.id,
																	matches: matches.length
													});
									}
					});
					
					return { results, count: results.length };
	}
	
	// ================================================================
	// UTILIDADES
	// ================================================================
	
	getScrollPercentage() {
					const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
					return Math.round((window.scrollY / windowHeight) * 100);
	}
	
	isElementInViewport(element) {
					const rect = element.getBoundingClientRect();
					return (
									rect.top >= 0 &&
									rect.left >= 0 &&
									rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
									rect.right <= (window.innerWidth || document.documentElement.clientWidth)
					);
	}
	
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
	}
	
	throttle(func, limit) {
					let inThrottle;
					return function(...args) {
									if (!inThrottle) {
													func.apply(this, args);
													inThrottle = true;
													setTimeout(() => inThrottle = false, limit);
									}
					};
	}
	
	// ================================================================
	// GESTIÓN DE ESTADO
	// ================================================================
	
	saveState() {
					try {
									localStorage.setItem('page-interactions-state', JSON.stringify(this.state));
									return true;
					} catch (e) {
									console.error('Error al guardar estado:', e);
									return false;
					}
	}
	
	loadState() {
					try {
									const saved = localStorage.getItem('page-interactions-state');
									if (saved) {
													this.state = { ...this.state, ...JSON.parse(saved) };
													return true;
									}
					} catch (e) {
									console.error('Error al cargar estado:', e);
					}
					return false;
	}
	
	// ================================================================
	// ANÁLISIS Y LOGGING
	// ================================================================
	
	trackEvent(eventName, eventData = {}) {
					const event = {
									name: eventName,
									timestamp: new Date().toISOString(),
									data: eventData,
									scrollPercentage: this.getScrollPercentage(),
									activeSection: this.state.activeSection
					};
					
					console.log('📊 Evento registrado:', event);
					
					// Aquí iría envío a un servidor de análisis
					// await fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
	}
	
	// ================================================================
	// IMPRESIÓN Y EXPORTACIÓN
	// ================================================================
	
	printPage() {
					window.print();
					this.trackEvent('page-printed');
	}
	
	exportPageAsHTML() {
					const html = document.documentElement.outerHTML;
					const blob = new Blob([html], { type: 'text/html' });
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					
					link.href = url;
					link.download = `sesion-01-${new Date().toISOString().split('T')[0]}.html`;
					link.click();
					
					URL.revokeObjectURL(url);
					this.trackEvent('page-exported-as-html');
	}
}

// ================================================================
// INICIALIZACIÓN GLOBAL
// ================================================================

const pageInteractions = new PageInteractions();

document.addEventListener('DOMContentLoaded', () => {
	pageInteractions.initialize();
	console.log('✓ Sistema de interacciones activado');
	
	// Guardar estado al descargar
	window.addEventListener('beforeunload', () => {
					pageInteractions.saveState();
	});
});

// ================================================================
// EXPORTAR PARA USO EN OTROS MÓDULOS
// ================================================================

if (typeof window !== 'undefined') {
	window.PageInteractions = PageInteractions;
	window.pageInteractions = pageInteractions;
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = PageInteractions;
}