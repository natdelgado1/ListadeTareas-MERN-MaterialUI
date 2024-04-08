const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("", taskController.createTask);
router.get("/:id", taskController.findTask);
router.put("/:id", taskController.updateTask);
router.delete("", taskController.deleteTask);

module.exports = router;