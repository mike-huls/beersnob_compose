'use strict';

const { Model } = require('sequelize');

let tableModel = { schema: 'app', tableName: 'cities', modelName: 'city' };


module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    static associate(models) {
      city.belongsTo(models.country, { foreignKey: 'CountryId' });
      city.hasMany(models.venue, { onDelete: 'cascade', foreignKey: 'CityId' });
    }
  };
  city.init({
    Id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    Created:    { type: DataTypes.DATE, field: 'Created'},
    Modified:   { type: DataTypes.DATE, field: 'Modified'},
    CountryId:  { type: DataTypes.STRING, field: 'CountryId'},
    Name:       { type: DataTypes.STRING, field: 'Name'},
  }, {
    sequelize,
    schema: tableModel['schema'],
    tableName: tableModel['tableName'],
    modelName: tableModel['modelName'],
    timestamps: false
  });
  return city;
};