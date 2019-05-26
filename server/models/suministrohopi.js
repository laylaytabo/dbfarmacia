'use strict';
module.exports = (sequelize, DataTypes) => {
  const SuministroHopi = sequelize.define('SuministroHopi', {
    tipo_sumunistro: DataTypes.TEXT,
    descripcion: DataTypes.TEXT,
    cantidad: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_almacen: DataTypes.INTEGER
  }, {});
  SuministroHopi.associate = function(models) {
    // associations can be defined here
  };
  return SuministroHopi;
};