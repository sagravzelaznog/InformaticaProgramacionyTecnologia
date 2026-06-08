/**
 * SCRIPT PARA RESETEAR CREDENCIALES
 * Ejecuta este script en la consola del navegador para resetear las credenciales
 */

// Función para resetear credenciales
function resetCredentials() {
    console.log('🔄 Reseteando credenciales...');
    
    // Limpiar localStorage
    localStorage.removeItem('python_course_users');
    localStorage.removeItem('python_course_current_user');
    localStorage.removeItem('python_course_pending_users');
    
    console.log('✅ Credenciales reseteadas');
    console.log('📋 Usa estas credenciales:');
    console.log('👤 admin / admin123');
    console.log('👤 estudiante / estudiante123');
    console.log('👤 profesor / profesor123');
    
    // Recargar la página
    window.location.reload();
}

// Función para mostrar credenciales actuales
function showCredentials() {
    const users = JSON.parse(localStorage.getItem('python_course_users') || '[]');
    console.log('📋 Usuarios actuales:');
    users.forEach(user => {
        console.log(`👤 ${user.username} (${user.role})`);
    });
}

// Ejecutar reset
resetCredentials();

