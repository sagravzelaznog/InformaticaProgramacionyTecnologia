// Funciones para el Tema 1: Introducción a Excel
function mostrarMensajeBienvenida() {
    alert("¡Bienvenido al Módulo 2 de Excel Avanzado!");
}

// Funciones para el Tema 2: Fórmulas y funciones avanzadas
function calcularPromedio() {
    const numeros = document.getElementById('numeros').value.split(',').map(Number);
    const suma = numeros.reduce((a, b) => a + b, 0);
    const promedio = suma / numeros.length;
    document.getElementById('resultado-promedio').textContent = `El promedio es: ${promedio.toFixed(2)}`;
}

// Funciones para el Tema 3: Validación de datos
function validarFormulario() {
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const telefonoValido = /^\d{10}$/.test(telefono);
    
    if (!emailValido) {
        alert('Por favor ingresa un correo electrónico válido');
        return false;
    }
    
    if (!telefonoValido) {
        alert('Por favor ingresa un número de teléfono válido (10 dígitos)');
        return false;
    }
    
    alert('Formulario enviado correctamente');
    return true;
}

// Funciones para el Tema 4: Tablas dinámicas
function actualizarTabla() {
    // Lógica para actualizar la tabla dinámica
    console.log('Tabla actualizada');
}

// Funciones para el Tema 5: Gráficos avanzados
function actualizarGrafico() {
    // Lógica para actualizar el gráfico
    console.log('Gráfico actualizado');
}

// Funciones para el Tema 6: Análisis de datos
function analizarDatos() {
    // Lógica para analizar datos
    console.log('Análisis de datos completado');
}

// Funciones para el Tema 7: Macros
function ejecutarMacro() {
    // Lógica para ejecutar macro
    console.log('Macro ejecutada');
}

// Funciones para el Tema 8: Tablas dinámicas avanzadas
function crearTablaDinamica() {
    // Lógica para crear tabla dinámica
    console.log('Tabla dinámica creada');
}

// Funciones para el Tema 9: Validación de datos avanzada
function validarDatosAvanzados() {
    // Lógica de validación avanzada
    console.log('Validación avanzada completada');
}

// Funciones para el Tema 10: Fórmulas matriciales
function calcularMatriz() {
    // Lógica para cálculos matriciales
    console.log('Cálculo matricial realizado');
}

// Funciones para el Tema 11: Análisis de escenarios
function analizarEscenario() {
    // Lógica para análisis de escenarios
    console.log('Análisis de escenario completado');
}

// Funciones para el Tema 12: Análisis de Hipótesis

// Función de error (función de error de Gauss)
function erf(x) {
    // Aproximación de la función de error con una precisión de 1e-6
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    
    // Constantes para la aproximación
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    // Aproximación de la función de error
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
}

