const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const createSessionToken = (user) => {
    let userHash = { id: user._id , timestamp: Date.now() };
    console.log(keys.JWT_SESSION_SECRET_KEY);
    return jwt.sign({ session: userHash }, keys.JWT_SESSION_SECRET_KEY, { expiresIn: keys.JWT_SESSION_EXPIRE_TIME});
};

module.exports = {
    createSessionToken
}