'use strict';
module.exports = (sequelize, DataTypes) => {
  const distribuciones = sequelize.define('distribuciones', {
    codigo: DataTypes.INTEGER,
    responsable: DataTypes.TEXT,
    recibe: DataTypes.TEXT,
    fechaLlegada: DataTypes.STRING,
    productos: DataTypes.JSON,
    id_personal: DataTypes.INTEGER
  }, {});
  distribuciones.associate = function(models) {
    // associations can be defined here
  };
  return distribuciones;
};