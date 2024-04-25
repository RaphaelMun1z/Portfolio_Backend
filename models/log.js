'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
    
    }
  }
  Log.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};