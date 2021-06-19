'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('app')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('app');
  }
};