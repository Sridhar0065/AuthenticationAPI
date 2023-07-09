const express = require("express");

const userController = require('../controllers/user.js');
const isAuthenticated = require('../utils/authMiddleware.js');

const Router = express.Router();

//CONTROLLERS
Router.route('/register').post(userController.register);
Router.route('/login').post(userController.login);
Router.route('/logout').get(isAuthenticated , userController.logout);
Router.route('/me').get(isAuthenticated , userController.details);

module.exports = Router;