const db = require('@src/db');
const { DataTypes } = require('sequelize');

const AttributeValue = db.define(
  'AttributeValue',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Incorrrect title!',
        },
      },
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = AttributeValue;
