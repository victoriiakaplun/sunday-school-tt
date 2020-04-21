'use strict';
const models = {
  User: require('./User'),
  Timetable: require('./Timetable'),
  Attribute: require('./Attribute'),
  Slot: require('./Slot'),
  AttributeValue: require('./AttributeValue'),
  Order: require('./Order'),
  Notification: require('./Notification'),
};

Object.keys(models).forEach(key => {
  if (models[key] && models[key].associate) {
    models[key].associate(models);
  }
});

module.exports = models;
