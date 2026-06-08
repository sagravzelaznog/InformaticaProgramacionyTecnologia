// 1. MODO OSCURO
const botonTema = document.getElementById('btn-tema');
const cuerpoPagina = document.body;
botonTema.addEventListener('click', function() {
    cuerpoPagina.classList.toggle('modo-oscuro');
    if (cuerpoPagina.classList.contains('modo-oscuro')) { botonTema.textContent = 'Cambiar a Modo Claro'; } 
    else { botonTema.textContent = 'Cambiar a Modo Oscuro'; }
});

// 2. HABILIDADES DINÁMICAS
const misHabilidades = [
    { nombre: 'HTML5', porcentaje: '90%' }, { nombre: 'CSS3', porcentaje: '75%' },
    { nombre: 'JavaScript', porcentaje: '40%' }, { nombre: 'Diseño Responsivo', porcentaje: '85%' }
];
const contenedorHabilidades = document.getElementById('contenedor-habilidades');
misHabilidades.forEach(function(habilidad) {
    const estructuraHTML = `
        <div class="habilidad-item">
            <span class="habilidad-nombre">${habilidad.nombre}</span>
            <div class="barra-fondo"><div class="barra-progreso" style="width: ${habilidad.porcentaje};">${habilidad.porcentaje}</div></div>
        </div>
    `;
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
            if (filtroSeleccionado === 'todos' || filtroSeleccionado === categoriaTarjeta) { tarjeta.classList.remove('oculto'); } 
            else { tarjeta.classList.add('oculto'); }
        });
    });
});

// 4. VALIDACIÓN DE FORMULARIO
const formulario = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputMensaje = document.getElementById('mensaje');
const mensajeAlerta = document.getElementById('mensaje-alerta');
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

// =========================================
// 5. NUEVO: EL DIRECTOR DE TEATRO (INTERSECTION OBSERVER)
// =========================================

// Paso A: Seleccionamos a todos los actores (las secciones con la clase .seccion-animada)
const actores = document.querySelectorAll('.seccion-animada');

// Paso B: Escribimos las instrucciones para el director
const instruccionesDirector = function(entradas, observador) {
    entradas.forEach(function(entrada) {
        // Si el actor entra al escenario (isIntersecting es verdadero)...
        if (entrada.isIntersecting) {
            // Le agregamos la clase que lo hace visible
            entrada.target.classList.add('seccion-visible');
            
            // Opcional: Le decimos al director que deje de vigilar a este actor
            // para que la animación solo ocurra la primera vez que bajamos.
            observador.unobserve(entrada.target);
        }
    });
};

// Paso C: Contratamos al director (creamos el Observer)
const directorDeTeatro = new IntersectionObserver(instruccionesDirector, {
    // threshold: 0.2 significa que gritará "¡Acción!" cuando el 20% del actor sea visible en pantalla
    threshold: 0.2 
});

// Paso D: Le decimos al director a quiénes debe vigilar
actores.forEach(function(actor) {
    directorDeTeatro.observe(actor);
});