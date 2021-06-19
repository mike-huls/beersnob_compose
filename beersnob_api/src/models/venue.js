'use strict';

const { Model } = require('sequelize');

let tableModel = { schema: 'app', tableName: 'venues', modelName: 'venue' };


module.exports = (sequelize, DataTypes) => {
  class venue extends Model {
    static associate(models) {
      venue.belongsTo(models.city,  { foreignKey: 'CityId' });
      venue.hasMany(models.report, { onDelete: 'cascade', foreignKey: 'VenueId' });
    }
  };
  venue.init({
    Id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    Created:    { type: DataTypes.DATE, field: 'Created'},
    Modified:   { type: DataTypes.DATE, field: 'Modified'},
    CityId:     { type: DataTypes.STRING, field: 'CityId'},
    Name:       { type: DataTypes.STRING, field: 'Name'},
    Address:    { type: DataTypes.STRING, field: 'Address'},
  }, {
    sequelize,
    schema: tableModel['schema'],
    tableName: tableModel['tableName'],
    modelName: tableModel['modelName'],
    timestamps: false
  });
  return venue;
};