// Función para realizar la prueba t de dos muestras
function realizarPruebaT() {
    const tabla = document.getElementById('tabla-ensenanza');
    const celdasA = tabla.rows[0].cells;
    const celdasB = tabla.rows[1].cells;
    
    // Obtener los valores de las celdas
    const muestraA = [];
    const muestraB = [];
    
    // Empezamos desde 1 para omitir la primera celda (etiqueta)
    for (let i = 1; i < celdasA.length; i++) {
        const valorA = parseFloat(celdasA[i].textContent);
        const valorB = parseFloat(celdasB[i].textContent);
        
        if (!isNaN(valorA)) muestraA.push(valorA);
        if (!isNaN(valorB)) muestraB.push(valorB);
    }
    
    // Calcular estadísticos
    const n1 = muestraA.length;
    const n2 = muestraB.length;
    
    if (n1 < 2 || n2 < 2) {
        alert('Se necesitan al menos 2 valores en cada muestra');
        return;
    }
    
    // Calcular medias
    const mediaA = muestraA.reduce((a, b) => a + b, 0) / n1;
    const mediaB = muestraB.reduce((a, b) => a + b, 0) / n2;
    
    // Calcular varianzas
    const varianzaA = muestraA.reduce((a, b) => a + Math.pow(b - mediaA, 2), 0) / (n1 - 1);
    const varianzaB = muestraB.reduce((a, b) => a + Math.pow(b - mediaB, 2), 0) / (n2 - 1);
    
    // Calcular error estándar combinado
    const sp = Math.sqrt(((n1 - 1) * varianzaA + (n2 - 1) * varianzaB) / (n1 + n2 - 2));
    const errorEstandor = sp * Math.sqrt(1/n1 + 1/n2);
    
    // Calcular estadístico t
    const t = (mediaA - mediaB) / errorEstandor;
    
    // Grados de libertad
    const df = n1 + n2 - 2;
    
    // Calcular valor p (dos colas)
    const valorP = 2 * (1 - distribucionT(Math.abs(t), df));
    
    // Nivel de significancia
    const alpha = 0.05;
    
    // Determinar si se rechaza H0
    const decision = valorP < alpha ? 
        'Se rechaza H0: Existe una diferencia significativa entre los grupos.' : 
        'No hay evidencia suficiente para rechazar H0: No hay diferencia significativa entre los grupos.';
    
    // Mostrar resultados
    document.getElementById('resultado-prueba').innerHTML = `
        <h5>Resultados de la Prueba t:</h5>
        <p>Media Grupo A = ${mediaA.toFixed(2)}</p>
        <p>Media Grupo B = ${mediaB.toFixed(2)}</p>
        <p>Diferencia de medias = ${(mediaA - mediaB).toFixed(2)}</p>
        <p>Varianza Grupo A = ${varianzaA.toFixed(2)}</p>
        <p>Varianza Grupo B = ${varianzaB.toFixed(2)}</p>
        <p>Estadístico t = ${t.toFixed(4)}</p>
        <p>Grados de libertad = ${df}</p>
        <p>Valor p = ${valorP.toFixed(4)}</p>
        <p>Nivel de significancia (α) = ${alpha}</p>
        <p><strong>${decision}</strong></p>
    `;
    
    // Función de distribución t acumulada (aproximación)
    function distribucionT(x, df) {
        // Aproximación numérica de la función de distribución t
        // Basada en la aproximación de la distribución t a la normal para df > 30
        if (df > 30) {
            // Aproximación normal estándar para df grandes
            return 0.5 * (1 + erf(x / Math.sqrt(2)));
        } else {
            // Aproximación para df pequeños
            const a = df / (x * x + df);
            let sum = 0;
            
            // Aproximación usando series infinitas
            for (let i = 0; i <= 100; i++) {
                const term = Math.pow(-1, i) * Math.pow(a, 2 * i + 1) / (2 * i + 1);
                sum += term;
                
                // Criterio de convergencia
                if (Math.abs(term) < 1e-10) break;
            }
            
            return 0.5 + (x / Math.PI) * sum;
        }
    }
}

