const routes = require('next-routes');

module.exports = routes().add('content', '/(programming|food|chat)/:id');
