'use strict';

let tableModel = { schema: 'app', tableName: 'users' };


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableModel, [
      { Username: 'MikeH', Password: 'super_secret_pa$$word' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableModel, null, {});
  }
};
