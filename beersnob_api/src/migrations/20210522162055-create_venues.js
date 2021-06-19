'use strict';

let tableModel = { schema: 'app', tableName: 'venues' };
let tableModel_cities = { schema: 'app', tableName: 'cities' };


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Create table
      await queryInterface.createTable(tableModel, {
        Id:           { allowNull: false, type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        Created:      { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        Modified:     { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        
        CityId:       { type: Sequelize.INTEGER, onDelete: 'CASCADE', references: {
          model: tableModel_cities,
          key: 'Id',
          as: 'CityId'
        }},        
        Name:         { allowNull: true, type: Sequelize.STRING  },
        Address:      { allowNull: true, type: Sequelize.STRING  },
      });

      // 2. Add indices
      await queryInterface.addIndex(tableModel, ['Id'], { transaction });
      await queryInterface.addIndex(tableModel, ['Name'], { transaction });

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
