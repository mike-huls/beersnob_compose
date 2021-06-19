'use strict';

const { Model } = require('sequelize');

let tableModel = { schema: 'app', tableName: 'countries', modelName: 'country' };


module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    static associate(models) {
      country.hasMany(models.city, { onDelete: 'cascade', foreignKey: 'CountryId' });
    }
  };
  country.init({
    Id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    Created:    { type: DataTypes.DATE, field: 'Created'},
    Modified:   { type: DataTypes.DATE, field: 'Modified'},
    Name:       { type: DataTypes.STRING, field: 'Name'},
  }, {
    sequelize,
    schema: tableModel['schema'],
    tableName: tableModel['tableName'],
    modelName: tableModel['modelName'],
    timestamps: false
  });
  return country;
};