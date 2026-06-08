// --- DATOS DEL QUIZ (10 preguntas, basadas en el contenido) ---
const quizData = [
	{
					question: "1. ¿Qué define fundamentalmente la variable `CANNOSCALE`?",
					options: ["La escala de impresión del dibujo.", "La escala de anotación actual para el espacio de dibujo.", "El tamaño de los objetos en el espacio modelo.", "La escala de las unidades del dibujo."],
					correct: 1 // Índice de la respuesta correcta (empieza en 0)
	},
	{
					question: "2. Para que AutoCAD añada escalas automáticamente a los objetos cuando cambias la escala de una ventana gráfica, ¿qué variable debes tener activada?",
					options: ["`ANNOTATIVEDWG`", "`ANNOMONITOR`", "`ANNOAUTOSCALE`", "`ANNOALLVISIBLE`"],
					correct: 2
	},
	{
					question: "3. Tienes un plano con detalles a 1:50 y 1:200. ¿Cómo configuras una cota anotativa?",
					options: ["Activas Anotativo y le añades solo la escala 1:50.", "Activas Anotativo y le añades las escalas 1:50 y 1:200.", "Cambias el tamaño del texto de la cota.", "Creas dos estilos de cota distintos."],
					correct: 1
	},
	{
					question: "4. ¿Cuál es el propósito del comando `ANNOMONITOR`?",
					options: ["Mostrar una lista de todas las escalas.", "Alerta mediante un icono cuando un objeto no tiene una escala anotativa válida.", "Cambiar la escala de todos los viewports.", "Ocultar objetos no anotativos."],
					correct: 1
	},
	{
					question: "5. Al seleccionar un objeto anotativo, ¿qué variable controla si se muestran todas sus escalas asignadas?",
					options: ["`SELECTIONANNODISPLAY`", "`ANNOALLVISIBLE`", "`ANNOTATIVEDWG`", "`HPANNOTATIVE`"],
					correct: 0
	},
	{
					question: "6. Para garantizar que los nuevos sombreados sean anotativos por defecto, ¿qué variable debes configurar a '1'?",
					options: ["`ANNOAUTOSCALE`", "`HPANNOTATIVE`", "`CANNOSCALE`", "`ANNOMONITOR`"],
					correct: 1
	},
	{
					question: "7. ¿Qué comando te permite ocultar todos los objetos anotativos que no coincidan con la escala actual?",
					options: ["`ANNOAUTOSCALE`", "`CANNOSCALE`", "`ANNOMONITOR`", "`ANNOALLVISIBLE` (set to 0)"],
					correct: 3
	},
	{
					question: "8. Tienes un texto de 2.5 mm de altura. Activas la propiedad anotativa y le asignas las escalas 1:50 y 1:100. ¿Cuál será su tamaño impreso final en papel?",
					options: ["1.25 mm en 1:50 y 2.5 mm en 1:100.", "2.5 mm en ambas escalas.", "5 mm en 1:50 y 2.5 mm en 1:100.", "Dependerá del zoom del modelo."],
					correct: 1
	},
	{
					question: "9. Al crear o modificar un Bloque, ¿dónde activas su propiedad anotativa?",
					options: ["Usando el comando `BLOCK`. ", "En el cuadro de diálogo de definición o edición del bloque.", "En la paleta de propiedades después de insertarlo.", "En el administrador de capas."],
					correct: 1
	},
	{
					question: "10. ¿Cuál es la principal ventaja andragógica de usar objetos anotativos para un profesional adulto?",
					options: ["Hacer el dibujo más bonito.", "Imprimir más rápido.", "Ahorrar tiempo y reducir errores al automatizar el escalado de anotaciones.", "Aprender más comandos avanzados."],
					correct: 2
	}
];

// --- VARIABLES DE ESTADO ---
let currentQuestionIndex = 0;
let points = 0;

// --- ELEMENTOS DEL DOM ---
const quizQuestionContainer = document.getElementById('quiz-question-container');
const numCurrentQuestion = document.getElementById('current-question-num');
const numPoints = document.getElementById('quiz-points');
const printResultsBtn = document.getElementById('print-results-btn');


// --- FUNCIONES DEL QUIZ ---

function loadQuestion() {
	// Limpiar contenedor de pregunta anterior
	quizQuestionContainer.innerHTML = '';
	
	// Si hemos terminado el quiz
	if (currentQuestionIndex >= quizData.length) {
					showQuizEnd();
					return;
	}

	// Cargar datos de la pregunta actual
	const currentQuestion = quizData[currentQuestionIndex];
	numCurrentQuestion.innerText = currentQuestionIndex + 1;

	// Crear elemento de pregunta
	const questionEl = document.createElement('div');
	questionEl.classList.add('quiz-question');
	questionEl.innerText = currentQuestion.question;
	quizQuestionContainer.appendChild(questionEl);

	// Crear contenedor de opciones
	const optionsGrid = document.createElement('div');
	optionsGrid.classList.add('quiz-options');
	
	// Crear botones de opción (estilo Kahoot)
	currentQuestion.options.forEach((option, index) => {
					const optionBtn = document.createElement('button');
					optionBtn.classList.add('option-btn');
					optionBtn.innerText = option;
					
					// Asignar evento de clic (para manejar la respuesta)
					optionBtn.onclick = () => handleAnswerClick(index, optionBtn, optionsGrid);
					
					optionsGrid.appendChild(optionBtn);
	});

	quizQuestionContainer.appendChild(optionsGrid);
}

function handleAnswerClick(selectedOptionIndex, selectedBtn, optionsGrid) {
	const currentQuestion = quizData[currentQuestionIndex];
	const optionBtns = optionsGrid.querySelectorAll('.option-btn');
	
	// Bloquear todas las opciones inmediatamente (Andragogía: Feedback instantáneo)
	optionBtns.forEach((btn, index) => {
					btn.disabled = true; // Desactivar clics adicionales
					
					if (index === currentQuestion.correct) {
									btn.classList.add('correct'); // Resaltar la correcta
					} else if (index === selectedOptionIndex) {
									btn.classList.add('incorrect'); // Resaltar la incorrecta seleccionada
					} else {
									btn.classList.add('disabled-option'); // Atenuar las no seleccionadas
					}
	});

	// Actualizar puntos y mover a la siguiente pregunta después de un retraso
	if (selectedOptionIndex === currentQuestion.correct) {
					points += 1000;
					numPoints.innerText = points;
	}

	// Retraso para ver el resultado y luego cargar la siguiente (3 segundos)
	setTimeout(() => {
					currentQuestionIndex++;
					loadQuestion();
	}, 2800); 
}

function showQuizEnd() {
	quizQuestionContainer.innerHTML = `
					<div class="card quiz-final-card">
									<h3>👏 ¡Felicidades, has completado el desafío!</h3>
									<p>Puntuación final: <strong>${points} puntos</strong></p>
									<p>Has afianzado tus conocimientos sobre los Objetos Anotativos de AutoCAD. Este recurso está diseñado para ser impreso como tu hoja de trucos profesional de dos páginas.</p>
					</div>
	`;
	document.getElementById('quiz-status').style.display = 'none'; // Ocultar info de pregunta
	printResultsBtn.style.display = 'block'; // Mostrar botón de impresión

	// Guardar resultados para impresión si es necesario (ej. localstorage)
	// Para simplificar, confiaremos en la directiva de impresión de CSS para el resumen.
}

// Evento de impresión
printResultsBtn.addEventListener('click', () => {
	window.print();
});


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', loadQuestion);