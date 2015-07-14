var page = require('./page');
var pages = [
    { method: 'GET', path: '/', handler: page.front },
    { method: 'GET', path: '/{filename*}', handler: page.get}];

var user = require('./user');
var v = require('./userval');
var apis = [
    { method: 'POST', path: '/user', handler: user.add, config:{validate:v.body_userinfo}},
    { method: 'GET', path: '/users', handler: user.getlist },
    { method: 'GET', path: '/user/{email*}', handler: user.get, config:{validate:v.param_email}},
    { method: 'PATCH', path: '/user/{email*}', handler: user.update, config:{validate:v.param_email}},
    { method: 'DELETE', path: '/user/{email*}', handler: user.remove, config:{validate:v.param_email}}];

exports.register = function (server, options, next) {
    server.select("web-ui").route(pages);
    server.select("api").route(apis);
    next();
};

exports.register.attributes = {
    name: 'route',
    version: '1.0.0'
};
