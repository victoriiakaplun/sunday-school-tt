'use strict';

const db = require('@src/db');
const { DataTypes } = require('sequelize');

const Attribute = db.define(
  'Attribute',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('STRING', 'DATE', 'NUMBER'),
      allowNull: false,
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

Attribute.associate = models => {
  Attribute.belongsTo(models.Timetable, { foreignKey: 'timetable_id' });
};

module.exports = Attribute;
