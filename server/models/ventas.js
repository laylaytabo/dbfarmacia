'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ventas = sequelize.define('Ventas', {
    cod_receta: DataTypes.INTEGER,
    nit: DataTypes.TEXT,
    fecha: DataTypes.DATE,
    monto_total: DataTypes.INTEGER,
    descripcion: DataTypes.TEXT,
    id_almacen: DataTypes.INTEGER
  }, {});
  Ventas.associate = function(models) {
    // associations can be defined here
  };
  return Ventas;
};