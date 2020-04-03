const Router = require('koa-router');
const authController = require('@controllers/authController');
const { authenticateCheck } = require('../middleware/authHandler');

module.exports = new Router({
  prefix: '/users',
})
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/logout', authenticateCheck, authController.logout);
