var handler = require('./handlers');
var webendpoints = [
    { method: 'GET', path: '/', config: handler.getentry },
    { method: 'GET', path: '/{filename*}', config:handler.get}];
var apiendpoints = [
    { method: 'GET', path: '/', config: handler.api }];

exports.register = function (server, options, next) {
    server.select("web-ui").route(webendpoints);
    server.select("api").route(apiendpoints);
    next();
};
exports.register.attributes = {
    name: 'route',
    version: '1.0.0'
};
