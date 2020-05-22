const HttpStatus = require('http-status-codes');
const {
  User,
  Notification,
  Order,
  AttributeValue,
  Slot,
  Timetable,
  Attribute,
} = require('@models');

async function getAll(ctx) {
  const users = await User.findAll({ attributes: ['id', 'role', 'name', 'email'] });
  if (users) {
    ctx.response.body = users;
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'Bad request';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

async function getProfile(ctx) {
  const user = ctx.state.user;
  if (user) {
    ctx.response.body = { id: user.id, role: user.role, name: user.name, email: user.email };
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'Bad request';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

async function getUser(ctx) {
  try {
    const id = ctx.params.id;
    if (id <= 0) {
      throw new Error();
    }
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'role', 'name', 'email'],
    });
    if (!user) {
      throw new Error();
    }
    ctx.response.body = user;
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function updateUser(ctx) {
  try {
    const id = ctx.params.id;
    if (id <= 0) {
      throw new Error();
    }
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'role', 'name', 'email'],
    });
    if (!user) {
      throw new Error();
    }
    const { name, email } = ctx.request.body;
    await User.update(
      {
        name: name || user.name,
        email: email || user.email,
      },
      { where: { id } },
      { validate: true },
    );
    ctx.response.body = {
      id: user.id,
      role: user.role,
      name: name || user.name,
      email: email || user.email,
    };
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function deleteUser(ctx) {
  try {
    const userId = ctx.params.id;
    if (userId <= 0) {
      throw new Error();
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error();
    }
    await User.destroy({ where: { id: userId } });
    ctx.response.body = 'Successfully deleted';
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  } catch (e) {
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function getUserOrders(ctx) {
  try {
    const userId = ctx.params.id;
    if (userId <= 0) {
      throw new Error();
    }
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error();
    }
    const orders = await Order.findAll({
      where: { user_id: userId },
      attributes: ['id', 'status'],
      include: [
        {
          model: Slot,
          as: 'Slot',
          attributes: ['id', 'start', 'end'],
        },
        {
          model: Timetable,
          as: 'Timetable',
          attributes: ['id', 'title'],
        },
        {
          model: AttributeValue,
          as: 'AttributeValue',
          attributes: ['id', 'value'],
          include: {
            model: Attribute,
            as: 'Attribute',
            attributes: ['id', 'title'],
          },
        },
      ],
    });
    if (!orders) {
      throw new Error();
    }
    const responseBody = [];
    for (const order of orders) {
      responseBody.push({
        id: order.dataValues.id,
        status: order.dataValues.status,
        Slot: {
          id: order.dataValues.Slot.id,
          start: order.dataValues.Slot.start.toString(),
          end: order.dataValues.Slot.end.toString(),
        },
        Timetable: order.dataValues.Timetable,
        AttributeValue: order.dataValues.AttributeValue,
      });
    }
    ctx.response.status = HttpStatus.OK;
    ctx.response.body = responseBody;
    return ctx.response;
  } catch (e) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'Bad request';
    return ctx.response;
  }
}

async function getUserNotifications(ctx) {
  try {
    const userId = ctx.params.id;
    if (userId <= 0) {
      throw new Error();
    }
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error();
    }
    const notifications = await Notification.findAll({
      where: { user_id: userId },
      attributes: ['id', 'type', 'isRead'],
      include: [
        {
          model: Order,
          as: 'Order',
          attributes: ['id'],
          include: [
            {
              model: Slot,
              as: 'Slot',
              attributes: ['id', 'start', 'end'],
            },
            {
              model: Timetable,
              as: 'Timetable',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });
    if (!notifications) {
      throw new Error();
    }
    ctx.response.status = HttpStatus.OK;
    ctx.response.body = notifications;
    return ctx.response;
  } catch (e) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'Bad request';
    return ctx.response;
  }
}

module.exports = {
  getAll,
  getProfile,
  getUser,
  updateUser,
  deleteUser,
  getUserNotifications,
  getUserOrders,
};
