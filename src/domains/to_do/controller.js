const ToDo = require("./model")

const createToDo = async (data) => {
    try {
        const { title, description, dueDate, status, priority } = data
        const newToDo = new ToDo({
            title, description, dueDate, status, priority
        })
        const toDo = await newToDo.save()
        return toDo
    } catch (error) {
        throw (error)
    }
}

const deleteToDo = async (data) => {
    try {
        const _id = data.id
        const deletedData = await ToDo.deleteOne({ _id })
        return deletedData
    } catch (error) {
        throw error
    }
}

module.exports = { createToDo, deleteToDo }
