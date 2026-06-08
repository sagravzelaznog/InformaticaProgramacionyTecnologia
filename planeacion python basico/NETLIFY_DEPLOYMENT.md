# 🚀 Despliegue en Netlify - Guía Completa

## ⚠️ Consideraciones Importantes

**Netlify es una plataforma de hosting estático** que no puede ejecutar servidores Node.js directamente. Nuestro sistema actual incluye:

- ✅ Frontend estático (HTML, CSS, JS)
- ❌ Backend Node.js (server.js)
- ❌ Sistema de correos (nodemailer)

## 🔧 Opciones de Despliegue

### Opción 1: Solo Frontend (Sistema Básico)

Desplegar solo la parte frontend sin el sistema de aprobación por email.

### Opción 2: Frontend + Backend Separado

Desplegar frontend en Netlify y backend en otra plataforma.

### Opción 3: Convertir a Sistema Estático

Adaptar el sistema para funcionar solo con frontend.

## 🎯 Opción 1: Despliegue Básico en Netlify

### Archivos Necesarios

```estructura
├── index.html
├── css/
│   ├── styles.css
│   └── auth.css
├── js/
│   ├── main.js
│   ├── auth.js (modificado)
│   └── auth-guard.js (modificado)
├── s1.html a s32.html
└── netlify.toml
```

### Modificaciones Requeridas

#### 1. Modificar `js/auth.js`

```javascript
// Cambiar el registro para usar solo localStorage
async register(username, email, password, role = 'student') {
    // Usar solo registro local sin servidor
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
```

#### 2. Crear `netlify.toml`

```toml
[build]
  publish = "."
  command = "echo 'Build completed'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

## 🎯 Opción 2: Frontend + Backend Separado

### Frontend en Netlify

- Desplegar archivos estáticos
- Modificar URLs de API para apuntar a backend externo

### Backend en Vercel/Heroku/Railway

- Desplegar `server.js` en plataforma que soporte Node.js
- Configurar variables de entorno
- Actualizar URLs en frontend

### Modificaciones Requeridas {}

#### 1. Crear `vercel.json` para backend

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

#### 2. Modificar URLs en frontend

```javascript
// En js/auth.js, cambiar las URLs de API
const API_BASE_URL = 'https://tu-backend.vercel.app';

// Cambiar todas las llamadas fetch
const response = await fetch(`${API_BASE_URL}/api/register`, {
    // ...
});
```

## 🎯 Opción 3: Sistema Híbrido con Netlify Functions

### Crear Netlify Functions

```javascript
// netlify/functions/send-email.js
exports.handler = async (event, context) => {
    // Implementar envío de email usando servicios externos
    // Como EmailJS, SendGrid, etc.
};
```

### Modificaciones Requeridas{}

#### 1. Instalar EmailJS

```bash
npm install @emailjs/browser
```

#### 2. Modificar sistema de correos

```javascript
// Usar EmailJS en lugar de nodemailer
import emailjs from '@emailjs/browser';

async function sendApprovalEmail(user) {
    const templateParams = {
        to_email: 'mc.manuel.gonzalez.ptel@gmail.com',
        user_name: user.username,
        user_email: user.email,
        user_role: user.role,
        approval_link: `https://tu-sitio.netlify.app/approve?token=${user.token}`
    };

    await emailjs.send(
        'service_id',
        'template_id',
        templateParams,
        'public_key'
    );
}
```

## 🔧 Implementación Recomendada: Opción 1

Voy a crear la versión adaptada para Netlify:

### 1. Crear `netlify.toml`

```toml
[build]
  publish = "."
  command = "echo 'Static site build completed'"

[[redirects]]
  from = "/api/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. Modificar `js/auth.js` para Netlify

```javascript
// Remover todas las llamadas al servidor
// Usar solo localStorage para almacenamiento
// Mantener funcionalidad básica de autenticación
```

### 3. Crear `_redirects` (alternativa a netlify.toml)

``` redirect
# Redirect all API calls to index.html
/api/* /index.html 200

# Redirect all other requests to index.html
/* /index.html 200
```

## 📋 Pasos para Despliegue en Netlify

### Método 1: Drag & Drop

1. Comprimir archivos del proyecto
2. Arrastrar a Netlify
3. Configurar dominio personalizado

### Método 2: Git Integration

1. Conectar repositorio GitHub
2. Configurar build settings
3. Desplegar automáticamente

### Método 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🔧 Configuración de Build

### Variables de Entorno en Netlify

``` node
NODE_VERSION = 18
NPM_VERSION = 9
```

### Scripts de Build

```json
{
  "scripts": {
    "build": "echo 'No build step required for static site'",
    "deploy": "netlify deploy --prod"
  }
}
```

## 🚀 Funcionalidades que Funcionarán en Netlify

### ✅ Compatible

- Sistema de autenticación básico
- Hash de contraseñas
- Almacenamiento en localStorage
- Protección de páginas
- Interfaz de usuario
- Navegación del curso

### ❌ No Compatible (sin backend)

- Envío de correos automático
- Aprobación por email
- Base de datos persistente
- API REST

## 🔄 Alternativas para Funcionalidades Perdidas

### 1. Sistema de Notificaciones

```javascript
// Usar notificaciones del navegador
if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('Usuario registrado exitosamente');
        }
    });
}
```

### 2. Aprobación Manual

```javascript
// Crear sistema de códigos de aprobación
// Generar código único para cada usuario
// Admin ingresa código para activar cuenta
```

### 3. Base de Datos Externa

```javascript
// Usar servicios como Firebase, Supabase, o Airtable
// Para almacenamiento persistente de usuarios
```

## 📊 Comparación de Opciones

| Opción | Complejidad | Funcionalidades | Costo |
|--------|-------------|-----------------|-------|
| Solo Frontend | Baja | Básicas | Gratis |
| Frontend + Backend | Media | Completas | Medio |
| Netlify Functions | Media | Parciales | Bajo |

## 🎯 Recomendación Final

Para un despliegue rápido en Netlify, recomiendo la **Opción 1** (Solo Frontend) con las siguientes modificaciones:

1. Mantener sistema de autenticación básico
2. Usar localStorage para persistencia
3. Implementar notificaciones del navegador
4. Crear sistema de códigos de aprobación manual

¿Te gustaría que implemente alguna de estas opciones específicamente?
