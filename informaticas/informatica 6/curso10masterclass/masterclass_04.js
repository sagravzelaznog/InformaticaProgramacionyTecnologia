// LÓGICA DEL MODO OSCURO (De la clase anterior)
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

// NUEVA LÓGICA: Inyección dinámica de datos (Arrays)

// 1. Creamos nuestro "Inventario" (Array de objetos)
const misHabilidades = [
    { nombre: 'HTML5', porcentaje: '90%' },
    { nombre: 'CSS3', porcentaje: '75%' },
    { nombre: 'JavaScript', porcentaje: '40%' },
    { nombre: 'Diseño Responsivo', porcentaje: '85%' }
];

// 2. Seleccionamos la caja vacía en nuestro HTML donde irán las barras
const contenedorHabilidades = document.getElementById('contenedor-habilidades');

// 3. Recorremos nuestro inventario y por cada habilidad, creamos HTML dinámico
misHabilidades.forEach(function(habilidad) {
    
    // Creamos la estructura HTML en formato de texto
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
    
    // Lo inyectamos dentro de nuestro contenedor en la página web
    contenedorHabilidades.innerHTML += estructuraHTML;
    
});