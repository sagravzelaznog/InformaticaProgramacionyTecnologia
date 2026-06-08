// --- BASE DE DATOS DEL QUIZ (SESIÓN 1: VARIABLES) ---
const questions = [
	{
					question: "1. ¿Qué es una variable en JavaScript?",
					options: ["Una caja con etiqueta para guardar datos en la memoria.", "Un tipo de error rojo en la consola.", "Una pantalla táctil.", "Un comando para borrar archivos."],
					answer: 0
	},
	{
					question: "2. Si quiero crear una variable que pueda cambiar de valor más adelante, uso la palabra:",
					options: ["const", "var", "let", "cambio"],
					answer: 2
	},
	{
					question: "3. ¿Qué palabra uso para crear una 'caja fuerte' que NUNCA pueda cambiar su valor?",
					options: ["let", "fija", "const", "bloquear"],
					answer: 2
	},
	{
					question: "4. ¿Qué tipo de dato es: \"Neo\" (con comillas)?",
					options: ["Number", "Boolean", "Undefined", "String (Texto)"],
					answer: 3
	},
	{
					question: "5. ¿Qué tipo de dato es: 100 (sin comillas)?",
					options: ["Number (Número)", "String", "Boolean", "Variable"],
					answer: 0
	},
	{
					question: "6. El tipo de dato 'Boolean' solo puede tener dos valores, ¿cuáles son?",
					options: ["1 y 2", "true o false", "texto o número", "let o const"],
					answer: 1
	},
	{
					question: "7. ¿Cómo le pido a la computadora que imprima un mensaje oculto en la consola?",
					options: ["print(mensaje)", "mostrar()", "console.log()", "document.write()"],
					answer: 2
	},
	{
					question: "8. ¿Cuál es la forma correcta de crear una variable numérica?",
					options: ["let edad = 16;", "let edad = \"16\";", "edad = let 16;", "const edad = true;"],
					answer: 0
	},
	{
					question: "9. Si tengo: let puntos = 10; y luego escribo: puntos = 50; ¿Qué valor tiene puntos ahora?",
					options: ["10", "Error", "50", "1050"],
					answer: 2
	},
	{
					question: "10. ¿Por qué es mala idea llamar a una variable 'x' en lugar de 'edadJugador'?",
					options: ["Porque 'x' gasta mucha memoria.", "Porque el código se vuelve difícil de entender para los humanos.", "Porque JavaScript prohíbe usar la letra x.", "No pasa nada, es mejor."],
					answer: 1
	}
];

// --- MOTOR DEL JUEGO (QUIZ) ---
let currentQuestionIndex = 0;
let score = 0;
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const finalScoreText = document.getElementById('final-score');

function loadQuestion() {
	quizContainer.innerHTML = ""; // Limpiar panel
	
	// Comprobar si ya terminamos
	if (currentQuestionIndex >= questions.length) {
					showScore();
					return;
	}

	const q = questions[currentQuestionIndex];
	
	// Imprimir Pregunta
	const qDiv = document.createElement('div');
	qDiv.className = 'question-container';
	
	const qText = document.createElement('div');
	qText.className = 'question-text';
	qText.innerText = q.question;
	qDiv.appendChild(qText);

	// Imprimir Opciones
	q.options.forEach((opt, index) => {
					const btn = document.createElement('button');
					btn.className = 'option-btn';
					btn.innerText = opt;
					
					// Lógica al hacer clic
					btn.onclick = () => {
									const buttons = qDiv.querySelectorAll('.option-btn');
									// Bloquear todos los botones tras el clic para evitar doble respuesta
									buttons.forEach(b => b.disabled = true);

									// Evaluar respuesta
									if (index === q.answer) {
													btn.classList.add('correct'); // Ilumina Verde
													score++;
									} else {
													btn.classList.add('incorrect'); // Ilumina Rojo
													// Ilumina la que era correcta para dar retroalimentación
													buttons[q.answer].classList.add('correct'); 
									}

									// Pasar a la siguiente pregunta tras 1.5 segundos
									setTimeout(() => {
													currentQuestionIndex++;
													loadQuestion();
									}, 1500);
					};
					
					qDiv.appendChild(btn);
	});

	quizContainer.appendChild(qDiv);
}

function showScore() {
	quizContainer.style.display = 'none';
	scoreContainer.style.display = 'block';
	finalScoreText.innerText = score;
}

// Iniciar la primera pregunta al cargar
loadQuestion();

