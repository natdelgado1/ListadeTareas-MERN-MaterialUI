const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticate } = require('../config/jwt.config');

router.post("", authenticate, taskController.createTask);
router.get("", authenticate, taskController.findAllTasks);
router.get("/:id", authenticate, taskController.findTask);
router.put("/update-status/:id", authenticate, taskController.updateStatus);
router.put("/update-description/:id", authenticate, taskController.updateDescription);
router.put("/:id", authenticate, taskController.updateTask);
router.delete("/:id", authenticate, taskController.deleteTask);
//Filtros de tareas
router.get("/filter/:dateType", authenticate, taskController.getFilteredTasks);
router.get("/filter/:dateType/pending",authenticate, taskController.getFilteredTaskinStatusPending);

module.exports = router;