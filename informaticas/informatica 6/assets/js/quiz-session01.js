// ================================================================
// MÓDULO DE QUIZ AVANZADO - SESIÓN 01
// ================================================================
// Este archivo maneja toda la lógica del quiz interactivo
// con características gamificadas tipo Kahoot
// ================================================================

class QuizSession {
	constructor(config = {}) {
					this.config = {
									sessionId: 1,
									sessionName: 'El Génesis',
									difficulty: 'beginner',
									timePerQuestion: 30,
									showExplanations: true,
									enableSound: true,
									enableAnimations: true,
									...config
					};
					
					this.state = {
									currentQuestion: 0,
									score: 0,
									totalQuestions: 0,
									startTime: null,
									endTime: null,
									answers: [],
									timeSpent: [],
									difficulty: [],
									answered: false
					};
					
					this.questions = [];
					this.audioContext = null;
					this.statistics = null;
	}
	
	// ================================================================
	// DATOS DEL QUIZ - PREGUNTAS Y OPCIONES
	// ================================================================
	
	loadQuestions() {
					this.questions = [
									{
													id: 1,
													difficulty: 'easy',
													question: '¿Qué significa HTML?',
													description: 'Identifica la definición correcta del acrónimo HTML',
													options: [
																	{
																					text: 'Hyper Text Markup Language',
																					correct: true,
																					feedback: 'Correcto! HTML es el acrónimo de HyperText Markup Language, el estándar para crear documentos web.'
																	},
																	{
																					text: 'High Tech Modern Language',
																					correct: false,
																					feedback: 'Incorrecto. Este no es el significado de HTML.'
																	},
																	{
																					text: 'Home Tool Markup Language',
																					correct: false,
																					feedback: 'Incorrecto. Este no es el significado de HTML.'
																	},
																	{
																					text: 'Hyperlinks and Text Markup Language',
																					correct: false,
																					feedback: 'Incorrecto. El "M" en HTML significa "Markup", no "Markup" completo en el acrónimo.'
																	}
													],
													explanation: 'HTML significa "HyperText Markup Language". Este es el lenguaje estándar para crear documentos web. "HyperText" se refiere a texto con hipervínculos, "Markup" significa etiquetas, y "Language" es un idioma de programación.',
													tags: ['conceptos-básicos', 'definiciones'],
													points: 10
									},
									{
													id: 2,
													difficulty: 'easy',
													question: '¿Cuál es la función principal del modelo cliente-servidor?',
													description: 'Comprende cómo funciona la comunicación en la web',
													options: [
																	{
																					text: 'Decorar páginas web',
																					correct: false,
																					feedback: 'Incorrecto. El modelo cliente-servidor no es sobre decoración.'
																	},
																	{
																					text: 'El cliente solicita recursos y el servidor los proporciona',
																					correct: true,
																					feedback: 'Correcto! Este es el corazón de cómo funciona la web moderna.'
																	},
																	{
																					text: 'Crear bases de datos',
																					correct: false,
																					feedback: 'Incorrecto. Las bases de datos son solo una parte del servidor.'
																	},
																	{
																					text: 'Compilar código HTML',
																					correct: false,
																					feedback: 'Incorrecto. El HTML no se compila, se interpreta por los navegadores.'
																	}
													],
													explanation: 'El modelo cliente-servidor es la arquitectura fundamental de la web. El cliente (navegador) solicita recursos (como archivos HTML, CSS, JavaScript, imágenes) al servidor web, que procesa la solicitud y envía la respuesta.',
													tags: ['arquitectura-web', 'conceptos-avanzados'],
													points: 10
									},
									{
													id: 3,
													difficulty: 'medium',
													question: '¿Cuál es la etiqueta correcta para un encabezado principal?',
													description: 'Identifica la etiqueta HTML apropiada para el título más importante',
													options: [
																	{
																					text: '&lt;heading&gt;',
																					correct: false,
																					feedback: 'Incorrecto. No existe la etiqueta &lt;heading&gt; en HTML estándar.'
																	},
																	{
																					text: '&lt;header&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;header&gt; es una etiqueta semántica pero no para encabezados de texto.'
																	},
																	{
																					text: '&lt;h1&gt;',
																					correct: true,
																					feedback: 'Correcto! &lt;h1&gt; es la etiqueta para el encabezado de nivel 1 (más importante).'
																	},
																	{
																					text: '&lt;title&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;title&gt; es para el título de la pestaña del navegador, no para encabezados de contenido.'
																	}
													],
													explanation: 'La etiqueta &lt;h1&gt; define el encabezado más importante de la página. HTML proporciona 6 niveles de encabezados: &lt;h1&gt; a &lt;h6&gt;. Generalmente solo debe haber un &lt;h1&gt; por página para SEO y accesibilidad.',
													tags: ['etiquetas-html', 'estructura'],
													points: 15
									},
									{
													id: 4,
													difficulty: 'medium',
													question: '¿Qué etiqueta define metadatos en HTML?',
													description: 'Selecciona la etiqueta usada para incluir información sobre el documento',
													options: [
																	{
																					text: '&lt;metadata&gt;',
																					correct: false,
																					feedback: 'Incorrecto. Esta etiqueta no existe en HTML estándar.'
																	},
																	{
																					text: '&lt;meta&gt;',
																					correct: true,
																					feedback: 'Correcto! &lt;meta&gt; se usa para metadatos como charset, viewport, descripción, etc.'
																	},
																	{
																					text: '&lt;info&gt;',
																					correct: false,
																					feedback: 'Incorrecto. Esta etiqueta no existe en HTML estándar.'
																	},
																	{
																					text: '&lt;head&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;head&gt; es el contenedor para metadatos, pero &lt;meta&gt; es la etiqueta específica.'
																	}
													],
													explanation: 'La etiqueta &lt;meta&gt; se usa para proporcionar metadatos sobre el documento HTML. Ejemplos comunes: &lt;meta charset="UTF-8"&gt; para definir el juego de caracteres, &lt;meta name="viewport"&gt; para dispositivos móviles, y &lt;meta name="description"&gt; para SEO.',
													tags: ['metadatos', 'head'],
													points: 15
									},
									{
													id: 5,
													difficulty: 'hard',
													question: '¿Cuál de las siguientes es una etiqueta autofrenada?',
													description: 'Identifica qué etiqueta no requiere etiqueta de cierre',
													options: [
																	{
																					text: '&lt;div&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;div&gt; requiere una etiqueta de cierre &lt;/div&gt;.'
																	},
																	{
																					text: '&lt;p&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;p&gt; requiere una etiqueta de cierre &lt;/p&gt;.'
																	},
																	{
																					text: '&lt;img&gt;',
																					correct: true,
																					feedback: 'Correcto! &lt;img&gt; es una etiqueta autofrenada que no necesita cierre.'
																	},
																	{
																					text: '&lt;section&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;section&gt; requiere una etiqueta de cierre &lt;/section&gt;.'
																	}
													],
													explanation: 'Las etiquetas autofrenadas (self-closing tags) son etiquetas que no tienen contenido entre apertura y cierre. Ejemplos: &lt;img&gt;, &lt;br&gt;, &lt;hr&gt;, &lt;input&gt;, &lt;meta&gt;. Estas etiquetas terminan con /&gt; en XHTML, pero en HTML5 pueden escribirse sin la barra diagonal.',
													tags: ['etiquetas-especiales', 'sintaxis'],
													points: 20
									},
									{
													id: 6,
													difficulty: 'medium',
													question: '¿Cuál es la estructura correcta de un documento HTML5 mínimo?',
													description: 'Identifica el orden correcto de las etiquetas principales',
													options: [
																	{
																					text: '&lt;html&gt; &lt;body&gt; &lt;head&gt; &lt;!DOCTYPE html&gt;',
																					correct: false,
																					feedback: 'Incorrecto. El orden está completamente invertido.'
																	},
																	{
																					text: '&lt;!DOCTYPE html&gt; &lt;html&gt; &lt;head&gt; &lt;body&gt;',
																					correct: true,
																					feedback: 'Correcto! Este es el orden estándar y requerido en HTML5.'
																	},
																	{
																					text: '&lt;html&gt; &lt;head&gt; &lt;body&gt; &lt;!DOCTYPE html&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;!DOCTYPE&gt; debe ser la primera línea.'
																	},
																	{
																					text: '&lt;head&gt; &lt;!DOCTYPE html&gt; &lt;html&gt; &lt;body&gt;',
																					correct: false,
																					feedback: 'Incorrecto. El orden no es el estándar de HTML5.'
																	}
													],
													explanation: 'La estructura correcta de HTML5 es: 1) &lt;!DOCTYPE html&gt; - debe ser la primera línea, 2) &lt;html&gt; - elemento raíz, 3) &lt;head&gt; - metadatos, 4) &lt;body&gt; - contenido visible. Este orden es crucial para que el documento sea válido.',
													tags: ['estructura', 'doctypes'],
													points: 15
									},
									{
													id: 7,
													difficulty: 'easy',
													question: '¿Dónde va el contenido visible de la página?',
													description: 'Selecciona en qué sección del HTML va el contenido que ve el usuario',
													options: [
																	{
																					text: 'En &lt;head&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;head&gt; contiene metadatos, no contenido visible.'
																	},
																	{
																					text: 'En &lt;meta&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;meta&gt; es para metadatos.'
																	},
																	{
																					text: 'En &lt;body&gt;',
																					correct: true,
																					feedback: 'Correcto! Todo el contenido visible va dentro de &lt;body&gt;.'
																	},
																	{
																					text: 'En &lt;title&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;title&gt; es solo el título de la pestaña.'
																	}
													],
													explanation: 'El contenido visible de la página (texto, imágenes, videos, etc.) va en la etiqueta &lt;body&gt;. La etiqueta &lt;head&gt; es para metadatos como &lt;title&gt;, &lt;meta&gt;, &lt;link&gt; (CSS), &lt;script&gt; (JS), etc.',
													tags: ['estructura', 'semántica'],
													points: 10
									},
									{
													id: 8,
													difficulty: 'hard',
													question: '¿Qué significa "semántica" en HTML5?',
													description: 'Comprende el concepto de etiquetas semánticas',
													options: [
																	{
																					text: 'Es sinónimo de "sintaxis"',
																					correct: false,
																					feedback: 'Incorrecto. Semántica y sintaxis son conceptos diferentes.'
																	},
																	{
																					text: 'Usar etiquetas que describen el significado del contenido',
																					correct: true,
																					feedback: 'Correcto! La semántica en HTML es usar etiquetas significativas.'
																	},
																	{
																					text: 'Agregar estilos CSS al HTML',
																					correct: false,
																					feedback: 'Incorrecto. Los estilos son responsabilidad de CSS, no de la semántica HTML.'
																	},
																	{
																					text: 'Hacer que el HTML sea compatible con versiones antiguas',
																					correct: false,
																					feedback: 'Incorrecto. La semántica no es sobre compatibilidad, es sobre significado.'
																	}
													],
													explanation: 'La semántica en HTML5 significa usar etiquetas que describen el propósito del contenido. Ejemplos: &lt;header&gt;, &lt;nav&gt;, &lt;article&gt;, &lt;section&gt;, &lt;footer&gt;. Esto mejora la accesibilidad, el SEO y la mantenibilidad del código.',
													tags: ['semántica', 'html5'],
													points: 20
									}
					];
					
					this.state.totalQuestions = this.questions.length;
					return this.questions;
	}
	
