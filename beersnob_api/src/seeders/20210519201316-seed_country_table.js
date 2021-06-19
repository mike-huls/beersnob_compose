'use strict';

let tableModel = { schema: 'app', tableName: 'countries' };


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableModel, [
      { Name: 'Netherlands' },
      { Name: 'Germany' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableModel, null, {});
  }
};
