'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterpersonalSkill extends Model {
    static associate(models) {
    }
  }
  InterpersonalSkill.init({
    name: DataTypes.STRING,
    proficiency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InterpersonalSkill',
    tableName: 'Interpersonal_Skills'
  });
  return InterpersonalSkill;
};