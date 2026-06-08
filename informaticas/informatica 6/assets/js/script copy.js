// Chat functionality
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        // Simulate AI response
        setTimeout(() => {
            addMessage('ai', '¡Excelente pregunta! HTML es el lenguaje que estructura el contenido web. ¿Quieres saber más sobre etiquetas?');
        }, 1000);
    }
});

function addMessage(type, text) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show template
document.getElementById('show-template').addEventListener('click', () => {
    const template = document.getElementById('template');
    template.style.display = template.style.display === 'none' ? 'block' : 'none';
});

// Quiz
const questions = [
    {
        question: "¿Qué significa HTML?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "¿Cuál es la etiqueta para un párrafo en HTML?",
        options: ["&lt;p&gt;", "&lt;div&gt;", "&lt;span&gt;"],
        answer: 0
    },
    {
        question: "¿Qué etiqueta se usa para el título principal?",
        options: ["&lt;h1&gt;", "&lt;title&gt;", "&lt;head&gt;"],
        answer: 0
    },
    {
        question: "¿Cuál es la estructura básica de un documento HTML?",
        options: ["DOCTYPE, html, head, body", "html, body, head, title", "body, html, head, DOCTYPE"],
        answer: 0
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <h3>${q.question}</h3>
        ${q.options.map((opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`).join('')}
    `;
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const body = document.body;
    if (selected === q.answer) {
        body.style.backgroundColor = '#4CAF50'; // Green
        setTimeout(() => body.style.backgroundColor = '', 500);
        alert('¡Correcto! 🎉');
    } else {
        body.style.backgroundColor = '#F44336'; // Red
        setTimeout(() => body.style.backgroundColor = '', 500);
        alert('Incorrecto 😞');
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = '<h3>¡Quiz completado! Repasa y vuelve a intentarlo.</h3>';
    }
}

loadQuestion();
// Chat functionality
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        // Simulate AI response
        setTimeout(() => {
            addMessage('ai', '¡Excelente pregunta! Los enlaces en HTML usan la etiqueta &lt;a&gt; con href. ¿Quieres un ejemplo?');
        }, 1000);
    }
});

function addMessage(type, text) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show template
document.getElementById('show-template').addEventListener('click', () => {
    const template = document.getElementById('template');
    template.style.display = template.style.display === 'none' ? 'block' : 'none';
});

// Quiz
const questions = [
    {
        question: "¿Cuál es la etiqueta para crear enlaces en HTML?",
        options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;url&gt;"],
        answer: 0
    },
    {
        question: "¿Qué atributo especifica la URL en un enlace?",
        options: ["src", "href", "link", "url"],
        answer: 1
    },
    {
        question: "¿Qué tipo de ruta es './carpeta/archivo.html'?",
        options: ["Absoluta", "Relativa", "Protocolo", "Interna"],
        answer: 1
    },
    {
        question: "¿Cómo se enlaza a una sección específica en la misma página?",
        options: ["Usando class", "Usando id con #", "Usando name", "No se puede"],
        answer: 1
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById('quiz-container');
    container.innerHTML = `
        <h3>${q.question}</h3>
        ${q.options.map((opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`).join('')}
    `;
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const body = document.body;
    if (selected === q.answer) {
        body.style.backgroundColor = '#4CAF50'; // Green
        setTimeout(() => body.style.backgroundColor = '', 500);
        alert('¡Correcto! 🎉');
    } else {
        body.style.backgroundColor = '#F44336'; // Red
        setTimeout(() => body.style.backgroundColor = '', 500);
        alert('Incorrecto 😞');
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = '<h3>¡Quiz completado! Repasa y vuelve a intentarlo.</h3>';
    }
}

loadQuestion();