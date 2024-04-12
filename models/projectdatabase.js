'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectDatabase extends Model {
    static associate(models) {

    }
  }
  ProjectDatabase.init({
    databaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProjectDatabase',
    tableName: 'Projects_Database'
  });
  return ProjectDatabase;
};