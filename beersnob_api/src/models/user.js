'use strict';

const { Model } = require('sequelize');

let tableModel = { schema: 'app', tableName: 'users', modelName: 'user' };


module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.report, { onDelete: 'cascade', foreignKey: 'UserId' });
    }
  };
  user.init({
    Id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'Id' },
    Created:    { type: DataTypes.DATE, field: 'Created'},
    Modified:   { type: DataTypes.DATE, field: 'Modified'},
    Userame:       { type: DataTypes.STRING, field: 'Username'},
    Password:       { type: DataTypes.STRING, field: 'Password'}
  }, {
    sequelize,
    schema: tableModel['schema'],
    tableName: tableModel['tableName'],
    modelName: tableModel['modelName'],
    timestamps: false
  });
  return user;
};