	// ================================================================
	// INICIALIZACIÓN DEL QUIZ
	// ================================================================
	
	initialize() {
					console.log(`🎮 Inicializando Quiz - ${this.config.sessionName}`);
					
					this.loadQuestions();
					this.initAudioContext();
					this.state.startTime = Date.now();
					
					return {
									success: true,
									message: `Quiz cargado: ${this.state.totalQuestions} preguntas`,
									totalQuestions: this.state.totalQuestions
					};
	}
	
	// ================================================================
	// AUDIO CONTEXT
	// ================================================================
	
	initAudioContext() {
					if (!this.config.enableSound) return;
					
					try {
									this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
					} catch (e) {
									console.warn('Web Audio API no disponible');
									this.config.enableSound = false;
					}
	}
	
	playSound(type) {
					if (!this.config.enableSound || !this.audioContext) return;
					
					const soundMap = {
									correct: { frequencies: [523.25, 659.25, 783.99], durations: [100, 100, 150] },
									incorrect: { frequencies: [200, 150], durations: [100, 150] },
									victory: { frequencies: [523.25, 587.33, 659.25, 783.99], durations: [100, 100, 100, 300] },
									click: { frequencies: [400], durations: [50] },
									complete: { frequencies: [659.25, 783.99, 987.77], durations: [150, 150, 200] }
					};
					
					const sound = soundMap[type] || soundMap.click;
					
					sound.frequencies.forEach((freq, index) => {
									setTimeout(() => this.createBeep(freq, sound.durations[index]), index * (sound.durations[index] + 50));
					});
	}
	
