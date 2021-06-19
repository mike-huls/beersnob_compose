'use strict';

const { Model } = require('sequelize');

let tableModel = { schema: 'app', tableName: 'reports', modelName: 'report' };


module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    static associate(models) {
      // report.belongsTo(models.venue, { foreignKey: 'VenueId' });
      // report.belongsTo(models.user, { foreignKey: 'UserId' });
      // report.belongsTo(models.beer, { foreignKey: 'BeerId' });
    }
  };
  report.init({
    Id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    Created:    { type: DataTypes.DATE, field: 'Created'},
    Modified:   { type: DataTypes.DATE, field: 'Modified'},
    VenueId:    { type: DataTypes.STRING, field: 'VenueId'},
    BeerId:     { type: DataTypes.STRING, field: 'BeerId'},
    UserId:     { type: DataTypes.STRING, field: 'UserId'},
    Price:      { type: DataTypes.FLOAT, field: 'Price'},
    Rating:     { type: DataTypes.FLOAT, field: 'Rating'},
    Review:     { type: DataTypes.STRING, field: 'Review'},
  }, {
    sequelize,
    schema: tableModel['schema'],
    tableName: tableModel['tableName'],
    modelName: tableModel['modelName'],
    timestamps: false
  });
  return report;
};