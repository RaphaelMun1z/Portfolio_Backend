'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Languages', [
      {
        name: 'Javascript',
        proficiency: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Typescript',
        proficiency: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Java',
        proficiency: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PHP',
        proficiency: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Languages', null, {});
  }
};
