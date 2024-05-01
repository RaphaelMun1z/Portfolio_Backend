'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tools', [
      {
        name: 'Docker',
        proficiency: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Postman',
        proficiency: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'VScode',
        proficiency: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Canva',
        proficiency: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tools', null, {});
  }
};
