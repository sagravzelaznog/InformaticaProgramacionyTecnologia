export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export type QuizData = Record<string, QuizQuestion[]>;

export const quizzes: QuizData = {
  'modulo-1': [
    { id: 'm1-q1', question: '¿Cuál es la función principal de la utilidad "sfc /scannow" en Windows?', options: ['Reparar sectores físicos del disco', 'Verificar e intentar reparar archivos del sistema operativo corruptos', 'Limpiar el registro de Windows', 'Acelerar la memoria RAM'], correctAnswerIndex: 1 },
    { id: 'm1-q2', question: '¿Qué herramienta nativa permite visualizar el historial de pantallazos azules (BSOD) y errores de hardware?', options: ['Administrador de Tareas', 'Monitor de Recursos', 'Visor de Eventos (Event Viewer)', 'Editor del Registro'], correctAnswerIndex: 2 },
    { id: 'm1-q3', question: 'Al escuchar un pitido continuo emitido por la placa base al encender, ¿cuál suele ser la causa principal?', options: ['Problema en la tarjeta gráfica', 'Fallo en la memoria RAM o fuente de alimentación', 'Disco duro no conectado', 'Procesador sobrecalentado'], correctAnswerIndex: 1 },
    { id: 'm1-q4', question: '¿Qué comando de PowerShell te permite obtener información detallada sobre la placa base (Motherboard)?', options: ['Get-WmiObject win32_baseboard', 'systeminfo /board', 'chkboard /scan', 'wmic cpu get name'], correctAnswerIndex: 0 },
    { id: 'm1-q5', question: '¿Qué temperatura se considera crítica y peligrosa para un procesador moderno en estado de reposo (Idle)?', options: ['30°C - 40°C', '45°C - 55°C', 'Superior a 80°C', '20°C - 25°C'], correctAnswerIndex: 2 },
    { id: 'm1-q6', question: '¿Cuál de los siguientes NO es un componente que requiera revisión en un mantenimiento preventivo de rutina?', options: ['Pasta térmica', 'Ventiladores (Coolers)', 'Actualización del microcódigo en chip ROM de la GPU', 'Limpieza de contactos de la RAM'], correctAnswerIndex: 2 },
    { id: 'm1-q7', question: '¿Qué significa cuando el sistema operativo reporta un error "Kernel Power 41" en el Visor de Eventos?', options: ['El equipo se apagó inesperadamente o perdió energía eléctrica', 'El disco duro se quedó sin espacio', 'Un controlador de video falló', 'La licencia de Windows expiró'], correctAnswerIndex: 0 }
  ],
  'modulo-2': [
    { id: 'm2-q1', question: '¿Para qué se utiliza comúnmente el comando "chkdsk /f /r"?', options: ['Para liberar espacio en el disco C:', 'Para comprobar errores lógicos y reparar sectores defectuosos en el disco', 'Para formatear el disco duro a bajo nivel', 'Para cifrar la información del disco'], correctAnswerIndex: 1 },
    { id: 'm2-q2', question: '¿Qué tecnología monitorea constantemente el estado físico del disco duro y advierte sobre fallos inminentes?', options: ['TRIM', 'S.M.A.R.T.', 'RAID', 'AHCI'], correctAnswerIndex: 1 },
    { id: 'm2-q3', question: 'Si un disco SSD se vuelve lento, ¿qué comando ayuda a notificar al disco qué bloques de datos ya no se están usando?', options: ['defrag /C', 'sfc /scannow', 'Optimize-Volume -DriveLetter C -ReTrim', 'chkdsk /x'], correctAnswerIndex: 2 },
    { id: 'm2-q4', question: 'Al instalar un disco NVMe M.2, ¿qué bus de la placa base utiliza para alcanzar altas velocidades?', options: ['SATA III', 'PCIe (PCI Express)', 'USB 3.2', 'AGP'], correctAnswerIndex: 1 },
    { id: 'm2-q5', question: '¿Cuál es el síntoma clásico de un disco duro mecánico (HDD) que está sufriendo un "Head Crash"?', options: ['Ruido de chasquidos metálicos o clics repetitivos', 'Luz LED apagada permanentemente', 'Aumento en los FPS de los juegos', 'Pantalla estática al apagar el PC'], correctAnswerIndex: 0 },
    { id: 'm2-q6', question: '¿Qué tipo de partición es requerida obligatoriamente para instalar Windows 11 y aprovechar UEFI?', options: ['MBR', 'FAT32', 'ext4', 'GPT'], correctAnswerIndex: 3 },
    { id: 'm2-q7', question: 'En un entorno de servidores, ¿qué nivel de RAID proporciona redundancia espejo (escribiendo exactamente lo mismo en dos discos)?', options: ['RAID 0', 'RAID 1', 'RAID 5', 'JBOD'], correctAnswerIndex: 1 }
  ],
  'modulo-3': [
    { id: 'm3-q1', question: '¿Qué comando de DISM se usa para restaurar la salud de la imagen de Windows descargando archivos desde Windows Update?', options: ['DISM /Online /Cleanup-Image /RestoreHealth', 'DISM /Offline /Repair', 'DISM /Image /Scan', 'DISM /Restore /Force'], correctAnswerIndex: 0 },
    { id: 'm3-q2', question: 'Si Windows no puede arrancar debido a un registro de arranque dañado, ¿qué comandos se usan en CMD desde WinRE?', options: ['sfc /scannow', 'bootrec /fixmbr y bootrec /fixboot', 'diskpart /clean', 'chkdsk C: /f'], correctAnswerIndex: 1 },
    { id: 'm3-q3', question: '¿Cuál es el propósito del archivo de paginación (pagefile.sys)?', options: ['Almacenar contraseñas del sistema', 'Actuar como memoria RAM virtual cuando la RAM física se llena', 'Guardar la caché del navegador web', 'Es el núcleo de Windows'], correctAnswerIndex: 1 },
    { id: 'm3-q4', question: '¿Cómo puedes detener un servicio colgado en Windows mediante comandos si "taskkill" no funciona?', options: ['Usando el comando "net stop [nombre_servicio]"', 'Borrando el archivo .exe', 'Reiniciando el router', 'Ocultando el proceso en taskmgr'], correctAnswerIndex: 0 },
    { id: 'm3-q5', question: '¿Qué extensión suelen tener los archivos de volcado de memoria generados tras un BSOD?', options: ['.log', '.txt', '.dmp', '.sys'], correctAnswerIndex: 2 },
    { id: 'm3-q6', question: 'Al modificar el Registro de Windows (regedit), ¿qué se recomienda hacer ANTES de cualquier cambio?', options: ['Desconectar internet', 'Crear un punto de restauración o exportar la rama del registro', 'Borrar la carpeta System32', 'Apagar el antivirus'], correctAnswerIndex: 1 },
    { id: 'm3-q7', question: '¿Cuál de los siguientes NO es un estado de energía estándar en Windows?', options: ['Sleep (S3)', 'Hibernate (S4)', 'Hyper-Sleep (S5)', 'Soft Off (S5)'], correctAnswerIndex: 2 }
  ],
  'modulo-4': [
    { id: 'm4-q1', question: '¿Cuál es el comando rápido para abrir el Administrador de Tareas sin usar el ratón?', options: ['Ctrl + Alt + Supr', 'Ctrl + Shift + Esc', 'Windows + R', 'Alt + F4'], correctAnswerIndex: 1 },
    { id: 'm4-q2', question: 'Para gestionar qué programas se inician con Windows, ¿qué herramienta o pestaña se debe utilizar en Windows 10/11?', options: ['Pestaña "Inicio" en el Administrador de tareas', 'msconfig', 'services.msc', 'Panel de Control'], correctAnswerIndex: 0 },
    { id: 'm4-q3', question: '¿Qué comando te permite ver todas las conexiones de red activas y los puertos abiertos en tu equipo?', options: ['ipconfig /all', 'ping local', 'netstat -an', 'tracert google.com'], correctAnswerIndex: 2 },
    { id: 'm4-q4', question: 'Si la resolución de nombres DNS falla localmente en un PC, ¿qué comando limpiará la caché DNS?', options: ['ipconfig /release', 'ipconfig /flushdns', 'netsh winsock reset', 'nslookup'], correctAnswerIndex: 1 },
    { id: 'm4-q5', question: '¿Qué herramienta nativa permite programar que un script de mantenimiento se ejecute cada lunes a las 8 AM?', options: ['Programador de tareas (Task Scheduler)', 'Visor de eventos', 'Monitor de confiabilidad', 'Windows PowerShell'], correctAnswerIndex: 0 },
    { id: 'm4-q6', question: '¿Qué comando restablece toda la pila de red TCP/IP a su estado predeterminado de fábrica?', options: ['netsh int ip reset', 'ipconfig /renew', 'ping 127.0.0.1', 'route print'], correctAnswerIndex: 0 },
    { id: 'm4-q7', question: '¿Cuál es la función del comando "gpedit.msc"?', options: ['Abrir el gestor de particiones', 'Abrir el Editor de Directivas de Grupo Local', 'Actualizar drivers gráficos', 'Editar las variables de entorno'], correctAnswerIndex: 1 }
  ],
  'modulo-5': [
    { id: 'm5-q1', question: '¿Qué hace la herramienta MSRT (Malicious Software Removal Tool) de Windows?', options: ['Es un antivirus permanente', 'Escanea y elimina software malintencionado específico y prevalente', 'Limpia archivos temporales de internet', 'Cifra el disco duro contra ransomware'], correctAnswerIndex: 1 },
    { id: 'm5-q2', question: 'Si necesitas entrar al modo seguro en Windows 11 desde el escritorio, ¿cuál es el atajo más rápido?', options: ['Presionar F8 al reiniciar', 'Mantener pulsado Shift mientras haces clic en "Reiniciar"', 'Desconectar el cable de red', 'Ejecutar "safe mode" en CMD'], correctAnswerIndex: 1 },
    { id: 'm5-q3', question: '¿Qué comando se utiliza para verificar la integridad de las firmas de los drivers instalados?', options: ['driverquery', 'sigverif', 'dxdiag', 'msinfo32'], correctAnswerIndex: 1 },
    { id: 'm5-q4', question: 'En un diagnóstico de red, ¿qué indica si el comando "ping 127.0.0.1" responde exitosamente?', options: ['Que hay internet', 'Que la pila TCP/IP local está funcionando correctamente', 'Que el router está configurado', 'Que el servidor DNS de Google está activo'], correctAnswerIndex: 1 },
    { id: 'm5-q5', question: '¿Qué utilidad avanzada de Sysinternals (Microsoft) es superior al Administrador de Tareas para monitoreo de procesos?', options: ['Process Explorer', 'Autoruns', 'TCPView', 'Regmon'], correctAnswerIndex: 0 },
    { id: 'm5-q6', question: '¿Qué archivo de configuración de inicio de Windows reemplazó al antiguo boot.ini?', options: ['ntldr', 'BCD (Boot Configuration Data)', 'winload.exe', 'autoexec.bat'], correctAnswerIndex: 1 },
    { id: 'm5-q7', question: 'Al ejecutar "cleanmgr", ¿qué estás iniciando?', options: ['El liberador de espacio en disco de Windows', 'Un limpiador de registro de terceros', 'La consola de administración', 'El gestor de limpieza de memoria RAM'], correctAnswerIndex: 0 }
  ],
  'modulo-6': [
    { id: 'm6-q1', question: 'Para exportar un reporte completo del hardware y software de la máquina en formato texto, se usa:', options: ['systeminfo > reporte.txt', 'dxdiag /export', 'msconfig -txt', 'Get-ComputerInfo'], correctAnswerIndex: 0 },
    { id: 'm6-q2', question: '¿Qué servicio de Windows es responsable de administrar las instantáneas de volumen para puntos de restauración?', options: ['Windows Update', 'VSS (Volume Shadow Copy Service)', 'Spooler de impresión', 'SuperFetch (SysMain)'], correctAnswerIndex: 1 },
    { id: 'm6-q3', question: '¿Qué comando en PowerShell lista todos los servicios detenidos?', options: ['Get-Service | Where-Object Status -eq Stopped', 'Get-Process -Stopped', 'net stop all', 'List-Services -Off'], correctAnswerIndex: 0 },
    { id: 'm6-q4', question: 'Si la cola de impresión se atasca, ¿cuál es el nombre del servicio que debes reiniciar?', options: ['PrintSpool', 'Spooler (Cola de impresión)', 'PrinterMgr', 'winprint'], correctAnswerIndex: 1 },
    { id: 'm6-q5', question: '¿Cuál es el atajo de teclado para acceder al menú de usuario avanzado (Power User Menu) en Windows 10/11?', options: ['Windows + X', 'Windows + I', 'Ctrl + Alt + Menu', 'Alt + Tab'], correctAnswerIndex: 0 },
    { id: 'm6-q6', question: 'El comando "sfc /verifyonly" realiza lo siguiente:', options: ['Repara los archivos dañados silenciosamente', 'Solo escanea y verifica sin hacer ninguna reparación', 'Verifica el disco duro en busca de sectores malos', 'Verifica la firma del antivirus'], correctAnswerIndex: 1 },
    { id: 'm6-q7', question: '¿Para qué sirve el comando "dxdiag"?', options: ['Herramienta de Diagnóstico de DirectX (Video, Audio, Sistema)', 'Desfragmentador de disco avanzado', 'Borrar temporales de diagnóstico', 'Monitor de red'], correctAnswerIndex: 0 }
  ],
  'modulo-7': [
    { id: 'm7-q1', question: '¿Qué utilidad de Windows recopila un registro histórico de caídas de aplicaciones y el estado de salud del sistema en una gráfica de 1 a 10?', options: ['Visor de Eventos', 'Monitor de Confiabilidad (Reliability Monitor)', 'Monitor de Recursos', 'Administrador de Tareas'], correctAnswerIndex: 1 },
    { id: 'm7-q2', question: 'Al ejecutar "perfmon /report", ¿qué genera Windows?', options: ['Un error de sintaxis', 'Un informe exhaustivo de 60 segundos sobre el estado del sistema y cuellos de botella', 'Un reseteo del rendimiento gráfico', 'Un volcado de memoria BSOD'], correctAnswerIndex: 1 },
    { id: 'm7-q3', question: '¿Cuál es la función del proceso "explorer.exe"?', options: ['Navegar por internet usando Edge', 'Proveer la interfaz gráfica de usuario (Escritorio, barra de tareas, explorador de archivos)', 'Procesar los cálculos matemáticos del kernel', 'Gestionar las actualizaciones de Windows'], correctAnswerIndex: 1 },
    { id: 'm7-q4', question: 'Si necesitas forzar el cierre de una aplicación rebelde usando su ID de proceso (PID) 1234, usas:', options: ['taskkill /PID 1234 /F', 'kill -9 1234', 'stop-process 1234', 'close /P 1234'], correctAnswerIndex: 0 },
    { id: 'm7-q5', question: '¿Qué componente del sistema operativo actúa como intermediario entre el Hardware y el Software de usuario?', options: ['La BIOS', 'El Kernel (Núcleo)', 'El compilador', 'El gestor de arranque (Bootloader)'], correctAnswerIndex: 1 },
    { id: 'm7-q6', question: 'El servicio "SysMain" (anteriormente SuperFetch) tiene como objetivo:', options: ['Analizar el tráfico de red en busca de virus', 'Pre-cargar aplicaciones de uso frecuente en la RAM para que abran más rápido', 'Gestionar las actualizaciones de drivers gráficos', 'Sincronizar el reloj del sistema con internet'], correctAnswerIndex: 1 },
    { id: 'm7-q7', question: '¿Qué protocolo de red se utiliza principalmente para asignar direcciones IP de forma automática en una red local?', options: ['DNS', 'FTP', 'DHCP', 'HTTP'], correctAnswerIndex: 2 }
  ],
  'modulo-8': [
    { id: 'm8-q1', question: 'Para borrar recursivamente una carpeta y su contenido sin pedir confirmación usando CMD, se emplea:', options: ['rmdir /s /q [carpeta]', 'del -r -f [carpeta]', 'erase [carpeta]', 'remove-all [carpeta]'], correctAnswerIndex: 0 },
    { id: 'm8-q2', question: '¿Qué variable de entorno de Windows te lleva directamente a la carpeta de archivos temporales del usuario actual?', options: ['%SYSTEMROOT%', '%TEMP%', '%USERPROFILE%', '%APPDATA%'], correctAnswerIndex: 1 },
    { id: 'm8-q3', question: '¿Qué comando en CMD muestra los permisos ACL (Lista de Control de Acceso) de un archivo o directorio?', options: ['cacls o icacls', 'chmod', 'attrib', 'takeown'], correctAnswerIndex: 0 },
    { id: 'm8-q4', question: 'Si un archivo no se puede borrar porque dice estar "siendo usado por otro programa", ¿qué debes investigar?', options: ['Los handles (identificadores) abiertos asociados a ese archivo', 'El nivel de tinta de la impresora', 'La temperatura del disco', 'El historial del navegador'], correctAnswerIndex: 0 },
    { id: 'm8-q5', question: '¿Cómo se llama la tecnología de virtualización nativa integrada en las versiones Pro y Enterprise de Windows 10/11?', options: ['VirtualBox', 'Hyper-V', 'VMware', 'WSL'], correctAnswerIndex: 1 },
    { id: 'm8-q6', question: '¿Qué característica de Windows permite ejecutar un subsistema de Linux (como Ubuntu) nativamente sin máquina virtual tradicional?', options: ['WSA', 'WSL (Windows Subsystem for Linux)', 'Cygwin', 'MinGW'], correctAnswerIndex: 1 },
    { id: 'm8-q7', question: '¿Para qué sirve el comando "powercfg /batteryreport" en una laptop?', options: ['Para apagar la batería', 'Para calibrar la batería automáticamente', 'Para generar un informe HTML con el estado de salud, desgaste y capacidad de la batería', 'Para cargar la batería más rápido'], correctAnswerIndex: 2 }
  ],
  'modulo-9': [
    { id: 'm9-q1', question: 'En un entorno empresarial, ¿qué herramienta de Microsoft se usa para desplegar imágenes de sistema operativo y software a través de la red?', options: ['SCCM / MECM', 'Windows Store', 'TeamViewer', 'OneDrive'], correctAnswerIndex: 0 },
    { id: 'm9-q2', question: '¿Qué utilidad de línea de comandos de Sysinternals permite ejecutar un proceso como usuario System (NT AUTHORITY\\SYSTEM)?', options: ['PsExec', 'PsKill', 'RunAs', 'Sudo'], correctAnswerIndex: 0 },
    { id: 'm9-q3', question: '¿Qué es el "Patch Management" en mantenimiento IT?', options: ['Poner parches térmicos en el procesador', 'El proceso de distribuir y aplicar actualizaciones de seguridad al software', 'La reparación de cables de red cortados', 'El diseño de logos para la empresa'], correctAnswerIndex: 1 },
    { id: 'm9-q4', question: 'Si la pantalla está en negro y solo ves el cursor del ratón, presionar Ctrl+Shift+Esc e iniciar una "Nueva Tarea" escribiendo ___ puede revivir el entorno gráfico:', options: ['cmd.exe', 'explorer.exe', 'reboot', 'wininit'], correctAnswerIndex: 1 },
    { id: 'm9-q5', question: '¿Qué puerto TCP utiliza tradicionalmente el protocolo RDP (Escritorio Remoto de Windows)?', options: ['Puerto 80', 'Puerto 443', 'Puerto 3389', 'Puerto 22'], correctAnswerIndex: 2 },
    { id: 'm9-q6', question: '¿Qué comando muestra la tabla de enrutamiento del equipo local?', options: ['route print', 'ping router', 'nslookup', 'arp -a'], correctAnswerIndex: 0 },
    { id: 'm9-q7', question: 'Para recuperar la propiedad de un archivo bloqueado por un usuario eliminado, se usa:', options: ['takeown /f [archivo]', 'attrib -h [archivo]', 'del /f [archivo]', 'unlock [archivo]'], correctAnswerIndex: 0 }
  ],
  'modulo-10': [
    { id: 'm10-q1', question: '¿Qué es un script .bat (Batch file)?', options: ['Un virus escrito en ensamblador', 'Un archivo de texto que contiene una secuencia de comandos para ser ejecutados por CMD', 'Un ejecutable binario de 64 bits', 'Un archivo de configuración de red'], correctAnswerIndex: 1 },
    { id: 'm10-q2', question: 'En PowerShell, ¿qué política de ejecución (Execution Policy) debes configurar para permitir correr scripts locales no firmados de forma segura?', options: ['Restricted', 'AllSigned', 'RemoteSigned', 'Bypass'], correctAnswerIndex: 2 },
    { id: 'm10-q3', question: '¿Qué comando de PowerShell sirve para descargar un archivo desde internet (equivalente a wget o curl)?', options: ['Download-File', 'Invoke-WebRequest', 'Get-Internet', 'Fetch-Url'], correctAnswerIndex: 1 },
    { id: 'm10-q4', question: '¿Cuál es el beneficio de crear un "Disco de Recuperación" (Recovery Drive) USB en Windows?', options: ['Acelera el sistema al conectar el USB', 'Proporciona un entorno WinRE para reparar el PC si Windows no arranca', 'Expande la memoria RAM del equipo (ReadyBoost)', 'Sirve para jugar juegos en modo portátil'], correctAnswerIndex: 1 },
    { id: 'm10-q5', question: '¿Cómo puedes buscar recursivamente dentro del contenido de múltiples archivos de texto usando CMD?', options: ['findstr /s "palabra" *.txt', 'search /all "palabra"', 'grep *.txt', 'locate "palabra"'], correctAnswerIndex: 0 },
    { id: 'm10-q6', question: '¿Qué característica de seguridad nativa de Windows 11 requiere hardware TPM 2.0 y Secure Boot?', options: ['BitLocker', 'Virtualization-based Security (VBS) y Core Isolation', 'Windows Defender Firewall', 'SmartScreen'], correctAnswerIndex: 1 },
    { id: 'm10-q7', question: 'Al finalizar un mantenimiento profundo, ¿qué comando reinicia el equipo sin retraso de inmediato?', options: ['shutdown /s', 'shutdown /r /t 0', 'reboot now', 'logoff /f'], correctAnswerIndex: 1 }
  ]
};
