'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate(models) {

    }
  }
  SocialMedia.init({
    instagram: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};