// Función para realizar el análisis de varianza (ANOVA)
function realizarANOVA() {
    // Obtener datos de la tabla
    const tabla = document.getElementById('tabla-anova');
    const filas = tabla.getElementsByTagName('tr');
    const grupos = [];
    
    // Procesar datos de la tabla
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const grupo = [];
        for (let j = 0; j < celdas.length; j++) {
            grupo.push(parseFloat(celdas[j].textContent));
        }
        if (grupo.length > 0) {
            grupos.push(grupo);
        }
    }
    
    // Calcular estadísticos
    const k = grupos.length; // Número de grupos
    const n = grupos[0].length * k; // Número total de observaciones
    
    // Calcular medias de cada grupo y media global
    let mediaGlobal = 0;
    const mediasGrupos = [];
    const nGrupos = [];
    
    for (let i = 0; i < k; i++) {
        const suma = grupos[i].reduce((a, b) => a + b, 0);
        const nGrupo = grupos[i].length;
        mediasGrupos.push(suma / nGrupo);
        nGrupos.push(nGrupo);
        mediaGlobal += suma;
    }
    mediaGlobal /= n;
    
    // Calcular suma de cuadrados entre grupos (SSB)
    let ssb = 0;
    for (let i = 0; i < k; i++) {
        ssb += nGrupos[i] * Math.pow(mediasGrupos[i] - mediaGlobal, 2);
    }
    
    // Calcular suma de cuadrados dentro de los grupos (SSW)
    let ssw = 0;
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < grupos[i].length; j++) {
            ssw += Math.pow(grupos[i][j] - mediasGrupos[i], 2);
        }
    }
    
    // Calcular grados de libertad
    const dfb = k - 1; // Grados de libertad entre grupos
    const dfw = n - k; // Grados de libertad dentro de los grupos
    
    // Calcular cuadrados medios
    const msb = ssb / dfb;
    const msw = ssw / dfw;
    
    // Calcular estadístico F
    const f = msb / msw;
    
    // Calcular valor p (aproximación)
    const valorP = 1 - distribucionF(f, dfb, dfw);
    
    // Nivel de significancia
    const alpha = 0.05;
    
    // Determinar si se rechaza H0
    const decision = valorP < alpha ? 
        'Se rechaza H0: Existen diferencias significativas entre al menos dos de los grupos.' : 
        'No hay evidencia suficiente para rechazar H0: No hay diferencias significativas entre los grupos.';
    
    // Mostrar resultados
    document.getElementById('resultado-anova').innerHTML = `
        <h5>Resultados del ANOVA:</h5>
        <p>Estadístico F = ${f.toFixed(4)}</p>
        <p>Grados de libertad (entre grupos) = ${dfb}</p>
        <p>Grados de libertad (dentro de grupos) = ${dfw}</p>
        <p>Suma de cuadrados entre grupos (SSB) = ${ssb.toFixed(4)}</p>
        <p>Suma de cuadrados dentro de grupos (SSW) = ${ssw.toFixed(4)}</p>
        <p>Cuadrado medio entre grupos (MSB) = ${msb.toFixed(4)}</p>
        <p>Cuadrado medio dentro de grupos (MSW) = ${msw.toFixed(4)}</p>
        <p>Valor p = ${valorP.toFixed(4)}</p>
        <p>Nivel de significancia (α) = ${alpha}</p>
        <p><strong>${decision}</strong></p>
    `;
}

// Función de distribución F acumulada (aproximación)
function distribucionF(x, df1, df2) {
    // Para k grados de libertad, la distribución F es una beta incompleta
    // F = (X1/df1) / (X2/df2) donde X1 ~ χ²(df1) y X2 ~ χ²(df2)
    // P(F ≤ x) = I(df1*x / (df1*x + df2), df1/2, df2/2)
    const y = (df1 * x) / (df1 * x + df2);
    return distribucionBeta(y, df1/2, df2/2);
}

// Función de distribución beta (necesaria para la F)
function distribucionBeta(x, a, b) {
    // Aproximación numérica de la función beta incompleta
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    
    const epsilon = 1e-10;
    let sum = 0;
    let term = 1 / a;
    let n = 1;
    
    while (true) {
        const oldSum = sum;
        sum += term;
        
        if (Math.abs(sum - oldSum) < epsilon) break;
        
        term *= b * x / (a + n);
        n++;
        
        if (n > 1000) break; // Prevenir bucles infinitos
    }
    
    return 1 - Math.exp(-b * x) * Math.pow(b * x, a) * sum / gamma(a);
}

