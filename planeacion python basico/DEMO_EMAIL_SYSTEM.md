# 📧 Demo del Sistema de Aprobación por Email

## 🎯 Prueba Completa del Sistema

### Paso 1: Iniciar el Servidor
```bash
# En la carpeta del proyecto
npm start
```

El servidor se iniciará en `http://localhost:3000`

### Paso 2: Probar Registro de Usuario
1. **Abrir el curso**: Ir a `http://localhost:3000`
2. **Crear nueva cuenta**: 
   - Hacer clic en "¿No tienes cuenta? Regístrate"
   - Llenar el formulario:
     - Usuario: `testuser`
     - Email: `test@ejemplo.com`
     - Contraseña: `test123`
     - Rol: `Estudiante`
   - Hacer clic en "Crear Cuenta"

### Paso 3: Verificar Correo de Aprobación
1. **Revisar email**: El correo se enviará a `mc.manuel.gonzalez.ptel@gmail.com`
2. **Abrir correo**: Buscar asunto "🔔 Nuevo Registro Pendiente"
3. **Hacer clic en "Aprobar Usuario"**

### Paso 4: Aprobar Usuario
1. **Página de aprobación**: Se abrirá automáticamente
2. **Revisar información**: Verificar datos del usuario
3. **Aprobar**: Hacer clic en "✅ Aprobar"
4. **Confirmación**: Ver mensaje de éxito

### Paso 5: Verificar Correo de Bienvenida
1. **Revisar email del usuario**: `test@ejemplo.com`
2. **Abrir correo**: Buscar asunto "🎉 ¡Bienvenido al Curso de Python!"
3. **Hacer clic en "Comenzar Curso"**

### Paso 6: Probar Login
1. **Volver al curso**: `http://localhost:3000`
2. **Iniciar sesión**:
   - Usuario: `testuser`
   - Contraseña: `test123`
3. **Verificar acceso**: Navegar por el curso

## 🔍 Casos de Prueba

### ✅ Caso Exitoso
- [ ] Registro con datos válidos
- [ ] Correo enviado al admin
- [ ] Aprobación exitosa
- [ ] Correo de bienvenida enviado
- [ ] Login funcional

### ❌ Casos de Error
- [ ] Registro con email duplicado
- [ ] Token expirado (esperar 24 horas)
- [ ] Email inválido
- [ ] Contraseña muy corta

### 🔄 Casos Límite
- [ ] Múltiples registros simultáneos
- [ ] Aprobación después de expiración
- [ ] Rechazo de usuario
- [ ] Verificación de estado

## 📧 Plantillas de Correo

### Correo de Solicitud (Admin)
```html
🔔 Nuevo Registro Pendiente - Curso Python: testuser

Detalles del Usuario:
👤 Usuario: testuser
📧 Email: test@ejemplo.com
🎭 Rol: Estudiante
📅 Fecha: [fecha actual]

[✅ Aprobar Usuario] - [❌ Rechazar]
```

### Correo de Bienvenida (Usuario)
```html
🎉 ¡Bienvenido al Curso de Python! - testuser

¡Hola testuser!

Tu registro ha sido aprobado exitosamente y ya tienes acceso completo al Curso Básico de Python.

📋 Tus Credenciales:
👤 Usuario: testuser
🎭 Rol: Estudiante
🔗 Acceso: Ir al Curso

🚀 ¿Qué sigue?
Ya puedes iniciar sesión y comenzar tu aprendizaje en Python. ¡Explora todos los módulos y sesiones disponibles!

[🐍 Comenzar Curso]
```

## 🎨 Interfaz de Aprobación

### Características Visuales
- ✅ Diseño moderno con gradientes
- ✅ Información clara del usuario
- ✅ Botones de acción prominentes
- ✅ Responsive para móviles
- ✅ Confirmaciones visuales

### Estados de la Interfaz
- 🟡 **Pendiente**: Usuario esperando aprobación
- 🟢 **Aprobado**: Usuario activo en el sistema
- 🔴 **Rechazado**: Usuario no autorizado
- ⏰ **Expirado**: Token vencido

## 🔧 Configuración de Prueba

### Gmail para Pruebas
1. **Email de admin**: `mc.manuel.gonzalez.ptel@gmail.com`
2. **App Password**: Configurar en Gmail
3. **Verificación 2FA**: Activar obligatoriamente

### Variables de Entorno
```env
EMAIL_USER=mc.manuel.gonzalez.ptel@gmail.com
EMAIL_PASS=tu_app_password_aqui
PORT=3000
```

## 📊 Monitoreo del Sistema

### Logs del Servidor
```bash
🚀 Servidor iniciado en http://localhost:3000
📧 Sistema de aprobación activo para: mc.manuel.gonzalez.ptel@gmail.com
📧 Correo de aprobación enviado para: test@ejemplo.com
✅ Usuario aprobado: test@ejemplo.com
📧 Correo de bienvenida enviado a: test@ejemplo.com
```

### Estados en Base de Datos
```javascript
// Usuarios pendientes
pendingUsers: {
  "test@ejemplo.com": {
    username: "testuser",
    email: "test@ejemplo.com",
    role: "student",
    token: "abc123...",
    createdAt: "2025-01-XX",
    expiresAt: timestamp
  }
}

// Usuarios aprobados
approvedUsers: {
  "test@ejemplo.com": {
    username: "testuser",
    email: "test@ejemplo.com",
    role: "student",
    approvedAt: "2025-01-XX",
    approvedBy: "admin"
  }
}
```

## 🚀 Funcionalidades Avanzadas

### Verificación de Estado
- Botón "Verificar Estado" en interfaz de espera
- API endpoint `/api/user-status/:email`
- Actualizaciones en tiempo real

### Expiración Automática
- Tokens válidos por 24 horas
- Limpieza automática de expirados
- Notificación de expiración

### Seguridad
- Tokens únicos por solicitud
- Hash seguro de contraseñas
- Validación de entrada robusta

## 🎯 Pruebas de Integración

### Flujo Completo
1. **Registro** → Servidor → Email Admin
2. **Aprobación** → Email Usuario → Login
3. **Acceso** → Curso → Sesiones

### Validaciones
- ✅ Formato de email válido
- ✅ Longitud mínima de contraseña
- ✅ Unicidad de usuarios
- ✅ Expiración de tokens

## 🔍 Debugging

### Problemas Comunes
1. **Email no enviado**:
   - Verificar App Password
   - Revisar logs del servidor
   - Comprobar conexión a internet

2. **Token inválido**:
   - Verificar expiración
   - Comprobar formato del token
   - Revisar base de datos

3. **Usuario no aprobado**:
   - Verificar estado en `/api/user-status/:email`
   - Revisar logs de aprobación
   - Comprobar correos enviados

## 🎉 ¡Sistema Listo!

El sistema de aprobación por email está completamente funcional y listo para uso en producción. Incluye:

- ✅ Registro con aprobación automática
- ✅ Correos HTML profesionales
- ✅ Interfaz moderna de aprobación
- ✅ Seguridad robusta
- ✅ Monitoreo completo
- ✅ Documentación detallada

¡Disfruta del sistema de autenticación profesional para tu curso de Python!
