// --- DATOS DEL QUIZ ---
const questions = [
	{
					question: "1. ¿Qué valor de `display` hace que un elemento ocupe todo el ancho disponible como si fuera VIP?",
					options: ["display: inline", "display: block", "display: fixed", "display: flex"],
					answer: 1
	},
	{
					question: "2. ¿Qué `display` permite poner elementos uno al lado del otro PERO respetando sus medidas de ancho y alto?",
					options: ["inline-block", "block", "inline", "absolute"],
					answer: 0
	},
	{
					question: "3. Si quiero que un botón de WhatsApp persiga al usuario al hacer scroll, uso:",
					options: ["position: relative", "position: absolute", "position: fixed", "position: static"],
					answer: 2
	},
	{
					question: "4. ¿Qué hace `position: absolute`?",
					options: ["Se centra automáticamente", "Flota libremente ignorando a los demás elementos", "Se pega a la pantalla siempre", "Se vuelve invisible"],
					answer: 1
	},
	{
					question: "5. Para usar la magia de Flexbox, ¿a quién debo aplicarle `display: flex`?",
					options: ["A cada elemento hijo", "Al contenedor padre", "A la etiqueta <body> siempre", "Al archivo CSS"],
					answer: 1
	},
	{
					question: "6. En Flexbox, ¿qué propiedad mueve y distribuye los elementos de Izquierda a Derecha (Eje X)?",
					options: ["align-items", "justify-content", "flex-direction", "position"],
					answer: 1
	},
	{
					question: "7. ¿Cómo centro un elemento de forma PERFECTA tanto vertical como horizontalmente usando Flexbox?",
					options: ["margin: auto;", "justify-content: center; align-items: center;", "text-align: center;", "position: center;"],
					answer: 1
	},
	{
					question: "8. Si quiero que los elementos de flexbox se separen enviando a uno a la extrema izquierda y otro a la extrema derecha, uso:",
					options: ["justify-content: space-around", "justify-content: center", "justify-content: space-between", "align-items: right"],
					answer: 2
	},
	{
					question: "9. ¿Qué propiedad cambia la dirección de Flexbox para que los elementos caigan de arriba a abajo en vez de estar en fila?",
					options: ["flex-direction: column", "display: block", "justify-content: down", "flex-wrap: wrap"],
					answer: 0
	},
	{
					question: "10. ¿Por qué amamos Flexbox y ya casi no usamos `float`?",
					options: ["Porque float es de pago", "Porque Flexbox es moderno, predecible y no rompe el diseño", "Porque float gasta mucha batería", "En realidad float es mejor"],
					answer: 1
	}
];

// --- LÓGICA DEL QUIZ ---
let currentQuestionIndex = 0;
let score = 0;
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const finalScoreText = document.getElementById('final-score');

function loadQuestion() {
	quizContainer.innerHTML = ""; // Limpiar
	
	if (currentQuestionIndex >= questions.length) {
					showScore();
					return;
	}

	const q = questions[currentQuestionIndex];
	
	// Crear contenedor de pregunta
	const qDiv = document.createElement('div');
	qDiv.className = 'question-container';
	
	const qText = document.createElement('div');
	qText.className = 'question-text';
	qText.innerText = q.question;
	qDiv.appendChild(qText);

	// Crear botones de opciones
	q.options.forEach((opt, index) => {
					const btn = document.createElement('button');
					btn.className = 'option-btn';
					btn.innerText = opt;
					btn.onclick = () => checkAnswer(index, q.answer, btn, qDiv);
					qDiv.appendChild(btn);
	});

	quizContainer.appendChild(qDiv);
}

function checkAnswer(selectedIndex, correctIndex, btnClicked, qDiv) {
	const buttons = qDiv.querySelectorAll('.option-btn');
	
	// Deshabilitar todos los botones para que no respondan 2 veces
	buttons.forEach(b => b.disabled = true);

	if (selectedIndex === correctIndex) {
					btnClicked.classList.add('correct');
					score++;
	} else {
					btnClicked.classList.add('incorrect');
					// Mostrar la correcta en verde
					buttons[correctIndex].classList.add('correct');
	}

	// Pasar a la siguiente pregunta después de 1.5 segundos
	setTimeout(() => {
					currentQuestionIndex++;
					loadQuestion();
	}, 1500);
}

function showScore() {
	quizContainer.style.display = 'none';
	scoreContainer.style.display = 'block';
	finalScoreText.innerText = score;
}

// Iniciar Quiz
loadQuestion();

// --- LÓGICA DE LA ZONA DE PROFESOR ---
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('teacher-password');
const tipsDiv = document.getElementById('teacher-tips');

unlockBtn.addEventListener('click', () => {
	if (passInput.value === "1983") {
					tipsDiv.style.display = "block";
					passInput.style.display = "none";
					unlockBtn.style.display = "none";
	} else {
					alert("Acceso Denegado. Contraseña incorrecta.");
					passInput.value = "";
	}
});