	createBeep(frequency, duration) {
					if (!this.audioContext) return;
					
					const oscillator = this.audioContext.createOscillator();
					const gainNode = this.audioContext.createGain();
					
					oscillator.connect(gainNode);
					gainNode.connect(this.audioContext.destination);
					
					oscillator.frequency.value = frequency;
					oscillator.type = 'sine';
					
					gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
					gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
					
					oscillator.start(this.audioContext.currentTime);
					oscillator.stop(this.audioContext.currentTime + duration / 1000);
	}
	
	// ================================================================
	// LÓGICA DEL QUIZ
	// ================================================================
	
	getCurrentQuestion() {
					return this.questions[this.state.currentQuestion] || null;
	}
	
	answerQuestion(optionIndex) {
					if (this.state.answered) {
									return { success: false, message: 'Ya has respondido esta pregunta' };
					}
					
					const question = this.getCurrentQuestion();
					if (!question) {
									return { success: false, message: 'Pregunta no encontrada' };
					}
					
					const isCorrect = question.options[optionIndex].correct;
					const timeSpent = Date.now() - this.state.startTime;
					
					// Guardar respuesta
					this.state.answers.push({
									questionId: question.id,
									questionText: question.question,
									selectedOption: optionIndex,
									correctOption: question.options.findIndex(opt => opt.correct),
									isCorrect: isCorrect,
									timeSpent: timeSpent,
									points: isCorrect ? question.points : 0,
									difficulty: question.difficulty
					});
					
					if (isCorrect) {
									this.state.score += question.points;
									this.playSound('correct');
					} else {
									this.playSound('incorrect');
					}
					
					this.state.answered = true;
					
					return {
									success: true,
									isCorrect: isCorrect,
									correctOption: question.options.findIndex(opt => opt.correct),
									explanation: question.explanation,
									points: question.points,
									currentScore: this.state.score
					};
	}
	
