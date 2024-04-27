'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class System extends Model {
    static associate(models) {

    }
  }
  System.init({
    instagram: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'System',
  });
  return System;
};