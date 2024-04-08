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
            required: [true, "Priority is required"],
            enum: ['low', 'mid', 'high'],
            default: 'low',
        },
        state: {
            type: String,
            required: [true, "State is required"],
            enum: ['pending', 'complete'],
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
