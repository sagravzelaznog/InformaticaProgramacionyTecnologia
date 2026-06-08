// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Lista de páginas que no requieren autenticación
    const publicPages = ['iniciar-sesion.html', 'registro.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Si es una página pública, no hacer la verificación
    if (publicPages.includes(currentPage)) {
        return;
    }
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Si no hay usuario autenticado, redirigir a la página de inicio de sesión
    if (!currentUser || !currentUser.key) {
        // Guardar la URL actual para redirigir después del login
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = 'iniciar-sesion.html';
        return;
    }
    
    // Mostrar información del usuario si existe el elemento
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (userInfo && userName) {
        userInfo.style.display = 'block';
        userName.textContent = currentUser.nombre || 'Usuario';
    }
    
    // Configurar el botón de cierre de sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'iniciar-sesion.html';
        });
    }
});

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return !!(currentUser && currentUser.key);
}

// Función para obtener los datos del usuario actual
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'iniciar-sesion.html';
}
