'use strict';

const db = require('@src/db');
const { DataTypes } = require('sequelize');

const Timetable = db.define(
  'Timetable',
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
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    slot_size: {
      type: DataTypes.ENUM('HOUR', 'DAY', 'WEEK'),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

Timetable.associate = models => {
  Timetable.hasMany(models.Attribute, { foreignKey: 'timetable_id', as: 'Attribute' });
  Timetable.hasMany(models.Slot, { foreignKey: 'timetable_id' });
};

module.exports = Timetable;
