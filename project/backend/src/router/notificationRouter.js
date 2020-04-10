const Router = require('koa-router');
const notificationController = require('@controllers/notificationController');
const { authenticateCheck } = require('../middleware/authHandler');

module.exports = new Router({
  prefix: '/notifications',
}).put('/:id', authenticateCheck, notificationController.update);
