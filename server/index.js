var Hapi = require('hapi');
var Route = require('./route');
var config = require('./manifest.json');

var server= new Hapi.Server();
for(var i in config){
    server.connection(config[i]);
}

server.route(Route.webendpoints);
server.start(function() {
    console.log('Server started');
});