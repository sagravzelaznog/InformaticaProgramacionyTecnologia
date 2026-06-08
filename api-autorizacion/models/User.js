const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: { msg: 'Ya existe un usuario con ese email' },
      validate: {
        isEmail: { msg: 'El email no es válido' },
        notEmpty: { msg: 'El email es obligatorio' },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La contraseña es obligatoria' },
        len: {
          args: [6, 255],
          msg: 'La contraseña debe tener al menos 6 caracteres',
        },
      },
    },
    rol: {
      type: DataTypes.ENUM('usuario', 'admin'),
      defaultValue: 'usuario',
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      conPassword: {
        attributes: {},
      },
    },
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// Método de instancia para comparar contraseñas
User.prototype.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = User;
