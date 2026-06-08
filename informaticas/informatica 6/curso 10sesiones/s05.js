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
        descripcion: "Aplicación web para mejorar los hábitos de estudio mediante gamificación y ejercicios guiados.",
        enlace: "#"
    },
    {
        titulo: "Plano Fraccionamiento Nazas",
        descripcion: "Diseño técnico en AutoCAD exportado y visualizado a través de una interfaz web responsiva.",
        enlace: "#"
    },
    {
        titulo: "Cálculo Lumínico DIALux",
        descripcion: "Memoria descriptiva y reporte de cálculos de iluminación integrados en una galería dinámica.",
        enlace: "#"
    }
];

const contenedor = document.getElementById("contenedor-proyectos");

listaProyectos.forEach(function(proyecto) {
    const tarjetaHTML = `
        <div class="tarjeta-proyecto">
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <a href="${proyecto.enlace}">Ver proyecto</a>
        </div>
    `;
    
    contenedor.innerHTML += tarjetaHTML;
});