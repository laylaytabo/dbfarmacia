'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fecha_cantidads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo_compra:{
        type: Sequelize.INTEGER
      },
      fehca_vencimineto: {
        type: Sequelize.STRING
      },
      cantidad_unidad: {
        type: Sequelize.INTEGER
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      id_medicamento: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'RegMedicamentos',
          key: 'id',
          as: 'id_medicamento',
        }
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
    return queryInterface.dropTable('fecha_cantidads');
  }
};