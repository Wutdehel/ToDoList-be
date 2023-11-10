const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.listen(port, function() {
    console.log(`Server is running in port : ${ port }`)
})

const ConnectionMongoDB = require('./models/ConnectionToMongoDB')
ConnectionMongoDB()

// Routes
const MainRoutes = require('./routes/index')
app.use('/api/v1', MainRoutes)