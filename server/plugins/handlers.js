exports.getentry = {
    handler: {
        file: function (request) {
            return '../client/html/' + 'index.html';
        }
    }
};
exports.get = {
    handler: {
        file: function (request) {
            return '../client/html/' + request.params.filename;
        }
    }
};
exports.api = {
    handler: {
        file: function (request) {
            return '../client/html/' + 'api.html';
        }
    }
};