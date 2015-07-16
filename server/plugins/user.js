var Boom = require('boom');
exports.add = function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    db.collection('users').findOne({"email" : request.payload.email}, function(err, ret) {
        if (err) {
            return reply(Boom.internal('Internal Database Error', err));
        }
        if (ret){
            return reply(Boom.conflict('Duplicated Resource Error', err));
        }
        var user = {
            email: request.payload.email,
            username: request.payload.username,
            nickname : request.payload.nickname
        };
        db.collection('users').insert(user, {w:1}, function (err){
            if (err){
                return reply(Boom.internal('Internal Database Error', err));
            }else{
                reply();
            }
        });
    });
};
exports.getlist = function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    db.collection('users').find().toArray(function (err, ret){
        var users = [];
        for (var i in ret){
            var user = {
                email: ret[i].email,
                username: ret[i].username,
                nickname : ret[i].nickname
            };
            users.push(user);
        }
        reply(users);
    });
};
exports.get = function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    db.collection('users').findOne({"email" : request.params.email}, function(err, ret) {
        if (err)
            return reply(Boom.internal('Internal Database Error', err));
        var user = {
            email: ret.email,
            username: ret.username,
            nickname : ret.nickname
        };
        reply(user);
    });

};
exports.update = function (request, reply) {
    var user = {
        email: request.payload.email,
        username: request.payload.username,
        nickname : request.payload.nickname
    };
    var db = request.server.plugins['hapi-mongodb'].db;
    db.collection('users').update({"email" : request.params.email}, user, function(err, ret) {
        if (err)
            return reply(Boom.internal('Internal Database Error', err));
        reply();
    });
};
exports.remove = function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    db.collection('users').remove({"email" : request.params.email}, function (err){
        if (err)
            return reply(Boom.internal('Internal Database error', err));
        reply();
    });
};
