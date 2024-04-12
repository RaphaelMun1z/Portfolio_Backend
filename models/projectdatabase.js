'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectDatabase extends Model {
    static associate(models) {
      ProjectDatabase.belongsTo(models.Database, {
        foreignKey: 'databaseId',
        onDelete: 'CASCADE',
      })
    }
  }
  ProjectDatabase.init({
    databaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Databases',
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
    modelName: 'ProjectDatabase',
    tableName: 'Projects_Database'
  });
  return ProjectDatabase;
};