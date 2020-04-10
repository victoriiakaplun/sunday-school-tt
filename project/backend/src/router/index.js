const Router = require('koa-router');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const timetableRouter = require('./timetableRouter');
const notificationRouter = require('./notificationRouter');
const orderRouter = require('./orderRouter');

const apiRouter = new Router();
const v1Router = new Router();

v1Router.use(
  '/v1',
  authRouter.routes(),
  userRouter.routes(),
  timetableRouter.routes(),
  notificationRouter.routes(),
  orderRouter.routes(),
);

apiRouter.use('/api', v1Router.routes(), v1Router.allowedMethods());

module.exports = apiRouter.routes();
