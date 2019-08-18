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
      grupoAsig: {
        type: Sequelize.TEXT
      },
      codificacion: {
        type: Sequelize.TEXT
      },
      nombre: {
        type: Sequelize.TEXT
      },
      generico: {
        type: Sequelize.STRING
      },
      concentracion: {
        type: Sequelize.STRING
      },
      unidadMedida: {
        type: Sequelize.STRING
      },
      presentacion: {
        type: Sequelize.TEXT
      },
      fechaLLEgada: {
        type: Sequelize.DATE
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },
      cantidad: {
        type: Sequelize.STRING
      },
      unidades: {
        type: Sequelize.STRING
      },
      precio:{
        type: Sequelize.STRING
      },
      id_grupo_desig:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'GrupoDesignados',
          key: 'id',
          as: 'id_grupo_desig',
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
    return queryInterface.dropTable('RegMedicamentos');
  }
};