// =========================================================
// S1-S15: Funciones de Módulos Anteriores (Abreviadas por espacio)
// =========================================================

function showQuiz() { alert("Repaso: La función principal de un Router es dirigir el tráfico entre redes distintas usando la IP."); }
function checkPktTask() { alert(confirm("¿Lograste conectar los PCs?") ? "¡Bien! Cable cruzado o Auto-MDIX." : "Repasa el cableado."); }
function openMacTool() { alert("Comando para MAC: 'ipconfig /all' o 'ifconfig'."); }
function cableColorQuiz() { alert("T568B: Blanco/Naranja, Naranja, Blanco/Verde. ¡Es la clave!"); }
function pduQuiz() { alert(prompt("PDU Capa 3 (Red)?").toLowerCase().includes("paquete") ? "¡Correcto! Paquete." : "Incorrecto. Es PAQUETE."); }
function encapsulationPktCheck() { alert(confirm("¿Viste los encabezados?") ? "¡Genial! IP para Router, MAC para Switch." : "Activa el Modo Simulación."); }
function ipconfigCheck() { alert("Identificaste: IP, Máscara, Gateway. ¡Elementos clave!"); }
function maskQuiz() { alert(prompt("CIDR /16?").includes("255.255.0.0") ? "¡Correcto! 255.255.0.0." : "Incorrecto. Repasa /16."); }
function portQuiz() { alert("Puertos: HTTPS 443 (TCP), FTP 21 (TCP), DNS 53 (UDP)."); }
function binaryQuiz() { alert(prompt("192 en binario?").includes("11000000") ? "¡Correcto! 11000000." : "Incorrecto. 11000000."); }
function dnsLookupTool() { const domain = prompt("Dominio para NSLOOKUP:"); alert(`Simulando: ${domain} resuelve a una IP.`); }
function checkSubnettingSolution() { alert(prompt("Red de la 3era subred /26?").includes("192.168.10.128") ? "¡Correcto! 192.168.10.128." : "Incorrecto. El salto es de 64."); }
function topologyQuiz() { alert(prompt("Topología que falla si el centro cae?").toLowerCase().includes("estrella") ? "¡Correcto! Estrella." : "Incorrecto. Es Estrella."); }
function tracerouteDemo() { alert("Tracert muestra cada salto (router). Falla local = primer salto. Falla externa = saltos intermedios."); }
function scannerDemo() { alert("Advanced IP Scanner / Zenmap: Mapean y escanean puertos. ¡Muy útiles!"); }
function startFinalExam() { alert("Preparación lista. ¡A la evaluación!"); }
function netSetManCheck() { alert("NetSetMan es un gran aliado. Estática para servidores, Dinámica para clientes."); }
function routerConfigCheck() { alert(prompt("IP Gateway?").includes("192.168.1.") ? "¡Muy bien! Típica de Gateway." : "Busca la IP correcta."); }
function dhcpPoolQuiz() { alert(prompt("¿IPs Estáticas Excluidas?").toLowerCase().includes("servidores") ? "¡Correcto! Servidores e Impresoras." : "Incorrecto. Servidores e Impresoras."); }
function cableCheckBtn() { alert(prompt("Cable PC a PC?").toLowerCase().includes("cruzado") ? "¡Correcto! Cruzado." : "Incorrecto. Cruzado."); }
function switchPktCheck() { alert(confirm("¿Notaste que el Switch inundó la trama solo la primera vez?") ? "¡Excelente! El Switch aprende la MAC." : "Recuerda el proceso de Aprendizaje."); }
function wirelessNetViewCheck() { alert(prompt("¿Mayor VELOCIDAD? (2.4 GHz / 5 GHz)").includes("5") ? "¡Correcto! 5 GHz." : "Incorrecto. 5 GHz es más rápido."); }
function ipScannerDemo() { alert("Simulación de Escaneo lista. ¡Identifica intrusos!"); }
function documentationCheck() { alert("¡Gran trabajo! Físico=Cables, Lógico=IPs."); }
function pingDiagnosis() { alert(prompt("Falla ping Gateway, problema en...?").toLowerCase().includes("cable") ? "¡Correcto! Cable/Switch/Router." : "Incorrecto. Cable/Switch/Router."); }
function troubleshootQuiz() { alert(prompt("Ping IP OK, Ping Nombre FAIL, problema en...?").toLowerCase().includes("dns") ? "¡Correcto! DNS." : "Incorrecto. DNS."); }
function firewallQuiz() { alert(prompt("Software que filtra tráfico?").toLowerCase().includes("firewall") ? "¡Correcto! Firewall." : "Incorrecto. Firewall."); }
function firmwareCheck() { alert(confirm("¿Precaución de Firmware?") ? "¡Excelente! Usar cable Ethernet." : "Pista: ¡Usar cable Ethernet!"); }
function remoteAccessQuiz() { alert(prompt("Protocolo de Escritorio Remoto Windows?").toLowerCase().includes("rdp") ? "¡Correcto! RDP." : "Incorrecto. RDP."); }
function latencyQuiz() { alert(prompt("Capacidad MÁXIMA de datos (Mbps)?").toLowerCase().includes("ancho") ? "¡Correcto! Ancho de Banda." : "Incorrecto. Ancho de Banda."); }
function lanProjectCheck() { alert("Proyecto LAN completado. Estático para Servidor, DHCP para clientes. ¡Excelente!"); }
function module2Exam() { alert("Módulo 2 completado. ¡Prepárate para el Módulo 3!"); }
function natPortQuiz() { alert(prompt("Puerto HTTPS?").includes("443") ? "¡Correcto! 443." : "Incorrecto. 443."); }
function staticRoutingQuiz() { alert(prompt("IP Ruta por Defecto?").includes("0.0.0.0") ? "¡Correcto! 0.0.0.0 0.0.0.0." : "Incorrecto. 0.0.0.0 0.0.0.0."); }
function vlanQuiz() { alert(prompt("Puerto de MÚLTIPLES VLANs?").toLowerCase().includes("troncal") ? "¡Correcto! Troncal." : "Incorrecto. Troncal."); }
function routingProjectCheck() { alert("Proyecto de Routing completado. NAT, DHCP, Rutas Estáticas dominadas."); }
function securityQuiz() { alert(prompt("Estándar más seguro que WPA2?").toLowerCase().includes("wpa3") ? "¡Correcto! WPA3." : "Incorrecto. WPA3."); }
function vpnProtocolQuiz() { alert(prompt("Protocolo VPN de código abierto?").toLowerCase().includes("openvpn") ? "¡Correcto! OpenVPN." : "Incorrecto. OpenVPN."); }
function sshPuttyCheck() { alert(prompt("Puerto SSH?").includes("22") ? "¡Correcto! 22." : "Incorrecto. 22."); }
function securityProjectCheck() { alert("Proyecto de Seguridad completado. SSH y WPA dominados."); }
function linuxSetupCheck() { alert("Entorno Linux listo. 'cd' y 'ls' son la base."); }
function linuxNetworkCheck() { alert(prompt("Comando IP moderno Linux?").toLowerCase().includes("ipa") ? "¡Correcto! ip a." : "Incorrecto. ip a."); }
function monitoringQuiz() { alert(prompt("Protocolo métricas Routers?").toLowerCase().includes("snmp") ? "¡Correcto! SNMP." : "Incorrecto. SNMP."); }
function monitoringProjectCheck() { alert("Proyecto Servidores y Monitorización completado."); }
function backupQuiz() { alert(prompt("Comando para guardar config?").toLowerCase().includes("copyrunningconfigstartupconfig") ? "¡Correcto! copy running-config startup-config." : "Incorrecto. copy running-config startup-config."); }
function zenmapScan() { alert(prompt("Puerto bloqueado por Firewall?").toLowerCase().includes("filtrado") ? "¡Correcto! Filtrado." : "Incorrecto. Filtrado."); }
function advancedTroubleshoot() { alert(prompt("Falla Traceroute entre redes, verificar...?").toLowerCase().includes("rutaestatica") ? "¡Correcto! Ruta Estática." : "Incorrecto. Ruta Estática."); }
function module3Exam() { alert("Módulo 3 completado. ¡Prepárate para el Proyecto Final!"); }
function projectStartCheck() { alert("¡Proyecto en marcha! La planificación es el 80% del éxito."); }
function ipSchemeCheck() { alert(prompt("Gateway Router?").includes("192.168.10.1") ? "¡Correcto! 192.168.10.1." : "Incorrecto. 192.168.10.1."); }
function staticIPCheck() { alert(confirm("¿Verificaste Ping Servidor-Impresora?") ? "¡Fase I OK! Núcleo estático funcionando." : "¡Verifica IPs y cableado!"); }
function projectEndWeek13Btn() { alert("¡Fase II OK! DHCP y SSH asegurados. ¡A la fase de diagnóstico!"); }
function logicalDiagramCheck() { alert("¡Diagrama Lógico Listo! Ya tienes el mapa abstracto de tu red PyME."); }
function configTableCheck() { alert("¡Documentación Escrita Finalizada! Esto es trabajo profesional."); }
function troubleshootingCheck() { alert(prompt("IP sin DHCP?").toLowerCase().includes("169.254") ? "¡Correcto! APIPA 169.254.x.x." : "Incorrecto. APIPA."); }
function securityTroubleshootingCheck() { alert(prompt("Puerto falla SSH?").includes("22") ? "¡Correcto! Puerto 22." : "Incorrecto. Puerto 22."); }
function ethicsQuiz() { alert(prompt("Dilema ético A, B o C?").toLowerCase().includes("c") ? "¡Correcto! C: Informar del riesgo." : "Incorrecto. C: Informar del riesgo."); }
function careerPlanCheck() { alert("¡Plan de Carrera Listo! A por las certificaciones."); }
function projectPresent1Check() { alert("¡Presentación Iniciada! ¡Éxito!"); }
function projectPresent2Check() { alert("¡Presentaciones Finalizadas! Solo queda el repaso final."); }

