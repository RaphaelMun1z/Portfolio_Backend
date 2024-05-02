'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectImage extends Model {
    static associate(models) {
      ProjectImage.belongsTo(models.Project, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
      })
    }
  }
  ProjectImage.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectImage',
    tableName: 'Project_images'
  });
  return ProjectImage;
};