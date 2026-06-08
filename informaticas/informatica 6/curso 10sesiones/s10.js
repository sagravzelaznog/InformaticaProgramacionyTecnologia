// ==========================================
// 1. MODO OSCURO
// ==========================================
const botonTema = document.getElementById("btn-tema");
const cuerpoPagina = document.body;

botonTema.addEventListener("click", function() {
    cuerpoPagina.classList.toggle("modo-oscuro");
    
    if (cuerpoPagina.classList.contains("modo-oscuro")) {
        botonTema.textContent = "Cambiar a Modo Claro";
    } else {
        botonTema.textContent = "Cambiar a Modo Oscuro";
    }
});

// ==========================================
// 2. INYECCIÓN DINÁMICA DE PROYECTOS
// ==========================================
const listaProyectos = [
    {
        titulo: "Pensamiento Matemático Interact",
        descripcion: "Aplicación web para mejorar los hábitos de estudio mediante gamificación y ejercicios guiados. Desarrollado con HTML, CSS y JS modular.",
        enlace: "#"
    },
    {
        titulo: "Plano Fraccionamiento Nazas",
        descripcion: "Diseño técnico en AutoCAD exportado y visualizado a través de una interfaz web responsiva, cumpliendo con las normativas eléctricas.",
        enlace: "#"
    },
    {
        titulo: "Cálculo Lumínico DIALux",
        descripcion: "Memoria descriptiva y reporte de cálculos de iluminación integrados en una galería dinámica para proyectos arquitectónicos.",
        enlace: "#"
    }
];

const contenedor = document.getElementById("contenedor-proyectos");

// Ciclo para recorrer el arreglo y construir las tarjetas
listaProyectos.forEach(function(proyecto, indice) {
    const tarjetaHTML = `
        <div class="tarjeta-proyecto">
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion.substring(0, 50)}...</p>
            <button class="btn-abrir-modal" data-indice="${indice}">Ver detalles</button>
        </div>
    `;
    
    contenedor.innerHTML += tarjetaHTML;
});

// ==========================================
// 3. VENTANA MODAL (POP-UP DE PROYECTOS)
// ==========================================
const modal = document.getElementById("modal-proyecto");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalDesc = document.getElementById("modal-desc");
const botonesAbrirModal = document.querySelectorAll(".btn-abrir-modal");

// Asignar evento click a cada botón de 'Ver detalles'
botonesAbrirModal.forEach(function(boton) {
    boton.addEventListener("click", function() {
        // Extraemos el índice para saber qué proyecto se cliqueó
        const indiceExtraido = boton.getAttribute("data-indice");
        const proyectoSeleccionado = listaProyectos[indiceExtraido];
        
        // Llenamos la modal con la información correcta
        modalTitulo.textContent = proyectoSeleccionado.titulo;
        modalDesc.textContent = proyectoSeleccionado.descripcion;
        
        // Mostramos la ventana
        modal.style.display = "flex";
    });
});

// Cerrar modal con la 'X'
btnCerrarModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Cerrar modal si el usuario hace clic afuera de la caja blanca
window.addEventListener("click", function(evento) {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});

// ==========================================
// 4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ==========================================
const formulario = document.getElementById("formulario-contacto");

formulario.addEventListener("submit", function(evento) {
    // Evitamos que la página se recargue automáticamente
    evento.preventDefault();
    
    const inputNombre = document.getElementById("nombre").value.trim();
    const inputCorreo = document.getElementById("correo").value.trim();
    const inputMensaje = document.getElementById("mensaje").value.trim();
    
    // Verificamos si hay campos vacíos
    if (inputNombre === "" || inputCorreo === "" || inputMensaje === "") {
        alert("¡Error! Por favor, llena todos los campos antes de enviar.");
    } else {
        alert("¡Éxito! Tu mensaje ha sido enviado correctamente.");
        formulario.reset(); // Limpia los campos
    }
});

// ==========================================
// 5. MENÚ MÓVIL (HAMBURGUESA)
// ==========================================
const btnMenu = document.getElementById("btn-menu");
const menuNavegacion = document.getElementById("menu-navegacion");

btnMenu.addEventListener("click", function() {
    // Agrega o quita la clase para mostrar u ocultar el menú en celulares
    menuNavegacion.classList.toggle("menu-activo");
});

// ==========================================
// 6. ACTUALIZACIÓN AUTOMÁTICA DEL AÑO
// ==========================================
const spanAnio = document.getElementById("anio-actual");
const fechaActual = new Date();
// Insertamos únicamente el año actual en el span del footer
spanAnio.textContent = fechaActual.getFullYear();