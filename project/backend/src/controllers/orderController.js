const HttpStatus = require('http-status-codes');

async function createOrder(ctx) {
  ctx.response.body = 'orderController.create called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getAll(ctx) {
  ctx.response.body = 'orderController.getAll called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getOrder(ctx) {
  ctx.response.body = 'orderController.get called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function updateOrder(ctx) {
  ctx.response.body = 'orderController.update called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function deleteOrder(ctx) {
  ctx.response.body = 'orderController.deleteOrder called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

module.exports = {
  getOrder,
  getAll,
  updateOrder,
  deleteOrder,
  createOrder,
};

