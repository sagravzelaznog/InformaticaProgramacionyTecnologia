/**
 * JMGV-PTEL-2026
 * Script de control para la Planeación Didáctica
 */

// Función para imprimir
function printPlanner() {
	window.print();
}

// Animación de entrada al cargar la página (Efecto cascada)
document.addEventListener('DOMContentLoaded', () => {
	const rows = document.querySelectorAll('tbody tr');
	
	const observer = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
									if (entry.isIntersecting) {
													entry.target.style.opacity = 1;
													entry.target.style.transform = 'translateY(0)';
									}
					});
	}, { threshold: 0.1 });

	rows.forEach((row, index) => {
					// Estilos iniciales para la animación
					row.style.opacity = '0';
					row.style.transform = 'translateY(20px)';
					row.style.transition = `all 0.4s ease-out ${index * 0.05}s`; // Retardo escalonado
					
					observer.observe(row);
	});
});