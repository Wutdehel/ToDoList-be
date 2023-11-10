const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    fullname: { type: String },
})

const User = Mongoose.model('User', Schema)

module.exports = User