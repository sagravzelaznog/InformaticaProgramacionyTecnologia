const botonesOpcion = document.querySelectorAll('.opcion');
const btnMaestro = document.getElementById('btn-maestro');
const panelMaestro = document.getElementById('panel-maestro');
const resultadoQuiz = document.getElementById('resultado-quiz');

let puntaje = 0;
let preguntasRespondidas = 0;
const totalPreguntas = 2;

botonesOpcion.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const contenedorPregunta = this.parentElement;
        
        if (contenedorPregunta.classList.contains('respondida')) {
            return;
        }

        const esCorrecta = this.getAttribute('data-correcta') === 'true';

        if (esCorrecta) {
            this.classList.add('correcta');
            puntaje++;
        } else {
            this.classList.add('incorrecta');
            const opciones = contenedorPregunta.querySelectorAll('.opcion');
            opciones.forEach(function(op) {
                if (op.getAttribute('data-correcta') === 'true') {
                    op.classList.add('correcta');
                }
            });
        }

        contenedorPregunta.classList.add('respondida');
        preguntasRespondidas++;

        if (preguntasRespondidas === totalPreguntas) {
            resultadoQuiz.textContent = "Resultados: " + puntaje + " de " + totalPreguntas + " aciertos.";
        }
    });
});

btnMaestro.addEventListener('click', function() {
    if (!panelMaestro.classList.contains('oculto')) {
        panelMaestro.classList.add('oculto');
        btnMaestro.textContent = "Modo Maestro";
        return;
    }

    const password = prompt("Ingrese la contraseña de acceso (Pista: año):");

    if (password === "1983") {
        panelMaestro.classList.remove('oculto');
        btnMaestro.textContent = "Ocultar Maestro";
        alert("Acceso concedido.");
    } else if (password !== null) {
        alert("Contraseña incorrecta. Acceso denegado.");
    }
});
const elementoSaludo = document.getElementById('saludo-dinamico');

function actualizarSaludo() {
    if (!elementoSaludo) return;
    
    const horaActual = new Date().getHours();
    let mensajeSaludo = "";

    if (horaActual >= 5 && horaActual < 12) {
        mensajeSaludo = "¡Buenos días! Excelente momento para aprender.";
    } else if (horaActual >= 12 && horaActual < 19) {
        mensajeSaludo = "¡Buenas tardes! Sigamos construyendo.";
    } else {
        mensajeSaludo = "¡Buenas noches! Un último repaso antes de descansar.";
    }

    elementoSaludo.textContent = mensajeSaludo;
}

actualizarSaludo();
const btnTema = document.getElementById('btn-tema');

if (btnTema) {
    btnTema.addEventListener('click', function() {
        document.body.classList.toggle('tema-oscuro');
        
        if (document.body.classList.contains('tema-oscuro')) {
            btnTema.textContent = "☀️ Tema Claro";
        } else {
            btnTema.textContent = "🌙 Tema Oscuro";
        }
    });
}
const btnCalcular = document.getElementById('btn-calcular');
const resultadoPromedio = document.getElementById('resultado-promedio');

if (btnCalcular) {
    btnCalcular.addEventListener('click', function() {
        const calif1 = parseFloat(document.getElementById('calif1').value);
        const calif2 = parseFloat(document.getElementById('calif2').value);
        const calif3 = parseFloat(document.getElementById('calif3').value);

        resultadoPromedio.classList.remove('resultado-oculto', 'aprobado', 'reprobado');

        if (isNaN(calif1) || isNaN(calif2) || isNaN(calif3)) {
            resultadoPromedio.textContent = "Error: Ingresa las 3 calificaciones.";
            resultadoPromedio.classList.add('reprobado');
            return;
        }

        const promedio = (calif1 + calif2 + calif3) / 3;
        const promedioRedondeado = promedio.toFixed(1);

        if (promedio >= 7.0) {
            resultadoPromedio.textContent = "Promedio: " + promedioRedondeado + " - ¡Aprobado!";
            resultadoPromedio.classList.add('aprobado');
        } else {
            resultadoPromedio.textContent = "Promedio: " + promedioRedondeado + " - Necesitas estudiar más.";
            resultadoPromedio.classList.add('reprobado');
        }
    });
}