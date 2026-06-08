// Configuración de Firebase (Debes reemplazar esto con tus credenciales reales de tu proyecto)
const firebaseConfig = {
	apiKey: "AIzaSyC08vUkWdQ9Ad3PaXS0uZ0yu_EWWBaq-aQ",
	authDomain: "acceso-a-cursos-4a314.firebaseapp.com",
	projectId: "acceso-a-cursos-4a314",
	storageBucket: "acceso-a-cursos-4a314.firebasestorage.app",
	messagingSenderId: "851856735092",
	appId: "1:851856735092:web:04290714cb63e4244c4a21",
	measurementId: "G-ZG280G922Y"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elementos del DOM
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const userInfo = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const checkboxes = document.querySelectorAll('.step-check');
const progressBar = document.getElementById('course-progress');

// --- 1. Autenticación con Firebase ---
auth.onAuthStateChanged(user => {
	if (user) {
					// Usuario logueado
					btnLogin.classList.add('hidden');
					userInfo.classList.remove('hidden');
					userEmailSpan.textContent = user.email;
					// Aquí podrías cargar el progreso previo desde Firestore
	} else {
					// Usuario no logueado
					btnLogin.classList.remove('hidden');
					userInfo.classList.add('hidden');
	}
});

btnLogin.addEventListener('click', () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider).catch(error => {
					console.error("Error en autenticación:", error);
					alert("Hubo un error al iniciar sesión.");
	});
});

btnLogout.addEventListener('click', () => {
	auth.signOut();
});

// --- 2. Lógica Pedagógica: Indicador de Avance ---
function updateProgress() {
	const total = checkboxes.length;
	const checked = document.querySelectorAll('.step-check:checked').length;
	const percentage = total === 0 ? 0 : (checked / total) * 100;
	
	progressBar.style.width = `${percentage}%`;
	
	// Feedback visual al completar todo (recompensa psicológica)
	if (percentage === 100) {
					progressBar.style.backgroundColor = 'var(--accent-cyan)';
	} else {
					progressBar.style.backgroundColor = 'var(--accent-green)';
	}

	// Aquí se conectaría con Firebase para guardar el progreso:
	// if(auth.currentUser) { guardarProgresoEnBD(auth.currentUser.uid, percentage); }
}

checkboxes.forEach(box => {
	box.addEventListener('change', updateProgress);
});

