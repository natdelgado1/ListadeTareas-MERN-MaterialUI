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
    const userId = req.body.userId;
    try {
        const tasks = await Task.find({userId: userId});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//Actualiza una Tarea
module.exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
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
//Actualizar el comentario de una tarea
module.exports.updateDescription = async (req, res) => {
    try {
        const updatedTaskDescription = await Task.findOneAndUpdate({ _id: req.params.id }, { description: req.body.description }, { new: true });
        res.status(200);
        res.json(updatedTaskDescription);
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
    const userId = req.body.userId;
    let dateFrom = moment();
    let dateTo = moment();
    let dateType = req.params.dateType;
    if (dateType === "1") {
        // No se realiza ninguna acción adicional para el tipo de fecha 1
    } else if (dateType === "2") {
        dateFrom.startOf('week');
        dateTo.endOf('week');
    } else if (dateType === "3") {
        dateFrom.startOf('month');
        dateTo.endOf('month');
    } else if (dateType === "4") {
        dateFrom.startOf('year');
        dateTo.endOf('year');
    }
    dateFrom.set({ h: 0, m: 0, s: 0 });
    dateTo.set({ h: 23, m: 59, s: 59 });
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    taskDate: { $gte: dateFrom.toDate(), $lte: dateTo.toDate() },
                    userId: userId
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    priority: 1,
                    status: 1,
                    deadline: 1,
                    taskDate: {
                        $dateToString: { format: "%Y-%m-%d", date: "$taskDate" }
                    }
                }
            },
            {
                $group: {
                    _id: "$taskDate",
                    tasks: { $push: "$$ROOT" }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getFilteredTaskinStatusPending = async (req, res) => {
    const userId = req.body.userId;
    let dateFrom = moment();
    let dateTo = moment();
    let dateType = req.params.dateType;
    if (dateType === "1") {
        // No se realiza ninguna acción adicional para el tipo de fecha 1
    } else if (dateType === "2") {
        dateFrom.startOf('week');
        dateTo.endOf('week');
    } else if (dateType === "3") {
        dateFrom.startOf('month');
        dateTo.endOf('month');
    } else if (dateType === "4") {
        dateFrom.startOf('year');
        dateTo.endOf('year');
    }
    dateFrom.set({ h: 0, m: 0, s: 0 });
    dateTo.set({ h: 23, m: 59, s: 59 });
    try {
        const tasks = await Task.aggregate([
            {
                $match: {
                    taskDate: { $gte: dateFrom.toDate(), $lte: dateTo.toDate() },
                    status: "pending",
                    userId: userId
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    priority: 1,
                    status: 1,
                    deadline: 1,
                    taskDate: {
                        $dateToString: { format: "%Y-%m-%d", date: "$taskDate" }
                    }
                }
            },
            {
                $group: {
                    _id: "$taskDate",
                    tasks: { $push: "$$ROOT" }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ])
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}