const db = require('@src/db');
const { DataTypes } = require('sequelize');

const Slot = db.define(
  'Slot',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'It is not a date!',
        },
      },
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'It is not a date!',
        },
      },
    },
  },
  {
    freezeTableName: true,
  },
);

Slot.associate = models => {
  Slot.hasMany(models.Order, { foreignKey: 'slot_id', as: 'Order' });
};

module.exports = Slot;
