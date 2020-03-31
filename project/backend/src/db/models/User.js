'use strict';

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
                    console.log(this.name.length());
                    if (this.name.length() < 1) {
                      throw new Error('Wring name length');
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

module.exports = User;
