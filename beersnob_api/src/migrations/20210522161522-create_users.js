'use strict';

let tableModel = { schema: 'app', tableName: 'users' };


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Create table
      await queryInterface.createTable(tableModel, {
        Id:           { allowNull: false, type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        Created:      { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        Modified:     { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        
        Username:     { allowNull: true, type: Sequelize.STRING  },
        Password:     { allowNull: true, type: Sequelize.STRING  },
      });

      // 2. Add indices
      await queryInterface.addIndex(tableModel, ['Id'], { transaction });
      await queryInterface.addIndex(tableModel, ['Username'], { transaction });

      // 3. Commit
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
