// ================================================================
// MÓDULO DE QUIZ AVANZADO - SESIÓN 02
// ================================================================
// Este archivo maneja toda la lógica del quiz interactivo
// para la Sesión 2: Jerarquía y Orden
// ================================================================

class QuizSession {
	constructor(config = {}) {
					this.config = {
									sessionId: 2,
									sessionName: 'Jerarquía y Orden',
									difficulty: 'intermediate',
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
	// DATOS DEL QUIZ - PREGUNTAS Y OPCIONES SESIÓN 02
	// ================================================================
	
	loadQuestions() {
					this.questions = [
									{
													id: 1,
													difficulty: 'easy',
													question: '¿Cuántos niveles de encabezados tiene HTML?',
													description: 'Identifica la cantidad correcta de etiquetas de encabezados',
													options: [
																	{
																					text: '3 niveles (h1, h2, h3)',
																					correct: false,
																					feedback: 'Incorrecto. HTML tiene más niveles de encabezados disponibles.'
																	},
																	{
																					text: '6 niveles (h1 a h6)',
																					correct: true,
																					feedback: 'Correcto! HTML proporciona 6 niveles de encabezados.'
																	},
																	{
																					text: '10 niveles (h1 a h10)',
																					correct: false,
																					feedback: 'Incorrecto. HTML solo tiene hasta h6.'
																	},
																	{
																					text: '4 niveles (h1, h2, h3, h4)',
																					correct: false,
																					feedback: 'Incorrecto. Hay más niveles disponibles.'
																	}
													],
													explanation: 'HTML proporciona exactamente 6 niveles de encabezados: h1 (más importante) hasta h6 (menos importante). Cada uno tiene un propósito específico en la jerarquía del contenido.',
													tags: ['encabezados', 'jerarquía', 'estructura'],
													points: 10
									},
									{
													id: 2,
													difficulty: 'easy',
													question: '¿Cuál es la mejor práctica para usar los encabezados?',
													description: 'Elige la forma correcta de usar la jerarquía de encabezados',
													options: [
																	{
																					text: 'Usar h1 solo porque tiene el tamaño más grande',
																					correct: false,
																					feedback: 'Incorrecto. No debes elegir encabezados por su tamaño visual.'
																	},
																	{
																					text: 'Usar encabezados según su importancia jerárquica en el contenido',
																					correct: true,
																					feedback: 'Correcto! Los encabezados deben reflejar la estructura lógica.'
																	},
																	{
																					text: 'Alternar entre h1 y h3 para variar el diseño',
																					correct: false,
																					feedback: 'Incorrecto. Esto es confuso y poco accesible.'
																	},
																	{
																					text: 'Usar h6 para todo el contenido menos importante',
																					correct: false,
																					feedback: 'Incorrecto. Debes usar toda la escala jerárquica.'
																	}
													],
													explanation: 'Los encabezados deben usarse según la importancia jerárquica del contenido, no por su tamaño visual. Generalmente se usa un solo h1 por página (el título principal), seguido de h2 para secciones principales, h3 para subsecciones, etc.',
													tags: ['jerarquía', 'semántica', 'mejores-prácticas'],
													points: 15
									},
									{
													id: 3,
													difficulty: 'medium',
													question: '¿Para qué tipo de contenido es mejor usar &lt;ul&gt;?',
													description: 'Identifica cuándo usar listas desordenadas',
													options: [
																	{
																					text: 'Para pasos de una receta donde el orden es importante',
																					correct: false,
																					feedback: 'Incorrecto. Esto requiere una lista ordenada &lt;ol&gt;.'
																	},
																	{
																					text: 'Para una lista de compras, características o elementos sin orden específico',
																					correct: true,
																					feedback: 'Correcto! &lt;ul&gt; es perfecta para elementos sin orden.'
																	},
																	{
																					text: 'Para definiciones de términos',
																					correct: false,
																					feedback: 'Incorrecto. Las definiciones usan &lt;dl&gt;.'
																	},
																	{
																					text: 'Para enumerar equipos deportivos por su ranking',
																					correct: false,
																					feedback: 'Incorrecto. Un ranking requiere &lt;ol&gt; porque el orden importa.'
																	}
													],
													explanation: 'Las listas desordenadas (&lt;ul&gt;) se usan cuando el orden de los elementos no es importante. Ejemplos: lista de características, ingredientes básicos, opciones de menú, etc. Si el orden es importante (como pasos o ranking), debes usar &lt;ol&gt;.',
													tags: ['listas', 'ul', 'semántica'],
													points: 15
									},
									{
													id: 4,
													difficulty: 'medium',
													question: '¿Cuál es la diferencia entre &lt;strong&gt; y &lt;b&gt;?',
													description: 'Entiende la diferencia semántica entre estas etiquetas',
													options: [
																	{
																					text: 'No hay diferencia, ambas hacen el texto más grueso',
																					correct: false,
																					feedback: 'Incorrecto. Aunque visualmente se parecen, tienen diferentes significados.'
																	},
																	{
																					text: '&lt;strong&gt; indica importancia (semántica), &lt;b&gt; es solo visual',
																					correct: true,
																					feedback: 'Correcto! &lt;strong&gt; tiene significado semántico.'
																	},
																	{
																					text: '&lt;b&gt; es más rápido de cargar que &lt;strong&gt;',
																					correct: false,
																					feedback: 'Incorrecto. La velocidad de carga no es la razón.'
																	},
																	{
																					text: '&lt;strong&gt; solo funciona en navegadores modernos',
																					correct: false,
																					feedback: 'Incorrecto. &lt;strong&gt; funciona en todos los navegadores.'
																	}
													],
													explanation: '&lt;strong&gt; indica que el contenido es de fuerte importancia (semántica), mientras que &lt;b&gt; es solo un formato visual. Para accesibilidad y SEO, debes usar &lt;strong&gt;. Los lectores de pantalla entienden que &lt;strong&gt; indica énfasis importante, pero &lt;b&gt; es simplemente negrita.',
													tags: ['semántica', 'accesibilidad', 'etiquetas-texto'],
													points: 15
									},
									{
													id: 5,
													difficulty: 'hard',
													question: '¿Cuál es el orden jerárquico correcto para una página de blog?',
													description: 'Elige la estructura correcta de encabezados',
													options: [
																	{
																					text: '&lt;h1&gt; Título del blog &lt;h2&gt; Título del post &lt;h3&gt; Subtítulo &lt;h4&gt; Párrafos',
																					correct: true,
																					feedback: 'Correcto! Esta es la estructura jerárquica apropiada.'
																	},
																	{
																					text: '&lt;h2&gt; Título del blog &lt;h1&gt; Título del post &lt;h3&gt; Párrafos',
																					correct: false,
																					feedback: 'Incorrecto. El orden está invertido.'
																	},
																	{
																					text: '&lt;h1&gt; Título del blog &lt;h1&gt; Título del post &lt;h1&gt; Subtítulo',
																					correct: false,
																					feedback: 'Incorrecto. No debes usar múltiples h1 en la misma página.'
																	},
																	{
																					text: '&lt;h3&gt; Título del blog &lt;h4&gt; Título del post &lt;h5&gt; Subtítulo',
																					correct: false,
																					feedback: 'Incorrecto. No comiences desde h3.'
																	}
													],
													explanation: 'La estructura jerárquica correcta para una página de blog es: h1 para el título principal del sitio, h2 para el título del artículo principal, h3 para subtítulos dentro del artículo, y h4 para detalles menores. Esta estructura es clara para los motores de búsqueda y los usuarios con lectores de pantalla.',
													tags: ['jerarquía', 'estructura-página', 'seo'],
													points: 20
									},
									{
													id: 6,
													difficulty: 'hard',
													question: '¿Cuál es la forma correcta de crear una lista de definición?',
													description: 'Identifica la sintaxis correcta de &lt;dl&gt;',
													options: [
																	{
																					text: '&lt;dl&gt; &lt;dd&gt;Término&lt;/dd&gt; &lt;dt&gt;Definición&lt;/dt&gt; &lt;/dl&gt;',
																					correct: false,
																					feedback: 'Incorrecto. El orden de dt y dd está invertido.'
																	},
																	{
																					text: '&lt;dl&gt; &lt;dt&gt;Término&lt;/dt&gt; &lt;dd&gt;Definición&lt;/dd&gt; &lt;/dl&gt;',
																					correct: true,
																					feedback: 'Correcto! dt para el término, dd para la definición.'
																	},
																	{
																					text: '&lt;dl&gt; &lt;li&gt;Término&lt;/li&gt; &lt;li&gt;Definición&lt;/li&gt; &lt;/dl&gt;',
																					correct: false,
																					feedback: 'Incorrecto. &lt;li&gt; se usa en &lt;ul&gt; y &lt;ol&gt;, no en &lt;dl&gt;.'
																	},
																	{
																					text: '&lt;dl&gt; Término &lt;dd&gt;Definición&lt;/dd&gt; &lt;/dl&gt;',
																					correct: false,
																					feedback: 'Incorrecto. El término debe estar dentro de una etiqueta &lt;dt&gt;.'
																	}
													],
													explanation: 'La sintaxis correcta de una lista de definición es: &lt;dl&gt; contiene &lt;dt&gt; (término) seguido de &lt;dd&gt; (definición). Puedes tener múltiples pares dt/dd. Esta estructura es importante para la semántica y la accesibilidad.',
													tags: ['listas-definición', 'dl', 'semántica'],
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
									message = '¡Perfección absoluta! Dominas completamente la jerarquía y listas en HTML.';
									emoji = '🏆';
					} else if (percentage >= 80) {
									performance = 'excellent';
									message = '¡Excelente! Tienes muy buenos conocimientos sobre estructura en HTML.';
									emoji = '⭐';
					} else if (percentage >= 60) {
									performance = 'good';
									message = '¡Bien hecho! Tienes una buena comprensión de encabezados y listas.';
									emoji = '👍';
					} else if (percentage >= 40) {
									performance = 'average';
									message = 'Buen intento. Repasa los conceptos de jerarquía y listas.';
									emoji = '📚';
					} else {
									performance = 'poor';
									message = 'Necesitas repasar más sobre estructura HTML. ¡La práctica es la clave!';
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
					link.download = `quiz-sesion-02-resultados-${new Date().toISOString().split('T')[0]}.json`;
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
					link.download = `quiz-sesion-02-resultados-${new Date().toISOString().split('T')[0]}.csv`;
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
													message: '¡Excelente! Dominas completamente jerarquía y listas. Estás listo para la siguiente sesión.',
													priority: 'high'
									});
					} else if (this.statistics?.percentage >= 80) {
									recommendations.push({
													message: 'Buen desempeño. Repasa los conceptos débiles antes de continuar.',
													priority: 'medium'
									});
					} else {
									recommendations.push({
													message: 'Practica más con ejercicios sobre encabezados y listas.',
													priority: 'high'
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
									message: improvement > 0 ? '¡Has mejorado tu rendimiento!' : improvement < 0 ? 'Tu rendimiento bajó ligeramente' : 'Mantuviste el mismo nivel'
					};
	}
	
	// ================================================================
	// ANÁLISIS COMPARATIVO ENTRE SESIONES
	// ================================================================
	
	compareWithSession(otherSessionId) {
					const otherProgress = localStorage.getItem(`quiz-sesion-${otherSessionId}-progress`);
					
					if (!otherProgress) {
									return { message: `No hay datos de la sesión ${otherSessionId}` };
					}
					
					const other = JSON.parse(otherProgress);
					const currentScore = this.statistics?.percentage || 0;
					const otherScore = other.score || 0;
					
					return {
									currentSession: {
													id: this.config.sessionId,
													name: this.config.sessionName,
													score: currentScore
									},
									otherSession: {
													id: otherSessionId,
													score: otherScore
									},
									better: currentScore > otherScore ? 'Sesión actual' : 'Sesión anterior',
									difference: Math.abs(currentScore - otherScore)
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
	console.log('📚 Quiz Session 02 Módulo Cargado');
	
	// Crear instancia global del quiz para sesión 02
	window.quizSession02 = new QuizSession({
					sessionId: 2,
					sessionName: 'Jerarquía y Orden',
					enableSound: true,
					enableAnimations: true
	});
	
	// Inicializar quiz
	const init = window.quizSession02.initialize();
	console.log('✓', init.message);
	
	// Cargar progreso anterior si existe
	const progress = window.quizSession02.loadProgress();
	if (progress.success) {
					console.log('📊 Progreso anterior encontrado:', progress.data);
	}
});