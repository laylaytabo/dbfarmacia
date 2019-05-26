'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegMedicamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.TEXT
      },
      nombre: {
        type: Sequelize.TEXT
      },
      generico: {
        type: Sequelize.TEXT
      },
      unidad: {
        type: Sequelize.INTEGER
      },
      presentacion: {
        type: Sequelize.TEXT
      },
      consentracion: {
        type: Sequelize.TEXT
      },
      id_grupodesignado: {
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
    return queryInterface.dropTable('RegMedicamentos');
  }
};