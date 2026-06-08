/* 1. Seleccionamos el botón usando su ID */
const botonTema = document.getElementById('btn-tema');

/* 2. Seleccionamos toda la etiqueta <body> de nuestra página */
const cuerpoPagina = document.body;

/* 3. Le decimos al botón que se quede 'escuchando' hasta que alguien le haga un 'click' */
botonTema.addEventListener('click', function() {
    
    /* 4. Esta línea agrega o quita la clase 'modo-oscuro' al body como un interruptor */
    cuerpoPagina.classList.toggle('modo-oscuro');
    
    /* 5. Un pequeño extra: cambiamos el texto del botón dependiendo del modo */
    if (cuerpoPagina.classList.contains('modo-oscuro')) {
        botonTema.textContent = 'Cambiar a Modo Claro';
    } else {
        botonTema.textContent = 'Cambiar a Modo Oscuro';
    }
    
});