// =========================================================
// S16 E61: Funciones de la Sesión 61
// =========================================================
function reviewQuiz() {
    let message = "Respuestas Autoevaluación:\n";
    message += "1. Capas OSI: Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación.\n";
    message += "2. Ping al Gateway: 'ping [IP del Router]' (ej. ping 192.168.1.1).\n";
    message += "3. SSH vs Telnet: SSH es seguro (cifrado), Telnet es inseguro (texto plano).\n";
    message += "4. Filtrado MAC: Controlar qué dispositivos pueden conectarse a la red (Lista Blanca).\n";
    alert(message);
}

// =========================================================
// S16 E62: Funciones de la Sesión 62
// =========================================================
function startFinalTheoreticalExam() {
    alert("Iniciando Examen Teórico. Concentración máxima. ¡Demuestra tu dominio de los 4 módulos!");
    // En una implementación real, aquí se cargaría el formulario del examen.
}

// =========================================================
// S16 E63: Funciones de la Sesión 63
// =========================================================
function startFinalPracticalExam() {
    alert("Iniciando Examen Práctico. Analiza el escenario roto, aísla la falla (Capa 1, 2 o 3) y corrige. ¡Tu habilidad de Troubleshooting está a prueba!");
    // Aquí se entregaría el archivo .pkt con las fallas.
}

