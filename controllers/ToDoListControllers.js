const ToDoListModel = require('../models/scheme/ToDoList')

async function ReadToDoList(req, res, next) {
    try {
        const idLogin = req.tokenUser.data.id
        let getDataToDoList = await ToDoListModel.find( {userId: idLogin} )
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
    const itemId = req.params.id;
    try {
        const searchData = await ToDoListModel.findById(itemId)
        if (!searchData){
            res.status(404).send({
                message: "Error to get Id",
                statusCode: 404 
            })
        } else {
            res.status(200).send({
                message: "Succes get id",
                statusCode: 200,
                data: searchData.detail
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
    try {
        const itemId = req.params.id;
        const newData = req.body;
        newData.updated_date = new Date();
        const updatedItem = await ToDoListModel.findByIdAndUpdate(itemId, newData, { new: true, });
    
        if (!updatedItem) {
          return res.status(404).send({ 
            message: 'failed to get data',
            statusCode: 404
        });
        }
    
        res.status(200).send({
            message: "Succes to update data",
            statusCode: 200,
            data: updatedItem
        });
      } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Opppsss eror",
            error: error,
            statusCode: 400
        })
      }
}

async function DeleteToDoList(req, res, next) {
   try {
    const itemId = req.params.id;
    const updatedItem = await ToDoListModel.findByIdAndDelete(itemId);

    if (!updatedItem) {
        res.status(400).send({
            message: "Cannot delete data",
            statusCode: 400,
        })
    }
    res.status(200).send({
        message: "Success Delete data",
        statusCode: 200
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

async function DeleteAllTodoList(req, res, next) {
    try {
        await ToDoListModel.deleteMany({}); 
        res.status(200).send({ 
            message: 'All items deleted successfully',
            statusCode: 200
        });
      } catch (error) {
        console.error(error);
        res.status(400).send({ 
            error: 'An error occurred while deleting items',
            statusCode: 400
        });
      }
}

module.exports = {
    ReadToDoList, ReadDetailToDoList, CreateToDoList, UpdateToDoList, DeleteToDoList, DeleteAllTodoList
}