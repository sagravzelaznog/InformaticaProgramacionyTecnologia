/**
 * Telemetría y Lógica de Interfaz
 * Estructurado mediante el patrón de módulo para aislar el alcance
 * y evitar colisiones de variables (el equivalente a un sandbox limpio).
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Objeto central para manejar la aplicación (facilita la escalabilidad)
	const AppController = {
					
					// Elementos del DOM
					ui: {
									btnAccion: document.getElementById('btn-accion'),
									modulo1: document.getElementById('modulo1')
					},

					// Inicialización de escuchadores de eventos
					init() {
									this.bindEvents();
									this.logTelemetry("Sistema Inicializado. Modo flow activado.");
					},

					bindEvents() {
									if (this.ui.btnAccion) {
													this.ui.btnAccion.addEventListener('click', (e) => {
																	this.handleActionClick(e);
													});
									}
					},

					handleActionClick(event) {
									// Ejemplo de gamificación: feedback visual inmediato
									event.target.textContent = "¡Payload Ejecutado!";
									event.target.style.backgroundColor = "#27ae60"; // Color de éxito
									
									this.logTelemetry("Usuario hizo clic en el botón de acción.");
									
									// Aquí conectarías con tu backend o lógica de evaluación
					},

					// Función simulada de Telemetría de Aprendizaje
					logTelemetry(message) {
									console.log(`[Telemetría de Aprendizaje]: ${message}`);
									// En producción, esto enviaría datos analíticos asíncronos para parchear el temario en tiempo real
					}
	};

	// Arranque del sistema
	AppController.init();
});
/**
 * Lógica de Laboratorio - Telemetría y Gamificación
 */
