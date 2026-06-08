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

const modal = document.getElementById("modal-proyecto");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalDesc = document.getElementById("modal-desc");
const botonesAbrirModal = document.querySelectorAll(".btn-abrir-modal");

botonesAbrirModal.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const indiceExtraido = boton.getAttribute("data-indice");
        const proyectoSeleccionado = listaProyectos[indiceExtraido];
        
        modalTitulo.textContent = proyectoSeleccionado.titulo;
        modalDesc.textContent = proyectoSeleccionado.descripcion;
        
        modal.style.display = "flex";
    });
});

btnCerrarModal.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(evento) {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});

const formulario = document.getElementById("formulario-contacto");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    
    const inputNombre = document.getElementById("nombre").value.trim();
    const inputCorreo = document.getElementById("correo").value.trim();
    const inputMensaje = document.getElementById("mensaje").value.trim();
    
    if (inputNombre === "" || inputCorreo === "" || inputMensaje === "") {
        alert("¡Error! Por favor, llena todos los campos antes de enviar.");
    } else {
        alert("¡Éxito! Tu mensaje ha sido enviado correctamente.");
        formulario.reset();
    }
});