// --- 3. Encapsulado de Código Reutilizable ---
// Agrega dinámicamente un botón de "Copiar" a cada bloque de código
document.querySelectorAll('.code-encapsulated').forEach(block => {
	const btn = document.createElement('button');
	btn.className = 'copy-btn';
	btn.textContent = 'Copiar';
	
	btn.addEventListener('click', async () => {
					const code = block.querySelector('code').innerText;
					try {
									await navigator.clipboard.writeText(code);
									btn.textContent = '¡Copiado!';
									btn.style.color = 'var(--accent-green)';
									btn.style.borderColor = 'var(--accent-green)';
									
									setTimeout(() => {
													btn.textContent = 'Copiar';
													btn.style.color = '';
													btn.style.borderColor = '';
									}, 2000);
					} catch (err) {
									console.error('Error al copiar: ', err);
					}
	});
	
	block.appendChild(btn);
});
// --- 3. Encapsulado de Código Reutilizable (VERSIÓN MEJORADA SESIÓN 02) ---
document.querySelectorAll('.code-encapsulated').forEach(block => {
	// Si el botón no existe, lo creamos (para evitar duplicados si recargas DOM)
	if(!block.querySelector('.copy-btn')){
					const btn = document.createElement('button');
					btn.className = 'copy-btn';
					btn.textContent = 'Copiar';
					
					btn.addEventListener('click', async () => {
									// Clonamos el bloque para manipularlo sin afectar la vista
									const codeClone = block.querySelector('code').cloneNode(true);
									
									// Eliminamos todos los spans con clase 'prompt' del clon para no copiarlos
									const prompts = codeClone.querySelectorAll('.prompt');
									prompts.forEach(p => p.remove());
									
									// Eliminamos los comentarios también para tener código limpio
									const comments = codeClone.querySelectorAll('.comment');
									comments.forEach(c => c.remove());

									// Limpiamos espacios extras y saltos de línea innecesarios
									const cleanCode = codeClone.innerText.trim();

									try {
													await navigator.clipboard.writeText(cleanCode);
													btn.textContent = '¡Copiado!';
													btn.style.color = 'var(--accent-green)';
													btn.style.borderColor = 'var(--accent-green)';
													
													setTimeout(() => {
																	btn.textContent = 'Copiar';
																	btn.style.color = '';
																	btn.style.borderColor = '';
													}, 2000);
									} catch (err) {
													console.error('Error al copiar: ', err);
									}
					});
					
					block.appendChild(btn);
	}
});
// --- 2. Lógica Pedagógica: Indicador de Avance (VERSIÓN MEJORADA SESIÓN 03) ---
function updateProgress() {
	const total = checkboxes.length;
	const checked = document.querySelectorAll('.step-check:checked').length;
	const percentage = total === 0 ? 0 : (checked / total) * 100;
	
	progressBar.style.width = `${percentage}%`;
	
	// Feedback visual y psicológico al completar todo
	if (percentage === 100) {
					progressBar.style.backgroundColor = 'var(--accent-cyan)';
					progressBar.style.boxShadow = '0 0 10px var(--accent-cyan), 0 0 20px var(--accent-cyan)';
					
					// Efecto temporal en la interfaz
					setTimeout(() => {
									progressBar.style.boxShadow = 'none';
					}, 1500);
	} else {
					progressBar.style.backgroundColor = 'var(--accent-green)';
					progressBar.style.boxShadow = 'none';
	}

	// if(auth.currentUser) { guardarProgresoEnBD(auth.currentUser.uid, percentage); }
}
// --- 3. Encapsulado de Código Reutilizable (ACTUALIZADO SESIÓN 05) ---
document.querySelectorAll('.code-encapsulated').forEach(block => {
	if(!block.querySelector('.copy-btn')){
					const btn = document.createElement('button');
					btn.className = 'copy-btn';
					btn.textContent = 'Copiar';
					
					btn.addEventListener('click', async () => {
									const codeClone = block.querySelector('code').cloneNode(true);
									
									// Eliminamos el prompt normal ($)
									const prompts = codeClone.querySelectorAll('.prompt');
									prompts.forEach(p => p.remove());

									// Eliminamos el prompt de superusuario (#)
									const rootPrompts = codeClone.querySelectorAll('.root-prompt');
									rootPrompts.forEach(rp => rp.remove());
									
									// Eliminamos los comentarios
									const comments = codeClone.querySelectorAll('.comment');
									comments.forEach(c => c.remove());

									// Limpieza final de espacios
									const cleanCode = codeClone.innerText.trim();

									try {
													await navigator.clipboard.writeText(cleanCode);
													btn.textContent = '¡Copiado!';
													btn.style.color = 'var(--accent-green)';
													btn.style.borderColor = 'var(--accent-green)';
													
													setTimeout(() => {
																	btn.textContent = 'Copiar';
																	btn.style.color = '';
																	btn.style.borderColor = '';
													}, 2000);
									} catch (err) {
													console.error('Error al copiar: ', err);
									}
					});
					
					block.appendChild(btn);
	}
});
// --- 4. Lógica Interactiva: Calculador Octal de Permisos (SESIÓN 06) ---
const permCheckboxes = document.querySelectorAll('.perm-calc');
const octalOwner = document.getElementById('octal-owner');
const octalGroup = document.getElementById('octal-group');
const octalOthers = document.getElementById('octal-others');
const finalOctal = document.getElementById('final-octal');

function calculatePermissions() {
    // Si los elementos no existen en esta sesión (ej. en sesión 01-05), salir de la función
    if (!octalOwner) return;

    let ownerVal = 0, groupVal = 0, othersVal = 0;

    permCheckboxes.forEach(box => {
        if (box.checked) {
            const val = parseInt(box.value);
            if (box.dataset.target === 'owner') ownerVal += val;
            if (box.dataset.target === 'group') groupVal += val;
            if (box.dataset.target === 'others') othersVal += val;
        }
    });

    // Actualizar visualmente cada dígito individual
    octalOwner.textContent = ownerVal;
    octalGroup.textContent = groupVal;
    octalOthers.textContent = othersVal;

    // Actualizar el comando final
    finalOctal.textContent = `${ownerVal}${groupVal}${othersVal}`;
}

