const express = require('express');
const routes = express.Router();
const authController = require('../controler/auth');


routes.post('/register', authController.registeration)


module.exports = routes;