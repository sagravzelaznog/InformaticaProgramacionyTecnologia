const User = require('../models/User');

/**
 * GET /api/admin/usuarios
 * Obtener todos los usuarios (solo admin).
 */
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).json({
      exito: true,
      total: usuarios.length,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener usuarios.',
    });
  }
};

/**
 * PUT /api/admin/usuarios/:id/rol
 * Cambiar el rol de un usuario (solo admin).
 */
const cambiarRol = async (req, res) => {
  try {
    const { rol } = req.body;

    if (!['usuario', 'admin'].includes(rol)) {
      return res.status(400).json({
        exito: false,
        mensaje: "El rol debe ser 'usuario' o 'admin'.",
      });
    }

    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado.',
      });
    }

    usuario.rol = rol;
    await usuario.save();

    res.status(200).json({
      exito: true,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al cambiar el rol.',
    });
  }
};

/**
 * PUT /api/admin/usuarios/:id/desactivar
 * Desactivar/activar un usuario (solo admin).
 */
const toggleActivoUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado.',
      });
    }

    usuario.activo = !usuario.activo;
    await usuario.save();

    res.status(200).json({
      exito: true,
      mensaje: `Usuario ${usuario.activo ? 'activado' : 'desactivado'} correctamente.`,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al cambiar el estado del usuario.',
    });
  }
};

/**
 * DELETE /api/admin/usuarios/:id
 * Eliminar un usuario (solo admin).
 */
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        exito: false,
        mensaje: 'Usuario no encontrado.',
      });
    }

    if (usuario.id === req.usuario.id) {
      return res.status(400).json({
        exito: false,
        mensaje: 'No puedes eliminarte a ti mismo.',
      });
    }

    await usuario.destroy();

    res.status(200).json({
      exito: true,
      mensaje: 'Usuario eliminado correctamente.',
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar el usuario.',
    });
  }
};

module.exports = {
  obtenerUsuarios,
  cambiarRol,
  toggleActivoUsuario,
  eliminarUsuario,
};
