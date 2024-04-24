const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'low',
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        taskDate: {
            type: Date,
            default: Date.now
        },
        deadline: {
            type: Date
        },
        userId: {
            type: String,
            required: [true, "User is required"],
        },
    }, { timestamps: true, versionKey: false }
);

const Task = new mongoose.model("Task", TaskSchema);
module.exports = Task;
