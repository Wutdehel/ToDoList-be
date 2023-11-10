const express = require('express')
const routes = express.Router()

// Controller

const AuthentificationControllers = require('../../controllers/AuthentificationController')

// midlewares

const AuthMiddleware = require ('../../middlewares/auth/index')

routes.post('/register',[AuthMiddleware.bodyValidationLogin, AuthMiddleware.passwordValidation], AuthentificationControllers.Register)

routes.post('/login', AuthentificationControllers.Login)

routes.get('/', (req, res, next) => {
    res.send('Auth Endpoint')
})

module.exports = routes