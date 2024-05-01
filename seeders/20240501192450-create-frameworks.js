'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Frameworks', [
      {
        name: 'React',
        languageId: 1,
        proficiency: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Spring boot',
        languageId: 3,
        proficiency: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Laravel',
        languageId: 4,
        proficiency: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Frameworks', null, {});
  }
};
