'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectHost extends Model {
    static associate(models) {
     
    }
  }
  ProjectHost.init({
    URL: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectHost',
    tableName: 'Projects_Host'
  });
  return ProjectHost;
};