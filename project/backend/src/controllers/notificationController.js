const HttpStatus = require('http-status-codes');
const { getIdFromUrl } = require('../utils/utils');
const db = require('@db');
const { Notification } = db.models;

async function update(ctx) {
  try {
    const { isRead } = ctx.request.body;
    const notificationId = getIdFromUrl(ctx.request.url);
    if (notificationId <= 0) {
      throw new Error('wrong id');
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
    ctx.response.body = 'bad request';
    return ctx.response;
  }
}

module.exports = {
  update,
};
