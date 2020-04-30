const db = require('@src/db');
const { DataTypes } = require('sequelize');

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Incorrect name!',
        },
        /* checkLength: {
                  checkLength() {
                    if (this.name.length() < 1) {
                      throw new Error('Wrong name length');
                    }
                  },
                }, */
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Incorrect email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

User.associate = models => {
  User.hasMany(models.Order, { foreignKey: 'user_id', as: 'Order' });
  User.hasMany(models.Notification, { foreignKey: 'user_id', as: 'Notification' });
};

module.exports = User;
