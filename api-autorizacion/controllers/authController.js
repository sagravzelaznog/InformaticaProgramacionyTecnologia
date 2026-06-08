const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Genera un token JWT para el usuario.
 */
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Envía la respuesta con el token.
 */
const enviarRespuestaToken = (usuario, statusCode, res) => {
  const token = generarToken(usuario.id);

  const usuarioObj = usuario.toJSON();
  delete usuarioObj.password;

  res.status(statusCode).json({
    exito: true,
    token,
    usuario: usuarioObj,
  });
};

/**
 * POST /api/auth/registro
 * Registrar un nuevo usuario.
 */
const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existeUsuario = await User.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Ya existe un usuario con ese email.',
      });
    }

    const usuario = await User.create({ nombre, email, password });

    enviarRespuestaToken(usuario, 201, res);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const mensajes = error.errors.map((err) => err.message);
      return res.status(400).json({
        exito: false,
        mensaje: mensajes.join('. '),
      });
    }
    res.status(500).json({
      exito: false,
      mensaje: 'Error interno del servidor.',
    });
  }
};

/**
 * POST /api/auth/login
 * Iniciar sesión.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Por favor proporciona email y contraseña.',
      });
    }

    // Usar scope 'conPassword' para incluir el campo password
    const usuario = await User.scope('conPassword').findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Credenciales inválidas.',
      });
    }

    const passwordCorrecta = await usuario.compararPassword(password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        exito: false,
        mensaje: 'Credenciales inválidas.',
      });
    }

    enviarRespuestaToken(usuario, 200, res);
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error interno del servidor.',
    });
  }
};

/**
 * GET /api/auth/perfil
 * Obtener perfil del usuario autenticado.
 */
const obtenerPerfil = async (req, res) => {
  res.status(200).json({
    exito: true,
    usuario: req.usuario,
  });
};

/**
 * PUT /api/auth/perfil
 * Actualizar perfil del usuario autenticado.
 */
const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const camposActualizar = {};

    if (nombre !== undefined) camposActualizar.nombre = nombre;
    if (email !== undefined) camposActualizar.email = email;

    await User.update(camposActualizar, {
      where: { id: req.usuario.id },
      individualHooks: true,
    });

    const usuario = await User.findByPk(req.usuario.id);

    res.status(200).json({
      exito: true,
      usuario,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        exito: false,
        mensaje: 'Ese email ya está en uso.',
      });
    }
    res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar el perfil.',
    });
  }
};

/**
 * PUT /api/auth/cambiar-password
 * Cambiar la contraseña del usuario autenticado.
 */
const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, nuevaPassword } = req.body;

    if (!passwordActual || !nuevaPassword) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Proporciona la contraseña actual y la nueva.',
      });
    }

    const usuario = await User.scope('conPassword').findByPk(req.usuario.id);
    const passwordCorrecta = await usuario.compararPassword(passwordActual);

    if (!passwordCorrecta) {
      return res.status(401).json({
        exito: false,
        mensaje: 'La contraseña actual es incorrecta.',
      });
    }

    usuario.password = nuevaPassword;
    await usuario.save();

    enviarRespuestaToken(usuario, 200, res);
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: 'Error al cambiar la contraseña.',
    });
  }
};

module.exports = {
  registro,
  login,
  obtenerPerfil,
  actualizarPerfil,
  cambiarPassword,
};
