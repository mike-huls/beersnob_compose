'use strict';

let tableModel = { schema: 'app', tableName: 'cities' };


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableModel, [
      { CountryId: 1, Name: 'Groningen' },
      { CountryId: 2, Name: 'München' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableModel, null, {});
  }
};
