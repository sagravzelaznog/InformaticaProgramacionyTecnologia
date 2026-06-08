/* =========================================
   PORTAFOLIO WEB - SCRIPT PRINCIPAL
   ========================================= */

// 1. GESTIÓN DEL MODO OSCURO
const botonTema = document.getElementById('btn-tema');
const cuerpoPagina = document.body;

botonTema.addEventListener('click', function() {
    cuerpoPagina.classList.toggle('modo-oscuro');
    if (cuerpoPagina.classList.contains('modo-oscuro')) { 
        botonTema.textContent = 'Cambiar a Modo Claro'; 
    } else { 
        botonTema.textContent = 'Cambiar a Modo Oscuro'; 
    }
});

// 2. RENDERIZADO DINÁMICO DE HABILIDADES
const misHabilidades = [
    { nombre: 'HTML5', porcentaje: '95%' }, 
    { nombre: 'CSS3', porcentaje: '85%' }, 
    { nombre: 'JavaScript', porcentaje: '60%' }, 
    { nombre: 'Diseño Responsivo', porcentaje: '90%' }
];
const contenedorHabilidades = document.getElementById('contenedor-habilidades');

misHabilidades.forEach(function(habilidad) {
    const estructuraHTML = `
        <div class="habilidad-item">
            <span class="habilidad-nombre">${habilidad.nombre}</span>
            <div class="barra-fondo">
                <div class="barra-progreso" style="width: ${habilidad.porcentaje};">
                    ${habilidad.porcentaje}
                </div>
            </div>
        </div>
    `;
    contenedorHabilidades.innerHTML += estructuraHTML;
});

// 3. MOTOR DE FILTRADO DE PROYECTOS
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetasProyecto = document.querySelectorAll('.proyecto-card');

botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Reiniciar clases activas
        botonesFiltro.forEach(function(btn) { btn.classList.remove('activo'); });
        boton.classList.add('activo');
        
        // Aplicar filtro
        const filtroSeleccionado = boton.getAttribute('data-filtro');
        tarjetasProyecto.forEach(function(tarjeta) {
            const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
            if (filtroSeleccionado === 'todos' || filtroSeleccionado === categoriaTarjeta) {
                tarjeta.classList.remove('oculto');
            } else {
                tarjeta.classList.add('oculto');
            }
        });
    });
});

// 4. VALIDACIÓN DE FORMULARIO DE CONTACTO
const formulario = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputMensaje = document.getElementById('mensaje');
const mensajeAlerta = document.getElementById('mensaje-alerta');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpiar estilos previos
    inputNombre.classList.remove('input-error', 'input-exito');
    inputCorreo.classList.remove('input-error', 'input-exito');
    inputMensaje.classList.remove('input-error', 'input-exito');
    
    let hayErrores = false;
    let textoError = '';
    
    // Validaciones
    if (inputNombre.value.trim() === '') { 
        inputNombre.classList.add('input-error'); 
        hayErrores = true; 
        textoError += 'Falta tu nombre. '; 
    } else { inputNombre.classList.add('input-exito'); }
    
    if (inputCorreo.value.includes('@') === false) { 
        inputCorreo.classList.add('input-error'); 
        hayErrores = true; 
        textoError += 'Falta el @ en el correo. '; 
    } else { inputCorreo.classList.add('input-exito'); }
    
    if (inputMensaje.value.trim() === '') { 
        inputMensaje.classList.add('input-error'); 
        hayErrores = true; 
        textoError += 'Escribe un mensaje.'; 
    } else { inputMensaje.classList.add('input-exito'); }
    
    // Renderizado de alertas
    mensajeAlerta.classList.remove('oculto');
    if (hayErrores) { 
        mensajeAlerta.textContent = textoError; 
        mensajeAlerta.className = 'alerta-error'; 
    } else { 
        mensajeAlerta.textContent = '¡Mensaje enviado correctamente!'; 
        mensajeAlerta.className = 'alerta-exito'; 
        formulario.reset();
        setTimeout(function() { 
            inputNombre.classList.remove('input-exito'); 
            inputCorreo.classList.remove('input-exito'); 
            inputMensaje.classList.remove('input-exito'); 
            mensajeAlerta.classList.add('oculto'); 
        }, 3000); 
    }
});

// 5. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
const actores = document.querySelectorAll('.seccion-animada');
const instruccionesDirector = function(entradas, observador) {
    entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('seccion-visible');
            observador.unobserve(entrada.target);
        }
    });
};
const directorDeTeatro = new IntersectionObserver(instruccionesDirector, { threshold: 0.15 });
actores.forEach(function(actor) { directorDeTeatro.observe(actor); });

// 6. GESTIÓN DE VENTANAS MODALES
const fondoModal = document.getElementById('fondo-modal');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const botonesAbrirModal = document.querySelectorAll('.btn-abrir-modal');
const tituloModal = document.getElementById('modal-titulo');

botonesAbrirModal.forEach(function(boton) {
    boton.addEventListener('click', function(e) {
        const tarjeta = e.target.parentElement;
        const tituloProyecto = tarjeta.querySelector('h3').textContent;
        tituloModal.textContent = tituloProyecto;
        fondoModal.classList.remove('oculto');
    });
});

btnCerrarModal.addEventListener('click', function() { fondoModal.classList.add('oculto'); });
fondoModal.addEventListener('click', function(e) { if (e.target === fondoModal) { fondoModal.classList.add('oculto'); } });

// 7. CONSUMO DE API EXTERNA (FETCH)
const btnChiste = document.getElementById('btn-chiste');
const textoChiste = document.getElementById('texto-chiste');

btnChiste.addEventListener('click', async function() {
    textoChiste.textContent = 'Cargando chiste...';
    try {
        const respuesta = await fetch('https://v2.jokeapi.dev/joke/Programming?lang=es&type=single');
        const datos = await respuesta.json();
        if (datos.joke) {
            textoChiste.textContent = datos.joke;
        } else {
            textoChiste.textContent = 'Intenta de nuevo para obtener humor geek.';
        }
    } catch (error) {
        textoChiste.textContent = 'Error de conexión. Intenta más tarde.';
    }
});