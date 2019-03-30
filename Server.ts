const next = require('next');
const route = require('./routes');
const { createServer } = require('http');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = route.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000);
});
