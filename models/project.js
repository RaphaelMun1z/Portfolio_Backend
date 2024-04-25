'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasOne(models.ProjectHost, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      });
      Project.hasOne(models.ProjectDatabase, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      });
      Project.hasMany(models.ProjectTool, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      });
      Project.hasOne(models.ProjectFrontend, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      });
      Project.hasOne(models.ProjectBackend, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('Web', 'Desktop', 'Mobile', 'EmbeddedProgramming'),
      allowNull: false
    },
    stack: {
      type: DataTypes.ENUM('Frontend', 'Backend', 'Fullstack'),
      allowNull: false
    },
    isHosted: DataTypes.BOOLEAN,
    usedTools: DataTypes.BOOLEAN,
    usedDatabase: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};