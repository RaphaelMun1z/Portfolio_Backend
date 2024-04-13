'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectHost extends Model {
    static associate(models) {
      ProjectHost.belongsTo(models.Project, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      })
    }
  }
  ProjectHost.init({
    URL: DataTypes.STRING,
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'ProjectHost',
    tableName: 'Projects_Host'
  });
  return ProjectHost;
};