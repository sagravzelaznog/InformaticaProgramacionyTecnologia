// Base de datos de 10 preguntas (Estilo Kahoot - BandLab)
const quizData = [
	{ q: "¿Cuál es el área principal de trabajo en BandLab donde se apilan las pistas?", a: ["Mix Editor", "Panel de Propiedades", "Librería de Sonidos", "Exportador"], c: 0 },
	{ q: "¿Qué significan las siglas BPM?", a: ["Banda Por Minuto", "Beats Per Minute (Pulsos por Minuto)", "Base Para Mezclar", "Bucle Principal Musical"], c: 1 },
	{ q: "¿Dónde encuentras audios y ritmos pre-grabados libres de derechos para empezar?", a: ["En Google", "BandLab Sounds (Loops)", "En la grabadora de voz", "En el Metrónomo"], c: 1 },
	{ q: "¿Qué herramienta hace un sonido de 'clic' constante para ayudarte a mantener el ritmo?", a: ["El Slicer", "El Snap to Grid", "El Metrónomo", "El Fader"], c: 2 },
	{ q: "¿Para qué sirve la función 'Snap to Grid' (el ícono del imán)?", a: ["Para pegar audios con pegamento", "Para alinear regiones exactamente a los tiempos del compás", "Para afinar la voz automáticamente", "Para cambiar el color de la pista"], c: 1 },
	{ q: "Si presionas la tecla 'S' (Slice) teniendo una región seleccionada, ¿qué sucede?", a: ["Se silencia (Solo)", "Se guarda el proyecto", "Se corta o divide la región de audio en dos partes", "Se borra el audio"], c: 2 },
	{ q: "¿Qué es un 'One-shot' en BandLab Sounds?", a: ["Una canción completa", "Un sonido único que no se repite (ej. un golpe de tambor)", "Un bucle infinito", "Un efecto de eco"], c: 1 },
	{ q: "Para eliminar el 'miedo al lienzo en blanco' al producir tu primer beat, lo mejor es:", a: ["Grabar una batería real desde cero", "Comenzar utilizando un Loop preexistente", "Escribir la letra primero", "Leer el manual de 500 páginas"], c: 1 },
	{ q: "¿Qué pasa normalmente si arrastras un Loop de BandLab Sounds al Mix Editor?", a: ["Da error de formato", "BandLab ajusta la velocidad (BPM) del loop al de tu proyecto automáticamente", "El loop suena al revés", "Se borran las otras pistas"], c: 1 },
	{ q: "El objetivo de esta sesión es crear un boceto instrumental que dure:", a: ["5 minutos", "De 3 a 4 horas", "De 30 a 60 segundos", "10 segundos exactos"], c: 2 }
];

let currentIndex = 0;
let score = 0;
let userHistory = []; // Guarda historial para imprimir

const qText = document.getElementById("question-text");
const aGrid = document.getElementById("answers-grid");
const fMsg = document.getElementById("feedback-message");
const qCont = document.getElementById("quiz-container");
const rCont = document.getElementById("results-container");
const sText = document.getElementById("score-text");
const pBar = document.getElementById("progress");
const pReview = document.getElementById("print-review");

function initQuiz() {
	currentIndex = 0; score = 0; userHistory = [];
	qCont.classList.remove("hidden");
	rCont.classList.add("hidden");
	loadQuestion();
}

function loadQuestion() {
	fMsg.className = "hidden";
	fMsg.textContent = "";
	pBar.style.width = `${(currentIndex / quizData.length) * 100}%`;
	
	const current = quizData[currentIndex];
	qText.textContent = `${currentIndex + 1}. ${current.q}`;
	aGrid.innerHTML = "";
	
	current.a.forEach((ans, idx) => {
					const btn = document.createElement("button");
					btn.textContent = ans;
					btn.className = `answer-btn btn-k${idx}`;
					btn.onclick = () => checkAnswer(idx, btn);
					aGrid.appendChild(btn);
	});
}

function checkAnswer(selected, btnElement) {
	// Bloquear todos los botones al responder
	const allBtns = aGrid.querySelectorAll(".answer-btn");
	allBtns.forEach(b => b.disabled = true);
	
	const correctIdx = quizData[currentIndex].c;
	const isCorrect = selected === correctIdx;
	
	if (isCorrect) {
					score++;
					fMsg.textContent = "¡Correcto! Entiendes el ritmo.";
					fMsg.className = "text-success";
	} else {
					fMsg.textContent = "Incorrecto. La música requiere práctica.";
					fMsg.className = "text-error";
					allBtns[correctIdx].style.border = "4px solid white"; // Resalta la correcta
	}

	// Guardar para el PDF
	userHistory.push({
					q: quizData[currentIndex].q,
					uAns: quizData[currentIndex].a[selected],
					cAns: quizData[currentIndex].a[correctIdx],
					isRight: isCorrect
	});
	
	setTimeout(() => {
					currentIndex++;
					if (currentIndex < quizData.length) {
									loadQuestion();
					} else {
									showResults();
					}
	}, 2000);
}

function generatePrintReview() {
	pReview.innerHTML = "";
	userHistory.forEach((item, index) => {
					const block = document.createElement("div");
					block.className = "print-q-block";
					
					let resultHTML = item.isRight 
									? `<span class="res-correct">Tu respuesta: ${item.uAns} (Correcto)</span>` 
									: `<span class="res-incorrect">Tu respuesta: ${item.uAns}</span><br><strong>Respuesta correcta: ${item.cAns}</strong>`;
									
					block.innerHTML = `
									<div class="print-q-title">${index + 1}. ${item.q}</div>
									<div class="print-q-res">${resultHTML}</div>
					`;
					pReview.appendChild(block);
	});
}

function showResults() {
	qCont.classList.add("hidden");
	rCont.classList.remove("hidden");
	generatePrintReview(); // Prepara el DOM para impresión
	
	let msg = score >= 8 ? "¡Productor Maestro!" : score >= 5 ? "Buen inicio en el estudio." : "Necesitas afinar tus conocimientos.";
	sText.innerHTML = `${msg}<br>Puntuación Final: ${score} de ${quizData.length}`;
}

window.onload = initQuiz;