'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectFrontend extends Model {
    static associate(models) {
      ProjectFrontend.belongsTo(models.Language, {
        foreignKey: 'languageId',
        onDelete: 'CASCADE',
      });
      ProjectFrontend.belongsTo(models.Framework, {
        foreignKey: 'frameworkId',
        onDelete: 'CASCADE',
      });
    }
  }
  ProjectFrontend.init({
    languageId: DataTypes.INTEGER,
    frameworkId: DataTypes.INTEGER,
    repository: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectFrontend',
    tableName: 'Projects_Frontend'
  });
  return ProjectFrontend;
};