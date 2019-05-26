'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegMedicamentos = sequelize.define('RegMedicamentos', {
    codigo: DataTypes.TEXT,
    nombre: DataTypes.TEXT,
    generico: DataTypes.TEXT,
    unidad: DataTypes.INTEGER,
    presentacion: DataTypes.TEXT,
    consentracion: DataTypes.TEXT,
    id_grupodesignado: DataTypes.INTEGER
  }, {});
  RegMedicamentos.associate = function(models) {
    // associations can be defined here
  };
  return RegMedicamentos;
};