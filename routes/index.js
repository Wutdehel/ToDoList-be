const express = require('express')
const routes = express.Router()

// Routes

const AuthentificationRoute = require('./auth/index')
const ToDoListRoute = require('./todolist/index')

routes.get('/', (req, res) => { res.send('Welcome to api v1 routes!') })

routes.use('/auth', AuthentificationRoute)
routes.use('/todolist', ToDoListRoute)

module.exports = routes