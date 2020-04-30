const HttpStatus = require('http-status-codes');
const { User, Notification } = require('@models');

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
  const id = ctx.params.id;
  if (id <= 0) {
    ctx.response.body = 'Wrong user id';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const user = await User.findOne({ where: { id }, attributes: ['id', 'role', 'name', 'email'] });
  if (user) {
    ctx.response.body = user;
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'Bad request';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

async function updateUser(ctx) {
  try {
    const id = ctx.params.id;
    if (id <= 0) {
      throw new Error();
    }
    const user = await User.findOne({ where: { id }, attributes: ['id', 'role', 'name', 'email'] });
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
    console.log(e.message);
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function deleteUser(ctx) {
  const userId = ctx.params.id;
  if (userId <= 0) {
    ctx.response.body = 'Wrong user id';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const user = await User.findOne({ where: { id: userId } });
  if (user) {
    await User.destroy({ where: { id: userId } });
    ctx.response.body = 'Successfully deleted';
    ctx.response.status = HttpStatus.OK;
    return ctx.response;
  }
  ctx.response.body = 'User Not Found';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

async function getUserOrders(ctx) {
  ctx.response.body = 'userController.getUserOrders called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getUserNotifications(ctx) {
  const userId = ctx.params.id;
  if (userId <= 0) {
    ctx.response.body = 'Wrong user id';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
  const notifications = await Notification.findAll({ where: { user_id: userId } });
  console.log(notifications);
  if (!notifications) {
    ctx.response.status = HttpStatus.BAD_REQUEST;
    ctx.response.body = 'bad request';
    return ctx.response;
  }
  ctx.response.status = HttpStatus.OK;
  ctx.response.body = notifications;
  return ctx.response;
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