	nextQuestion() {
					if (this.state.currentQuestion < this.state.totalQuestions - 1) {
									this.state.currentQuestion++;
									this.state.answered = false;
									return { success: true, hasNext: true, questionNumber: this.state.currentQuestion + 1 };
					}
					
					return { success: false, hasNext: false, message: 'Quiz completado' };
	}
	
	previousQuestion() {
					if (this.state.currentQuestion > 0) {
									this.state.currentQuestion--;
									return { success: true, questionNumber: this.state.currentQuestion + 1 };
					}
					
					return { success: false, message: 'Esta es la primera pregunta' };
	}
	
	skipQuestion() {
					this.state.answers.push({
									questionId: this.getCurrentQuestion().id,
									questionText: this.getCurrentQuestion().question,
									selectedOption: -1,
									correctOption: this.getCurrentQuestion().options.findIndex(opt => opt.correct),
									isCorrect: false,
									skipped: true,
									points: 0
					});
					
					return this.nextQuestion();
	}
	
	// ================================================================
	// GENERACIÓN DE RESULTADOS Y ESTADÍSTICAS
	// ================================================================
	
	finishQuiz() {
					this.state.endTime = Date.now();
					const totalTime = this.state.endTime - this.state.startTime;
					
					this.statistics = this.generateStatistics(totalTime);
					this.playSound('complete');
					
					return this.statistics;
	}
	
	generateStatistics(totalTime) {
					const correctAnswers = this.state.answers.filter(a => a.isCorrect).length;
					const percentage = Math.round((correctAnswers / this.state.totalQuestions) * 100);
					const averageTime = Math.round(totalTime / this.state.totalQuestions / 1000);
					
					// Clasificación de rendimiento
					let performance = '';
					let message = '';
					let emoji = '';
					
					if (percentage === 100) {
									performance = 'perfect';
									message = '¡Perfección absoluta! Eres un maestro de HTML.';
									emoji = '🏆';
					} else if (percentage >= 80) {
									performance = 'excellent';
									message = '¡Excelente! Dominas muy bien los conceptos de HTML.';
									emoji = '⭐';
					} else if (percentage >= 60) {
									performance = 'good';
									message = '¡Bien hecho! Tienes buena comprensión de HTML.';
									emoji = '👍';
					} else if (percentage >= 40) {
									performance = 'average';
									message = 'Buen intento. Repasa los temas y vuelve a intentarlo.';
									emoji = '📚';
					} else {
									performance = 'poor';
									message = 'Necesitas repasar más. ¡No te desanimes, practica es la clave!';
									emoji = '💪';
					}
					
					// Análisis por dificultad
					const byDifficulty = {
									easy: this.analyzeByDifficulty('easy'),
									medium: this.analyzeByDifficulty('medium'),
									hard: this.analyzeByDifficulty('hard')
					};
					
					return {
									totalQuestions: this.state.totalQuestions,
									correctAnswers: correctAnswers,
									incorrectAnswers: this.state.totalQuestions - correctAnswers,
									percentage: percentage,
									score: this.state.score,
									maxScore: this.getMaxScore(),
									totalTime: Math.round(totalTime / 1000),
									averageTime: averageTime,
									performance: performance,
									message: message,
									emoji: emoji,
									answers: this.state.answers,
									byDifficulty: byDifficulty,
									timestamp: new Date().toISOString()
					};
	}
	
