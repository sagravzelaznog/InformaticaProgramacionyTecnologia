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