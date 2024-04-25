const moment = require("moment/moment");
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

module.exports.findAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//Actualiza una Tarea
module.exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200);
        res.json(updatedTask);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
//Completar una tarea
module.exports.updateStatus = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status }, { new: true });
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

module.exports.getFilteredTasks = async (req, res) => {
   const dateFrom = moment();
   dateFrom.set({h: 0, m: 0, s:0});
   const dateTo = moment();
   dateTo.set({h: 23, m: 59, s:59})
    try {
        const tasks = await Task.find({
            taskDate: { $gte: dateFrom.toDate(), $lte: dateTo.toDate() } 
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
    }   
}