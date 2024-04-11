'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectTool extends Model {
    static associate(models) {
      ProjectTool.belongsTo(models.Tool, {
        foreignKey: 'toolId',
        onDelete: 'CASCADE',
      })
    }
  }
  ProjectTool.init({
    toolId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectTool',
  });
  return ProjectTool;
};