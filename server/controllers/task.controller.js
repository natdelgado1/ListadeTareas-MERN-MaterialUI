const Task = require("../models/task.model");

module.exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201);
        res.json(newTask);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

module.exports.findTask = async (req, res) => {
    try {
        const findTask = await Task.findOne({ _id: req.params.id });
        if (!findTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(findTask);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

module.exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id });
        res.status(200);
        res.json(updatedTask);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.deleteOne({ _id: req.params.id });
        res.status(200);
        res.json(deletedTask);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};