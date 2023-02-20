const express = require('express');
const routes = express.Router();
const authController = require('../controler/auth');



routes.post('/register', authController.registeration)
routes.post('/login',authController.login)


module.exports = routes;