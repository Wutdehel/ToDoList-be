const mongoose = require('mongoose')

const url = "mongodb+srv://elizanlilongongopan:Icanaja1@cluster0.2cxld0h.mongodb.net/ToDoList"

const ConnectionDB = async () => {
    try {
        const Connect = await mongoose.connect(url)
        console.log(`Mongo Connected : ${ Connect.connection.host }`)
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}

module.exports = ConnectionDB