'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn('Form_Subjects', 'formType', {
        type: Sequelize.ENUM('Report', 'Doubt'),
        allowNull: false
      }, { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn('Form_Subjects', 'formType', {
        type: Sequelize.ENUM('Report', 'Doubt'),
        allowNull: false
      }, { transaction });
    });
  }
};