// Agregar el listener a cada checkbox del simulador
if (permCheckboxes.length > 0) {
    permCheckboxes.forEach(box => {
        box.addEventListener('change', calculatePermissions);
    });
}
// --- 5. Lógica Interactiva: Simulador Live Forensics (SESIÓN 07) ---
const simProcessesContainer = document.getElementById('sim-processes');

if (simProcessesContainer) {
    // Array base de procesos comunes en Linux
    const baseProcesses = [
        { pid: 1, user: 'root', cmd: '/sbin/init' },
        { pid: 432, user: 'root', cmd: '/lib/systemd/systemd-journald' },
        { pid: 1024, user: 'kali', cmd: 'zsh' },
        { pid: 1543, user: 'kali', cmd: 'xfce4-terminal' }
    ];

    function updateLiveMonitor() {
        simProcessesContainer.innerHTML = ''; // Limpiar
        
        // Simular un proceso malicioso (Rogue) que aparece esporádicamente
        const isRogueActive = Math.random() > 0.4;
        let processesToRender = [...baseProcesses];
        
        if (isRogueActive) {
            processesToRender.push({ pid: 6667, user: 'www-data', cmd: './nc -e /bin/bash' });
        }

        processesToRender.forEach(proc => {
            // Generar uso de CPU aleatorio (el rogue siempre consume más para resaltar)
            let cpuUsage = proc.pid === 6667 ? (80 + Math.random() * 19).toFixed(1) : (Math.random() * 2).toFixed(1);
            
            const row = document.createElement('div');
            row.className = `pt-row ${proc.pid === 6667 ? 'rogue-process' : ''}`;
            
            row.innerHTML = `
                <span>${proc.pid}</span>
                <span>${proc.user}</span>
                <span>${cpuUsage}%</span>
                <span>${proc.cmd}</span>
            `;
            simProcessesContainer.appendChild(row);
        });
    }

    // Actualizar el monitor cada 1.5 segundos
    setInterval(updateLiveMonitor, 1500);
    updateLiveMonitor(); // Llamada inicial
}
// --- 6. Lógica Interactiva: Simulador de Auditoría (SESIÓN 08) ---
const btnRunAudit = document.getElementById('btn-run-audit');
const auditOutput = document.getElementById('audit-output');
const auditStatus = document.getElementById('audit-status');

if (btnRunAudit && auditOutput) {
    const filesToAudit = [
        { path: "/usr/bin/cat", status: "OK" },
        { path: "/usr/bin/ls", status: "OK" },
        { path: "/usr/bin/grep", status: "OK" },
        { path: "/etc/passwd", status: "OK" },
        { path: "/usr/sbin/sshd", status: "FAILED" }, // Simulación de Troyano en SSH
        { path: "/bin/bash", status: "OK" },
        { path: "/bin/ping", status: "OK" }
    ];

    btnRunAudit.addEventListener('click', () => {
        // Reiniciar estado
        auditOutput.innerHTML = '';
        auditStatus.textContent = 'Analizando suma de comprobación (MD5)...';
        auditStatus.style.color = '#eab308';
        btnRunAudit.disabled = true;

        let delay = 0;

        filesToAudit.forEach((file, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'audit-line';
                
                if (file.status === "OK") {
                    line.innerHTML = `<span class="audit-ok">${file.path} ... OK</span>`;
                } else {
                    line.innerHTML = `<span class="audit-fail">debsums: checksum mismatch ${file.path}</span>`;
                }
                
                auditOutput.appendChild(line);
                auditOutput.scrollTop = auditOutput.scrollHeight; // Auto-scroll

                // Si es el último archivo
                if (index === filesToAudit.length - 1) {
                    setTimeout(() => {
                        auditStatus.textContent = 'Auditoría completada. 1 alteración detectada.';
                        auditStatus.style.color = '#ef4444';
                        btnRunAudit.disabled = false;
                        btnRunAudit.textContent = 'Re-ejecutar Análisis';
                    }, 500);
                }
            }, delay);
            
            // Incrementamos el delay para simular el tiempo de procesamiento
            delay += 400 + Math.random() * 600; 
        });
    });
}
// --- 7. Lógica Interactiva: Simulador Ping & Network (SESIÓN 09) ---
const btnSimPing = document.getElementById('btn-sim-ping');
const signalPath = document.getElementById('signal-path');
const pingConsole = document.getElementById('ping-console');

