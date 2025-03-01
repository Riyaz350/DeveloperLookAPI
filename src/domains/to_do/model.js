const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    title: String,
    description: String,
    dueDate: String,
    status:String,
    priority:String,
    email:String
})

const ToDo = mongoose.model("Todo", toDoSchema)

module.exports = ToDo