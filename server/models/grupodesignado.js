'use strict';
module.exports = (sequelize, DataTypes) => {
  const GrupoDesignado = sequelize.define('GrupoDesignado', {
    codigo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    id_personal:DataTypes.INTEGER
  }, {});
  GrupoDesignado.associate = function(models) {
    // associations can be defined here
    GrupoDesignado.hasMany(models.RegMedicamentos, {
      foreignKey: 'id_grupo_desig',
    }); 
  };
  return GrupoDesignado;
};