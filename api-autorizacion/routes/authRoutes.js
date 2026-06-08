const express = require('express');
const router = express.Router();
const {
  registro,
  login,
  obtenerPerfil,
  actualizarPerfil,
  cambiarPassword,
} = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

// Rutas públicas
router.post('/registro', registro);
router.post('/login', login);

// Rutas protegidas (requieren autenticación)
router.get('/perfil', proteger, obtenerPerfil);
router.put('/perfil', proteger, actualizarPerfil);
router.put('/cambiar-password', proteger, cambiarPassword);

module.exports = router;
