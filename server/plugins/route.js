var page = require('./page');
var pages = [
    { method: 'GET', path: '/', handler: page.front },
    { method: 'GET', path: '/{filename*}', handler: page.get}];

var user = require('./user');
var apis = [
    { method: 'POST', path: '/user', handler: user.add },
    { method: 'GET', path: '/users', handler: user.getlist },
    { method: 'GET', path: '/user/{email*}', handler: user.get },
    { method: 'PATCH', path: '/user/{email*}', handler: user.update },
    { method: 'DELETE', path: '/user/{email*}', handler: user.remove }];

exports.register = function (server, options, next) {
    server.select("web-ui").route(pages);
    server.select("api").route(apis);
    next();
};

exports.register.attributes = {
    name: 'route',
    version: '1.0.0'
};
