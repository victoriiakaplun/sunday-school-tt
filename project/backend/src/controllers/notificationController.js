const HttpStatus = require('http-status-codes');

async function update(ctx) {
  ctx.response.body = 'notificationController.update called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

module.exports = {
  update,
};

