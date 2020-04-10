'use strict';

const Sequelize = require('sequelize');
const config = require('@src/config/config.json');

const db = new Sequelize(config[process.env.NODE_ENV].url, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