// Función gamma (aproximación)
function gamma(z) {
    // Aproximación de Lanczos
    const g = 7;
    const p = [
        0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    
    z -= 1;
    let x = p[0];
    
    for (let i = 1; i < g + 2; i++) {
        x += p[i] / (z + i);
    }
    
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Función para realizar la prueba de chi-cuadrado de independencia
function realizarPruebaChiCuadrado() {
    // Obtener datos de la tabla
    const tabla = document.getElementById('tabla-chi-cuadrado');
    const filas = tabla.getElementsByTagName('tr');
    const nFilas = filas.length - 1; // Excluir fila de totales
    const nCols = filas[0].getElementsByTagName('th').length - 1; // Excluir columna de totales
    
    // Matriz de frecuencias observadas
    const obs = [];
    // Totales por fila
    const totalFilas = [];
    // Totales por columna
    const totalCols = new Array(nCols).fill(0);
    let totalGeneral = 0;
    
    // Procesar datos de la tabla (excluyendo la última fila y columna de totales)
    for (let i = 1; i < nFilas; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const fila = [];
        let totalFila = 0;
        
        for (let j = 0; j < nCols; j++) {
            const valor = parseInt(celdas[j].textContent);
            fila.push(valor);
            totalFila += valor;
            totalCols[j] += valor;
        }
        
        obs.push(fila);
        totalFilas.push(totalFila);
        totalGeneral += totalFila;
    }
    
    // Calcular estadístico chi-cuadrado
    let chi2 = 0;
    
    for (let i = 0; i < nFilas - 1; i++) {
        for (let j = 0; j < nCols; j++) {
            const esperado = (totalFilas[i] * totalCols[j]) / totalGeneral;
            const diferencia = obs[i][j] - esperado;
            chi2 += (diferencia * diferencia) / esperado;
        }
    }
    
    // Grados de libertad
    const df = (nFilas - 2) * (nCols - 1); // (filas-1)*(columnas-1)
    
    // Obtener nivel de significancia
    const alpha = parseFloat(document.getElementById('nivel-significancia-chi').value);
    
    // Calcular valor p (aproximación)
    const valorP = 1 - distribucionChi2(chi2, df);
    
    // Valor crítico de chi-cuadrado
    const valorCritico = chi2Inv(alpha, df);
    
    // Determinar si se rechaza H0
    const decision = valorP < alpha ? 
        'Se rechaza H0: Existe evidencia de asociación entre las variables.' : 
        'No hay evidencia suficiente para rechazar H0: Las variables parecen ser independientes.';
    
    // Mostrar resultados
    document.getElementById('resultado-chi').innerHTML = `
        <h5>Resultados de la Prueba Chi-Cuadrado:</h5>
        <p>Estadístico χ² = ${chi2.toFixed(4)}</p>
        <p>Grados de libertad = ${df}</p>
        <p>Valor p = ${valorP.toFixed(4)}</p>
        <p>Valor crítico (α=${alpha}) = ${valorCritico.toFixed(4)}</p>
        <p><strong>${decision}</strong></p>
        <h6>Tabla de frecuencias esperadas:</h6>
        <table class="tabla-ejemplo">
            <tr>
                <th>Nivel Educativo / Candidato</th>
                <th>Candidato A</th>
                <th>Candidato B</th>
            </tr>
            ${Array.from({length: nFilas-1}, (_, i) => {
                return `
                <tr>
                    <td>${filas[i+1].cells[0].textContent}</td>
                    <td>${(totalFilas[i] * totalCols[0] / totalGeneral).toFixed(2)}</td>
                    <td>${(totalFilas[i] * totalCols[1] / totalGeneral).toFixed(2)}</td>
                </tr>`;
            }).join('')}
        </table>
    `;
}

// Función de distribución chi-cuadrado acumulada (aproximación)
function distribucionChi2(x, k) {
    // Para k grados de libertad, la distribución chi-cuadrado es gamma(k/2, 2)
    return distribucionGamma(x, k/2, 2);
}

// Función de distribución gamma (necesaria para chi-cuadrado)
function distribucionGamma(x, shape, scale) {
    // Aproximación numérica de la función gamma incompleta
    if (x <= 0) return 0;
    
    const a = shape;
    const b = 1 / scale;
    const epsilon = 1e-10;
    let sum = 0;
    let term = 1 / a;
    let n = 1;
    
    while (true) {
        const oldSum = sum;
        sum += term;
        
        if (Math.abs(sum - oldSum) < epsilon) break;
        
        term *= b * x / (a + n);
        n++;
        
        if (n > 1000) break; // Prevenir bucles infinitos
    }
    
    return 1 - Math.exp(-b * x) * Math.pow(b * x, a) * sum / gamma(a);
}

// Función inversa de chi-cuadrado (aproximación)
function chi2Inv(p, df) {
    // Aproximación de Wilson-Hilferty
    if (df > 30) {
        const z = normalInv(1 - p);
        return df * Math.pow(1 - 2/(9*df) + z * Math.sqrt(2/(9*df)), 3);
    }
    
    // Búsqueda binaria para df pequeños
    let x0 = 0;
    let x1 = 1000; // Límite superior arbitrario
    
    while (x1 - x0 > 1e-8) {
        const x = (x0 + x1) / 2;
        const cdf = distribucionChi2(x, df);
        
        if (cdf > 1 - p) {
            x1 = x;
        } else {
            x0 = x;
        }
    }
    
    return (x0 + x1) / 2;
}

// Función inversa de la normal estándar (aproximación)
function normalInv(p) {
    // Aproximación de Wichura
    const a1 = -3.969683028665376e+01;
    const a2 = 2.209460984245205e+02;
    const a3 = -2.759285104469687e+02;
    const a4 = 1.383577518672690e+02;
    const a5 = -3.066479806614716e+01;
    const a6 = 2.506628277459239e+00;
    
    const b1 = -5.447609879822406e+01;
    const b2 = 1.615858368580409e+02;
    const b3 = -1.556989798598866e+02;
    const b4 = 6.680131188771972e+01;
    const b5 = -1.328068155288572e+01;
    
    const c1 = -7.784894002430293e-03;
    const c2 = -3.223964580411365e-01;
    const c3 = -2.400758277161838e+00;
    const c4 = -2.549732539343734e+00;
    const c5 = 4.374664141464968e+00;
    const c6 = 2.938163982698783e+00;
    
    const d1 = 7.784695709041462e-03;
    const d2 = 3.224671290700398e-01;
    const d3 = 2.445134137142996e+00;
    const d4 = 3.754408661907416e+00;
    
    const p_low = 0.02425;
    const p_high = 1 - p_low;
    
    let q, r, x;
    
    if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        x = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / 
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        x = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / 
            (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        x = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / 
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    
    return x;
}

// Función para evaluar las respuestas del tema 12
function evaluarTema12() {
    const respuestas = {
        p1: 'b',
        p2: 'b',
        p3: 'c'
    };
    
    let aciertos = 0;
    const totalPreguntas = Object.keys(respuestas).length;
    
    // Verificar respuestas
    for (const pregunta in respuestas) {
        const seleccionado = document.querySelector(`input[name="${pregunta}"]:checked`);
        if (seleccionado && seleccionado.value === respuestas[pregunta]) {
            aciertos++;
        }
    }
    
    // Calcular calificación
    const calificacion = (aciertos / totalPreguntas) * 100;
    
    // Mostrar resultados
    const resultado = document.getElementById('resultado-evaluacion-tema12');
    resultado.innerHTML = `
        <h4>Resultado de la evaluación</h4>
        <p>Has respondido correctamente ${aciertos} de ${totalPreguntas} preguntas.</p>
        <p>Tu calificación es: <strong>${calificacion.toFixed(1)}%</strong></p>
        ${calificacion >= 70 ? 
            '<p class="texto-exito">¡Felicidades! Has aprobado la evaluación.</p>' : 
            '<p class="texto-error">Necesitas estudiar más el tema. Revisa los conceptos clave e inténtalo de nuevo.</p>'
        }
        
        <h5>Retroalimentación:</h5>
        <ul>
            <li><strong>Pregunta 1:</strong> La prueba de hipótesis tiene como principal propósito hacer inferencias sobre una población basadas en datos muestrales.</li>
            <li><strong>Pregunta 2:</strong> Si el valor p es menor que α, se rechaza la hipótesis nula.</li>
            <li><strong>Pregunta 3:</strong> El error tipo I ocurre cuando se rechaza una hipótesis nula que en realidad es verdadera.</li>
        </ul>
    `;
}

// Función para evaluar el Tema 13: Power Query
function evaluarTema13() {
    const respuestas = document.querySelectorAll('#tema13 .opcion input:checked');
    let aciertos = 0;
    const totalPreguntas = 3; // Ajusta según el número de preguntas
    
    // Verificar respuestas (ajusta los índices según corresponda)
    const respuestasCorrectas = ['b', 'a', 'c'];
    
    respuestas.forEach((respuesta, index) => {
        if (index < respuestasCorrectas.length && respuesta.value === respuestasCorrectas[index]) {
            aciertos++;
        }
    });
    
    const porcentaje = Math.round((aciertos / totalPreguntas) * 100);
    const mensaje = `Has acertado ${aciertos} de ${totalPreguntas} (${porcentaje}%)`;
    
    const resultadoDiv = document.getElementById('resultado-evaluacion-tema13') || 
                        document.createElement('div');
    resultadoDiv.id = 'resultado-evaluacion-tema13';
    resultadoDiv.className = 'resultado-evaluacion';
    resultadoDiv.innerHTML = `
        <p>${mensaje}</p>
        ${porcentaje < 100 ? 
            '<p>Revisa los temas donde tuviste dificultades y vuelve a intentarlo.</p>' : 
            '<p>¡Excelente trabajo! Has dominado los conceptos de Power Query.</p>'
        }
    `;
    
    // Insertar el resultado después del botón de evaluación
    const botonEvaluar = document.getElementById('evaluar-tema13');
    if (botonEvaluar) {
        botonEvaluar.insertAdjacentElement('afterend', resultadoDiv);
    }
    
    return false; // Prevenir el envío del formulario
}

// Función para evaluar el Tema 14: Power Pivot
function evaluarTema14() {
    const respuestas = document.querySelectorAll('#tema14 .opcion input:checked');
    let aciertos = 0;
    const totalPreguntas = 3; // Ajusta según el número de preguntas
    
    // Verificar respuestas (ajusta los índices según corresponda)
    const respuestasCorrectas = ['c', 'b', 'a'];
    
    respuestas.forEach((respuesta, index) => {
        if (index < respuestasCorrectas.length && respuesta.value === respuestasCorrectas[index]) {
            aciertos++;
        }
    });
    
    const porcentaje = Math.round((aciertos / totalPreguntas) * 100);
    const mensaje = `Has acertado ${aciertos} de ${totalPreguntas} (${porcentaje}%)`;
    
    const resultadoDiv = document.getElementById('resultado-evaluacion-tema14') || 
                        document.createElement('div');
    resultadoDiv.id = 'resultado-evaluacion-tema14';
    resultadoDiv.className = 'resultado-evaluacion';
    resultadoDiv.innerHTML = `
        <p>${mensaje}</p>
        ${porcentaje < 100 ? 
            '<p>Revisa los temas donde tuviste dificultades y vuelve a intentarlo.</p>' : 
            '<p>¡Excelente trabajo! Has dominado los conceptos de Power Pivot.</p>'
        }
    `;
    
    // Insertar el resultado después del botón de evaluación
    const botonEvaluar = document.getElementById('evaluar-tema14');
    if (botonEvaluar) {
        botonEvaluar.insertAdjacentElement('afterend', resultadoDiv);
    }
    
    return false; // Prevenir el envío del formulario
}

// Función para evaluar el Tema 15: Dashboards Interactivos
function evaluarTema15() {
    const respuestas = document.querySelectorAll('#tema15 .opcion input:checked');
    let aciertos = 0;
    const totalPreguntas = 3; // Ajusta según el número de preguntas
    
    // Verificar respuestas (ajusta los índices según corresponda)
    const respuestasCorrectas = ['a', 'b', 'b'];
    
    respuestas.forEach((respuesta, index) => {
        if (index < respuestasCorrectas.length && respuesta.value === respuestasCorrectas[index]) {
            aciertos++;
        }
    });
    
    const porcentaje = Math.round((aciertos / totalPreguntas) * 100);
    const mensaje = `Has acertado ${aciertos} de ${totalPreguntas} (${porcentaje}%)`;
    
    const resultadoDiv = document.getElementById('resultado-evaluacion-tema15') || 
                        document.createElement('div');
    resultadoDiv.id = 'resultado-evaluacion-tema15';
    resultadoDiv.className = 'resultado-evaluacion';
    resultadoDiv.innerHTML = `
        <p>${mensaje}</p>
        ${porcentaje < 100 ? 
            '<p>Revisa los temas donde tuviste dificultades y vuelve a intentarlo.</p>' : 
            '<p>¡Excelente trabajo! Has dominado los conceptos de Dashboards Interactivos.</p>'
        }
    `;
    
    // Insertar el resultado después del botón de evaluación
    const botonEvaluar = document.getElementById('evaluar-tema15');
    if (botonEvaluar) {
        botonEvaluar.insertAdjacentElement('afterend', resultadoDiv);
    }
    
    return false; // Prevenir el envío del formulario
}

// Función para evaluar el Proyecto Final (Tema 16)
function evaluarProyectoFinal() {
    const respuestas = document.querySelectorAll('#tema16 .opcion input:checked');
    let aciertos = 0;
    const totalPreguntas = 3; // Ajusta según el número de preguntas
    
    // Verificar respuestas (ajusta los índices según corresponda)
    const respuestasCorrectas = ['a', 'a', 'a'];
    
    respuestas.forEach((respuesta, index) => {
        if (index < respuestasCorrectas.length && respuesta.value === respuestasCorrectas[index]) {
            aciertos++;
        }
    });
    
    const porcentaje = Math.round((aciertos / totalPreguntas) * 100);
    const mensaje = `Has completado ${porcentaje}% de la autoevaluación del proyecto`;
    
    const resultadoDiv = document.getElementById('resultado-autoevaluacion') || 
                        document.createElement('div');
    resultadoDiv.id = 'resultado-autoevaluacion';
    resultadoDiv.className = 'resultado-evaluacion';
    resultadoDiv.innerHTML = `
        <p>${mensaje}</p>
        <p>${aciertos} de ${totalPreguntas} criterios cumplidos</p>
        ${porcentaje < 100 ? 
            '<p>Revisa las secciones que necesitan mejora antes de entregar tu proyecto.</p>' : 
            '<p>¡Excelente trabajo! Tu proyecto cumple con todos los criterios de evaluación.</p>'
        }
    `;
    
    // Insertar el resultado después del botón de evaluación
    const botonEvaluar = document.getElementById('evaluar-proyecto');
    if (botonEvaluar) {
        botonEvaluar.insertAdjacentElement('afterend', resultadoDiv);
    }
    
    return false; // Prevenir el envío del formulario
}

// Inicialización cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Módulo 2 cargado correctamente');
    
    // Asignar manejadores de eventos a los botones de evaluación
    const botonEvaluarTema13 = document.getElementById('evaluar-tema13');
    if (botonEvaluarTema13) {
        botonEvaluarTema13.addEventListener('click', evaluarTema13);
    }
    
    const botonEvaluarTema14 = document.getElementById('evaluar-tema14');
    if (botonEvaluarTema14) {
        botonEvaluarTema14.addEventListener('click', evaluarTema14);
    }
    
    const botonEvaluarTema15 = document.getElementById('evaluar-tema15');
    if (botonEvaluarTema15) {
        botonEvaluarTema15.addEventListener('click', evaluarTema15);
    }
    
    const botonEvaluarProyecto = document.getElementById('evaluar-proyecto');
    if (botonEvaluarProyecto) {
        botonEvaluarProyecto.addEventListener('click', evaluarProyectoFinal);
    }
});
