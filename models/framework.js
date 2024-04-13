'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Framework extends Model {
    static associate(models) {
      Framework.belongsTo(models.Language, {
        foreignKey: 'languageId',
        onDelete: 'CASCADE',
      });
    }
  }
  Framework.init({
    name: DataTypes.STRING,
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Languages',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    },
    proficiency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Framework',
  });
  return Framework;
};