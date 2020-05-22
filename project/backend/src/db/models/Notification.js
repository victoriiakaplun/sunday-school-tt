const db = require('@src/db');
const { DataTypes } = require('sequelize');

const Notification = db.define(
  'Notification',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('CREATED', 'CONFIRMED', 'REJECTED', 'DELETED'),
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);
Notification.associate = models => {
  Notification.belongsTo(models.Order, { foreignKey: 'order_id', as: 'Order' });
};

module.exports = Notification;
