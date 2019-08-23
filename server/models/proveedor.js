'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define('Proveedor', {
    nombre: DataTypes.TEXT,
    email: DataTypes.TEXT,
    direccion: DataTypes.TEXT,
    telefono: DataTypes.INTEGER,
    empresa: DataTypes.TEXT
  }, {});
  Proveedor.associate = function(models) {
    // associations can be defined here
    Proveedor.hasMany(models.Pedido, {
      foreignKey: 'id_proveedor',
    });
  };
  return Proveedor;
};