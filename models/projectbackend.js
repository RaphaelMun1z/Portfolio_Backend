'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectBackend extends Model {
    static associate(models) {
      ProjectBackend.belongsTo(models.Language, {
        foreignKey: 'languageId',
        onDelete: 'CASCADE',
      });
      ProjectBackend.belongsTo(models.Framework, {
        foreignKey: 'frameworkId',
        onDelete: 'CASCADE',
      });
    }
  }
  ProjectBackend.init({
    languageId: DataTypes.INTEGER,
    frameworkId: DataTypes.INTEGER,
    repository: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectBackend',
    tableName: 'Projects_Backend'
  });
  return ProjectBackend;
};