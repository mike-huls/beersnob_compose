'use strict';

const { Model } = require('sequelize');

let tableModel = { schema: 'app', tableName: 'beers', modelName: 'beer' };


module.exports = (sequelize, DataTypes) => {
  class beer extends Model {
    static associate(models) {
      beer.hasMany(models.report, { onDelete: 'cascade', foreignKey: 'BeerId' });
    }
  };
  beer.init({
    Id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    Created:    { type: DataTypes.DATE, field: 'Created'},
    Modified:   { type: DataTypes.DATE, field: 'Modified'},
    Name:       { type: DataTypes.STRING, field: 'Name'},
    Type:       { type: DataTypes.STRING, field: 'Type'}
  }, {
    sequelize,
    schema: tableModel['schema'],
    tableName: tableModel['tableName'],
    modelName: tableModel['modelName'],
    timestamps: false
  });
  return beer;
};