'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactForm extends Model {
    static associate(models) {
      ContactForm.belongsTo(models.FormSubject, {
        foreignKey: 'subjectId',
        onDelete: 'CASCADE',
      });
    }
  }
  ContactForm.init({
    personName: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FormSubject',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    },
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContactForm',
    tableName: 'Contact_Forms'
  });
  return ContactForm;
};