const Router = require('koa-router');
const orderController = require('@controllers/orderController');
const { authenticateCheck } = require('../middleware/authHandler');

module.exports = new Router({
  prefix: '/orders',
})
    .post('/', authenticateCheck, orderController.createOrder)
    .get('/', authenticateCheck, orderController.getAll)
    .get('/:id', authenticateCheck, orderController.getOrder)
    .put('/:id', authenticateCheck, orderController.updateOrder)
    .delete('/:id', authenticateCheck, orderController.deleteOrder);

