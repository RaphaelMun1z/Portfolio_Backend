'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Databases', [
      {
        name: 'MySQL',
        proficiency: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SQLserver',
        proficiency: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MongoDB',
        proficiency: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Firebase',
        proficiency: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Databases', null, {});
  }
};