// =========================================================
// S16 E64: Funciones de la Sesión 64
// =========================================================
function courseClosure() {
    alert("¡FIN DEL CURSO! Has completado con éxito 16 semanas de formación en redes de computadoras. ¡Felicidades, técnico!");
}


// =========================================================
// FUNCIONES GLOBALES - Aplicables a todas las sesiones futuras
// =========================================================

/**
 * Función para actualizar dinámicamente el pie de página
 * con la información de la sesión actual (S# E#).
 */
function updateFooter() {
    const title = document.title; 
    let sessionInfo = "S# E#";

    if (title.includes("S1 E1")) { sessionInfo = "S1 E1"; } else if (title.includes("S1 E2")) { sessionInfo = "S1 E2"; } 
    else if (title.includes("S1 E3")) { sessionInfo = "S1 E3"; } else if (title.includes("S1 E4")) { sessionInfo = "S1 E4"; } 
    else if (title.includes("S2 E5")) { sessionInfo = "S2 E5"; } else if (title.includes("S2 E6")) { sessionInfo = "S2 E6"; } 
    else if (title.includes("S2 E7")) { sessionInfo = "S2 E7"; } else if (title.includes("S2 E8")) { sessionInfo = "S2 E8"; }
    else if (title.includes("S3 E9")) { sessionInfo = "S3 E9"; } else if (title.includes("S3 E10")) { sessionInfo = "S3 E10"; } 
    else if (title.includes("S3 E11")) { sessionInfo = "S3 E11"; } else if (title.includes("S3 E12")) { sessionInfo = "S3 E12"; } 
    else if (title.includes("S4 E13")) { sessionInfo = "S4 E13"; } else if (title.includes("S4 E14")) { sessionInfo = "S4 E14"; } 
    else if (title.includes("S4 E15")) { sessionInfo = "S4 E15"; } else if (title.includes("S4 E16")) { sessionInfo = "S4 E16"; } 
    else if (title.includes("S5 E17")) { sessionInfo = "S5 E17"; } else if (title.includes("S5 E18")) { sessionInfo = "S5 E18"; } 
    else if (title.includes("S5 E19")) { sessionInfo = "S5 E19"; } else if (title.includes("S5 E20")) { sessionInfo = "S5 E20"; }
    else if (title.includes("S6 E21")) { sessionInfo = "S6 E21"; } else if (title.includes("S6 E22")) { sessionInfo = "S6 E22"; } 
    else if (title.includes("S6 E23")) { sessionInfo = "S6 E23"; } else if (title.includes("S6 E24")) { sessionInfo = "S6 E24"; }
    else if (title.includes("S7 E25")) { sessionInfo = "S7 E25"; } else if (title.includes("S7 E26")) { sessionInfo = "S7 E26"; } 
    else if (title.includes("S7 E27")) { sessionInfo = "S7 E27"; } else if (title.includes("S7 E28")) { sessionInfo = "S7 E28"; }
    else if (title.includes("S8 E29")) { sessionInfo = "S8 E29"; } else if (title.includes("S8 E30")) { sessionInfo = "S8 E30"; } 
    else if (title.includes("S8 E31")) { sessionInfo = "S8 E31"; } else if (title.includes("S8 E32")) { sessionInfo = "S8 E32"; }
    else if (title.includes("S9 E33")) { sessionInfo = "S9 E33"; } else if (title.includes("S9 E34")) { sessionInfo = "S9 E34"; } 
    else if (title.includes("S9 E35")) { sessionInfo = "S9 E35"; } else if (title.includes("S9 E36")) { sessionInfo = "S9 E36"; }
    else if (title.includes("S10 E37")) { sessionInfo = "S10 E37"; } else if (title.includes("S10 E38")) { sessionInfo = "S10 E38"; } 
    else if (title.includes("S10 E39")) { sessionInfo = "S10 E39"; } else if (title.includes("S10 E40")) { sessionInfo = "S10 E40"; }
    else if (title.includes("S11 E41")) { sessionInfo = "S11 E41"; } else if (title.includes("S11 E42")) { sessionInfo = "S11 E42"; } 
    else if (title.includes("S11 E43")) { sessionInfo = "S11 E43"; } else if (title.includes("S11 E44")) { sessionInfo = "S11 E44"; }
    else if (title.includes("S12 E45")) { sessionInfo = "S12 E45"; } else if (title.includes("S12 E46")) { sessionInfo = "S12 E46"; } 
    else if (title.includes("S12 E47")) { sessionInfo = "S12 E47"; } else if (title.includes("S12 E48")) { sessionInfo = "S12 E48"; }
    else if (title.includes("S13 E49")) { sessionInfo = "S13 E49"; } else if (title.includes("S13 E50")) { sessionInfo = "S13 E50"; } 
    else if (title.includes("S13 E51")) { sessionInfo = "S13 E51"; } else if (title.includes("S13 E52")) { sessionInfo = "S13 E52"; }
    else if (title.includes("S14 E53")) { sessionInfo = "S14 E53"; } else if (title.includes("S14 E54")) { sessionInfo = "S14 E54"; } 
    else if (title.includes("S14 E55")) { sessionInfo = "S14 E55"; } else if (title.includes("S14 E56")) { sessionInfo = "S14 E56"; }
    else if (title.includes("S15 E57")) { sessionInfo = "S15 E57"; } else if (title.includes("S15 E58")) { sessionInfo = "S15 E58"; } 
    else if (title.includes("S15 E59")) { sessionInfo = "S15 E59"; } else if (title.includes("S15 E60")) { sessionInfo = "S15 E60"; }
    else if (title.includes("S16 E61")) { sessionInfo = "S16 E61"; } else if (title.includes("S16 E62")) { sessionInfo = "S16 E62"; } 
    else if (title.includes("S16 E63")) { sessionInfo = "S16 E63"; } else if (title.includes("S16 E64")) { sessionInfo = "S16 E64"; }


    const footerSpan = document.getElementById('footer-info');
    if (footerSpan) {
        footerSpan.textContent = sessionInfo;
    }
}