	analyzeByDifficulty(difficulty) {
					const answersOfDifficulty = this.state.answers.filter(a => {
									const question = this.questions.find(q => q.id === a.questionId);
									return question && question.difficulty === difficulty;
					});
					
					if (answersOfDifficulty.length === 0) {
									return { total: 0, correct: 0, percentage: 0 };
					}
					
					const correct = answersOfDifficulty.filter(a => a.isCorrect).length;
					const percentage = Math.round((correct / answersOfDifficulty.length) * 100);
					
					return {
									total: answersOfDifficulty.length,
									correct: correct,
									percentage: percentage
					};
	}
	
	getMaxScore() {
					return this.questions.reduce((sum, q) => sum + q.points, 0);
	}
	
	// ================================================================
	// FUNCIONES AUXILIARES
	// ================================================================
	
	getProgress() {
					return {
									current: this.state.currentQuestion + 1,
									total: this.state.totalQuestions,
									percentage: Math.round(((this.state.currentQuestion + 1) / this.state.totalQuestions) * 100),
									score: this.state.score,
									maxScore: this.getMaxScore()
					};
	}
	
	getReview() {
					return this.state.answers.map((answer, index) => {
									const question = this.questions.find(q => q.id === answer.questionId);
									
									return {
													number: index + 1,
													question: answer.questionText,
													yourAnswer: question.options[answer.selectedOption]?.text || 'No respondida',
													correctAnswer: question.options[answer.correctOption].text,
													isCorrect: answer.isCorrect,
													explanation: question.explanation,
													points: answer.points,
													timeSpent: answer.timeSpent
									};
					});
	}
	
	reset() {
					this.state = {
									currentQuestion: 0,
									score: 0,
									totalQuestions: this.state.totalQuestions,
									startTime: Date.now(),
									endTime: null,
									answers: [],
									timeSpent: [],
									difficulty: [],
									answered: false
					};
					this.statistics = null;
	}
	
	exportResults() {
					const results = {
									session: this.config.sessionId,
									sessionName: this.config.sessionName,
									statistics: this.statistics,
									review: this.getReview(),
									timestamp: new Date().toISOString()
					};
					
					return JSON.stringify(results, null, 2);
	}
	
	downloadResultsAsJSON() {
					const data = this.exportResults();
					const blob = new Blob([data], { type: 'application/json' });
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					
					link.href = url;
					link.download = `quiz-sesion-01-resultados-${new Date().toISOString().split('T')[0]}.json`;
					link.click();
					
					URL.revokeObjectURL(url);
	}
	
	downloadResultsAsCSV() {
					const headers = ['Pregunta', 'Tu Respuesta', 'Respuesta Correcta', 'Correcto', 'Puntos', 'Tiempo (s)'];
					const review = this.getReview();
					
					const rows = review.map(item => [
									`"${item.question}"`,
									`"${item.yourAnswer}"`,
									`"${item.correctAnswer}"`,
									item.isCorrect ? 'Sí' : 'No',
									item.points,
									Math.round(item.timeSpent / 1000)
					]);
					
					const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
					const blob = new Blob([csv], { type: 'text/csv' });
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					
					link.href = url;
					link.download = `quiz-sesion-01-resultados-${new Date().toISOString().split('T')[0]}.csv`;
					link.click();
					
					URL.revokeObjectURL(url);
	}
	
	// ================================================================
	// ALMACENAMIENTO LOCAL
	// ================================================================
	
	saveProgress() {
					const progress = {
									sessionId: this.config.sessionId,
									currentQuestion: this.state.currentQuestion,
									score: this.state.score,
									answers: this.state.answers,
									timestamp: new Date().toISOString()
					};
					
					try {
									localStorage.setItem(`quiz-sesion-${this.config.sessionId}-progress`, JSON.stringify(progress));
									return { success: true, message: 'Progreso guardado' };
					} catch (e) {
									console.error('Error al guardar progreso:', e);
									return { success: false, message: 'Error al guardar progreso' };
					}
	}
	
