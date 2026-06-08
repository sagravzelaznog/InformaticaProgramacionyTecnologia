# Sistema de Autenticación - Curso de Python Básico

## 🔒 Descripción

Se ha implementado un sistema completo de autenticación para proteger el acceso al curso de Python básico. El sistema incluye:

- **Base de datos de usuarios** con hash de contraseñas
- **Formulario de login/registro** moderno y responsive
- **Protección automática** de todas las páginas del curso
- **Roles de usuario** (Admin, Profesor, Estudiante)
- **Gestión de sesiones** segura

## 🚀 Características

### Seguridad
- ✅ Hash de contraseñas con SHA-256
- ✅ Validación de entrada de datos
- ✅ Protección contra ataques básicos
- ✅ Sesiones seguras con localStorage

### Usabilidad
- ✅ Interfaz moderna y responsive
- ✅ Botones de usuarios demo para pruebas
- ✅ Mensajes de error informativos
- ✅ Navegación intuitiva

### Funcionalidades
- ✅ Sistema de registro de nuevos usuarios
- ✅ Login con validación
- ✅ Logout seguro
- ✅ Protección automática de páginas
- ✅ Información de usuario visible

## 👥 Usuarios por Defecto

El sistema viene con 3 usuarios preconfigurados:

| Usuario | Contraseña | Rol | Descripción |
|---------|------------|-----|-------------|
| `admin` | `admin123` | Administrador | Acceso completo al sistema |
| `estudiante` | `estudiante123` | Estudiante | Acceso a contenido del curso |
| `profesor` | `profesor123` | Profesor | Acceso con privilegios de enseñanza |

## 🛠️ Instalación y Configuración

### 1. Archivos Agregados

```
js/
├── auth.js          # Sistema principal de autenticación
├── auth-guard.js    # Middleware de protección de páginas
└── ...

css/
├── auth.css         # Estilos para el sistema de auth
└── ...

protect-sessions.js  # Script para proteger páginas automáticamente
```

### 2. Archivos Modificados

- `index.html` - Agregado sistema de auth y clases de protección
- Todas las páginas `s*.html` - Protegidas automáticamente

### 3. Configuración Automática

El sistema se configura automáticamente:
- Crea usuarios por defecto al primer uso
- Protege todas las páginas de sesiones
- Inicializa la base de datos de usuarios

## 📖 Uso del Sistema

### Acceso Inicial

1. **Abrir el curso**: Navegar a `index.html`
2. **Login automático**: Se mostrará el formulario de login
3. **Usar usuario demo**: Hacer clic en cualquier botón de usuario demo
4. **O registrarse**: Crear una nueva cuenta

### Navegación

- **Página principal**: Acceso completo después del login
- **Sesiones individuales**: Protegidas automáticamente
- **Logout**: Botón disponible en la esquina superior derecha

### Registro de Nuevos Usuarios

1. En el formulario de login, hacer clic en "¿No tienes cuenta? Regístrate"
2. Llenar el formulario de registro:
   - Usuario (mínimo 3 caracteres)
   - Email válido
   - Contraseña (mínimo 6 caracteres)
   - Rol (Estudiante o Profesor)
3. Hacer clic en "Crear Cuenta"

## 🔧 Personalización

### Agregar Nuevos Usuarios Programáticamente

```javascript
// Ejemplo de uso del sistema de auth
const authSystem = window.authSystem;

// Registrar nuevo usuario
await authSystem.register('nuevousuario', 'email@ejemplo.com', 'password123', 'student');

// Login manual
await authSystem.login('usuario', 'password');
```

### Modificar Roles

Los roles disponibles son:
- `admin` - Administrador
- `teacher` - Profesor  
- `student` - Estudiante

### Personalizar Estilos

Editar `css/auth.css` para modificar la apariencia del sistema de autenticación.

## 🔒 Seguridad

### Hash de Contraseñas

- Utiliza SHA-256 con salt personalizado
- Las contraseñas nunca se almacenan en texto plano
- Verificación segura de credenciales

### Almacenamiento

- Usuarios almacenados en localStorage del navegador
- Sesión actual mantenida durante la navegación
- Datos se mantienen entre recargas de página

### Validaciones

- Validación de formato de email
- Longitud mínima de usuario y contraseña
- Verificación de unicidad de usuarios
- Sanitización básica de entrada

## 🐛 Solución de Problemas

### Error: "Usuario no encontrado"
- Verificar que el usuario existe
- Usar uno de los usuarios demo para pruebas

### Error: "Contraseña incorrecta"
- Verificar la contraseña
- Usar usuarios demo con contraseñas conocidas

### Problema: No se muestra el contenido
- Verificar que el usuario está autenticado
- Revisar la consola del navegador para errores
- Asegurar que `auth.js` se carga correctamente

### Problema: Estilos no se aplican
- Verificar que `auth.css` está incluido
- Limpiar caché del navegador
- Revisar la consola para errores de CSS

## 📊 Monitoreo

### Logs de Consola

El sistema registra información útil en la consola del navegador:
- Usuarios creados
- Intentos de login
- Errores de autenticación

### Base de Datos de Usuarios

Los usuarios se almacenan en localStorage bajo la clave `python_course_users`:
```javascript
// Ver usuarios actuales
console.log(JSON.parse(localStorage.getItem('python_course_users')));
```

## 🚀 Próximas Mejoras

### Funcionalidades Futuras
- [ ] Recuperación de contraseña por email
- [ ] Autenticación de dos factores
- [ ] Roles más granulares
- [ ] Historial de sesiones
- [ ] Exportación de datos de usuarios

### Mejoras de Seguridad
- [ ] Rate limiting para intentos de login
- [ ] Encriptación adicional de datos sensibles
- [ ] Logs de auditoría
- [ ] Expiración automática de sesiones

## 📞 Soporte

Para problemas o preguntas sobre el sistema de autenticación:

1. Revisar esta documentación
2. Verificar la consola del navegador
3. Comprobar que todos los archivos están presentes
4. Usar los usuarios demo para pruebas

---

**Desarrollado por**: JGMV-PTEL  
**Versión**: 1.0.0  
**Fecha**: Enero 2025