document.addEventListener('DOMContentLoaded', () => {
    
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Evitar doble conteo
									if (taskContainer.classList.contains('completed')) return;

									// Feedback visual inmediato (Dopamine Loop)
									taskContainer.classList.add('completed');
									btn.textContent = "✓ Comando Ejecutado";
									btn.style.backgroundColor = "var(--color-success)";
									btn.style.color = "white";
									btn.disabled = true;
									
									this.tasksCompleted++;
									this.logTelemetry(`Paso ${taskId} completado exitosamente.`);

									this.checkLabCompletion();
					},

					checkLabCompletion() {
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													this.logTelemetry("Laboratorio 01 Finalizado al 100%. Entorno Asegurado.");
									}
					},

					logTelemetry(message) {
									// Simulador de envío de analíticas de aprendizaje
									console.log(`[Telemetría DFIR]: ${message}`);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor de Interactividad (Sesión 2)
 * Diseñado para rastrear telemetría simulada y gestionar el "Dopamine Loop".
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Objeto controlador (Facilita mantenimiento y escalabilidad)
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Prevención de acciones redundantes
									if (taskContainer.classList.contains('completed')) return;

									// Inyección de recompensa visual (Escalada de progreso)
									taskContainer.classList.add('completed');
									btn.innerHTML = "&#10003; Validación Exitosa";
									btn.style.backgroundColor = "var(--color-success)";
									btn.style.color = "var(--color-white)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									this.logTelemetry(`Estudiante ejecutó comando: Tarea ${taskId} finalizada.`);

									this.checkMastery();
					},

					checkMastery() {
									// Liberación de la recompensa final si se alcanzan las condiciones
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													this.logTelemetry("Sesión 2 completada al 100%. Clonación bit a bit dominada.");
									}
					},

					logTelemetry(eventDescription) {
									// En un entorno real, esto enviaría datos al backend para analítica de aprendizaje
									console.log(`[Telemetría Instructiva DFIR]: ${eventDescription}`);
					}
	};
});
/**
 * Motor Interactivo de Aprendizaje - Sesión 3
 * Patrón: Sandbox Asilado para Gamificación y Telemetría.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Controlador Centralizado
	const AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass si la tarea ya fue completada (evita explotar la métrica)
									if (taskContainer.classList.contains('completed')) return;

									// Transición de estado (Refuerzo Visual y Loop de Dopamina)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] HASH CONFIRMADO";
									btn.style.backgroundColor = "var(--color-success)";
									btn.style.color = "var(--color-bg-main)";
									btn.style.borderColor = "var(--color-success)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									this.logTelemetry(`Estudiante superó nodo práctico: Tarea ${taskId} finalizada.`);

									this.checkMastery();
					},

					checkMastery() {
									// Desbloqueo del Payload Final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													this.logTelemetry(">> SESIÓN 3 SUPERADA. Habilidad de Adquisición y Hashing adquirida.");
									}
					},

					logTelemetry(eventLog) {
									// Simulación de envío de datos analíticos para la mejora continua del UX/LX
									console.log(`[Telemetría DFIR - Sesión 3]: ${eventLog}`);
					}
	};

	// Exponer el controlador al contexto global para ser llamado desde el HTML
	window.AppController = AppController;
});
/**
 * Arquitectura Cognitiva - Motor UX/LX para Sesión 4
 * Control de "Loops" de retención y escalada de tareas.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Objeto centralizado para evitar colisiones globales
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Si ya está completado, no volvemos a inyectar la recompensa
									if (taskContainer.classList.contains('completed')) return;

									// Inyectar estado de éxito (Feedback visual inmediato)
									taskContainer.classList.add('completed');
									btn.innerHTML = `&#10004; Paso ${taskId} Asegurado`;
									btn.disabled = true;
									
									this.tasksCompleted++;
									this.logTelemetry(`[Módulo 1 - Sesión 4]: El analista documentó el bloque ${taskId}.`);

									this.checkEscalation();
					},

					checkEscalation() {
									// Cuando se completan todas las tareas, liberamos el payload visual final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													this.logTelemetry(">> SESIÓN 4 COMPLETADA: Cadena de Custodia Digital inicializada con éxito.");
									}
					},

					logTelemetry(eventLog) {
									// Simulador de envío de analíticas de aprendizaje (telemetría)
									console.log(eventLog);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor UX/LX para Sesión 5
 * Patrón modular para control de estado y telemetría simulada.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass para evitar doble ejecución en la memoria del ciclo
									if (taskContainer.classList.contains('completed')) return;

									// Inyección de estado (Loop de retención)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] PROCEDIMIENTO VALIDADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									this.logTelemetry(`[DFIR Ops]: El analista aplicó la capa ${taskId} de protección.`);

									this.verifyWriteBlocker();
					},

					verifyWriteBlocker() {
									// Desbloqueo del estado final (Dopamina y Cierre de Sesión)
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													this.logTelemetry(">> SESIÓN 5 CERRADA. Bloqueador de Escritura activo y verificado empíricamente.");
									}
					},

					logTelemetry(logMessage) {
									// Telemetría de aprendizaje asíncrona simulada
									console.log(logMessage);
					}
	};
});
/**
 * Motor UX/LX - Sesión 6 (Speed Drill)
 * Arquitectura Cognitiva enfocada en "Memoria Muscular" y "Refuerzo Táctico".
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Controlador de flujo del Drill
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					startTime: Date.now(), // Iniciamos un cronómetro invisible para telemetría
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Prevención de over-clicking en el buffer del loop
									if (taskContainer.classList.contains('completed')) return;

									// Inyectar el Refuerzo Positivo
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] VECTOR ASEGURADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									const timeElapsed = Math.round((Date.now() - this.startTime) / 1000);
									this.logTelemetry(`Estudiante completó la directiva ${taskId} en ${timeElapsed}s.`);

									this.verifyDrillCompletion();
					},

					verifyDrillCompletion() {
									// Desbloqueo del Payload Final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													const totalTime = Math.round((Date.now() - this.startTime) / 1000);
													this.logTelemetry(`>> DRILL SUPERADO. Laboratorio P0 levantado en ${totalTime} segundos.`);
													
													// Detenemos la animación de parpadeo del header al asegurar la escena
													document.querySelector('.status-badge').classList.remove('blink');
													document.querySelector('.status-badge').textContent = "ESTADO: ENTORNO ESTÉRIL ASEGURADO";
													document.querySelector('.status-badge').style.color = "var(--color-success)";
													document.querySelector('.status-badge').style.borderColor = "var(--color-success)";
									}
					},

					logTelemetry(eventLog) {
									// Analítica de datos para medir los tiempos de reacción del estudiante
									console.log(`[Telemetría de Aprendizaje - Drill 06]: ${eventLog}`);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor UX/LX (Sesión 7)
 * Diseñado para control de flujo del Drill de Precisión y Telemetría.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Sandbox asilado para gestión de estado
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass si la tarea ya fue verificada
									if (taskContainer.classList.contains('completed')) return;

									// Transición Visual (Hackeando el Loop de Retención)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] VECTOR CONFIRMADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									this.logTelemetry(`[Sesión 7 - Drill Operativo]: Nodo de Extracción ${taskId} asegurado.`);
									this.verifyMastery();
					},

					verifyMastery() {
									// Desbloqueo del Payload Visual Final (Cierre del Drill)
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													// Actualizamos el Header Táctico para bajar la tensión simulada
													const statusBadge = document.querySelector('.status-badge');
													statusBadge.classList.remove('alert');
													statusBadge.textContent = "ESTADO: EVIDENCIA CLONADA Y ASEGURADA";
													statusBadge.style.color = "var(--color-success)";
													statusBadge.style.borderColor = "var(--color-success)";
													statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
													
													this.logTelemetry(">> MASTERCLASS 07 SUPERADA. Procedimiento de clonación asimilado como memoria muscular.");
									}
					},

					logTelemetry(eventLog) {
									// Simulador de Analítica de Aprendizaje (Telemetría para parchear el curso en tiempo real)
									console.log(eventLog);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor UX/LX (Sesión 8)
 * Diseñado para control de flujo del Drill de Criptografía y Telemetría.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Objeto centralizado para evitar vulnerabilidades de estado global
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass si la tarea ya fue verificada
									if (taskContainer.classList.contains('completed')) return;

									// Transición Visual (Hackeando el Loop de Retención)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] FIRMA CREADA";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									this.logTelemetry(`[Sesión 8 - Drill Legal]: Fase ${taskId} asegurada criptográficamente.`);
									this.verifyMastery();
					},

					verifyMastery() {
									// Desbloqueo del Payload Visual Final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													// Actualizamos el Header Táctico para bajar la tensión de la "auditoría"
													const statusBadge = document.querySelector('.status-badge');
													statusBadge.classList.remove('warn');
													statusBadge.textContent = "ESTADO: FIRMAS VALIDADAS EN CORTE";
													statusBadge.style.color = "var(--color-success)";
													statusBadge.style.borderColor = "var(--color-success)";
													statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
													
													this.logTelemetry(">> MASTERCLASS 08 SUPERADA. Procedimiento de Hashing asimilado bajo presión.");
									}
					},

					logTelemetry(eventLog) {
									// Analítica de Aprendizaje (Telemetría para parchear el curso en tiempo real)
									console.log(eventLog);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor UX/LX (Sesión 9)
 * Diseñado para control de flujo del Drill de Primer Respondedor y Telemetría.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					startTime: Date.now(), // Iniciamos cronómetro invisible
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass si la tarea ya fue verificada (evita exploit del loop)
									if (taskContainer.classList.contains('completed')) return;

									// Transición Visual (Hackeando la Motivación)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] NODO ASEGURADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-primary)";
									btn.style.color = "var(--color-primary)";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									const elapsed = Math.round((Date.now() - this.startTime) / 1000);
									this.logTelemetry(`[Sesión 9 - Active Drill]: Fase ${taskId} completada en ${elapsed}s.`);
									this.verifyDrillSuccess();
					},

					verifyDrillSuccess() {
									// Desbloqueo del Payload Visual Final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													// Finalizamos el estado de emergencia en el Header
													const statusBadge = document.querySelector('.status-badge');
													statusBadge.classList.remove('hazard');
													statusBadge.textContent = "ESTADO: ESCENA CONGELADA Y BAJO CUSTODIA";
													statusBadge.style.color = "var(--color-primary)";
													statusBadge.style.borderColor = "var(--color-primary)";
													statusBadge.style.background = "rgba(163, 230, 53, 0.15)";
													
													const totalTime = Math.round((Date.now() - this.startTime) / 1000);
													this.logTelemetry(`>> DRILL 09 SUPERADO. Protocolo de Cadena de Custodia ejecutado en ${totalTime} segundos.`);
									}
					},

					logTelemetry(eventLog) {
									// Analítica de Aprendizaje simulada
									console.log(eventLog);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor UX/LX (Sesión 10)
 * Diseñado para la evaluación final del Módulo 1 y telemetría de éxito.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass si la tarea ya fue verificada
									if (taskContainer.classList.contains('completed')) return;

									// Transición Visual (Validación de exploit exitoso)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] PARÁMETRO ASEGURADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.boxShadow = "none";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									this.logTelemetry(`[Sesión 10 - Examen Final]: Estudiante completó la fase ${taskId} de la certificación.`);
									this.verifyModuleCompletion();
					},

					verifyModuleCompletion() {
									// Desbloqueo del Payload Visual Final (Cierre del Módulo 1)
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													// Finalizamos el estado crítico en el Header
													const statusBadge = document.querySelector('.status-badge');
													statusBadge.classList.remove('critical');
													statusBadge.textContent = "ESTADO: MÓDULO 1 DESBLOQUEADO Y CERTIFICADO";
													statusBadge.style.color = "var(--color-success)";
													statusBadge.style.borderColor = "var(--color-success)";
													statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
													
													this.logTelemetry(">> CERTIFICACIÓN SUPERADA. Estudiante listo para Módulo 2 (Sistemas de Archivos Forenses).");
									}
					},

					logTelemetry(eventLog) {
									// Analítica de Aprendizaje simulada (para evaluar dónde se estancan los alumnos)
									console.log(eventLog);
					}
	};
});

/**
 * Arquitectura Cognitiva - Motor UX/LX (Sesión 11)
 * Diseñado para la simulación de escaneo de bajo nivel y telemetría.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Objeto central para evitar vulnerabilidades de variables globales
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass si la tarea ya fue verificada
									if (taskContainer.classList.contains('completed')) return;

									// Transición Visual (Hackeando el Loop de Retención)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] PARÁMETRO VERIFICADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.boxShadow = "none";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									this.logTelemetry(`[Sesión 11 - Deep Scan]: Analista ejecutó fase de mapeo ${taskId}.`);
									this.verifyAnalysisCompletion();
					},

					verifyAnalysisCompletion() {
									// Desbloqueo del Payload Visual Final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													// Actualizamos el Header para informar el éxito del "Escaneo"
													const statusBadge = document.querySelector('.status-badge');
													statusBadge.classList.remove('scan');
													statusBadge.textContent = "ESTADO: ESTRUCTURA DEL DISCO REVELADA";
													statusBadge.style.color = "var(--color-success)";
													statusBadge.style.borderColor = "var(--color-success)";
													statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
													
													this.logTelemetry(">> SESIÓN 11 SUPERADA. El estudiante domina mmls y el mapeo de sectores ocultos.");
									}
					},

					logTelemetry(eventLog) {
									// Analítica de Aprendizaje (Telemetría para medir interacción del estudiante)
									console.log(eventLog);
					}
	};
});
/**
 * Arquitectura Cognitiva - Motor UX/LX (Sesión 12)
 * Diseñado para la simulación de escaneo de MFT y telemetría asíncrona.
 */

