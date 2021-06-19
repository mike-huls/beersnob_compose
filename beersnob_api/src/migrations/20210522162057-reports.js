'use strict';

let tableModel = { schema: 'app', tableName: 'reports' };
let tableModel_venues = { schema: 'app', tableName: 'venues' };
let tableModel_beers = { schema: 'app', tableName: 'beers' };
let tableModel_users = { schema: 'app', tableName: 'users' };


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // 1. Create table
      await queryInterface.createTable(tableModel, {
        Id:           { allowNull: false, type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        Created:      { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        Modified:     { allowNull: false, type: Sequelize.DATE, defaultValue: new Date() },
        
        VenueId:      { type: Sequelize.INTEGER, onDelete: 'CASCADE', references: {
          model: tableModel_venues, key: 'Id', as: 'VenueId'
        }},        
        BeerId:      { type: Sequelize.INTEGER, onDelete: 'CASCADE', references: {
          model: tableModel_beers, key: 'Id', as: 'BeerId'
        }},        
        UserId:      { type: Sequelize.INTEGER, onDelete: 'CASCADE', references: {
          model: tableModel_users,key: 'Id',as: 'UserId'
        }},        
        Price:        { allowNull: true, type: Sequelize.FLOAT  },
        Rating:       { allowNull: true, type: Sequelize.FLOAT  },
        Review:       { allowNull: true, type: Sequelize.STRING  },
      });

      // 2. Add indices
      await queryInterface.addIndex(tableModel, ['Id'], { transaction });
      await queryInterface.addIndex(tableModel, ['Price'], { transaction });
      await queryInterface.addIndex(tableModel, ['Rating'], { transaction });

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