	loadProgress() {
					try {
									const data = localStorage.getItem(`quiz-sesion-${this.config.sessionId}-progress`);
									if (data) {
													const progress = JSON.parse(data);
													return { success: true, data: progress };
									}
									return { success: false, message: 'No hay progreso guardado' };
					} catch (e) {
									console.error('Error al cargar progreso:', e);
									return { success: false, message: 'Error al cargar progreso' };
					}
	}
	
	clearProgress() {
					try {
									localStorage.removeItem(`quiz-sesion-${this.config.sessionId}-progress`);
									return { success: true, message: 'Progreso eliminado' };
					} catch (e) {
									console.error('Error al eliminar progreso:', e);
									return { success: false, message: 'Error al eliminar progreso' };
					}
	}
	
	// ================================================================
	// MODO DIFÍCIL - PREGUNTAS ALEATORIAS
	// ================================================================
	
	shuffleQuestions() {
					for (let i = this.questions.length - 1; i > 0; i--) {
									const j = Math.floor(Math.random() * (i + 1));
									[this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
					}
	}
	
	// ================================================================
	// ESTADÍSTICAS AVANZADAS
	// ================================================================
	
	getDetailedAnalysis() {
					const analysis = {
									overview: {
													totalQuestions: this.state.totalQuestions,
													timeSpent: this.statistics?.totalTime || 0,
													averageTimePerQuestion: this.statistics?.averageTime || 0,
													scorePercentage: this.statistics?.percentage || 0
									},
									questionAnalysis: this.state.answers.map((answer, index) => ({
													number: index + 1,
													difficulty: this.questions[index]?.difficulty,
													isCorrect: answer.isCorrect,
													timeSpent: answer.timeSpent,
													points: answer.points,
													tags: this.questions[index]?.tags || []
									})),
									difficultyAnalysis: {
													easy: this.statistics?.byDifficulty?.easy,
													medium: this.statistics?.byDifficulty?.medium,
													hard: this.statistics?.byDifficulty?.hard
									},
									recommendations: this.generateRecommendations()
					};
					
					return analysis;
	}
	
	generateRecommendations() {
					const hardQuestions = this.state.answers
									.filter(a => !a.isCorrect)
									.map(a => this.questions.find(q => q.id === a.questionId))
									.filter(Boolean);
					
					const recommendations = [];
					
					if (hardQuestions.length > 0) {
									const tags = new Set();
									hardQuestions.forEach(q => {
													q.tags?.forEach(tag => tags.add(tag));
									});
									
									recommendations.push({
													message: 'Necesitas mejorar en estos temas:',
													topics: Array.from(tags)
									});
					}
					
					if (this.statistics?.percentage === 100) {
									recommendations.push({
													message: '¡Excelente! Estás listo para la siguiente sesión.',
													priority: 'high'
									});
					} else if (this.statistics?.percentage >= 80) {
									recommendations.push({
													message: 'Repasa los temas difíciles antes de continuar.',
													priority: 'medium'
									});
					}
					
					return recommendations;
	}
	
	// ================================================================
	// COMPARACIÓN Y RANKING
	// ================================================================
	
	compareWithPrevious() {
					const previous = this.loadProgress();
					
					if (!previous.success || !this.statistics) {
									return { message: 'No hay datos anteriores para comparar' };
					}
					
					const improvement = this.statistics.percentage - previous.data.percentage;
					const direction = improvement > 0 ? '↑' : improvement < 0 ? '↓' : '→';
					
					return {
									previousScore: previous.data.percentage || 0,
									currentScore: this.statistics.percentage,
									improvement: improvement,
									direction: direction,
									message: improvement > 0 ? '¡Has mejorado!' : improvement < 0 ? 'Baja tu rendimiento' : 'Mantuviste el mismo nivel'
					};
	}
}

// ================================================================
// EXPORTAR PARA USO EN OTROS ARCHIVOS
// ================================================================

if (typeof module !== 'undefined' && module.exports) {
	module.exports = QuizSession;
}

// Para uso en navegadores sin módulos
if (typeof window !== 'undefined') {
	window.QuizSession = QuizSession;
}

// ================================================================
// INICIALIZACIÓN AUTOMÁTICA
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
	console.log('📚 Quiz Session Módulo Cargado');
	
	// Crear instancia global del quiz
	window.quizSession = new QuizSession({
					sessionId: 1,
					sessionName: 'El Génesis',
					enableSound: true,
					enableAnimations: true
	});
	
	// Inicializar quiz
	const init = window.quizSession.initialize();
	console.log('✓', init.message);
});