require('module-alias/register');
require('dotenv').config({ path: '../.env' });
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const send = require('koa-send');
const serve = require('koa-static');
const appRouter = require('./router');
const passport = require('./controllers/authController').passport;
const session = require('koa-generic-session');
const SequelizeSessionStore = require('koa-generic-session-sequelize');
const db = require('./db');
const app = new Koa();
const staticDir = path.resolve(__dirname, '..', '../frontend', 'public');
const { insertAdmin } = require('./controllers/adminController');

const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;

app.use(koaBody());
app.use(serve(staticDir));

app.keys = ['secret'];
const sessionOptions = {
  key: 'koa:sess',
  renew: true,
  maxAge: COOKIE_MAX_AGE,
  resave: false,
  saveUninitializes: false,
  store: new SequelizeSessionStore(db, {
    tableName: 'sessions',
  }),
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
/* admin: {
name: 'admin',
role: 'admin',
email: 'admin@gmail.com',
password: 'admin'
} */
insertAdmin();
app.use(appRouter);

app.use(async (ctx, next) => {
  console.log('»» IN'); // eslint-disable-line no-console
  await next();
  console.log('«« OUT'); // eslint-disable-line no-console
});

app.use(async ctx => {
  if (!ctx.request.path.startsWith('/api/v1/')) {
    await send(ctx, 'index.html', { root: staticDir });
  }
});

app.listen(3000, () => {
  console.log('Server starts listen port');
});
