'use strict';

let tableModel = { schema: 'app', tableName: 'beers' };


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableModel, [
      { Name: 'Olde Fortran', Type: 'lager' },
      { Name: 'Pabst Blue Robot', Type: 'lager' },
      { Name: 'Löbrau', Type: 'ale' },
      { Name: 'Kleins beer', Type: 'IPA' },
      { Name: 'Benderbrau', Type: 'Cold fusion steam beer' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableModel, null, {});
  }
};
