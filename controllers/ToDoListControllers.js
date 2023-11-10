const ToDoListModel = require('../models/scheme/ToDoList')

async function ReadToDoList(req, res, next) {
    try {
        let getDataToDoList = await ToDoListModel.find()
        
        res.status(200).send({
            message: "List Data",
            statusCode: 200,
            data: getDataToDoList
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Opppsss eror",
            error: error,
            statusCode: 400
        })
    }
}

async function ReadDetailToDoList(req, res, next) {
   res.send("this Is endpoint todo") 
}

async function CreateToDoList(req, res, next) {
   const { todo, detail } = req.body

   try {
    let data = {
        "userId": req.tokenUser.data.id ,
        "todo": todo,
        "checked": false,
        "detail": detail,
        "created_date": new Date(),
        "updated_date": new Date(),
    }

    console.log(req.tokenUser.data)

    let createData = await ToDoListModel.create(data)
    
    if ( !createData) {
        res.status(400)
    } else {
        res.send({
            message: 'Successfull to create data To do list!',
            statusText: 'Successfull to create data To do list!',
            statusCode: 200,
        })
    }

   } catch (error) {
    console.log(error)
    res.status(400).send({
        message: "Opppsss eror",
        error: error,
        statusCode: 400
    })
   }
}

async function UpdateToDoList(req, res, next) {
   res.send("this Is endpoint todo") 
}

async function DeleteToDoList(req, res, next) {
   res.send("this Is endpoint todo") 
}

module.exports = {
    ReadToDoList, ReadDetailToDoList, CreateToDoList, UpdateToDoList, DeleteToDoList,
}