document.addEventListener('DOMContentLoaded', () => {
    
	// Controlador encapsulado para evitar latencia mental y errores de estado global
	window.AppController = {
					totalTasks: 3,
					tasksCompleted: 0,
					
					completeTask(taskId) {
									const taskContainer = document.getElementById(`task-${taskId}`);
									const btn = taskContainer.querySelector('button');
									
									// Bypass para prevenir alteración de métricas (doble clic)
									if (taskContainer.classList.contains('completed')) return;

									// Inyección de dopamina (Transición Visual Positiva)
									taskContainer.classList.add('completed');
									btn.innerHTML = "[✓] VECTOR CONFIRMADO";
									btn.style.backgroundColor = "transparent";
									btn.style.border = "1px solid var(--color-success)";
									btn.style.color = "var(--color-success)";
									btn.style.boxShadow = "none";
									btn.style.cursor = "default";
									btn.disabled = true;
									
									this.tasksCompleted++;
									
									this.logTelemetry(`[Sesión 12 - Inode Tracking]: Analista identificó el objetivo en el nodo ${taskId}.`);
									this.verifyRecoveryPreparation();
					},

					verifyRecoveryPreparation() {
									// Escalada de privilegios y desbloqueo del Payload Final
									if (this.tasksCompleted === this.totalTasks) {
													const successMsg = document.getElementById('success-message');
													successMsg.classList.remove('hidden');
													
													// Actualizamos el Header Táctico
													const statusBadge = document.querySelector('.status-badge');
													statusBadge.classList.remove('forensic-scan');
													statusBadge.textContent = "ESTADO: METADATOS LISTOS PARA EXTRACCIÓN";
													statusBadge.style.color = "var(--color-success)";
													statusBadge.style.borderColor = "var(--color-success)";
													statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
													statusBadge.style.animation = "none";
													
													this.logTelemetry(">> SESIÓN 12 SUPERADA. El estudiante domina el uso de fls y el rastreo de inodos eliminados.");
									}
					},

					logTelemetry(eventLog) {
									// Evaluación y Analítica de Aprendizaje (Telemetría simulada para el backend del curso)
									console.log(eventLog);
					}
	};
});
