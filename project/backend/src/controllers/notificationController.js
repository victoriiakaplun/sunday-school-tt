const HttpStatus = require('http-status-codes');
const db = require('@db');
const { Notification } = db.models;

async function update(ctx) {
  try {
    const { isRead } = ctx.request.body;
    const notificationId = ctx.params.id;
    if (notificationId <= 0) {
      throw new Error();
    }
    const notification = await Notification.findOne({ where: { id: notificationId } });
    if (!notification.dataValues.isRead) {
      await Notification.update(
        {
          isRead: isRead,
        },
        { where: { id: notificationId } },
      );
    }
    ctx.response.body = {
      id: notification.dataValues.id,
      type: notification.dataValues.type,
      isRead: notification.dataValues.isRead,
    };
    ctx.response.status = HttpStatus.OK;
  } catch (e) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'Bad request';
    return ctx.response;
  }
}

module.exports = {
  update,
};
