'use strict';

let tableModel = { schema: 'app', tableName: 'venues' };


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableModel, [
      { CityId: 1, Name: 'De Pintelier', Address: "Kleine Kromme Elleboog 9, Groningen" },
      { CityId: 1, Name: 'Witte Wolf', Address: "Gedempte Zuiderdiep 140, Groningen" },
      { CityId: 2, Name: 'Hofbraühaus am Platzl', Address: "Platzl 9, München" },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableModel, null, {});
  }
};
