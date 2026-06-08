// Base de datos de preguntas
const quizData = [
	{
					question: "¿Qué es el Mix Editor en la app móvil de BandLab?",
					options: ["Una tienda de instrumentos", "El área principal donde grabas, editas y mezclas pistas", "Un filtro para fotos", "Un ecualizador automático"],
					correct: 1
	},
	{
					question: "¿Para qué sirve el metrónomo durante una sesión?",
					options: ["Para afinar la guitarra", "Para marcar el pulso (tempo) y grabar a tiempo", "Para agregar efectos de eco", "Para borrar ruidos de fondo"],
					correct: 1
	},
	{
					question: "¿Qué significa BPM en la producción musical?",
					options: ["Beats Per Minute (Pulsos Por Minuto)", "BandLab Pro Music", "Bajos, Pianos y Melodías", "Bloqueo Por Masterización"],
					correct: 0
	},
	{
					question: "¿Qué son los 'BandLab Sounds'?",
					options: ["Notificaciones de la app", "Efectos de error", "Una biblioteca de loops y one-shots gratuitos", "Canciones con Copyright"],
					correct: 2
	},
	{
					question: "En un dispositivo móvil, ¿cómo divides una región de audio (Slice)?",
					options: ["Agitando el teléfono", "Tocando la región dos veces y seleccionando 'Dividir'", "Borrando la pista completa", "Cerrando la aplicación"],
					correct: 1
	},
	{
					question: "¿Qué es un 'Loop'?",
					options: ["Un fallo en el sistema", "Un fragmento de audio diseñado para repetirse en bucle", "Un tipo de micrófono", "El archivo final exportado"],
					correct: 1
	},
	{
					question: "¿Qué herramienta ayuda a que tus recortes de audio se alineen perfectamente al ritmo?",
					options: ["Snap to Grid (Ajustar a cuadrícula)", "AutoPitch", "Reverb", "Crossfade"],
					correct: 0
	},
	{
					question: "¿Cuál es la diferencia principal entre un Loop y un One-shot?",
					options: ["El loop es largo y repetitivo; el one-shot es un sonido único y corto", "El one-shot cuesta dinero", "El loop solo funciona en PC", "No hay diferencia"],
					correct: 0
	},
	{
					question: "Si quiero que mi canción suene más rápida o más lenta en BandLab, ¿qué debo ajustar?",
					options: ["El volumen master", "El paneo", "El número de BPM (Tempo)", "El color de la pista"],
					correct: 2
	},
	{
					question: "Según el enfoque andragógico de esta clase, ¿por qué iniciamos usando material preexistente (Loops)?",
					options: ["Porque componer desde cero es imposible", "Para evitar el miedo al 'lienzo en blanco' y tener resultados rápidos", "Porque la app no deja grabar audio", "Para gastar menos batería"],
					correct: 1
	}
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos del DOM
const questionEl = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const printBtn = document.getElementById('printBtn');

// Inicializar Quiz
function loadQuestion() {
	resetState();
	const currentQuizData = quizData[currentQuestionIndex];
	questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuizData.question}`;

	currentQuizData.options.forEach((option, index) => {
					const button = document.createElement('button');
					button.innerText = option;
					button.classList.add('option-btn');
					button.addEventListener('click', () => selectAnswer(index, button));
					optionsGrid.appendChild(button);
	});
}

function resetState() {
	nextBtn.classList.add('hidden');
	feedbackEl.innerText = '';
	feedbackEl.style.color = '';
	while (optionsGrid.firstChild) {
					optionsGrid.removeChild(optionsGrid.firstChild);
	}
}

function selectAnswer(selectedIndex, selectedButton) {
	const correctIndex = quizData[currentQuestionIndex].correct;
	const allButtons = optionsGrid.querySelectorAll('.option-btn');

	// Bloquear todas las opciones
	allButtons.forEach(btn => btn.disabled = true);

	if (selectedIndex === correctIndex) {
					selectedButton.classList.add('correct');
					feedbackEl.innerText = "¡Correcto! Genio 💡";
					feedbackEl.style.color = "var(--success-color)";
					score++;
	} else {
					selectedButton.classList.add('wrong');
					allButtons[correctIndex].classList.add('correct');
					feedbackEl.innerText = "Incorrecto. ¡Sigue aprendiendo!";
					feedbackEl.style.color = "var(--error-color)";
	}

	nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
	currentQuestionIndex++;
	if (currentQuestionIndex < quizData.length) {
					loadQuestion();
	} else {
					showResults();
	}
});

function showResults() {
	quizContainer.classList.add('hidden');
	resultsContainer.classList.remove('hidden');
	scoreEl.innerText = score;
}

restartBtn.addEventListener('click', () => {
	currentQuestionIndex = 0;
	score = 0;
	resultsContainer.classList.add('hidden');
	quizContainer.classList.remove('hidden');
	loadQuestion();
});

// Función de impresión
printBtn.addEventListener('click', () => {
	window.print();
});

// Cargar primera pregunta al iniciar
loadQuestion();