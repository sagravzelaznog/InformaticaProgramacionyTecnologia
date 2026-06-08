// 1. MODO OSCURO
const botonTema = document.getElementById('btn-tema'); const cuerpoPagina = document.body;
botonTema.addEventListener('click', function() { cuerpoPagina.classList.toggle('modo-oscuro'); if (cuerpoPagina.classList.contains('modo-oscuro')) { botonTema.textContent = 'Cambiar a Modo Claro'; } else { botonTema.textContent = 'Cambiar a Modo Oscuro'; } });

// 2. HABILIDADES
const misHabilidades = [{ nombre: 'HTML5', porcentaje: '90%' }, { nombre: 'CSS3', porcentaje: '75%' }, { nombre: 'JavaScript', porcentaje: '40%' }, { nombre: 'Diseño Responsivo', porcentaje: '85%' }];
const contenedorHabilidades = document.getElementById('contenedor-habilidades');
misHabilidades.forEach(function(habilidad) { const estructuraHTML = `<div class="habilidad-item"><span class="habilidad-nombre">${habilidad.nombre}</span><div class="barra-fondo"><div class="barra-progreso" style="width: ${habilidad.porcentaje};">${habilidad.porcentaje}</div></div></div>`; contenedorHabilidades.innerHTML += estructuraHTML; });

// 3. FILTRO DE PROYECTOS
const botonesFiltro = document.querySelectorAll('.btn-filtro'); const tarjetasProyecto = document.querySelectorAll('.proyecto-card');
botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function() {
        botonesFiltro.forEach(function(btn) { btn.classList.remove('activo'); }); boton.classList.add('activo'); const filtroSeleccionado = boton.getAttribute('data-filtro');
        tarjetasProyecto.forEach(function(tarjeta) { const categoriaTarjeta = tarjeta.getAttribute('data-categoria'); if (filtroSeleccionado === 'todos' || filtroSeleccionado === categoriaTarjeta) { tarjeta.classList.remove('oculto'); } else { tarjeta.classList.add('oculto'); } });
    });
});

// 4. FORMULARIO
const formulario = document.getElementById('formulario-contacto'); const inputNombre = document.getElementById('nombre'); const inputCorreo = document.getElementById('correo'); const inputMensaje = document.getElementById('mensaje'); const mensajeAlerta = document.getElementById('mensaje-alerta');
formulario.addEventListener('submit', function(e) {
    e.preventDefault(); inputNombre.classList.remove('input-error', 'input-exito'); inputCorreo.classList.remove('input-error', 'input-exito'); inputMensaje.classList.remove('input-error', 'input-exito'); let hayErrores = false; let textoError = '';
    if (inputNombre.value.trim() === '') { inputNombre.classList.add('input-error'); hayErrores = true; textoError += 'Falta tu nombre. '; } else { inputNombre.classList.add('input-exito'); }
    if (inputCorreo.value.includes('@') === false) { inputCorreo.classList.add('input-error'); hayErrores = true; textoError += 'Falta el @ en el correo. '; } else { inputCorreo.classList.add('input-exito'); }
    if (inputMensaje.value.trim() === '') { inputMensaje.classList.add('input-error'); hayErrores = true; textoError += 'Escribe un mensaje.'; } else { inputMensaje.classList.add('input-exito'); }
    mensajeAlerta.classList.remove('oculto');
    if (hayErrores) { mensajeAlerta.textContent = textoError; mensajeAlerta.className = 'alerta-error'; } 
    else { mensajeAlerta.textContent = '¡Mensaje enviado!'; mensajeAlerta.className = 'alerta-exito'; formulario.reset(); setTimeout(function() { inputNombre.classList.remove('input-exito'); inputCorreo.classList.remove('input-exito'); inputMensaje.classList.remove('input-exito'); mensajeAlerta.classList.add('oculto'); }, 3000); }
});

// 5. OBSERVER AL SCROLL
const actores = document.querySelectorAll('.seccion-animada');
const instruccionesDirector = function(entradas, observador) { entradas.forEach(function(entrada) { if (entrada.isIntersecting) { entrada.target.classList.add('seccion-visible'); observador.unobserve(entrada.target); } }); };
const directorDeTeatro = new IntersectionObserver(instruccionesDirector, { threshold: 0.2 });
actores.forEach(function(actor) { directorDeTeatro.observe(actor); });

// 6. VENTANA MODAL
const fondoModal = document.getElementById('fondo-modal'); const btnCerrarModal = document.getElementById('btn-cerrar-modal'); const botonesAbrirModal = document.querySelectorAll('.btn-abrir-modal'); const tituloModal = document.getElementById('modal-titulo');
botonesAbrirModal.forEach(function(boton) { boton.addEventListener('click', function(e) { const tarjeta = e.target.parentElement; const tituloProyecto = tarjeta.querySelector('h3').textContent; tituloModal.textContent = tituloProyecto; fondoModal.classList.remove('oculto'); }); });
btnCerrarModal.addEventListener('click', function() { fondoModal.classList.add('oculto'); });
fondoModal.addEventListener('click', function(e) { if (e.target === fondoModal) { fondoModal.classList.add('oculto'); } });

// =========================================
// 7. NUEVO: CONSUMO DE API CON FETCH
// =========================================

const btnChiste = document.getElementById('btn-chiste');
const textoChiste = document.getElementById('texto-chiste');

// Usamos "async" para decirle al botón que la función tendrá esperas
btnChiste.addEventListener('click', async function() {
    
    // Mostramos un mensaje mientras llega el repartidor
    textoChiste.textContent = 'Cargando chiste... (Esperando al servidor)';
    
    try {
        // "await" pausa la ejecución de esta línea hasta que la API conteste
        // Usamos JokeAPI, filtrada para chistes de programación en español, de una sola línea
        const respuesta = await fetch('https://v2.jokeapi.dev/joke/Programming?lang=es&type=single');
        
        // Abrimos la "caja" de los datos y los convertimos a JSON
        const datos = await respuesta.json();
        
        // Verificamos si la API nos mandó el chiste correctamente
        if (datos.joke) {
            textoChiste.textContent = datos.joke;
        } else {
            textoChiste.textContent = 'El servidor no encontró chistes nuevos. ¡Intenta otra vez!';
        }
        
    } catch (error) {
        // Si el internet falla o el enlace se rompe, entramos aquí (el repartidor se perdió)
        textoChiste.textContent = 'Ocurrió un error. El repartidor de datos se perdió en el camino.';
    }
    
});