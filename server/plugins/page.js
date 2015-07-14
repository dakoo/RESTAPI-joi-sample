exports.front = {
    file: function (request) {
        return '../client/html/' + 'index.html';
    }
};
exports.get = {
    file: function (request) {
        return '../client/html/' + request.params.filename;
    }
};