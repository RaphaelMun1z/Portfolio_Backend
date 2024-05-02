'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
   
    }
  }
  Budget.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    description: DataTypes.STRING,
    references: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};