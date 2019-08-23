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
      precio:{
        type: Sequelize.DECIMAL
      },
      unidades:{
        type: Sequelize.INTEGER
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