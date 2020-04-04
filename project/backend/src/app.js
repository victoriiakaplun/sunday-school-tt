const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');

const staticDir = path.resolve(__dirname, '..', '..', 'public');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('>>>> IN'); // eslint-disable-line no-console
  const a = 12;
  console.log(`>> IN: ${a}`); // eslint-disable-line no-console
  await next();
  console.log('<<<< OUT'); // eslint-disable-line no-console
});

app.use(serve(staticDir));

// Default route
app.use(async function(ctx) {
  await send(ctx, 'index.html', { root: staticDir });
});

app.listen(3000, () => {});
