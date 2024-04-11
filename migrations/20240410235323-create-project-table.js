'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Projects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      stack: {
        type: Sequelize.ENUM,
        values: ['Frontend', 'Backend', 'Fullstack'],
        allowNull: false,
      },
      isHosted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      usedTools: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      usedDatabase: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Projects');
  }
};
