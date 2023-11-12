const express = require('express')
const routes = express.Router()

// Controllers

const ToDoListController = require('../../controllers/ToDoListControllers')

// Middleware

const AuthorizationMiddleware = require('../../middlewares/authorization/index')
const ToDoListMiddleware = require('../../middlewares/todolist/index')

routes.get('/', [AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken ], ToDoListController.ReadToDoList)

routes.get('/:id', [AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken ], ToDoListController.ReadDetailToDoList)

routes.post('/',[AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken, ToDoListMiddleware.BodyValidaton ], ToDoListController.CreateToDoList)

routes.put('/edit/:id',[AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken], ToDoListController.UpdateToDoList)

routes.delete('/delete/:id', [AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken ], ToDoListController.DeleteToDoList)

routes.delete('/deleteall',[AuthorizationMiddleware.verifyToken, AuthorizationMiddleware.verifyJWTToken ], ToDoListController.DeleteAllTodoList)





module.exports = routes