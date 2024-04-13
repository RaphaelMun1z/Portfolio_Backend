'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.hasMany(models.Framework, {
        foreignKey: 'languageId',
        onDelete: 'CASCADE',
      })
    }
  }
  Language.init({
    name: DataTypes.STRING,
    proficiency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Language',
  });
  return Language;
};

