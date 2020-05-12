const db = require('@src/db');
const { DataTypes } = require('sequelize');

const Order = db.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('CREATED', 'CONFIRMED', 'REJECTED'),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

Order.associate = models => {
  Order.hasMany(models.AttributeValue, { foreignKey: 'order_id', as: 'AttributeValue' });
  Order.hasMany(models.Notification, { foreignKey: 'order_id', as: 'Notification' });
  Order.belongsTo(models.Slot, { foreignKey: 'slot_id', as: 'Slot' });
  Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
  Order.belongsTo(models.Timetable, { foreignKey: 'timetable_id', as: 'Timetable' });
};

module.exports = Order;
