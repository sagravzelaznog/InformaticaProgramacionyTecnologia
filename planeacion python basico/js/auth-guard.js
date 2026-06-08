/**
 * MIDDLEWARE DE AUTENTICACIÓN
 * Protege las páginas de sesiones del curso
 */

class AuthGuard {
    constructor() {
        this.init();
    }

    /**
     * Inicializa el guard de autenticación
     */
    init() {
        // Verificar si estamos en una página de sesión
        if (this.isSessionPage()) {
            this.checkAuthentication();
        }
    }

    /**
     * Verifica si la página actual es una sesión del curso
     */
    isSessionPage() {
        const currentPage = window.location.pathname;
        const sessionPattern = /s\d+\.html$/;
        return sessionPattern.test(currentPage);
    }

    /**
     * Verifica la autenticación del usuario
     */
    checkAuthentication() {
        // Cargar sistema de autenticación si no existe
        if (!window.authSystem) {
            this.loadAuthSystem();
        }

        // Verificar si el usuario está autenticado
        if (!window.authSystem || !window.authSystem.isAuthenticated()) {
            this.redirectToLogin();
        } else {
            this.showProtectedContent();
        }
    }

    /**
     * Carga el sistema de autenticación
     */
    async loadAuthSystem() {
        try {
            // Crear instancia temporal del sistema de auth
            const AuthSystem = await this.loadAuthScript();
            window.authSystem = new AuthSystem();
        } catch (error) {
            console.error('Error cargando sistema de autenticación:', error);
            this.showError('Error de autenticación');
        }
    }

    /**
     * Carga el script de autenticación dinámicamente
     */
    loadAuthScript() {
        return new Promise((resolve, reject) => {
            if (window.AuthSystem) {
                resolve(window.AuthSystem);
                return;
            }

            const script = document.createElement('script');
            script.src = 'js/auth.js';
            script.onload = () => {
                if (window.AuthSystem) {
                    resolve(window.AuthSystem);
                } else {
                    reject(new Error('AuthSystem no encontrado'));
                }
            };
            script.onerror = () => reject(new Error('Error cargando auth.js'));
            document.head.appendChild(script);
        });
    }

    /**
     * Redirige al usuario al login
     */
    redirectToLogin() {
        // Crear página de login temporal
        this.createLoginPage();
    }

    /**
     * Crea una página de login temporal para sesiones
     */
    createLoginPage() {
        const loginHTML = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Acceso Requerido - Curso de Python</title>
                <link rel="stylesheet" href="css/auth.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .session-login-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    .session-login-card {
                        background: white;
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                        padding: 40px;
                        width: 100%;
                        max-width: 450px;
                        margin: 20px;
                        text-align: center;
                    }
                    .session-login-card h1 {
                        color: #333;
                        margin-bottom: 10px;
                        font-size: 28px;
                    }
                    .session-login-card p {
                        color: #666;
                        margin-bottom: 30px;
                        font-size: 16px;
                    }
                    .back-to-course {
                        display: inline-block;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 10px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    .back-to-course:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                    }
                </style>
            </head>
            <body>
                <div class="session-login-container">
                    <div class="session-login-card">
                        <h1><i class="fab fa-python"></i> Acceso Requerido</h1>
                        <p>Necesitas iniciar sesión para acceder a esta sesión del curso.</p>
                        <a href="index.html" class="back-to-course">
                            <i class="fas fa-arrow-left"></i> Volver al Curso
                        </a>
                    </div>
                </div>
            </body>
            </html>
        `;

        document.open();
        document.write(loginHTML);
        document.close();
    }

    /**
     * Muestra el contenido protegido de la sesión
     */
    showProtectedContent() {
        // Agregar información del usuario a la página
        this.addUserInfo();
        
        // Agregar botón de logout
        this.addLogoutButton();
        
        // Marcar contenido como autenticado
        const protectedElements = document.querySelectorAll('.protected-content');
        protectedElements.forEach(el => {
            el.classList.add('authenticated');
            el.style.display = 'block';
        });
    }

    /**
     * Agrega información del usuario a la página
     */
    addUserInfo() {
        if (!window.authSystem || !window.authSystem.getCurrentUser()) {
            return;
        }

        const user = window.authSystem.getCurrentUser();
        
        // Crear elemento de información del usuario
        const userInfo = document.createElement('div');
        userInfo.className = 'session-user-info';
        userInfo.innerHTML = `
            <div class="user-details">
                <span class="user-name">
                    <i class="fas fa-user"></i> ${user.username}
                </span>
                <span class="user-role">
                    <i class="fas fa-user-tag"></i> ${this.getRoleDisplayName(user.role)}
                </span>
                <span class="session-info">
                    <i class="fas fa-book"></i> Sesión del Curso
                </span>
            </div>
        `;

        // Insertar al inicio del body
        document.body.insertBefore(userInfo, document.body.firstChild);

        // Agregar estilos
        const style = document.createElement('style');
        style.textContent = `
            .session-user-info {
                background: rgba(102, 126, 234, 0.1);
                border-bottom: 2px solid #667eea;
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }
            .session-user-info .user-details {
                display: flex;
                align-items: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            .session-user-info .user-name,
            .session-user-info .user-role,
            .session-user-info .session-info {
                display: flex;
                align-items: center;
                gap: 6px;
                color: #333;
                font-weight: 500;
                font-size: 14px;
            }
            .session-user-info .user-name i {
                color: #667eea;
            }
            .session-user-info .user-role i {
                color: #764ba2;
            }
            .session-user-info .session-info i {
                color: #28a745;
            }
            @media (max-width: 768px) {
                .session-user-info {
                    padding: 8px 15px;
                }
                .session-user-info .user-details {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 5px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Agrega botón de logout a la página
     */
    addLogoutButton() {
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'session-logout-btn';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
        logoutBtn.onclick = () => {
            if (window.authSystem) {
                window.authSystem.logout();
                window.location.href = 'index.html';
            }
        };

        // Agregar estilos para el botón
        const style = document.createElement('style');
        style.textContent = `
            .session-logout-btn {
                background: #dc3545;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 6px;
                margin-left: auto;
            }
            .session-logout-btn:hover {
                background: #c82333;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(style);

        // Agregar el botón al header de la sesión
        const sessionHeader = document.querySelector('.session-user-info');
        if (sessionHeader) {
            sessionHeader.appendChild(logoutBtn);
        }
    }

    /**
     * Obtiene el nombre display del rol
     */
    getRoleDisplayName(role) {
        const roleNames = {
            'admin': 'Administrador',
            'teacher': 'Profesor',
            'student': 'Estudiante'
        };
        return roleNames[role] || role;
    }

    /**
     * Muestra mensaje de error
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .auth-error {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #dc3545;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }
            .auth-error .error-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(errorDiv);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Inicializar el guard de autenticación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.authGuard = new AuthGuard();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthGuard;
}
