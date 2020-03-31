const HttpStatus = require('http-status-codes');
const { User } = require('../db/models');
const { getIdFromUrl } = require('../utils/utils');

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
  const id = getIdFromUrl(ctx.request.url);
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
    const id = getIdFromUrl(ctx.request.url);
    const user = await User.findOne({ where: { id }, attributes: ['id', 'role', 'name', 'email'] });
    if (user) {
      const { name, email } = ctx.request.body;
      await User.update(
          {
            name: name || user.name,
            email: email || user.email,
          },
          { where: { id } },
          { validate: true },
      );
      const updatedUser = await User.findOne({
        where: { id },
        attributes: ['id', 'role', 'name', 'email'],
      });
      if (updatedUser) {
        ctx.response.body = updatedUser;
        ctx.response.status = HttpStatus.OK;
        return ctx.response;
      }
    }
  } catch (e) {
    console.log(e.message);
    ctx.response.body = 'Bad request';
    ctx.response.status = HttpStatus.BAD_REQUEST;
    return ctx.response;
  }
}

async function deleteUser(ctx) {
  const id = getIdFromUrl(ctx.request.url);
  const deletedRowsAmount = await User.destroy({ where: { id } });
  console.log(deletedRowsAmount);
  if (deletedRowsAmount > 0) {
    ctx.response.status = HttpStatus.NO_CONTENT;
    return ctx.response;
  }
  ctx.response.body = 'Bad request';
  ctx.response.status = HttpStatus.BAD_REQUEST;
  return ctx.response;
}

async function getUserOrders(ctx) {
  ctx.response.body = 'userController.getUserOrders called';
  ctx.response.status = HttpStatus.OK;
  return ctx.response;
}

async function getUserNotifications(ctx) {
  ctx.response.body = 'userController.getUserNotifications called';
  ctx.response.status = HttpStatus.OK;
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

