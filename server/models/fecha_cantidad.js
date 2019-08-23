'use strict';
module.exports = (sequelize, DataTypes) => {
  const fecha_cantidad = sequelize.define('fecha_cantidad', {
    codigo_compra: DataTypes.INTEGER,
    fehca_vencimineto: DataTypes.STRING,
    cantidad_unidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    id_medicamento: DataTypes.INTEGER
  }, {});
  fecha_cantidad.associate = function(models) {
    // associations can be defined here
    fecha_cantidad.belongsTo(models.RegMedicamentos, {
      foreignKey: 'id_medicamento',
      onDelete: 'CASCADE'
    });
  };
  return fecha_cantidad;
};