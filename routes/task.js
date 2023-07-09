const express = require("express");

const taskController = require('../controllers/task.js');
const isAuthenticated = require('../utils/authMiddleware.js');

const Router = express.Router();

//CONTROLLERS
Router.route('/new').post(isAuthenticated,taskController.newTask);
Router.route('/my').get(isAuthenticated,taskController.myTasks);
Router.route('/:id').put(isAuthenticated,taskController.updateTask).delete(isAuthenticated,taskController.deleteTask);

module.exports = Router;