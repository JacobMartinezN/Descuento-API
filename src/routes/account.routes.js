const express = require('express');
const AccountController = require('../controllers/account.controller');
const api = express.Router();
const auth = require('../middlewares/authentication').tokenVerification;

api.post('/account/signup', AccountController.Register);
api.post('/account/signin', AccountController.Authenticate);
api.put('/account/:id',auth, AccountController.Edit);

module.exports = api;   