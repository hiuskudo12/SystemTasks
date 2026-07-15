const express = require("express");

const router = express.Router();

const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.patch("/:id/status", taskController.updateStatus);

router.delete("/:id", taskController.deleteTask);

module.exports = router;