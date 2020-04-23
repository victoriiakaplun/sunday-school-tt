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
      validate: {
        notEmpty: {
          msg: 'Incorrrect title!',
        },
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'It is not a date!',
        },
      },
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'It is not a date!',
        },
      },
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
  Timetable.hasMany(models.Slot, { foreignKey: 'timetable_id', as: 'Slot' });
};

module.exports = Timetable;
