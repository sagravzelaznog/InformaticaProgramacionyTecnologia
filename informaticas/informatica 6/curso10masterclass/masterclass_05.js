// 1. LÓGICA DEL MODO OSCURO
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

// 2. LÓGICA DE INYECCIÓN DE HABILIDADES
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

// 3. NUEVA LÓGICA: FILTRADO DE PROYECTOS

// Seleccionamos todos los botones de filtro y todas las tarjetas
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetasProyecto = document.querySelectorAll('.proyecto-card');

// Le agregamos un "escuchador de clics" a cada botón
botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function() {
        
        // A) Estética del botón: le quitamos la clase 'activo' a todos los botones...
        botonesFiltro.forEach(function(btn) {
            btn.classList.remove('activo');
        });
        // ...y se la ponemos solo al botón que acabamos de presionar
        boton.classList.add('activo');

        // B) Lógica de filtrado: leemos qué filtro quiere el usuario (ej. 'web' o 'diseno')
        const filtroSeleccionado = boton.getAttribute('data-filtro');

        // Revisamos tarjeta por tarjeta
        tarjetasProyecto.forEach(function(tarjeta) {
            const categoriaTarjeta = tarjeta.getAttribute('data-categoria');

            // Si el filtro es "todos" O si la categoría coincide, la mostramos
            if (filtroSeleccionado === 'todos' || filtroSeleccionado === categoriaTarjeta) {
                tarjeta.classList.remove('oculto');
            } else {
                // Si no coincide, la escondemos con nuestra clase mágica de CSS
                tarjeta.classList.add('oculto');
            }
        });
    });
});