'use strict';

let tableModel = { schema: 'app', tableName: 'reports' };


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableModel, [
      { VenueId: 1, BeerId: 5, UserId: 1, Price: 3.49, Rating: 7, Review: "Good price-quality ratio!" },
      { VenueId: 1, BeerId: 2, UserId: 1, Price: 1.99, Rating: 2, Review: "I would not recommend this beer to my worst enemy, cool logo though!" },
      { VenueId: 2, BeerId: 1, UserId: 1, Price: 5.00, Rating: 6, Review: "The beautiful biergarten helps a lot, beer was okay" },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableModel, null, {});
  }
};
