var handler = require('./handlers');
exports.webendpoints = [
    { method: 'GET', path: '/', config: handler.getentry },
    { method: 'GET', path: '/{filename*}', config:handler.get}];

