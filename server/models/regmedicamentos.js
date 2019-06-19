'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegMedicamentos = sequelize.define('RegMedicamentos', {
    grupoAsig: DataTypes.TEXT,
    codificacion: DataTypes.TEXT,
    nombre: DataTypes.TEXT,
    generico: DataTypes.STRING,
    concentracion: DataTypes.STRING,
    unidadMedida: DataTypes.STRING,
    presentacion: DataTypes.TEXT,
    fechaLLEgada: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE,
    cantidad: DataTypes.STRING,
    unidades: DataTypes.STRING,
    precio:DataTypes.STRING
  }, {});
  RegMedicamentos.associate = function(models) {
    // associations can be defined here
  };
  return RegMedicamentos;
};