if (btnSimPing && signalPath && pingConsole) {
    let pingCount = 0;
    let isPinging = false;

    btnSimPing.addEventListener('click', () => {
        if (isPinging) return;
        isPinging = true;
        btnSimPing.disabled = true;
        btnSimPing.textContent = 'Analizando...';
        pingConsole.innerHTML = '<div class="ping-line">PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.</div>';
        pingCount = 0;
        
        let times = [];

        const executePing = setInterval(() => {
            if (pingCount >= 4) {
                clearInterval(executePing);
                isPinging = false;
                btnSimPing.disabled = false;
                btnSimPing.textContent = 'Transmitir ICMP (Ping)';
                
                // Mostrar estadísticas finales
                const avg = (times.reduce((a,b)=>a+b,0) / times.length).toFixed(1);
                pingConsole.innerHTML += `
                    <div class="ping-stats">
                        --- 8.8.8.8 ping statistics ---<br>
                        4 packets transmitted, 4 received, 0% packet loss<br>
                        rtt min/avg/max/mdev = 12.1/${avg}/24.5/2.3 ms
                    </div>
                `;
                pingConsole.scrollTop = pingConsole.scrollHeight;
                return;
            }

            // Animación de ida
            const sendPacket = document.createElement('div');
            sendPacket.className = 'packet';
            signalPath.appendChild(sendPacket);

            setTimeout(() => {
                sendPacket.remove();
                
                // Animación de retorno
                const returnPacket = document.createElement('div');
                returnPacket.className = 'packet packet-return';
                signalPath.appendChild(returnPacket);

                // Generar tiempo aleatorio realista
                const timeMs = (12 + Math.random() * 12).toFixed(1);
                times.push(parseFloat(timeMs));

                setTimeout(() => {
                    returnPacket.remove();
                    // Agregar línea a la consola
                    pingCount++;
                    pingConsole.innerHTML += `<div class="ping-line">64 bytes from 8.8.8.8: icmp_seq=${pingCount} ttl=117 time=${timeMs} ms</div>`;
                    pingConsole.scrollTop = pingConsole.scrollHeight;
                }, 600); // 600ms es el tiempo de la animación de retorno

            }, 600); // 600ms es el tiempo de la animación de ida

        }, 1500); // Lanzar un ping cada 1.5 segundos
    });
}
// --- 8. Lógica Interactiva: Simulador de Sockets & lsof (SESIÓN 10) ---
const socketTable = document.getElementById('socket-table');
const lsofPanel = document.getElementById('lsof-panel');
const lsofContent = document.getElementById('lsof-content');

