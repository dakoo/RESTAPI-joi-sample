var config = require('./manifest.json');
var Hapi = require('hapi');

var server = new Hapi.Server();
for(var i in config){
    server.connection(config[i]);
}

server.register([{
    register: require('./plugins/route')
    },{
    register: require('hapi-mongodb'),
    options: require('./dbconfig.json')
    }], function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
    server.start(function() {
        console.log('Server started');
    });
});
