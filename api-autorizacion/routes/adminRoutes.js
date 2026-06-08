const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  cambiarRol,
  toggleActivoUsuario,
  eliminarUsuario,
} = require('../controllers/adminController');
const { proteger, autorizar } = require('../middleware/auth');

// Todas las rutas requieren autenticación + rol admin
router.use(proteger, autorizar('admin'));

router.get('/usuarios', obtenerUsuarios);
router.put('/usuarios/:id/rol', cambiarRol);
router.put('/usuarios/:id/desactivar', toggleActivoUsuario);
router.delete('/usuarios/:id', eliminarUsuario);

module.exports = router;
