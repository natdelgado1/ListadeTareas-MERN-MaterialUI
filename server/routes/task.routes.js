const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("", taskController.createTask);
router.get("", taskController.findAllTasks);
router.get("/:id", taskController.findTask);
router.put("/update-status/:id", taskController.updateStatus);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
//Filtros de tareas
router.get("/filter/:dateType", taskController.getFilteredTasks);

module.exports = router;