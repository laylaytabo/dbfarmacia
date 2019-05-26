'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    cantidad: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    descripcion: DataTypes.TEXT,
    id_proveedor: DataTypes.INTEGER
  }, {});
  Pedido.associate = function(models) {
    // associations can be defined here
  };
  return Pedido;
};