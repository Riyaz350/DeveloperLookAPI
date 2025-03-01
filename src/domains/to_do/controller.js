const ToDo = require("./model");

const createToDo = async (data) => {
    try {
        const { title, description, dueDate, status, priority, email } = data;
        const newToDo = new ToDo({
            title, description, dueDate, status, priority, email
        });
        const toDo = await newToDo.save();
        return toDo;
    } catch (error) {
        throw error;
    }
};

const deleteToDo = async (data) => {
    try {
        const _id = data.id;
        const deletedData = await ToDo.deleteOne({ _id });
        return deletedData;
    } catch (error) {
        throw error;
    }
};

const fetchToDosByEmail = async (email) => {
    try {
        console.log(email);
        const todos = await ToDo.find({ email });
        return todos;
    } catch (error) {
        throw error;
    }
};

const updateToDoStatusById = async (id, status) => {
    try {
        const updatedToDo = await ToDo.findByIdAndUpdate(id, { status }, { new: true });
        return updatedToDo;
    } catch (error) {
        throw error;
    }
};

module.exports = { createToDo, deleteToDo, fetchToDosByEmail, updateToDoStatusById };
