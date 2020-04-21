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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

Slot.associate = models => {
  Slot.hasMany(models.Order, { foreignKey: 'slot_id' });
};

module.exports = Slot;
