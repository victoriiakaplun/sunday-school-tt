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
  Order.belongsTo(models.Slot, { foreignKey: 'order_id' });
  Order.hasMany(models.AttributeValue, { foreignKey: 'order_id' });
  Order.hasMany(models.Notification, { foreignKey: 'order_id' });
};

module.exports = Order;
