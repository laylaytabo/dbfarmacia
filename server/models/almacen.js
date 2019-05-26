'use strict';
module.exports = (sequelize, DataTypes) => {
  const Almacen = sequelize.define('Almacen', {
    stock: DataTypes.INTEGER,
    id_grupodesignado: DataTypes.INTEGER
  }, {});
  Almacen.associate = function(models) {
    // associations can be defined here
  };
  return Almacen;
};