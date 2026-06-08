const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a MySQL
connectDB();

const app = express();

// --- Middlewares globales ---

// Habilitar CORS
app.use(cors());

// Parsear JSON
app.use(express.json({ limit: '10kb' }));

// Rate limiter para prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: {
    exito: false,
    mensaje: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.',
  },
});
app.use('/api', limiter);

// Rate limiter más estricto para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    exito: false,
    mensaje: 'Demasiados intentos de login. Intenta de nuevo en 15 minutos.',
  },
});
app.use('/api/auth/login', loginLimiter);

// --- Rutas ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Ruta de salud
app.get('/api/salud', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: 'API de Autorización funcionando correctamente.',
    timestamp: new Date().toISOString(),
  });
});

// Manejo de rutas no encontradas
app.all('{*path}', (req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `La ruta ${req.originalUrl} no existe en este servidor.`,
  });
});

// --- Iniciar servidor ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Salud: http://localhost:${PORT}/api/salud`);
});
