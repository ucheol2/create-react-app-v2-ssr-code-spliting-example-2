const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const Loadable = require('react-loadable');
const getBundles = require('react-loadable/webpack').getBundles;

const render = require('./render').default;
const stats = require('./react-loadable.json');

const app = new Koa();
const template = fs.readFileSync(path.join(__dirname, '../build/index.html'), { encoding: 'utf8'});

const response = (ctx) => {
  const { html, modules } = render(ctx);
  const bundles = getBundles(stats, modules);

  let styles = bundles.filter(bundle => bundle.file.endsWith('.css'))
    .map((script) => `<link href="${style.publicPath}" rel="stylesheet"/>`).join('\n');
  let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'))
    .map((script) => `<script src="${script.publicPath}"></script>`).join('\n');

  const page = template
    .replace('<meta styles>', styles)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>${scripts}`);

  ctx.body = page;
}

app.use((ctx, next) => {
  if(ctx.path === '/') return response(ctx);
  return next();
});
app.use(serve(path.resolve(__dirname, '../build/')));
app.use(response);

process.on('SIGINT', () => {
	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

process.on('SIGTERM', () => {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

const shutdown = () => {
  process.exit();
}

Loadable.preloadAll().then(() => {
  app.listen(3001);
  console.log("App is running on http://localhost:3001");
})