// --- ZONA DE SEGURIDAD DEL PROFESOR (ANDRAGOGÍA) ---
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('teacher-password');
const tipsDiv = document.getElementById('teacher-tips');

unlockBtn.addEventListener('click', () => {
	if (passInput.value === "1983") {
					tipsDiv.style.display = "block"; // Muestra los tips
					passInput.style.display = "none";
					unlockBtn.style.display = "none";
	} else {
					alert("Acceso Denegado. Código de encriptación incorrecto.");
					passInput.value = "";
	}
});
// PREGUNTAS DEL QUIZ (10)
const questions2 = [
	{ q: "¿Qué palabra clave inicia una decisión?", a: ["if", "when", "case", "check"], c: 0 },
	{ q: "¿Cuál es el símbolo para comparar si dos valores son IGUALES?", a: ["=", "==", "===", "=>"], c: 2 },
	{ q: "¿Qué se ejecuta si el 'if' es FALSO?", a: ["then", "stop", "else", "break"], c: 2 },
	{ q: "¿Qué significa el símbolo '>'?", a: ["Igual que", "Menor que", "Diferente que", "Mayor que"], c: 3 },
	{ q: "¿Dónde se pone la condición del if?", a: ["Entre llaves {}", "Entre paréntesis ()", "Entre comillas \"\"", "Después de un punto ."], c: 1 },
	{ q: "¿Cuál es el símbolo para 'Diferente de'?", a: ["!==", "==!", "!!", "not="], c: 0 },
	{ q: "¿Qué valor devuelve una comparación?", a: ["Número", "Texto", "Boolean (true/false)", "Nada"], c: 2 },
	{ q: "Si edad = 15, ¿(edad > 18) es...?", a: ["true", "false", "NaN", "null"], c: 1 },
	{ q: "¿Se puede usar un 'if' sin usar un 'else'?", a: ["Sí", "No", "Solo los lunes", "Depende del CSS"], c: 0 },
	{ q: "En (10 === '10'), el resultado es falso porque...", a: ["Son el mismo número", "Uno es número y otro es texto", "El triple igual no existe", "Falta un punto y coma"], c: 1 }
];

let currentQuestion2 = 0;
let score2 = 0;

function loadQuestion() {
	const quizArea = document.getElementById('quiz-area');
	const q = questions[currentQuestion2];
	
	quizArea.innerHTML = `<h3>${q.q}</h3>`;
	q.a.forEach((opt, index) => {
					const btn = document.createElement('button');
					btn.innerText = opt;
					btn.className = 'quiz-btn';
					btn.onclick = () => checkAnswer(index, q.c, btn);
					quizArea.appendChild(btn);
	});
}

function checkAnswer(selected, correct, btn) {
	const buttons = document.querySelectorAll('.quiz-btn');
	buttons.forEach(b => b.disabled = true); // Bloquear clics extra

	if (selected === correct) {
					btn.classList.add('correct');
					score++;
	} else {
					btn.classList.add('incorrect');
					buttons[correct].classList.add('correct'); // Mostrar la correcta
	}

	setTimeout(() => {
					currentQuestion2++;
					if (currentQuestion2 < questions2.length) {
									loadQuestion();
					} else {
									showResults();
					}
	}, 1200);
}

function showResults() {
	document.getElementById('quiz-area').style.display = 'none';
	const res = document.getElementById('final-results');
	res.style.display = 'block';
	document.getElementById('score').innerText = score;
}

function askPassword() {
	const pass = prompt("Introduce la clave del sistema:");
	if (pass === "1983") {
					document.getElementById('teacher-notes').style.display = "block";
					document.getElementById('master-mode-btn').style.display = "none";
	} else {
					alert("Acceso denegado.");
	}
}

