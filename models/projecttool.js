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
    toolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tools',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProjectTool',
    tableName: 'Projects_Tools'
  });
  return ProjectTool;
};