const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    userId: { type: String },
    todo: { type: String },
    checked: { type: Boolean },
    detail: { type: String },
    created_date: { type: Date },
    updated_date: { type: String },
})

const ToDoList = Mongoose.model('ToDoList', Schema)

module.exports = ToDoList