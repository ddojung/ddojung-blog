const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/programming/:id', (req, res) => {
    return app.render(req, res, '/content', { id: req.params.id });
  });
  server.get('/chat/:id', (req, res) => {
    return app.render(req, res, '/content', { id: req.params.id });
  });
  server.get('/food/:id', (req, res) => {
    return app.render(req, res, '/content', { id: req.params.id });
  });

  server.get('/editor/:collection/:doc', (req, res) => {
    return app.render(req, res, '/editor', { collection: req.params.collection, doc: req.params.doc });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
