'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormSubject extends Model {
    static associate(models) {
      FormSubject.hasMany(models.ContactForm, {
        foreignKey: 'subjectId',
        onDelete: 'CASCADE',
      });
    }
  }
  FormSubject.init({
    subject: DataTypes.STRING,
    formType: {
      type: DataTypes.ENUM('Report', 'Doubt'),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'FormSubject',
    tableName: 'Form_Subjects'
  });
  return FormSubject;
};