function restartQuiz() {
	currentQuestion = 0;
	score2 = 0;
	document.getElementById('quiz-area').style.display = 'block';
	document.getElementById('final-results').style.display = 'none';
	loadQuestion();
}
// --- BASE DE DATOS DEL QUIZ (SESIÓN 3: FUNCIONES) ---
const questions = [
	{
					question: "1. ¿Para qué usamos principalmente las funciones en programación?",
					options: ["Para que la página tenga colores", "Para guardar código y reutilizarlo sin escribirlo mil veces", "Para borrar la memoria del navegador", "Para crear estilos CSS"],
					answer: 1
	},
	{
					question: "2. ¿Qué palabra mágica usamos para CREAR una función en JavaScript?",
					options: ["create", "make", "function", "var"],
					answer: 2
	},
	{
					question: "3. Si una función es una máquina expendedora, ¿Qué son los 'parámetros'?",
					options: ["Las monedas o ingredientes que le metemos", "El refresco que nos devuelve", "La pantalla de la máquina", "El cable de corriente"],
					answer: 0
	},
	{
					question: "4. ¿Qué comando hace que la función expulse o devuelva un resultado hacia afuera?",
					options: ["console.log", "return", "export", "give"],
					answer: 1
	},
	{
					question: "5. ¿Cuál es la forma correcta de INVOCAR (llamar) a una función llamada 'saludar'?",
					options: ["saludar();", "call saludar;", "function saludar;", "invoke(saludar);"],
					answer: 0
	},
	{
					question: "6. En: function sumar(a, b), ¿Qué son 'a' y 'b'?",
					options: ["Errores", "Respuestas", "Parámetros", "Estilos"],
					answer: 2
	},
	{
					question: "7. Si invoco sumar(5, 3), ¿Cómo se les llama al 5 y al 3?",
					options: ["Argumentos (los valores reales)", "Variables", "Strings", "Returns"],
					answer: 0
	},
	{
					question: "8. ¿Es posible que una función no tenga parámetros, por ejemplo: function jugar() { }?",
					options: ["Sí, los paréntesis pueden quedar vacíos", "No, marcará un error rojo", "Solo si lleva la palabra return", "Depende del navegador"],
					answer: 0
	},
	{
					question: "9. Si una función NO tiene la palabra 'return', ¿Qué valor devuelve por defecto?",
					options: ["0", "undefined (indefinido)", "false", "Un string vacío"],
					answer: 1
	},
	{
					question: "10. ¿Por qué es mejor usar 'return' en vez de 'console.log' dentro de una función de cálculo?",
					options: ["Porque console.log gasta mucha batería", "Porque return me permite guardar el resultado en una variable para usarlo después", "Porque console.log es de HTML", "En realidad console.log es mejor"],
					answer: 1
	}
];

// --- MOTOR DEL QUIZ INTERACTIVO ---
let currentQuestionIndex = 0;
let score = 0;
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const finalScoreText = document.getElementById('final-score');

function loadQuestion() {
	quizContainer.innerHTML = ""; 
	
	if (currentQuestionIndex >= questions.length) {
					showScore();
					return;
	}

	const q = questions[currentQuestionIndex];
	
	// Contenedor de la pregunta
	const qDiv = document.createElement('div');
	qDiv.className = 'question-container';
	
	const qText = document.createElement('div');
	qText.className = 'question-text';
	qText.innerText = q.question;
	qDiv.appendChild(qText);

	// Renderizar botones
	q.options.forEach((opt, index) => {
					const btn = document.createElement('button');
					btn.className = 'option-btn';
					btn.innerText = opt;
					
					btn.onclick = () => {
									const buttons = qDiv.querySelectorAll('.option-btn');
									// Bloquear clics extra
									buttons.forEach(b => b.disabled = true);

									// Evaluar (Verde = correcto, Rojo = incorrecto)
									if (index === q.answer) {
													btn.classList.add('correct');
													score++;
									} else {
													btn.classList.add('incorrect');
													// Mostrar a los alumnos cuál era la verdadera respuesta
													buttons[q.answer].classList.add('correct'); 
									}

									// Temporizador para avanzar
									setTimeout(() => {
													currentQuestionIndex++;
													loadQuestion();
									}, 1800);
					};
					
					qDiv.appendChild(btn);
	});

	quizContainer.appendChild(qDiv);
}

function showScore() {
	quizContainer.style.display = 'none';
	scoreContainer.style.display = 'block';
	finalScoreText.innerText = score;
}

// Arrancar quiz al cargar
loadQuestion();

// --- ZONA DE SEGURIDAD DEL DOCENTE (CANDADO) ---
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('teacher-password');
const tipsDiv = document.getElementById('teacher-tips');

unlockBtn.addEventListener('click', () => {
	if (passInput.value === "1983") {
					tipsDiv.style.display = "block"; // Revela los tips andragógicos
					passInput.style.display = "none";
					unlockBtn.style.display = "none";
	} else {
					alert("Acceso Denegado. Código de Game Master incorrecto.");
					passInput.value = "";
	}
});

// Iniciar al cargar
window.onload = loadQuestion;