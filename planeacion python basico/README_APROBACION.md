# 🔐 Sistema de Autenticación con Aprobación por Email

## 📧 Descripción Completa

Se ha implementado un sistema completo de autenticación con **aprobación por correo electrónico** para el curso de Python básico. El sistema incluye:

### 🚀 Características Principales
- ✅ **Registro con aprobación automática** por correo
- ✅ **Backend Node.js** con Express y Nodemailer
- ✅ **Correos HTML profesionales** con diseño moderno
- ✅ **Interfaz de aprobación web** intuitiva
- ✅ **Sistema de tokens seguros** con expiración
- ✅ **Notificaciones en tiempo real** para usuarios
- ✅ **Base de datos de usuarios** con hash de contraseñas
- ✅ **Protección automática** de todas las páginas del curso

## 🎯 Flujo de Aprobación

### 1. Registro de Usuario
```
Usuario llena formulario → Servidor recibe datos → Email enviado al admin
```

### 2. Aprobación por Admin
```
Admin recibe email → Hace clic en enlace → Página de aprobación → Aprobar/Rechazar
```

### 3. Confirmación al Usuario
```
Usuario aprobado → Email de bienvenida → Acceso al curso
```

## 📧 Configuración de Email

### Gmail App Password
Para que el sistema funcione, necesitas configurar un App Password de Gmail:

1. **Activar verificación en 2 pasos** en tu cuenta de Google
2. **Generar App Password** en "Contraseñas de aplicación"
3. **Configurar en el servidor** con las credenciales

### Configuración del Servidor
```env
EMAIL_USER=mc.manuel.gonzalez.ptel@gmail.com
EMAIL_PASS=tu_app_password_generado
PORT=3000
```

## 🛠️ Instalación y Uso

### Instalación Rápida
```bash
# 1. Instalar dependencias
npm install

# 2. Configurar email (editar server.js o usar variables de entorno)
# 3. Iniciar servidor
npm start

# 4. Abrir en navegador
# http://localhost:3000
```

### Comandos Disponibles
```bash
npm start          # Iniciar servidor de producción
npm run dev-server # Modo desarrollo con auto-reload
npm run serve      # Solo servir archivos estáticos
```

## 👥 Usuarios del Sistema

### Usuarios Demo (Siempre Disponibles)
| Usuario | Contraseña | Rol | Descripción |
|---------|------------|-----|-------------|
| `admin` | `admin123` | Administrador | Acceso completo |
| `estudiante` | `estudiante123` | Estudiante | Acceso estándar |
| `profesor` | `profesor123` | Profesor | Privilegios de enseñanza |

### Nuevos Usuarios (Requieren Aprobación)
- Se registran a través del formulario
- Envían solicitud por email al admin
- Esperan aprobación manual
- Reciben email de bienvenida cuando son aprobados

## 📋 Estructura del Proyecto

### Archivos Principales
```
├── server.js                    # Servidor backend con API
├── js/
│   ├── auth.js                  # Sistema de autenticación
│   └── auth-guard.js           # Middleware de protección
├── css/
│   └── auth.css                # Estilos del sistema de auth
├── config.env.example          # Configuración de ejemplo
├── SETUP_EMAIL_SYSTEM.md       # Guía de configuración
└── DEMO_EMAIL_SYSTEM.md        # Guía de demostración
```

### API Endpoints
```
POST /api/register              # Registrar nuevo usuario
POST /api/approve               # Aprobar/rechazar usuario
GET  /api/user-status/:email    # Verificar estado de usuario
GET  /approve?token=xxx         # Página de aprobación
```

## 🎨 Interfaz de Usuario

### Formulario de Registro
- ✅ Validación en tiempo real
- ✅ Campos requeridos marcados
- ✅ Mensajes de error claros
- ✅ Diseño responsive

### Página de Aprobación
- ✅ Información completa del usuario
- ✅ Botones de acción prominentes
- ✅ Confirmaciones visuales
- ✅ Diseño profesional

### Correos HTML
- ✅ Diseño moderno con gradientes
- ✅ Información clara y organizada
- ✅ Botones de acción funcionales
- ✅ Responsive para móviles

## 🔒 Seguridad Implementada

