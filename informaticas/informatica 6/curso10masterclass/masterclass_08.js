// 1. MODO OSCURO
const botonTema = document.getElementById('btn-tema');
const cuerpoPagina = document.body;
botonTema.addEventListener('click', function() {
    cuerpoPagina.classList.toggle('modo-oscuro');
    if (cuerpoPagina.classList.contains('modo-oscuro')) { botonTema.textContent = 'Cambiar a Modo Claro'; } else { botonTema.textContent = 'Cambiar a Modo Oscuro'; }
});

// 2. HABILIDADES
const misHabilidades = [{ nombre: 'HTML5', porcentaje: '90%' }, { nombre: 'CSS3', porcentaje: '75%' }, { nombre: 'JavaScript', porcentaje: '40%' }, { nombre: 'Diseño Responsivo', porcentaje: '85%' }];
const contenedorHabilidades = document.getElementById('contenedor-habilidades');
misHabilidades.forEach(function(habilidad) {
    const estructuraHTML = `<div class="habilidad-item"><span class="habilidad-nombre">${habilidad.nombre}</span><div class="barra-fondo"><div class="barra-progreso" style="width: ${habilidad.porcentaje};">${habilidad.porcentaje}</div></div></div>`;
    contenedorHabilidades.innerHTML += estructuraHTML;
});

// 3. FILTRO DE PROYECTOS
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetasProyecto = document.querySelectorAll('.proyecto-card');
botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function() {
        botonesFiltro.forEach(function(btn) { btn.classList.remove('activo'); });
        boton.classList.add('activo');
        const filtroSeleccionado = boton.getAttribute('data-filtro');
        tarjetasProyecto.forEach(function(tarjeta) {
            const categoriaTarjeta = tarjeta.getAttribute('data-categoria');
            if (filtroSeleccionado === 'todos' || filtroSeleccionado === categoriaTarjeta) { tarjeta.classList.remove('oculto'); } else { tarjeta.classList.add('oculto'); }
        });
    });
});

// 4. FORMULARIO
const formulario = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre'); const inputCorreo = document.getElementById('correo'); const inputMensaje = document.getElementById('mensaje'); const mensajeAlerta = document.getElementById('mensaje-alerta');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    inputNombre.classList.remove('input-error', 'input-exito'); inputCorreo.classList.remove('input-error', 'input-exito'); inputMensaje.classList.remove('input-error', 'input-exito');
    let hayErrores = false; let textoError = '';
    if (inputNombre.value.trim() === '') { inputNombre.classList.add('input-error'); hayErrores = true; textoError += 'Falta tu nombre. '; } else { inputNombre.classList.add('input-exito'); }
    if (inputCorreo.value.includes('@') === false) { inputCorreo.classList.add('input-error'); hayErrores = true; textoError += 'Falta el @ en el correo. '; } else { inputCorreo.classList.add('input-exito'); }
    if (inputMensaje.value.trim() === '') { inputMensaje.classList.add('input-error'); hayErrores = true; textoError += 'Escribe un mensaje.'; } else { inputMensaje.classList.add('input-exito'); }
    
    mensajeAlerta.classList.remove('oculto');
    if (hayErrores) { mensajeAlerta.textContent = textoError; mensajeAlerta.className = 'alerta-error'; } 
    else {
        mensajeAlerta.textContent = '¡Mensaje enviado!'; mensajeAlerta.className = 'alerta-exito'; formulario.reset();
        setTimeout(function() { inputNombre.classList.remove('input-exito'); inputCorreo.classList.remove('input-exito'); inputMensaje.classList.remove('input-exito'); mensajeAlerta.classList.add('oculto'); }, 3000);
    }
});

// 5. OBSERVER AL SCROLL
const actores = document.querySelectorAll('.seccion-animada');
const instruccionesDirector = function(entradas, observador) {
    entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) { entrada.target.classList.add('seccion-visible'); observador.unobserve(entrada.target); }
    });
};
const directorDeTeatro = new IntersectionObserver(instruccionesDirector, { threshold: 0.2 });
actores.forEach(function(actor) { directorDeTeatro.observe(actor); });

// =========================================
// 6. NUEVO: LÓGICA DE LA VENTANA MODAL
// =========================================

// Seleccionamos la ventana modal completa, el botón de cierre y todos los botones de "Ver detalles"
const fondoModal = document.getElementById('fondo-modal');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const botonesAbrirModal = document.querySelectorAll('.btn-abrir-modal');

// Seleccionamos los textos de adentro del modal para poder cambiarlos dinámicamente luego
const tituloModal = document.getElementById('modal-titulo');

// A) Abrir la ventana
botonesAbrirModal.forEach(function(boton) {
    boton.addEventListener('click', function(e) {
        // Encontramos el título de la tarjeta a la que se le hizo clic
        // Usamos parentElement para subir al <article> y buscar el <h3>
        const tarjeta = e.target.parentElement;
        const tituloProyecto = tarjeta.querySelector('h3').textContent;
        
        // Cambiamos el texto del modal para que coincida con la tarjeta
        tituloModal.textContent = tituloProyecto;
        
        // Quitamos la clase 'oculto' para que la capa con z-index 1000 se muestre
        fondoModal.classList.remove('oculto');
    });
});

// B) Cerrar la ventana haciendo clic en la "X"
btnCerrarModal.addEventListener('click', function() {
    fondoModal.classList.add('oculto');
});

// C) Cerrar la ventana haciendo clic en lo oscurecido (fuera de la caja blanca)
fondoModal.addEventListener('click', function(e) {
    // Si exactamente en lo que hice clic es el fondo negro (y no la caja blanca que está adentro)
    if (e.target === fondoModal) {
        fondoModal.classList.add('oculto');
    }
});