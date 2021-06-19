'use strict';

let tableModel = { schema: 'app', tableName: 'countries' };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // 1. Create table
      await queryInterface.createTable(tableModel, {
        Id:             { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        Created:        { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        Modified:       { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        
        Name:           { allowNull: false, type: Sequelize.STRING },
        Capital:        { allowNull: false, type: Sequelize.STRING },      
      });

      // 2. Add indices
      await queryInterface.addIndex(tableModel, ['Id'], { transaction });
      await queryInterface.addIndex(tableModel, ['Name'], { transaction });

      // 3. Commit the transaction
      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableModel);
  }

};