### Protección de Datos
- ✅ Hash SHA-256 de contraseñas
- ✅ Tokens únicos por solicitud
- ✅ Expiración automática (24 horas)
- ✅ Validación de entrada robusta

### Comunicación Segura
- ✅ HTTPS recomendado para producción
- ✅ Validación de emails
- ✅ Sanitización de datos
- ✅ Rate limiting (implementar en producción)

## 📊 Monitoreo y Logs

### Logs del Servidor
```bash
🚀 Servidor iniciado en http://localhost:3000
📧 Sistema de aprobación activo para: mc.manuel.gonzalez.ptel@gmail.com
📧 Correo de aprobación enviado para: usuario@ejemplo.com
✅ Usuario aprobado: usuario@ejemplo.com
📧 Correo de bienvenida enviado a: usuario@ejemplo.com
```

### Estados de Usuario
- `pending` - Pendiente de aprobación
- `approved` - Aprobado y activo
- `rejected` - Rechazado
- `expired` - Token expirado

## 🚀 Funcionalidades Avanzadas

### Verificación de Estado
- Los usuarios pueden verificar el estado de su solicitud
- API endpoint para consultas en tiempo real
- Notificaciones automáticas de cambios

### Gestión de Tokens
- Generación automática de tokens únicos
- Expiración programada
- Limpieza automática de tokens expirados

### Correos Automatizados
- Notificación inmediata al admin
- Correo de bienvenida al usuario
- Plantillas HTML profesionales

## 🔧 Configuración Avanzada

### Variables de Entorno
```env
# Email
EMAIL_USER=mc.manuel.gonzalez.ptel@gmail.com
EMAIL_PASS=tu_app_password

# Servidor
PORT=3000
NODE_ENV=production

# URLs
APP_URL=http://localhost:3000
ADMIN_EMAIL=mc.manuel.gonzalez.ptel@gmail.com
```

### Personalización
- Editar plantillas de correo en `server.js`
- Modificar estilos en `css/auth.css`
- Ajustar tiempo de expiración de tokens
- Configurar roles de usuario

## 🐛 Solución de Problemas

### Problemas Comunes

#### Email no se envía
- Verificar App Password de Gmail
- Comprobar conexión a internet
- Revisar logs del servidor

#### Token inválido
- Verificar expiración (24 horas)
- Comprobar formato del token
- Revisar base de datos del servidor

#### Usuario no puede hacer login
- Verificar que fue aprobado
- Comprobar credenciales
- Revisar estado en `/api/user-status/:email`

### Debugging
```bash
# Ver logs del servidor
npm start

# Verificar estado de usuario
curl http://localhost:3000/api/user-status/usuario@ejemplo.com

# Revisar configuración
cat config.env
```

## 📈 Próximas Mejoras

### Funcionalidades Futuras
- [ ] Panel de administración web
- [ ] Base de datos persistente (PostgreSQL/MongoDB)
- [ ] Autenticación de dos factores
- [ ] Roles más granulares
- [ ] Historial de aprobaciones
- [ ] Exportación de datos de usuarios

### Mejoras de Seguridad
- [ ] Rate limiting para API
- [ ] Encriptación adicional
- [ ] Logs de auditoría
- [ ] Backup automático
- [ ] Monitoreo de seguridad

## 📞 Soporte

Para problemas o preguntas:

1. **Revisar documentación**: `SETUP_EMAIL_SYSTEM.md`
2. **Probar con demo**: `DEMO_EMAIL_SYSTEM.md`
3. **Verificar logs**: Consola del servidor
4. **Comprobar configuración**: Variables de entorno

## 🎉 ¡Sistema Completo!

El sistema de autenticación con aprobación por email está **100% funcional** e incluye:

- ✅ Registro con aprobación automática
- ✅ Correos HTML profesionales
- ✅ Interfaz moderna de aprobación
- ✅ Seguridad robusta
- ✅ Monitoreo completo
- ✅ Documentación detallada

¡Tu curso de Python ahora tiene un sistema de autenticación profesional y seguro con aprobación por correo electrónico!

---

**Desarrollado por**: JGMV-PTEL  
**Versión**: 2.0.0  
**Fecha**: Enero 2025  
**Email de Admin**: mc.manuel.gonzalez.ptel@gmail.com