// Ejecutar funciones al cargar la página y asignar eventos
document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    
    // Asignación de eventos a todos los botones por ID (para evitar repetición)
    document.getElementById('alertButton')?.addEventListener('click', showQuiz);
    document.getElementById('checkPktBtn')?.addEventListener('click', checkPktTask);
    document.getElementById('findMacBtn')?.addEventListener('click', openMacTool);
    document.getElementById('cableQuizBtn')?.addEventListener('click', cableColorQuiz);
    document.getElementById('pduQuizBtn')?.addEventListener('click', pduQuiz);
    document.getElementById('encapsulationPktBtn')?.addEventListener('click', encapsulationPktCheck);
    document.getElementById('ipconfigCheckBtn')?.addEventListener('click', ipconfigCheck);
    document.getElementById('maskQuizBtn')?.addEventListener('click', maskQuiz);
    document.getElementById('portQuizBtn')?.addEventListener('click', portQuiz);
    document.getElementById('binaryQuizBtn')?.addEventListener('click', binaryQuiz);
    document.getElementById('dnsLookupBtn')?.addEventListener('click', dnsLookupTool);
    document.getElementById('subnettingQuizBtn')?.addEventListener('click', checkSubnettingSolution);
    document.getElementById('topologyQuizBtn')?.addEventListener('click', topologyQuiz);
    document.getElementById('tracerouteBtn')?.addEventListener('click', tracerouteDemo);
    document.getElementById('scannerDemoBtn')?.addEventListener('click', scannerDemo);
    document.getElementById('finalExamBtn')?.addEventListener('click', startFinalExam);
    document.getElementById('netSetManCheckBtn')?.addEventListener('click', netSetManCheck);
    document.getElementById('cableCheckBtn')?.addEventListener('click', cableQuiz);
    document.getElementById('routerConfigBtn')?.addEventListener('click', routerConfigCheck);
    document.getElementById('dhcpPoolQuizBtn')?.addEventListener('click', dhcpPoolQuiz);
    document.getElementById('switchPktCheckBtn')?.addEventListener('click', switchPktCheck);
    document.getElementById('wirelessNetViewCheckBtn')?.addEventListener('click', wirelessNetViewCheck);
    document.getElementById('ipScannerDemoBtn')?.addEventListener('click', ipScannerDemo);
    document.getElementById('documentationCheckBtn')?.addEventListener('click', documentationCheck);
    document.getElementById('pingDiagnosisBtn')?.addEventListener('click', pingDiagnosis);
    document.getElementById('troubleshootQuizBtn')?.addEventListener('click', troubleshootQuiz);
    document.getElementById('firewallQuizBtn')?.addEventListener('click', firewallQuiz);
    document.getElementById('firmwareCheckBtn')?.addEventListener('click', firmwareCheck);
    document.getElementById('remoteAccessQuizBtn')?.addEventListener('click', remoteAccessQuiz);
    document.getElementById('latencyQuizBtn')?.addEventListener('click', latencyQuiz);
    document.getElementById('lanProjectCheckBtn')?.addEventListener('click', lanProjectCheck);
    document.getElementById('module2ExamBtn')?.addEventListener('click', module2Exam);
    document.getElementById('natPortQuizBtn')?.addEventListener('click', natPortQuiz);
    document.getElementById('staticRoutingQuizBtn')?.addEventListener('click', staticRoutingQuiz);
    document.getElementById('vlanQuizBtn')?.addEventListener('click', vlanQuiz);
    document.getElementById('routingProjectCheckBtn')?.addEventListener('click', routingProjectCheck);
    document.getElementById('securityQuizBtn')?.addEventListener('click', securityQuiz);
    document.getElementById('vpnProtocolQuizBtn')?.addEventListener('click', vpnProtocolQuiz);
    document.getElementById('sshPuttyCheckBtn')?.addEventListener('click', sshPuttyCheck);
    document.getElementById('securityProjectCheckBtn')?.addEventListener('click', securityProjectCheck);
    document.getElementById('linuxSetupCheckBtn')?.addEventListener('click', linuxSetupCheck);
    document.getElementById('linuxNetworkCheckBtn')?.addEventListener('click', linuxNetworkCheck);
    document.getElementById('monitoringQuizBtn')?.addEventListener('click', monitoringQuiz);
    document.getElementById('monitoringProjectCheckBtn')?.addEventListener('click', monitoringProjectCheck);
    document.getElementById('backupQuizBtn')?.addEventListener('click', backupQuiz);
    document.getElementById('zenmapScanBtn')?.addEventListener('click', zenmapScan);
    document.getElementById('advancedTroubleshootBtn')?.addEventListener('click', advancedTroubleshoot);
    document.getElementById('module3ExamBtn')?.addEventListener('click', module3Exam);
    document.getElementById('projectStartCheckBtn')?.addEventListener('click', projectStartCheck);
    document.getElementById('ipSchemeCheckBtn')?.addEventListener('click', ipSchemeCheck);
    document.getElementById('staticIPCheckBtn')?.addEventListener('click', staticIPCheck);
    document.getElementById('projectEndWeek13Btn')?.addEventListener('click', projectEndWeek13Btn);
    document.getElementById('logicalDiagramCheckBtn')?.addEventListener('click', logicalDiagramCheck);
    document.getElementById('configTableCheckBtn')?.addEventListener('click', configTableCheck);
    document.getElementById('troubleshootingCheckBtn')?.addEventListener('click', troubleshootingCheck);
    document.getElementById('securityTroubleshootingCheckBtn')?.addEventListener('click', securityTroubleshootingCheck);
    document.getElementById('ethicsQuizBtn')?.addEventListener('click', ethicsQuiz);
    document.getElementById('careerPlanCheckBtn')?.addEventListener('click', careerPlanCheck);
    document.getElementById('projectPresent1CheckBtn')?.addEventListener('click', projectPresent1Check);
    document.getElementById('projectPresent2CheckBtn')?.addEventListener('click', projectPresent2Check);

    // S16 Buttons
    document.getElementById('reviewQuizBtn')?.addEventListener('click', reviewQuiz);
    document.getElementById('startFinalTheoreticalExamBtn')?.addEventListener('click', startFinalTheoreticalExam);
    document.getElementById('startFinalPracticalExamBtn')?.addEventListener('click', startFinalPracticalExam);
    document.getElementById('courseClosureBtn')?.addEventListener('click', courseClosure);
});