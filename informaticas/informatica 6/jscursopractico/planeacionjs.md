# planeacionjs.md

# ⚡ CURSO PRÁCTICO: JAVASCRIPT "HACKEANDO LA MATRIX"


**Docente:** José Manuel González Vargas  
**Nivel:** Bachillerato (12-18 años)  
**Duración:** 10 Sesiones Prácticas (Laboratorio)  
**Requisito:** Plantillas HTML/CSS pre-armadas (El enfoque es 100% lógica JS)  
**Enfoque Psicológico:** Empoderamiento digital, resolución de problemas y recompensas de dopamina a través de victorias tempranas.

---

## 🧠 Filosofía del Curso

> "No estamos aprendiendo a memorizar sintaxis; estamos aprendiendo a pensar. JavaScript es el lenguaje de la interactividad. Hoy dejan de ser consumidores de tecnología para convertirse en creadores."

---

## 📅 CRONOGRAMA DE MISIONES (LABORATORIO)

### 🟢 FASE 1: FUNDAMENTOS DEL PENSAMIENTO LÓGICO

#### SESIÓN 1: La Terminal Secreta (Variables y Tipos de Datos)
* **Analogía Psicológica:** Las variables son "cajas etiquetadas" en la memoria de la computadora.
* **Conceptos:** `let`, `const`, `String`, `Number`, `Boolean`, `console.log()`.
* **El Reto Práctico ("El Perfil Hacker"):** * Los alumnos abren la consola del navegador (`F12`).
    * Deben crear variables con su nombre en clave, nivel de energía, y estado de misión (true/false).
    * *Victoria visual:* Lograr que la consola imprima un mensaje concatenado: `"Agente [Nombre], tu energía es [Nivel]. Misión activa: [Estado]"`.

#### SESIÓN 2: El Cadenero del Antro (Condicionales lógicos)
* **Analogía Psicológica:** El código toma decisiones basadas en reglas estrictas, igual que un cadenero en la puerta de un concierto.
* **Conceptos:** `if`, `else if`, `else`, comparadores (`>`, `<`, `===`).
* **El Reto Práctico ("El Guardián de la Puerta"):**
    * Usando `prompt()`, el script pregunta la edad y si trae identificación.
    * *Victoria visual:* Si cumple ambas, un `alert()` dice "Bienvenido a la zona VIP". Si no, "Acceso denegado. Vuelve a casa". 

#### SESIÓN 3: La Fábrica de Hechizos (Funciones Básicas)
* **Analogía Psicológica:** Una función es una máquina expendedora: le metes monedas (parámetros), hace un proceso interno, y te devuelve un refresco (return).
* **Conceptos:** `function()`, parámetros, argumentos, `return`.
* **El Reto Práctico ("La Calculadora de Daño"):**
    * Crear una función llamada `atacar(arma, fuerza)` que calcule cuánto daño hace un personaje de videojuego.
    * *Victoria visual:* Invocar la función en consola varias veces con diferentes armas y ver los distintos resultados.

---

### 🔵 FASE 2: MANIPULACIÓN DE LA REALIDAD (EL DOM)

#### SESIÓN 4: El Titiritero (Selectores del DOM)
* **Analogía Psicológica:** El HTML es una marioneta muerta; JS son los hilos invisibles que la mueven.
* **Conceptos:** `document.getElementById()`, `document.querySelector()`, `innerHTML`, `style`.
* **El Reto Práctico ("Vandalismo Digital Positivo"):**
    * Se les entrega una página web aburrida sobre un tema escolar.
    * Usando solo JS, deben cambiar el título principal, alterar los colores de fondo de ciertos `divs` y cambiar el texto de los párrafos.

#### SESIÓN 5: Acción y Reacción (Event Listeners)
* **Analogía Psicológica:** Poner trampas en el suelo. El código no hace nada hasta que el usuario "pisa" (hace clic) la trampa.
* **Conceptos:** `addEventListener('click')`, funciones flecha básicas.
* **El Reto Práctico ("El Interruptor Matrix"):**
    * Crear un botón en pantalla.
    * Al hacer clic, el fondo de la pantalla cambia a negro y el texto a verde neón (Modo Oscuro). Al volver a hacer clic, regresa a la normalidad (`classList.toggle`).

