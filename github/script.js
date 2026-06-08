// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    
    // Función para cambiar de sección
    function showSection(sectionId) {
        // Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Actualizar el enlace activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Desplazamiento suave al principio de la sección
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Agregar evento de clic a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            
            // Actualizar la URL sin recargar la página
            history.pushState(null, '', `#${sectionId}`);
        });
    });
    
    // Manejar el botón de retroceso/adelante del navegador
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'inicio';
        showSection(hash);
    });
    
    // Mostrar la sección correspondiente al hash de la URL al cargar la página
    const initialHash = window.location.hash.substring(1);
    const defaultSection = document.getElementById('inicio') ? 'inicio' : sections[0].id;
    showSection(initialHash || defaultSection);
    
    // Efecto de desplazamiento suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Resaltar la sintaxis de los bloques de código
    function highlightCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        // Función para resaltar la sintaxis (puedes implementar o incluir una librería como Prism.js o Highlight.js)
        codeBlocks.forEach(block => {
            // Aquí podrías agregar el resaltado de sintaxis
            // Por ahora, solo agregamos una clase para estilizado básico
            block.classList.add('hljs');
        });
    }
    
    // Llamar a la función de resaltado de sintaxis
    highlightCodeBlocks();
    
    // Animación para las tarjetas al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar la animación a las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Copiar al portapapeles para los bloques de código
    document.querySelectorAll('pre').forEach(pre => {
        // Crear botón de copiar
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="far fa-copy"></i>';
        button.title = 'Copiar al portapapeles';
        
        // Añadir el botón al bloque de código
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        // Estilo para el botón de copiar
        const style = document.createElement('style');
        style.textContent = `
            .copy-button {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 4px;
                color: #f8fafc;
                cursor: pointer;
                padding: 0.25rem 0.5rem;
                font-size: 0.8rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            pre:hover .copy-button {
                opacity: 1;
            }
            
            .copy-button:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .copy-button.copied {
                background: var(--secondary-color);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
        
        // Función para copiar al portapapeles
        button.addEventListener('click', async () => {
            const code = pre.querySelector('code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');
                setTimeout(() => {
                    button.innerHTML = '<i class="far fa-copy"></i>';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Error al copiar al portapapeles:', err);
            }
        });
    });
    
    // Mostrar la fecha actual en el pie de página
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
    }
});
