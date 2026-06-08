document.addEventListener('DOMContentLoaded', () => {
    const sessions = [
        { id: 'sesion1', title: '1. Introducción' },
        { id: 'sesion2', title: '2. Grabación de Macros' },
        { id: 'sesion3', title: '3. El Editor de VBA' },
        { id: 'sesion4', title: '4. Variables y Datos' },
        { id: 'sesion5', title: '5. Estructuras de Control' },
        { id: 'sesion6', title: '6. Funciones y Procedimientos' },
        { id: 'sesion7', title: '7. Trabajo con Rangos' },
        { id: 'sesion8', title: '8. Hojas y Libros' },
        { id: 'sesion9', title: '9. Funciones de Usuario' },
        { id: 'sesion10', title: '10. Formularios I' },
        { id: 'sesion11', title: '11. Formularios II' },
        { id: 'sesion12', title: '12. Eventos' },
        { id: 'sesion13', title: '13. Archivos Externos' },
        { id: 'sesion14', title: '14. Integración' },
        { id: 'sesion15', title: '15. Proyecto I' },
        { id: 'sesion16', title: '16. Proyecto II' }
    ];

    const navList = document.getElementById('session-links');
    const currentPage = window.location.pathname.split('/').pop();

    if (navList) {
        // Add a link to the index page
        const homeListItem = document.createElement('li');
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.textContent = '🏠 Inicio';
        if (currentPage === 'index.html' || currentPage === '') {
            homeLink.classList.add('active');
        }
        homeListItem.appendChild(homeLink);
        navList.appendChild(homeListItem);

        // Add links for each session
        sessions.forEach(session => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            const sessionFile = `${session.id}.html`;
            link.href = sessionFile;
            link.textContent = session.title;

            // Mark the current page's link as active
            if (sessionFile === currentPage) {
                link.classList.add('active');
            }
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
    }
});
