/**
 * SISTEMA DE AUTENTICACIÓN PARA CURSO DE PYTHON
 * Manejo de usuarios, hash de contraseñas y autenticación
 */

class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.init();
    }

    /**
     * Inicializa el sistema de autenticación
     */
    init() {
        // Crear usuarios por defecto si no existen
        if (this.users.length === 0) {
            this.createDefaultUsers();
        }
        
        // Verificar autenticación al cargar la página
        this.checkAuth();
    }

    /**
     * Carga usuarios desde localStorage
     */
    loadUsers() {
        try {
            const users = localStorage.getItem('python_course_users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error cargando usuarios:', error);
            return [];
        }
    }

    /**
     * Guarda usuarios en localStorage
     */
    saveUsers() {
        try {
            localStorage.setItem('python_course_users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error guardando usuarios:', error);
        }
    }

    /**
     * Carga el usuario actual desde localStorage
     */
    loadCurrentUser() {
        try {
            const user = localStorage.getItem('python_course_current_user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error cargando usuario actual:', error);
            return null;
        }
    }

    /**
     * Guarda el usuario actual en localStorage
     */
    saveCurrentUser(user) {
        try {
            if (user) {
                localStorage.setItem('python_course_current_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('python_course_current_user');
            }
        } catch (error) {
            console.error('Error guardando usuario actual:', error);
        }
    }

    /**
     * Genera hash de contraseña usando algoritmo simple pero efectivo
     */
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'python_course_salt_2025');
        
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }

    /**
     * Verifica contraseña contra hash
     */
    async verifyPassword(password, hash) {
        const passwordHash = await this.hashPassword(password);
        return passwordHash === hash;
    }

    /**
     * Crea usuarios por defecto
     */
    async createDefaultUsers() {
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@python-course.com',
                passwordHash: await this.hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 2,
                username: 'estudiante',
                email: 'estudiante@python-course.com',
                passwordHash: await this.hashPassword('estudiante123'),
                role: 'student',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            {
                id: 3,
                username: 'profesor',
                email: 'profesor@python-course.com',
                passwordHash: await this.hashPassword('profesor123'),
                role: 'teacher',
                createdAt: new Date().toISOString(),
                lastLogin: null
            }
        ];

        this.users = defaultUsers;
        this.saveUsers();
        
        console.log('Usuarios por defecto creados:');
        console.log('- admin / admin123 (Administrador)');
        console.log('- estudiante / estudiante123 (Estudiante)');
        console.log('- profesor / profesor123 (Profesor)');
    }

    /**
     * Registra un nuevo usuario (envía para aprobación)
     */
    async register(username, email, password, role = 'student') {
        // Validaciones
        if (!username || !email || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (username.length < 3) {
            throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
        }

        if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        if (!this.isValidEmail(email)) {
            throw new Error('El email no es válido');
        }

        // Verificar si el usuario ya existe localmente
        if (this.users.find(u => u.username === username || u.email === email)) {
            throw new Error('El usuario o email ya existe');
        }

        try {
            // Enviar registro al servidor para aprobación
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role
                })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message);
            }

            return {
                success: true,
                message: result.message,
                status: 'pending_approval'
            };

        } catch (error) {
            // Si no hay servidor disponible, usar registro local como fallback
            console.warn('Servidor no disponible, usando registro local:', error.message);
            
            const newUser = {
                id: Date.now(),
                username,
                email,
                passwordHash: await this.hashPassword(password),
                role,
                createdAt: new Date().toISOString(),
                lastLogin: null
            };

            this.users.push(newUser);
            this.saveUsers();

            return {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt,
                status: 'approved_local'
            };
        }
    }

    /**
     * Autentica un usuario
     */
    async login(username, password) {
        const user = this.users.find(u => u.username === username);
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await this.verifyPassword(password, user.passwordHash);
        
        if (!isValidPassword) {
            throw new Error('Contraseña incorrecta');
        }

        // Actualizar último login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Guardar usuario actual
        const currentUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            loginTime: new Date().toISOString()
        };

        this.currentUser = currentUser;
        this.saveCurrentUser(currentUser);

        return currentUser;
    }

    /**
     * Cierra la sesión del usuario
     */
    logout() {
        this.currentUser = null;
        this.saveCurrentUser(null);
        this.showLoginForm();
    }

    /**
     * Verifica si el usuario está autenticado
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Verifica si el usuario tiene un rol específico
     */
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    }

    /**
     * Obtiene el usuario actual
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Valida formato de email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Verifica autenticación y redirige si es necesario
     */
    checkAuth() {
        if (!this.isAuthenticated()) {
            this.showLoginForm();
        } else {
            this.showProtectedContent();
        }
    }

    /**
     * Muestra el formulario de login
     */
    showLoginForm() {
        // Ocultar contenido protegido
        const protectedElements = document.querySelectorAll('.protected-content');
        protectedElements.forEach(el => el.style.display = 'none');

        // Crear o mostrar formulario de login
        this.createLoginForm();
    }

    /**
     * Muestra el contenido protegido
     */
    showProtectedContent() {
        // Mostrar contenido protegido
        const protectedElements = document.querySelectorAll('.protected-content');
        protectedElements.forEach(el => el.style.display = 'block');

        // Ocultar formulario de login si existe
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.remove();
        }

        // Mostrar información del usuario
        this.showUserInfo();
    }

    /**
     * Crea el formulario de login
     */
    createLoginForm() {
        // Remover formulario existente si hay uno
        const existingForm = document.getElementById('login-form');
        if (existingForm) {
            existingForm.remove();
        }

        const loginHTML = `
            <div id="login-form" class="login-container">
                <div class="login-card">
                    <div class="login-header">
                        <h2><i class="fab fa-python"></i> Acceso al Curso de Python</h2>
                        <p>Ingresa tus credenciales para acceder al curso</p>
                    </div>
                    
                    <form id="auth-form" class="login-form">
                        <div class="form-group">
                            <label for="username">Usuario:</label>
                            <input type="text" id="username" name="username" required 
                                   placeholder="Ingresa tu usuario">
                        </div>
                        
                        <div class="form-group">
                            <label for="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required 
                                   placeholder="Ingresa tu contraseña">
                        </div>
                        
                        <button type="submit" class="login-btn">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </button>
                        
                        <div class="login-links">
                            <a href="#" id="show-register">¿No tienes cuenta? Regístrate</a>
                        </div>
                    </form>
                    
                    <div id="register-form" class="register-form" style="display: none;">
                        <h3>Crear Nueva Cuenta</h3>
                        <form id="auth-register-form">
                            <div class="form-group">
                                <label for="reg-username">Usuario:</label>
                                <input type="text" id="reg-username" name="username" required 
                                       placeholder="Mínimo 3 caracteres">
                            </div>
                            
                            <div class="form-group">
                                <label for="reg-email">Email:</label>
                                <input type="email" id="reg-email" name="email" required 
                                       placeholder="tu@email.com">
                            </div>
                            
                            <div class="form-group">
                                <label for="reg-password">Contraseña:</label>
                                <input type="password" id="reg-password" name="password" required 
                                       placeholder="Mínimo 6 caracteres">
                            </div>
                            
                            <div class="form-group">
                                <label for="reg-role">Rol:</label>
                                <select id="reg-role" name="role">
                                    <option value="student">Estudiante</option>
                                    <option value="teacher">Profesor</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="register-btn">
                                <i class="fas fa-user-plus"></i> Crear Cuenta
                            </button>
                            
                            <div class="login-links">
                                <a href="#" id="show-login">¿Ya tienes cuenta? Inicia sesión</a>
                            </div>
                        </form>
                    </div>
                    
                    <div class="default-users">
                        <h4>Usuarios de prueba:</h4>
                        <div class="user-buttons">
                            <button class="demo-user" data-username="admin" data-password="admin123">
                                Admin (admin123)
                            </button>
                            <button class="demo-user" data-username="estudiante" data-password="estudiante123">
                                Estudiante (estudiante123)
                            </button>
                            <button class="demo-user" data-username="profesor" data-password="profesor123">
                                Profesor (profesor123)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insertar formulario al inicio del body
        document.body.insertAdjacentHTML('afterbegin', loginHTML);
        
        // Agregar event listeners
        this.setupLoginFormEvents();
    }

    /**
     * Configura los eventos del formulario de login
     */
    setupLoginFormEvents() {
        // Formulario de login
        const loginForm = document.getElementById('auth-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleLogin(e);
            });
        }

        // Formulario de registro
        const registerForm = document.getElementById('auth-register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleRegister(e);
            });
        }

        // Botones de usuarios demo
        const demoButtons = document.querySelectorAll('.demo-user');
        demoButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const username = button.dataset.username;
                const password = button.dataset.password;
                
                document.getElementById('username').value = username;
                document.getElementById('password').value = password;
                
                try {
                    await this.login(username, password);
                    this.showMessage('¡Bienvenido!', 'success');
                } catch (error) {
                    this.showMessage(error.message, 'error');
                }
            });
        });

        // Toggle entre login y registro
        const showRegister = document.getElementById('show-register');
        const showLogin = document.getElementById('show-login');
        const loginFormEl = document.getElementById('auth-form');
        const registerFormEl = document.getElementById('register-form');

        if (showRegister) {
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                loginFormEl.style.display = 'none';
                registerFormEl.style.display = 'block';
            });
        }

        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                registerFormEl.style.display = 'none';
                loginFormEl.style.display = 'block';
            });
        }
    }

    /**
     * Maneja el proceso de login
     */
    async handleLogin(e) {
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            await this.login(username, password);
            this.showMessage(`¡Bienvenido, ${username}!`, 'success');
            this.showProtectedContent();
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Maneja el proceso de registro
     */
    async handleRegister(e) {
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const role = formData.get('role');

        try {
            const result = await this.register(username, email, password, role);
            
            if (result.status === 'pending_approval') {
                // Mostrar mensaje de aprobación pendiente
                this.showPendingApprovalMessage(username, email);
            } else {
                // Registro local exitoso
                this.showMessage('¡Cuenta creada exitosamente!', 'success');
                
                // Cambiar a formulario de login
                document.getElementById('register-form').style.display = 'none';
                document.getElementById('auth-form').style.display = 'block';
                
                // Llenar campos de login
                document.getElementById('username').value = username;
                document.getElementById('password').value = password;
            }
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Muestra mensaje de aprobación pendiente
     */
    showPendingApprovalMessage(username, email) {
        const messageHTML = `
            <div class="pending-approval-container">
                <div class="pending-approval-card">
                    <div class="approval-header">
                        <i class="fas fa-clock"></i>
                        <h2>Registro Enviado para Aprobación</h2>
                    </div>
                    
                    <div class="approval-content">
                        <p><strong>¡Hola ${username}!</strong></p>
                        <p>Tu registro ha sido enviado exitosamente y está pendiente de aprobación.</p>
                        
                        <div class="approval-info">
                            <h3>📧 ¿Qué sigue?</h3>
                            <ul>
                                <li>Se ha enviado un correo al administrador para revisar tu solicitud</li>
                                <li>Recibirás un correo de confirmación cuando tu cuenta sea aprobada</li>
                                <li>El proceso de aprobación puede tomar hasta 24 horas</li>
                            </ul>
                        </div>
                        
                        <div class="approval-email">
                            <p><strong>Email registrado:</strong> ${email}</p>
                        </div>
                        
                        <div class="approval-actions">
                            <button onclick="checkApprovalStatus('${email}')" class="check-status-btn">
                                <i class="fas fa-sync-alt"></i> Verificar Estado
                            </button>
                            <button onclick="window.location.reload()" class="refresh-btn">
                                <i class="fas fa-refresh"></i> Actualizar Página
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Reemplazar contenido del login
        const loginContainer = document.getElementById('login-form');
        if (loginContainer) {
            loginContainer.innerHTML = messageHTML;
        }

        // Agregar estilos
        const style = document.createElement('style');
        style.textContent = `
            .pending-approval-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            
            .pending-approval-card {
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                padding: 40px;
                max-width: 500px;
                width: 90%;
                margin: 20px;
            }
            
            .approval-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .approval-header i {
                font-size: 48px;
                color: #ffc107;
                margin-bottom: 15px;
            }
            
            .approval-header h2 {
                color: #333;
                margin: 0;
                font-size: 24px;
            }
            
            .approval-content {
                color: #555;
                line-height: 1.6;
            }
            
            .approval-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .approval-info h3 {
                color: #333;
                margin-top: 0;
            }
            
            .approval-info ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            
            .approval-info li {
                margin: 8px 0;
            }
            
            .approval-email {
                background: #e3f2fd;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                text-align: center;
            }
            
            .approval-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .check-status-btn, .refresh-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .check-status-btn:hover, .refresh-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            
            @media (max-width: 480px) {
                .approval-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);

        // Agregar función global para verificar estado
        window.checkApprovalStatus = async (email) => {
            try {
                const response = await fetch(`/api/user-status/${email}`);
                const result = await response.json();
                
                if (result.success) {
                    if (result.status === 'approved') {
                        this.showMessage('¡Tu cuenta ha sido aprobada! Ya puedes iniciar sesión.', 'success');
                        setTimeout(() => window.location.reload(), 2000);
                    } else if (result.status === 'pending') {
                        this.showMessage('Tu cuenta aún está pendiente de aprobación.', 'info');
                    } else {
                        this.showMessage('Usuario no encontrado.', 'warning');
                    }
                }
            } catch (error) {
                this.showMessage('Error verificando estado. Intenta más tarde.', 'error');
            }
        };
    }

    /**
     * Muestra información del usuario autenticado
     */
    showUserInfo() {
        // Remover info de usuario existente
        const existingInfo = document.getElementById('user-info');
        if (existingInfo) {
            existingInfo.remove();
        }

        if (this.currentUser) {
            const userInfoHTML = `
                <div id="user-info" class="user-info">
                    <div class="user-details">
                        <span class="user-name">
                            <i class="fas fa-user"></i> ${this.currentUser.username}
                        </span>
                        <span class="user-role">
                            <i class="fas fa-user-tag"></i> ${this.getRoleDisplayName(this.currentUser.role)}
                        </span>
                        <button id="logout-btn" class="logout-btn">
                            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            `;

            // Insertar en el header
            const header = document.querySelector('.header .container');
            if (header) {
                header.insertAdjacentHTML('beforeend', userInfoHTML);
                
                // Event listener para logout
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', () => {
                        this.logout();
                        this.showMessage('Sesión cerrada exitosamente', 'info');
                    });
                }
            }
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
     * Muestra mensajes al usuario
     */
    showMessage(message, type = 'info') {
        // Remover mensaje existente
        const existingMessage = document.getElementById('auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageHTML = `
            <div id="auth-message" class="auth-message ${type}">
                <i class="fas fa-${this.getMessageIcon(type)}"></i>
                <span>${message}</span>
                <button class="close-message">&times;</button>
            </div>
        `;

        // Insertar mensaje
        const loginContainer = document.getElementById('login-form');
        const userInfo = document.getElementById('user-info');
        const container = loginContainer || userInfo || document.body;
        
        if (container) {
            container.insertAdjacentHTML('afterbegin', messageHTML);
            
            // Auto-remover después de 5 segundos
            setTimeout(() => {
                const msg = document.getElementById('auth-message');
                if (msg) msg.remove();
            }, 5000);

            // Botón de cerrar
            const closeBtn = document.querySelector('.close-message');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    const msg = document.getElementById('auth-message');
                    if (msg) msg.remove();
                });
            }
        }
    }

    /**
     * Obtiene el icono para el tipo de mensaje
     */
    getMessageIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Inicializar sistema de autenticación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}
