'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigoCompra: {
        type: Sequelize.NUMERIC
      },
      boletaPago: {
        type: Sequelize.STRING
      },
      tipoMaterial: {
        type: Sequelize.STRING
      },
      fechaIngreso: {
        type: Sequelize.STRING
      }, 
      proveedor: {
        type: Sequelize.TEXT
      },    
      productosDelPedido: {
        type: Sequelize.JSON
      },
      Observaciones: {
        type: Sequelize.TEXT
      },
      subTotal: {
        type: Sequelize.NUMERIC
      },
      iva: {
        type: Sequelize.NUMERIC
      },
      total: {
        type: Sequelize.NUMERIC
      },
      id_proveedor: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pedidos');
  }
};