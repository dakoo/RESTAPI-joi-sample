var Hapi = require('hapi');
var Route = require('./route');
var config = require('./manifest.json');

var server= new Hapi.Server();

for(var i in config){
    server.connection(config[i]);
}

server.select("web-ui").route(Route.webendpoints);
server.select("api").route(Route.apiendpoints);

server.start(function() {
    console.log('Server started');
});
