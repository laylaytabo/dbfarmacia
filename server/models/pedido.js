'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    codigoCompra: DataTypes.NUMERIC,
    boletaPago: DataTypes.STRING,
    tipoMaterial: DataTypes.STRING,
    fechaIngreso: DataTypes.STRING,
    proveedor: DataTypes.TEXT,
    productosDelPedido: DataTypes.JSON(),
    ProductosAceptados:DataTypes.JSON(),
    Observaciones: DataTypes.TEXT,
    subTotal: DataTypes.NUMERIC,
    iva: DataTypes.NUMERIC,
    total: DataTypes.NUMERIC,
    id_proveedor: DataTypes.INTEGER
  }, {});
  Pedido.associate = function(models) {
    // associations can be defined here
    Pedido.belongsTo(models.Proveedor, {
      foreignKey: 'id_proveedor',
      onDelete: 'CASCADE'
    });
  };
  return Pedido;
};