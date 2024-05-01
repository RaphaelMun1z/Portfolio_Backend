'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
    }
  }
  Report.init({
    subject: {
      type: DataTypes.ENUM('Responsive', 'Load', 'Other'),
    },
    message: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};