const Router = require('koa-router');
const userController = require('@controllers/userController');
const { authenticateCheck } = require('../middleware/authHandler');
const { adminRootCheck } = require('../middleware/adminRootHandler');

module.exports = new Router({
  prefix: '/users',
})
    .get('/', authenticateCheck, adminRootCheck, userController.getAll)
    .get('/profile', authenticateCheck, userController.getProfile)
    .get('/:id', authenticateCheck, adminRootCheck, userController.getUser)
    .put('/:id', authenticateCheck, userController.updateUser)
    .delete('/:id', authenticateCheck, adminRootCheck, userController.deleteUser)
    .get('/:id/orders', authenticateCheck, userController.getUserOrders)
    .get('/:id/notifications', authenticateCheck, userController.getUserNotifications);

