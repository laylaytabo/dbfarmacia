'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('distribuciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.INTEGER
      },
      responsable: {
        type: Sequelize.TEXT
      },
      recibe: {
        type: Sequelize.TEXT
      },
      fechaLlegada: {
        type: Sequelize.STRING
      },
      productos: {
        type: Sequelize.JSON
      },
      id_personal:{
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
    return queryInterface.dropTable('distribuciones');
  }
};