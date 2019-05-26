'use strict';
module.exports = (sequelize, DataTypes) => {
  const GrupoDesignado = sequelize.define('GrupoDesignado', {
    codigo: DataTypes.TEXT,
    descripcion: DataTypes.TEXT
  }, {});
  GrupoDesignado.associate = function(models) {
    // associations can be defined here
  };
  return GrupoDesignado;
};