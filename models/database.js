'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Database extends Model {
    static associate(models) {
     
    }
  }
  Database.init({
    name: DataTypes.STRING,
    proficiency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Database',
  });
  return Database;
};