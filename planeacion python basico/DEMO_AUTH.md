# Demo del Sistema de Autenticación

## 🎯 Prueba Rápida

### Paso 1: Acceder al Curso
1. Abrir `index.html` en tu navegador
2. Verás el formulario de login automáticamente

### Paso 2: Usar Usuario Demo
Hacer clic en cualquiera de estos botones:

- **Admin (admin123)** - Acceso completo
- **Estudiante (estudiante123)** - Acceso estándar  
- **Profesor (profesor123)** - Acceso de enseñanza

### Paso 3: Explorar el Curso
- Navegar por los módulos
- Hacer clic en cualquier sesión (ej: Sesión 1)
- Verificar que estás autenticado

### Paso 4: Probar Logout
- Hacer clic en "Cerrar Sesión" en la esquina superior
- Verificar que regresas al login

## 🔍 Funcionalidades a Probar

### ✅ Login/Logout
- [ ] Login con usuarios demo
- [ ] Logout funcional
- [ ] Persistencia de sesión

### ✅ Registro de Usuarios
- [ ] Crear nueva cuenta
- [ ] Validación de campos
- [ ] Login con nueva cuenta

### ✅ Protección de Páginas
- [ ] Acceso a páginas de sesiones
- [ ] Redirección sin autenticación
- [ ] Información de usuario visible

### ✅ Responsive Design
- [ ] Funciona en móvil
- [ ] Formularios adaptables
- [ ] Navegación táctil

## 🎨 Características Visuales

### Diseño Moderno
- Gradientes atractivos
- Animaciones suaves
- Iconos de Font Awesome
- Tipografía clara

### Estados Interactivos
- Hover effects en botones
- Focus states accesibles
- Mensajes de feedback
- Loading states

### Responsive
- Adaptable a móviles
- Tablet-friendly
- Desktop optimizado

## 🔧 Datos de Prueba

### Usuarios Predefinidos
```javascript
// Usuarios disponibles para pruebas
const usuariosDemo = [
    {
        usuario: 'admin',
        password: 'admin123',
        rol: 'Administrador'
    },
    {
        usuario: 'estudiante', 
        password: 'estudiante123',
        rol: 'Estudiante'
    },
    {
        usuario: 'profesor',
        password: 'profesor123', 
        rol: 'Profesor'
    }
];
```

### Nuevo Usuario de Prueba
- **Usuario**: `testuser`
- **Email**: `test@ejemplo.com`
- **Contraseña**: `test123`
- **Rol**: `Estudiante`

## 🚀 Flujo Completo de Prueba

1. **Acceso Inicial**
   - Abrir index.html
   - Ver formulario de login

2. **Login Demo**
   - Clic en "Estudiante (estudiante123)"
   - Ver contenido del curso

3. **Navegación**
   - Ir a "Sesión 1: Introducción"
   - Verificar autenticación

4. **Registro**
   - Logout
   - Crear nueva cuenta
   - Login con nueva cuenta

5. **Protección**
   - Intentar acceder a s1.html directamente
   - Verificar redirección al login

## 🎯 Casos de Prueba

### Casos Exitosos
- ✅ Login con credenciales válidas
- ✅ Registro con datos correctos
- ✅ Acceso a contenido autenticado
- ✅ Logout exitoso

### Casos de Error
- ❌ Login con usuario inexistente
- ❌ Login con contraseña incorrecta
- ❌ Registro con email inválido
- ❌ Registro con usuario existente

### Casos Límite
- 🔄 Sesión expirada
- 🔄 Navegación directa a sesiones
- 🔄 Recarga de página
- 🔄 Múltiples pestañas

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

### Características Requeridas
- ✅ JavaScript habilitado
- ✅ localStorage disponible
- ✅ CSS Grid/Flexbox
- ✅ ES6+ support

## 🔍 Debugging

### Consola del Navegador
```javascript
// Ver estado actual del sistema
console.log(window.authSystem);

// Ver usuarios almacenados
console.log(JSON.parse(localStorage.getItem('python_course_users')));

// Ver usuario actual
console.log(JSON.parse(localStorage.getItem('python_course_current_user')));
```

### Errores Comunes
1. **"AuthSystem no encontrado"**
   - Verificar que auth.js se carga
   - Revisar consola para errores

2. **"Página no protegida"**
   - Verificar que auth-guard.js se carga
   - Ejecutar protect-sessions.js

3. **"Estilos no aplicados"**
   - Verificar que auth.css se incluye
   - Limpiar caché del navegador

## 🎉 ¡Listo para Usar!

El sistema de autenticación está completamente funcional y listo para proteger tu curso de Python. ¡Disfruta de la experiencia segura y moderna!