if (socketTable && lsofPanel && lsofContent) {
    // Datos simulados de red (Un mix de procesos legítimos y un troyano)
    const connections = [
        { proto: 'tcp', local: '0.0.0.0:22', foreign: '0.0.0.0:*', state: 'LISTEN', pid: '643', user: 'root', bin: '/usr/sbin/sshd', isBad: false },
        { proto: 'udp', local: '0.0.0.0:53', foreign: '0.0.0.0:*', state: 'UNCONN', pid: '412', user: 'systemd+', bin: '/lib/systemd/systemd-resolved', isBad: false },
        { proto: 'tcp', local: '192.168.1.50:4444', foreign: '172.16.0.10:59321', state: 'ESTAB', pid: '1337', user: 'www-data', bin: '/tmp/.hidden_nc', isBad: true },
        { proto: 'tcp', local: '127.0.0.1:3306', foreign: '0.0.0.0:*', state: 'LISTEN', pid: '892', user: 'mysql', bin: '/usr/sbin/mysqld', isBad: false }
    ];

    // Construir cabecera
    socketTable.innerHTML = `
        <div class="sock-row sock-head">
            <span>Proto</span><span>Local Address</span><span>Foreign Address</span><span>State</span>
        </div>
    `;

    // Inyectar filas
    connections.forEach((conn, index) => {
        const row = document.createElement('div');
        row.className = `sock-row ${conn.isBad ? 'sock-alert' : ''}`;
        row.innerHTML = `
            <span>${conn.proto}</span>
            <span>${conn.local}</span>
            <span>${conn.foreign}</span>
            <span>${conn.state}</span>
        `;
        
        // Al hacer clic, simulamos la ejecución de lsof sobre ese puerto
        row.addEventListener('click', () => {
            const port = conn.local.split(':')[1];
            lsofPanel.classList.remove('hidden');
            
            // Simular el output de lsof
            lsofContent.innerHTML = `
<strong style="color:#fdba74;">[Análisis Forense] Ejecutando: sudo lsof -i :${port}</strong>
<br><br>
COMMAND   PID     USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
<span class="${conn.isBad ? 'sock-alert' : 'lsof-highlight'}">${conn.bin.split('/').pop()}</span>     ${conn.pid}   ${conn.user}   3u  IPv4   18342      0t0  TCP *:${port} (LISTEN)

<br>
<em style="color:#78716c;">Conclusión: El puerto ${port} fue abierto por el usuario <strong>${conn.user}</strong> ejecutando el binario <strong class="${conn.isBad ? 'sock-alert' : 'lsof-highlight'}">${conn.bin}</strong>.</em>
            `;
            
            // Efecto visual en la fila seleccionada
            document.querySelectorAll('.sock-row').forEach(r => r.style.backgroundColor = '');
            row.style.backgroundColor = 'rgba(234, 88, 12, 0.2)';
        });
        
        socketTable.appendChild(row);
    });
}
// --- 9. Lógica Interactiva: Simulador Criptográfico SSH/SCP (SESIÓN 11) ---
const btnTransmit = document.getElementById('btn-transmit');
const packetContainer = document.getElementById('packet-container');
const remoteData = document.getElementById('remote-data');
const localData = document.getElementById('local-data');

