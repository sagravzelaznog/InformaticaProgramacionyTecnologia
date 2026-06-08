/**
 * SISTEMA DE AUTENTICACIÓN PARA NETLIFY
 * Versión adaptada sin backend - Solo frontend
 */

class AuthSystemNetlify {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.pendingUsers = this.loadPendingUsers();
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
     * Carga usuarios pendientes desde localStorage
     */
    loadPendingUsers() {
        try {
            const pending = localStorage.getItem('python_course_pending');
            return pending ? JSON.parse(pending) : [];
        } catch (error) {
            console.error('Error cargando usuarios pendientes:', error);
            return [];
        }
    }

    /**
     * Guarda usuarios pendientes en localStorage
     */
    savePendingUsers() {
        try {
            localStorage.setItem('python_course_pending', JSON.stringify(this.pendingUsers));
        } catch (error) {
            console.error('Error guardando usuarios pendientes:', error);
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
     * Genera código de aprobación único
     */
    generateApprovalCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
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
                lastLogin: null,
                status: 'active'
            },
            {
                id: 2,
                username: 'estudiante',
                email: 'estudiante@python-course.com',
                passwordHash: await this.hashPassword('estudiante123'),
                role: 'student',
                createdAt: new Date().toISOString(),
                lastLogin: null,
                status: 'active'
            },
            {
                id: 3,
                username: 'profesor',
                email: 'profesor@python-course.com',
                passwordHash: await this.hashPassword('profesor123'),
                role: 'teacher',
                createdAt: new Date().toISOString(),
                lastLogin: null,
                status: 'active'
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
     * Registra un nuevo usuario (con sistema de códigos de aprobación)
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

        // Verificar si el usuario ya existe
        if (this.users.find(u => u.username === username || u.email === email)) {
            throw new Error('El usuario o email ya existe');
        }

        if (this.pendingUsers.find(u => u.username === username || u.email === email)) {
            throw new Error('El usuario ya está pendiente de aprobación');
        }

        // Generar código de aprobación
        const approvalCode = this.generateApprovalCode();

        // Crear usuario pendiente
        const pendingUser = {
            id: Date.now(),
            username,
            email,
            passwordHash: await this.hashPassword(password),
            role,
            approvalCode,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        this.pendingUsers.push(pendingUser);
        this.savePendingUsers();

        // Mostrar código de aprobación
        this.showApprovalCode(pendingUser);

        return {
            success: true,
            message: 'Usuario registrado exitosamente. Usa el código de aprobación para activar tu cuenta.',
            approvalCode: approvalCode,
            status: 'pending_approval'
        };
    }

    /**
     * Muestra el código de aprobación al usuario
     */
    showApprovalCode(user) {
        const codeHTML = `
            <div class="approval-code-container">
                <div class="approval-code-card">
                    <div class="code-header">
                        <i class="fas fa-key"></i>
                        <h2>Código de Aprobación</h2>
                    </div>
                    
                    <div class="code-content">
                        <p><strong>¡Hola ${user.username}!</strong></p>
                        <p>Tu registro ha sido exitoso. Para activar tu cuenta, usa el siguiente código:</p>
                        
                        <div class="approval-code">
                            <h3>${user.approvalCode}</h3>
                        </div>
                        
                        <div class="code-info">
                            <h4>📋 Instrucciones:</h4>
                            <ol>
                                <li>Contacta al administrador: <strong>mc.manuel.gonzalez.ptel@gmail.com</strong></li>
                                <li>Proporciona este código: <strong>${user.approvalCode}</strong></li>
                                <li>El administrador activará tu cuenta</li>
                                <li>Recibirás confirmación por email</li>
                            </ol>
                        </div>
                        
                        <div class="code-actions">
                            <button onclick="copyApprovalCode('${user.approvalCode}')" class="copy-code-btn">
                                <i class="fas fa-copy"></i> Copiar Código
                            </button>
                            <button onclick="checkApprovalStatus('${user.email}')" class="check-status-btn">
                                <i class="fas fa-sync-alt"></i> Verificar Estado
                            </button>
                        </div>
                        
                        <div class="admin-contact">
                            <h4>📧 Contacto del Administrador</h4>
                            <p>Email: <strong>mc.manuel.gonzalez.ptel@gmail.com</strong></p>
                            <p>Asunto: <strong>Activación de cuenta - Código: ${user.approvalCode}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Reemplazar contenido del login
        const loginContainer = document.getElementById('login-form');
        if (loginContainer) {
            loginContainer.innerHTML = codeHTML;
        }

        // Agregar estilos
        this.addApprovalCodeStyles();

        // Agregar funciones globales
        window.copyApprovalCode = (code) => {
            navigator.clipboard.writeText(code).then(() => {
                this.showMessage('¡Código copiado al portapapeles!', 'success');
            }).catch(() => {
                this.showMessage('Error copiando código', 'error');
            });
        };

        window.checkApprovalStatus = (email) => {
            const pendingUser = this.pendingUsers.find(u => u.email === email);
            if (!pendingUser) {
                // Verificar si ya fue aprobado
                const approvedUser = this.users.find(u => u.email === email);
                if (approvedUser) {
                    this.showMessage('¡Tu cuenta ha sido aprobada! Ya puedes iniciar sesión.', 'success');
                    setTimeout(() => window.location.reload(), 2000);
                } else {
                    this.showMessage('Usuario no encontrado.', 'warning');
                }
            } else {
                this.showMessage(`Tu cuenta aún está pendiente de aprobación. Código: ${pendingUser.approvalCode}`, 'info');
            }
        };
    }

    /**
     * Agrega estilos para el código de aprobación
     */
    addApprovalCodeStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .approval-code-container {
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
            
            .approval-code-card {
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                padding: 40px;
                max-width: 600px;
                width: 90%;
                margin: 20px;
            }
            
            .code-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .code-header i {
                font-size: 48px;
                color: #667eea;
                margin-bottom: 15px;
            }
            
            .code-header h2 {
                color: #333;
                margin: 0;
                font-size: 24px;
            }
            
            .code-content {
                color: #555;
                line-height: 1.6;
            }
            
            .approval-code {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                margin: 20px 0;
                font-family: 'Courier New', monospace;
            }
            
            .approval-code h3 {
                margin: 0;
                font-size: 32px;
                letter-spacing: 4px;
                font-weight: bold;
            }
            
            .code-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .code-info h4 {
                color: #333;
                margin-top: 0;
            }
            
            .code-info ol {
                margin: 10px 0;
                padding-left: 20px;
            }
            
            .code-info li {
                margin: 8px 0;
            }
            
            .code-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin: 30px 0;
            }
            
            .copy-code-btn, .check-status-btn {
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
            
            .copy-code-btn:hover, .check-status-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            
            .admin-contact {
                background: #e3f2fd;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: center;
            }
            
            .admin-contact h4 {
                color: #1976d2;
                margin-top: 0;
            }
            
            @media (max-width: 480px) {
                .code-actions {
                    flex-direction: column;
                }
                
                .approval-code h3 {
                    font-size: 24px;
                    letter-spacing: 2px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Aprobar usuario con código
     */
    approveUser(email, code) {
        const pendingIndex = this.pendingUsers.findIndex(u => u.email === email && u.approvalCode === code);
        
        if (pendingIndex === -1) {
            throw new Error('Código de aprobación inválido o usuario no encontrado');
        }

        const pendingUser = this.pendingUsers[pendingIndex];
        
        // Mover a usuarios activos
        const approvedUser = {
            ...pendingUser,
            status: 'active',
            approvedAt: new Date().toISOString(),
            approvedBy: 'admin'
        };

        this.users.push(approvedUser);
        this.pendingUsers.splice(pendingIndex, 1);
        
        this.saveUsers();
        this.savePendingUsers();

        // Enviar notificación
        this.showNotification(`Usuario ${pendingUser.username} aprobado exitosamente`, 'success');

        return approvedUser;
    }

    /**
     * Muestra notificación del navegador
     */
    showNotification(message, type = 'info') {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Curso Python', {
                body: message,
                icon: '/favicon.ico'
            });
        }
        
        // También mostrar mensaje en la interfaz
        this.showMessage(message, type);
    }

    /**
     * Solicita permiso para notificaciones
     */
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showMessage('Notificaciones habilitadas', 'success');
                }
            });
        }
    }

    /**
     * Autentica un usuario
     */
    async login(username, password) {
        const user = this.users.find(u => u.username === username && u.status === 'active');
        
        if (!user) {
            throw new Error('Usuario no encontrado o no activo');
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

        // Enviar notificación
        this.showNotification(`¡Bienvenido, ${username}!`, 'success');

        return currentUser;
    }

    /**
     * Cierra la sesión del usuario
     */
    logout() {
        this.currentUser = null;
        this.saveCurrentUser(null);
        this.showLoginForm();
        this.showNotification('Sesión cerrada', 'info');
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
                    
                    <div class="admin-approval-section">
                        <h4>🔧 Panel de Administración</h4>
                        <button id="admin-panel-btn" class="admin-panel-btn">
                            <i class="fas fa-cog"></i> Gestionar Usuarios
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insertar formulario al inicio del body
        document.body.insertAdjacentHTML('afterbegin', loginHTML);
        
        // Agregar event listeners
        this.setupLoginFormEvents();
        
        // Solicitar permiso para notificaciones
        this.requestNotificationPermission();
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

        // Panel de administración
        const adminPanelBtn = document.getElementById('admin-panel-btn');
        if (adminPanelBtn) {
            adminPanelBtn.addEventListener('click', () => {
                this.showAdminPanel();
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
            this.showMessage(result.message, 'success');
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Muestra el panel de administración
     */
    showAdminPanel() {
        const adminHTML = `
            <div class="admin-panel-overlay">
                <div class="admin-panel">
                    <div class="admin-header">
                        <h2><i class="fas fa-cog"></i> Panel de Administración</h2>
                        <button class="close-admin" onclick="this.parentElement.parentElement.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="admin-content">
                        <div class="admin-section">
                            <h3>👥 Usuarios Pendientes</h3>
                            <div id="pending-users-list">
                                ${this.renderPendingUsers()}
                            </div>
                        </div>
                        
                        <div class="admin-section">
                            <h3>✅ Usuarios Activos</h3>
                            <div id="active-users-list">
                                ${this.renderActiveUsers()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', adminHTML);
    }

    /**
     * Renderiza usuarios pendientes
     */
    renderPendingUsers() {
        if (this.pendingUsers.length === 0) {
            return '<p>No hay usuarios pendientes</p>';
        }

        return this.pendingUsers.map(user => `
            <div class="user-item pending">
                <div class="user-info">
                    <strong>${user.username}</strong> (${user.email})
                    <br><small>Rol: ${this.getRoleDisplayName(user.role)}</small>
                    <br><small>Código: <strong>${user.approvalCode}</strong></small>
                </div>
                <div class="user-actions">
                    <button onclick="authSystem.approveUserByCode('${user.email}', '${user.approvalCode}')" 
                            class="btn-approve">
                        <i class="fas fa-check"></i> Aprobar
                    </button>
                    <button onclick="authSystem.rejectUser('${user.email}')" 
                            class="btn-reject">
                        <i class="fas fa-times"></i> Rechazar
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Renderiza usuarios activos
     */
    renderActiveUsers() {
        if (this.users.length === 0) {
            return '<p>No hay usuarios activos</p>';
        }

        return this.users.map(user => `
            <div class="user-item active">
                <div class="user-info">
                    <strong>${user.username}</strong> (${user.email})
                    <br><small>Rol: ${this.getRoleDisplayName(user.role)}</small>
                    <br><small>Último login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Nunca'}</small>
                </div>
                <div class="user-actions">
                    <button onclick="authSystem.deactivateUser('${user.email}')" 
                            class="btn-deactivate">
                        <i class="fas fa-ban"></i> Desactivar
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Aprueba usuario por código
     */
    approveUserByCode(email, code) {
        try {
            this.approveUser(email, code);
            this.showMessage('Usuario aprobado exitosamente', 'success');
            this.showAdminPanel(); // Refrescar panel
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    /**
     * Rechaza usuario
     */
    rejectUser(email) {
        const index = this.pendingUsers.findIndex(u => u.email === email);
        if (index !== -1) {
            this.pendingUsers.splice(index, 1);
            this.savePendingUsers();
            this.showMessage('Usuario rechazado', 'info');
            this.showAdminPanel(); // Refrescar panel
        }
    }

    /**
     * Desactiva usuario
     */
    deactivateUser(email) {
        const user = this.users.find(u => u.email === email);
        if (user) {
            user.status = 'inactive';
            this.saveUsers();
            this.showMessage('Usuario desactivado', 'warning');
            this.showAdminPanel(); // Refrescar panel
        }
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
    window.authSystem = new AuthSystemNetlify();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystemNetlify;
}

