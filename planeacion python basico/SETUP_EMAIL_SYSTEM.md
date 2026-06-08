# 📧 Configuración del Sistema de Aprobación por Email

## 🚀 Instalación Rápida

### Paso 1: Instalar Dependencias
```bash
npm install express nodemailer
```

### Paso 2: Configurar Gmail App Password
1. Ve a tu cuenta de Google
2. Activa la verificación en 2 pasos
3. Ve a "Contraseñas de aplicación"
4. Genera una nueva contraseña para "Correo"
5. Copia la contraseña generada

### Paso 3: Configurar Variables de Entorno
1. Copia `config.env.example` a `config.env`
2. Edita `config.env` con tus credenciales:
```env
EMAIL_USER=mc.manuel.gonzalez.ptel@gmail.com
EMAIL_PASS=tu_app_password_generado
PORT=3000
```

### Paso 4: Iniciar el Servidor
```bash
npm start
```

## 🔧 Configuración Detallada

### Gmail App Password
Para usar Gmail como servicio de correo:

1. **Activar verificación en 2 pasos:**
   - Ve a [myaccount.google.com](https://myaccount.google.com)
   - Seguridad → Verificación en 2 pasos
   - Activa la verificación

2. **Generar App Password:**
   - Seguridad → Contraseñas de aplicación
   - Selecciona "Correo"
   - Copia la contraseña de 16 caracteres

3. **Configurar en el servidor:**
   ```env
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   ```

### Configuración del Servidor

El servidor incluye:
- ✅ API REST para registro y aprobación
- ✅ Envío automático de correos
- ✅ Página web de aprobación
- ✅ Sistema de tokens seguros
- ✅ Expiración automática de solicitudes

## 📋 Flujo de Aprobación

### 1. Registro de Usuario
```
Usuario → Formulario → Servidor → Email al Admin
```

### 2. Aprobación
```
Admin → Email → Enlace → Aprobar/Rechazar → Email al Usuario
```

### 3. Acceso
```
Usuario → Email de Bienvenida → Login → Acceso al Curso
```

## 🎯 Características del Sistema

### Seguridad
- ✅ Tokens únicos por solicitud
- ✅ Expiración automática (24 horas)
- ✅ Hash seguro de contraseñas
- ✅ Validación de entrada

### Usabilidad
- ✅ Interfaz moderna de aprobación
- ✅ Correos HTML profesionales
- ✅ Notificaciones en tiempo real
- ✅ Estados claros para usuarios

### Automatización
- ✅ Envío automático de correos
- ✅ Gestión de tokens
- ✅ Limpieza automática de expirados
- ✅ Logs detallados

## 📧 Plantillas de Correo

### Correo de Solicitud (Admin)
- Asunto: "🔔 Nuevo Registro Pendiente - Curso Python: [Usuario]"
- Contenido: Información del usuario + botón de aprobación
- Diseño: HTML profesional con gradientes

### Correo de Bienvenida (Usuario)
- Asunto: "🎉 ¡Bienvenido al Curso de Python! - [Usuario]"
- Contenido: Credenciales + enlace al curso
- Diseño: Motivacional y profesional

## 🔍 Monitoreo y Logs

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

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Iniciar servidor
npm start

# Modo desarrollo con auto-reload
npm run dev-server

# Solo servir archivos estáticos
npm run serve
```

### Producción
```bash
# Instalar dependencias de producción
npm install --production

# Iniciar servidor de producción
NODE_ENV=production npm start
```

## 🐛 Solución de Problemas

### Error: "Invalid login"
- Verificar que el App Password sea correcto
- Asegurar que la verificación en 2 pasos esté activada
- Revisar que el email sea exacto

### Error: "Connection timeout"
- Verificar conexión a internet
- Revisar firewall/proxy
- Comprobar configuración de Gmail

### Error: "Token expired"
- Los tokens expiran en 24 horas
- Usuario debe registrarse nuevamente
- Limpiar tokens expirados del servidor

## 🔒 Seguridad Adicional

### Recomendaciones
1. **Usar HTTPS en producción**
2. **Configurar rate limiting**
3. **Implementar logs de auditoría**
4. **Usar base de datos real**
5. **Configurar backup automático**

### Variables de Entorno Recomendadas
```env
# Producción
NODE_ENV=production
PORT=443
HTTPS=true

# Base de datos
DB_URL=postgresql://usuario:pass@host:5432/db

# Seguridad
JWT_SECRET=secreto_muy_largo_y_seguro
SESSION_SECRET=otro_secreto_diferente
```

## 📞 Soporte

Para problemas con el sistema de email:
1. Revisar logs del servidor
2. Verificar configuración de Gmail
3. Comprobar conectividad de red
4. Validar formato de emails

---

**Desarrollado por**: JGMV-PTEL  
**Versión**: 1.0.0  
**Fecha**: Enero 2025
