const express = require('express')
const routes = express.Router()

// Controllers

const ToDoListController = require('../../controllers/ToDoListControllers')

// Middleware

const AuthorizationMiddleware = require('../../middlewares/authorization/index')

routes.get('/', ToDoListController.ReadToDoList)

routes.get('/:id', ToDoListController.ReadDetailToDoList)

routes.post('/',[AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken ], ToDoListController.CreateToDoList)

routes.put('/edit/:id', ToDoListController.UpdateToDoList)

routes.delete('/delete/:id', ToDoListController.DeleteToDoList)

routes.delete('/delete', ToDoListController.DeleteAllTodoList)





module.exports = routes