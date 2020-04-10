'use strict';
const models = {
  User: require('./User'),
  Timetable: require('./Timetable'),
  Attribute: require('./Attribute'),
};

Object.keys(models).forEach(key => {
  if (models[key] && models[key].associate) {
    models[key].associate(models);
  }
});

module.exports = models;
