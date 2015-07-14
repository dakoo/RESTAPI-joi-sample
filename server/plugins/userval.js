var joi = require('joi');
exports.body_userinfo = {
    payload: {
        email: joi.string().email().required(),
        username: joi.string().max(20).min(2).required(),
        nickname: joi.string().max(20).min(2).required(),
    }
};
exports.param_email = {
    params: {
        email: joi.string().email().required(),
    }
};