if (btnTransmit && packetContainer && remoteData) {
    const cryptoChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let isTransmitting = false;

    function generateGarbage(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += cryptoChars.charAt(Math.floor(Math.random() * cryptoChars.length));
        }
        return result;
    }

    btnTransmit.addEventListener('click', () => {
        if (isTransmitting) return;
        isTransmitting = true;
        btnTransmit.disabled = true;
        remoteData.className = 'data-block empty-block';
        remoteData.textContent = 'Recibiendo...';
        
        // Crear el paquete visual
        const packet = document.createElement('div');
        packet.className = 'crypto-packet';
        packet.innerHTML = `🔒 ${generateGarbage(8)}`;
        packetContainer.appendChild(packet);

        // Animar el paquete a través del túnel usando Web Animations API
        const animation = packet.animate([
            { left: '0%', opacity: 1 },
            { left: '50%', opacity: 1, offset: 0.5 },
            { left: '100%', opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        // Efecto visual de "encriptación en tránsito" (cambia los caracteres aleatoriamente)
        const scrambleInterval = setInterval(() => {
            packet.innerHTML = `🔒 ${generateGarbage(8)}`;
        }, 100);

        animation.onfinish = () => {
            clearInterval(scrambleInterval);
            packet.remove();
            
            // "Desencriptar" en el destino
            remoteData.className = 'data-block';
            remoteData.textContent = localData.textContent; // Copia exacta
            remoteData.style.backgroundColor = '#8b5cf6'; // Color remoto
            
            setTimeout(() => {
                isTransmitting = false;
                btnTransmit.disabled = false;
                btnTransmit.textContent = 'Re-Transmitir';
            }, 1000);
        };
    });
}
// --- 10. Lógica Interactiva: Simulador HTTP & curl (SESIÓN 12) ---
const btnCurlHead = document.getElementById('btn-curl-head');
const resHeaders = document.getElementById('res-headers');

if (btnCurlHead && resHeaders) {
    btnCurlHead.addEventListener('click', () => {
        // Deshabilitar botón durante la "petición"
        btnCurlHead.disabled = true;
        btnCurlHead.textContent = 'Interrogando...';
        resHeaders.classList.remove('hidden');
        resHeaders.innerHTML = '<span style="color:#64748b;">Esperando respuesta del servidor...</span>';

        // Simular latencia de red (1.2 segundos)
        setTimeout(() => {
            // Respuesta simulada de un servidor comprometido (Notar el servidor "nginx" falso o versión antigua)
            const simulatedResponse = `
<span class="http-200">HTTP/1.1 200 OK</span>
<span class="http-header-key">Date:</span> <span class="http-header-val">${new Date().toUTCString()}</span>
<span class="http-header-key">Server:</span> <span class="http-header-val">nginx/1.14.0 (Ubuntu)</span>
<span class="http-header-key">Content-Type:</span> <span class="http-header-val">text/html; charset=UTF-8</span>
<span class="http-header-key">X-Powered-By:</span> <span class="http-header-val">PHP/5.6.40</span> <span style="color:#ef4444; font-style:italic;">&lt;-- (Vulnerable)</span>
<span class="http-header-key">Connection:</span> <span class="http-header-val">keep-alive</span>
            `;

            resHeaders.innerHTML = simulatedResponse.trim();
            btnCurlHead.textContent = 'Ejecutar curl -I';
            btnCurlHead.disabled = false;
        }, 1200);
    });
}
// --- 11. Lógica Interactiva: Simulador dd (Disk Destroyer) (SESIÓN 13) ---
const btnSimulateDd = document.getElementById('btn-simulate-dd');
const ddIf = document.getElementById('dd-if');
const ddOf = document.getElementById('dd-of');
const ddFeedback = document.getElementById('dd-feedback');

if (btnSimulateDd && ddIf && ddOf && ddFeedback) {
    btnSimulateDd.addEventListener('click', () => {
        const inputVal = ddIf.value;
        const outputVal = ddOf.value;

        ddFeedback.classList.remove('hidden', 'feedback-success', 'feedback-fatal');

        // Validaciones en blanco
        if (inputVal === 'none' || outputVal === 'none') {
            ddFeedback.textContent = "Error: Debes definir tanto el origen (if) como el destino (of).";
            ddFeedback.classList.add('feedback-fatal');
            return;
        }

        // Validación de destrucción del propio sistema
        if (outputVal === '/dev/sda') {
            ddFeedback.innerHTML = "❌ ¡ERROR FATAL! Acabas de sobrescribir tu propio disco principal. Has destruido tu sistema operativo Linux. En la vida real, tendrías que formatear tu máquina.";
            ddFeedback.classList.add('feedback-fatal');
            return;
        }

        // Validación de destrucción de la evidencia
        if (outputVal === '/dev/sdb') {
            ddFeedback.innerHTML = "❌ ¡NEGLIGENCIA FORENSE! Acabas de escribir datos sobre el USB incautado. Has destruido la evidencia. Tu carrera como perito acaba de terminar.";
            ddFeedback.classList.add('feedback-fatal');
            return;
        }

        // Validación de copia vacía inútil
        if (inputVal === '/dev/zero' && outputVal === 'evidencia.img') {
            ddFeedback.innerHTML = "❌ Error Lógico: Acabas de crear una imagen llena de ceros. No clonaste la evidencia.";
            ddFeedback.classList.add('feedback-fatal');
            return;
        }

        // Escenario Correcto: Evidencia a Imagen Local
        if (inputVal === '/dev/sdb' && outputVal === 'evidencia.img') {
            ddFeedback.innerHTML = "✅ ¡PERFECTO! Has extraído los datos del USB incautado y los has encapsulado de forma segura en un archivo de imagen en tu máquina. Procedimiento impecable.";
            ddFeedback.classList.add('feedback-success');
            return;
        }

        // Caso extraño no contemplado pero técnicamente posible
        ddFeedback.innerHTML = "⚠️ Comando ejecutado, pero no es el procedimiento forense estándar para este laboratorio.";
        ddFeedback.classList.add('feedback-fatal');
    });
}
// --- 12. Lógica Interactiva: Simulador Criptográfico de Integridad (SESIÓN 14) ---
const textA = document.getElementById('text-a');
const textB = document.getElementById('text-b');
const hashOutA = document.getElementById('hash-out-a');
const hashOutB = document.getElementById('hash-out-b');
const hashStatus = document.getElementById('hash-status');

if (textA && textB && hashOutA && hashOutB && hashStatus) {
    
    // Función nativa para calcular SHA-256 usando Web Crypto API
    async function calculateSHA256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function updateHashes() {
        const valA = textA.value;
        const valB = textB.value;

        const hexA = await calculateSHA256(valA);
        const hexB = await calculateSHA256(valB);

        hashOutA.textContent = hexA;
        hashOutB.textContent = hexB;

        // Auditoría Visual
        if (hexA === hexB) {
            hashStatus.textContent = "✅ VERIFICADO: Las firmas coinciden. Integridad mantenida.";
            hashStatus.className = "hash-status-bar status-match";
        } else {
            hashStatus.textContent = "❌ ALERTA FORENSE: Las firmas no coinciden. Evidencia corrompida.";
            hashStatus.className = "hash-status-bar status-mismatch";
        }
    }

    // Escuchar cada pulsación de teclado en tiempo real
    textA.addEventListener('input', updateHashes);
    textB.addEventListener('input', updateHashes);

    // Calcular en la carga inicial
    updateHashes();
}

// --- 13. Lógica Interactiva: Simulador Regex (Francotirador) (SESIÓN 15) ---
const regexInput = document.getElementById('regex-input');
const regexDisplay = document.getElementById('regex-display');

if (regexInput && regexDisplay) {
    // Guardamos el texto original para no perderlo al reescribir el HTML
    const originalText = regexDisplay.textContent.trim();

    function applyRegex() {
        const pattern = regexInput.value;
        regexInput.classList.remove('regex-error');

        // Si está vacío, mostrar el texto normal
        if (!pattern) {
            regexDisplay.textContent = originalText;
            return;
        }

        try {
            // Construir la expresión regular con el flag 'g' (global) para atrapar todas las coincidencias
            const regex = new RegExp(pattern, 'g');
            
            // Reemplazar el texto agregando el span de resaltado
            const highlightedText = originalText.replace(regex, (match) => {
                // Evitamos que coincida con strings vacíos que crearían bucles infinitos
                if (match === "") return match; 
                return `<span class="match-highlight">${match}</span>`;
            });

            regexDisplay.innerHTML = highlightedText;

        } catch (e) {
            // Si el patrón es inválido (ej. falta cerrar un paréntesis), marcamos error
            regexInput.classList.add('regex-error');
        }
    }

    // Escuchar cambios en tiempo real
    regexInput.addEventListener('input', applyRegex);

    // Ejecutar al cargar la página para aplicar el patrón por defecto (IPs)
    applyRegex();
}
// --- 14. Lógica Interactiva: Simulador de Empaquetado Tarball (SESIÓN 16 - FINAL) ---
const btnPackEvidence = document.getElementById('btn-pack-evidence');
const filesGrid = document.getElementById('files-grid');
const fileItems = document.querySelectorAll('.file-item');
const tarLaser = document.getElementById('tar-laser');
const archiveBox = document.getElementById('archive-box');
const archiveSeal = document.getElementById('archive-seal');

if (btnPackEvidence && filesGrid) {
    let isPacked = false;

    btnPackEvidence.addEventListener('click', () => {
        if (isPacked) {
            // Resetear animación (Opcional, para permitir repetir la práctica)
            fileItems.forEach(file => file.classList.remove('file-compressing'));
            archiveBox.classList.add('hidden');
            archiveSeal.classList.remove('seal-appear');
            tarLaser.classList.add('hidden');
            btnPackEvidence.textContent = 'Ejecutar: tar -czvf Caso_001.tar.gz';
            isPacked = false;
            return;
        }

        isPacked = true;
        btnPackEvidence.disabled = true;
        tarLaser.classList.remove('hidden');

        // 1. Iniciar compresión visual (Los archivos se encogen y caen)
        fileItems.forEach((file, index) => {
            setTimeout(() => {
                file.classList.add('file-compressing');
            }, index * 200); // Efecto cascada
        });

        // 2. Aparece la bóveda final y se sella
        setTimeout(() => {
            tarLaser.classList.add('hidden');
            archiveBox.classList.remove('hidden');
            archiveSeal.classList.add('seal-appear');
            
            btnPackEvidence.textContent = 'Volver a extraer (Reset)';
            btnPackEvidence.disabled = false;
            
            // Celebración visual en la barra de progreso general
            const progressBar = document.getElementById('course-progress');
            if(progressBar) {
                progressBar.style.boxShadow = '0 0 20px #fbbf24, 0 0 40px #fbbf24';
                progressBar.style.backgroundColor = '#fbbf24';
            }
        }, (fileItems.length * 200) + 600);
    });
}
// --- 15. Lógica Interactiva: Script Builder & Bash Simulator (SESIÓN 17 - MAESTRÍA) ---
const moduleBtns = document.querySelectorAll('.module-btn');
const scriptEditor = document.getElementById('script-editor');
const btnRunScript = document.getElementById('btn-run-script');
const scriptOutput = document.getElementById('script-output');
const btnClearScript = document.getElementById('btn-clear-script');

if (scriptEditor && btnRunScript) {
    const baseScript = '#!/bin/bash\necho "=== REPORTE INICIAL ==="\n';
    
    // Objeto que mapea los comandos a sus salidas simuladas (hardcoded para efecto educativo)
    const simulatedResults = {
        "ss -tulpn": "Netid  State   Local Address:Port   Peer Address:Port  Process\ntcp    LISTEN  0.0.0.0:22           0.0.0.0:* users:((\"sshd\",pid=642))\nudp    UNCONN  127.0.0.53%lo:53     0.0.0.0:* users:((\"systemd-resolve\",pid=401))",
        "ps aux | head -n 5": "<span class='out-process'>USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot           1  0.0  0.5 166016 11392 ?        Ss   10:01   0:01 /sbin/init\nroot           2  0.0  0.0      0     0 ?        S    10:01   0:00 [kthreadd]\nroot           3  0.0  0.0      0     0 ?        I<   10:01   0:00 [rcu_gp]</span>",
        "sha256sum /etc/passwd": "<span class='out-hash'>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>  /etc/passwd"
    };

    // Añadir comandos al editor visualmente
    moduleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            scriptEditor.textContent += cmd + '\n';
        });
    });

    // Limpiar el editor
    if(btnClearScript) {
        btnClearScript.addEventListener('click', () => {
            scriptEditor.textContent = baseScript;
            scriptOutput.classList.add('hidden');
        });
    }

    // Ejecutar la simulación
    btnRunScript.addEventListener('click', () => {
        const lines = scriptEditor.textContent.split('\n');
        scriptOutput.classList.remove('hidden');
        scriptOutput.innerHTML = ''; // Limpiar salida anterior
        
        let outHTML = "<span style='color:#10b981;'>kali@sandbox:~$ ./triaje.sh</span>\n";

        lines.forEach(line => {
            if (line.startsWith('#') || line.trim() === '') return; // Ignorar comentarios o vacías

            if (line.includes('echo "=== REPORTE')) {
                outHTML += "=== REPORTE INICIAL ===\n";
            } else if (line.includes('echo')) {
                // Extraer el texto del echo
                const match = line.match(/'([^']+)'/);
                if (match) outHTML += `<span class='out-header'>${match[1]}</span>\n`;
            } else {
                // Simular el comando real
                const cmdOnly = line.split(';').pop().trim();
                if (simulatedResults[cmdOnly]) {
                    outHTML += simulatedResults[cmdOnly] + '\n\n';
                }
            }
        });

        scriptOutput.innerHTML = outHTML;
    });
}