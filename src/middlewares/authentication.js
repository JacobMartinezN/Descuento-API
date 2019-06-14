'use strict';

const jwt = require('jsonwebtoken');
const secretKey = require('../../config/keys').JWT_SESSION_SECRET_KEY;

exports.tokenVerification = function(req, res, next) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(403).send({
            ok: false,
            message: 'Not exist authorization header'
        });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                ok: false,
                message: 'Invalid Token',
                errors: err
            });
        }

        req.user = decoded;
        next();
    })
};