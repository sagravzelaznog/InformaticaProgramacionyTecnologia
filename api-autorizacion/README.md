# API de Autorización

API REST para autenticación y autorización de usuarios usando **Express**, **JWT** y **MySQL** (Sequelize).

## Requisitos previos

- Node.js v18+
- MySQL corriendo localmente

## Instalación

```bash
cd api-autorizacion
npm install
```

## Configuración de la base de datos

Crea la base de datos en MySQL:

```sql
CREATE DATABASE api_autorizacion;
```

Copia `.env.example` a `.env` y edita los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 5000) |
| `DB_HOST` | Host de MySQL (default: localhost) |
| `DB_PORT` | Puerto de MySQL (default: 3306) |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario de MySQL |
| `DB_PASSWORD` | Contraseña de MySQL |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (ej: `7d`, `1h`) |

> Las tablas se crean automáticamente al iniciar el servidor gracias a Sequelize.

## Iniciar el servidor

```bash
# Producción
npm start

# Desarrollo (auto-recarga)
npm run dev
```

## Endpoints

### Públicos

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/registro` | Registrar usuario nuevo |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/salud` | Verificar estado del servidor |

### Protegidos (requieren token JWT)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/auth/perfil` | Obtener perfil del usuario |
| `PUT` | `/api/auth/perfil` | Actualizar nombre/email |
| `PUT` | `/api/auth/cambiar-password` | Cambiar contraseña |

### Admin (requieren token JWT + rol admin)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/admin/usuarios` | Listar todos los usuarios |
| `PUT` | `/api/admin/usuarios/:id/rol` | Cambiar rol de usuario |
| `PUT` | `/api/admin/usuarios/:id/desactivar` | Activar/desactivar usuario |
| `DELETE` | `/api/admin/usuarios/:id` | Eliminar usuario |

## Ejemplos de uso

### Registro

```bash
curl -X POST http://localhost:5000/api/auth/registro ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\": \"Juan\", \"email\": \"juan@email.com\", \"password\": \"123456\"}"
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\": \"juan@email.com\", \"password\": \"123456\"}"
```

### Acceder a ruta protegida

```bash
curl http://localhost:5000/api/auth/perfil ^
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

## Estructura del proyecto

```
api-autorizacion/
├── config/
│   └── db.js               # Conexión a MySQL (Sequelize)
├── controllers/
│   ├── adminController.js   # Lógica de administración
│   └── authController.js    # Lógica de autenticación
├── middleware/
│   └── auth.js              # Middleware JWT y roles
├── models/
│   └── User.js              # Modelo de usuario (Sequelize)
├── routes/
│   ├── adminRoutes.js       # Rutas de admin
│   └── authRoutes.js        # Rutas de auth
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js                # Punto de entrada
```

## Seguridad

- Contraseñas encriptadas con **bcrypt** (salt 12 rondas)
- Tokens JWT con expiración configurable
- Rate limiting: 100 req/15min general, 10 req/15min en login
- CORS habilitado
- Campo password excluido por defecto en consultas (Sequelize scopes)