---

### 🟣 FASE 3: MANEJANDO DATOS COMO PROFESIONALES

#### SESIÓN 6: El Inventario (Arrays)
* **Analogía Psicológica:** Un array es el inventario de la mochila de tu personaje en un videojuego (slots numerados desde el 0).
* **Conceptos:** `[]`, índices, `push()`, `pop()`, `length`.
* **El Reto Práctico ("El Carrito de Compras"):**
    * Tienen un array vacío. Tres botones en HTML ("Comprar Espada", "Comprar Poción", "Comprar Escudo").
    * Al hacer clic, el ítem se añade al array y se muestra cuántos objetos tienen en total usando `.length`.

#### SESIÓN 7: La Rueda del Hámster (Bucles / Loops)
* **Analogía Psicológica:** Un robot que repite una tarea aburrida por ti un millón de veces en un segundo sin quejarse.
* **Conceptos:** `for`, iteración, combinar Arrays con Loops.
* **El Reto Práctico ("El Generador de Enemigos"):**
    * Tienen un array con 5 nombres de villanos.
    * Usar un bucle `for` para crear automáticamente 5 etiquetas `<li>` en el HTML, una por cada villano del array.

#### SESIÓN 8: Clonación de Entidades (Objetos)
* **Analogía Psicológica:** Una tarjeta de identidad detallada. Un array es solo una lista, un objeto tiene "propiedades" (color de ojos, altura, habilidades).
* **Conceptos:** `{ clave: valor }`, notación de punto (`jugador.nombre`).
* **El Reto Práctico ("Ficha de Personaje RPG"):**
    * Crear un objeto `heroe` con propiedades como nombre, vida (100) y ataque.
    * Pintar esta información dinámicamente en una tarjeta bonita en el HTML.

---

### 🔴 FASE 4: DINÁMICA AVANZADA E INTEGRACIÓN FINAL

#### SESIÓN 9: El Controlador del Tiempo (Intervalos y Timeouts)
* **Analogía Psicológica:** Bombas de tiempo (`setTimeout`) y metrónomos (`setInterval`).
* **Conceptos:** `setInterval`, `clearInterval`.
* **El Reto Práctico ("El Cronómetro de la Muerte"):**
    * Crear una cuenta regresiva de 10 segundos que se actualiza en el HTML.
    * Si el usuario no presiona el botón "Desactivar" a tiempo, la pantalla se pone roja y dice "GAME OVER".

#### SESIÓN 10: PROYECTO FINAL - "Whack-a-Bug" 🐛
* **Objetivo:** Unir DOM, Eventos, Variables, y Tiempo.
* **El Reto Práctico (Integración Total):**
    * **Mecánica:** Un "insecto" (un `div` con un emoji 🐛) aparece en una posición aleatoria (usando `Math.random()`) cada segundo gracias a `setInterval()`.
    * **Interacción:** Si el alumno le hace clic (`addEventListener`), suma 1 a la variable `puntuacion` y actualiza el HTML.
    * **Final:** Si llega a 10 puntos, gana el juego y detiene el tiempo (`clearInterval`).

---

## 🏆 Rúbrica Gamificada de Evaluación Práctica

| Nivel de Dominio | Título Otorgado | Criterios de Evaluación |
| :--- | :--- | :--- |
| **Básico (6-7)** | *Script Kiddie* | El código funciona parcialmente. Depende de copiar y pegar sin entender la estructura. Hay errores en consola que no sabe leer. |
| **Intermedio (8-9)** | *Code Ninja* | Resuelve los retos, entiende la diferencia entre variable, función y evento. Su HTML reacciona a los clics correctamente. |
| **Avanzado (10)** | *JavaScript Master* | Código limpio, usa nombres de variables lógicos, comenta su código, atrapa sus propios errores (bugs) leyendo la consola. |

---
**© 2026-JMGV-PTEL Programa de PENSAMIENTO MATEMÁTICO Y TECNOLÓGICO. Todos los derechos reservados.**