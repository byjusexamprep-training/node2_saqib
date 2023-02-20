const express = require('express');
const routes = express.Router();
const userController = require('../controler/user');
const authMiddleware = require('../middleware/Authenticator')

routes.get('/me',authMiddleware,userController.me)


module.exports= routes