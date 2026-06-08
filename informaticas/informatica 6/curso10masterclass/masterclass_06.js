// 1. MODO OSCURO
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

// 2. INYECCIÓN DE HABILIDADES
const misHabilidades = [
    { nombre: 'HTML5', porcentaje: '90%' },
    { nombre: 'CSS3', porcentaje: '75%' },
    { nombre: 'JavaScript', porcentaje: '40%' },
    { nombre: 'Diseño Responsivo', porcentaje: '85%' }
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

// 3. FILTRADO DE PROYECTOS
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetasProyecto = document.querySelectorAll('.proyecto-card');
botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function() {
        botonesFiltro.forEach(function(btn) { btn.classList.remove('activo'); });
        boton.classList.add('activo');
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

// 4. NUEVO: VALIDACIÓN DEL FORMULARIO (EL CADENERO)
const formulario = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputMensaje = document.getElementById('mensaje');
const mensajeAlerta = document.getElementById('mensaje-alerta');

formulario.addEventListener('submit', function(e) {
    
    // EL CADENERO ACTÚA: Detiene el envío automático de la página
    e.preventDefault();
    
    // Limpiamos los estilos previos por si el usuario lo intenta de nuevo
    inputNombre.classList.remove('input-error', 'input-exito');
    inputCorreo.classList.remove('input-error', 'input-exito');
    inputMensaje.classList.remove('input-error', 'input-exito');
    
    // Variables para llevar el control de errores
    let hayErrores = false;
    let textoError = '';

    // LÓGICA CONDICIONAL: IF / ELSE

    // Revisamos el nombre
    if (inputNombre.value.trim() === '') {
        inputNombre.classList.add('input-error');
        hayErrores = true;
        textoError += 'El nombre no puede estar vacío. ';
    } else {
        inputNombre.classList.add('input-exito');
    }

    // Revisamos el correo (buscamos que al menos tenga un @)
    if (inputCorreo.value.includes('@') === false) {
        inputCorreo.classList.add('input-error');
        hayErrores = true;
        textoError += 'Ingresa un correo válido con @. ';
    } else {
        inputCorreo.classList.add('input-exito');
    }

    // Revisamos el mensaje
    if (inputMensaje.value.trim() === '') {
        inputMensaje.classList.add('input-error');
        hayErrores = true;
        textoError += 'No olvides escribir tu mensaje.';
    } else {
        inputMensaje.classList.add('input-exito');
    }

    // Decisión Final del Cadenero
    mensajeAlerta.classList.remove('oculto');
    
    if (hayErrores === true) {
        mensajeAlerta.textContent = textoError;
        mensajeAlerta.className = 'alerta-error'; // Pone el fondo rojo al texto
    } else {
        mensajeAlerta.textContent = '¡Mensaje enviado con éxito! (Simulación)';
        mensajeAlerta.className = 'alerta-exito'; // Pone el fondo verde al texto
        
        // Vaciamos el formulario como premio
        formulario.reset();
        
        // Quitamos los bordes verdes después de 3 segundos
        setTimeout(function() {
            inputNombre.classList.remove('input-exito');
            inputCorreo.classList.remove('input-exito');
            inputMensaje.classList.remove('input-exito');
            mensajeAlerta.classList.add('oculto');
        }, 3000);
    }
});