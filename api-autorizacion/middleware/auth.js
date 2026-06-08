const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware para verificar el token JWT.
 * Protege rutas que requieren autenticación.
 */
const proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      exito: false,
      mensaje: 'No autorizado. Token no proporcionado.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await User.findByPk(decoded.id);

    if (!req.usuario) {
      return res.status(401).json({
        exito: false,
        mensaje: 'El usuario asociado al token ya no existe.',
      });
    }

    if (!req.usuario.activo) {
      return res.status(401).json({
        exito: false,
        mensaje: 'La cuenta del usuario está desactivada.',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      exito: false,
      mensaje: 'Token inválido o expirado.',
    });
  }
};

/**
 * Middleware para restringir acceso por rol.
 * Uso: autorizar('admin')
 */
const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        exito: false,
        mensaje: `El rol '${req.usuario.rol}' no tiene permiso para esta acción.`,
      });
    }
    next();
  };
};

module.exports = { proteger, autorizar };
