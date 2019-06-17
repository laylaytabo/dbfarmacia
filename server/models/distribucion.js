'use strict';
module.exports = (sequelize, DataTypes) => {
  const distribucion = sequelize.define('distribucion', {
    codigo: DataTypes.INTEGER,
    responsable: DataTypes.STRING,
    recibe: DataTypes.STRING,
    fechaLlegada: DataTypes.STRING
  }, {});
  distribucion.associate = function(models) {
    // associations can be defined here
  };
  return distribucion;
};