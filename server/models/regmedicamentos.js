'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegMedicamentos = sequelize.define('RegMedicamentos', {
    codificacion: DataTypes.TEXT,
    nombre: DataTypes.TEXT,
    generico: DataTypes.STRING,
    concentracion: DataTypes.STRING,
    unidadMedida: DataTypes.STRING,
    presentacion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL,
    cantidad_inicial: DataTypes.INTEGER,
    entradas: DataTypes.INTEGER,
    unidades: DataTypes.INTEGER,
    ventas: DataTypes.INTEGER,
    id_grupo_desig:DataTypes.INTEGER,
    id_personal: DataTypes.INTEGER

  }, {});
  RegMedicamentos.associate = function(models) {
    // associations can be defined here
    RegMedicamentos.hasMany(models.fecha_cantidad, {
      foreignKey: 'id_medicamento',
    }); 
    RegMedicamentos.belongsTo(models.GrupoDesignado, {
      foreignKey: 'id_grupo_desig',
      onDelete: 'CASCADE'
    });
  };
  return RegMedicamentos;
};