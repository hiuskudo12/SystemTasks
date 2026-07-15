const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const taskRoutes = require("./routes/task.routes");

const dashboardRoutes = require("./routes/dashboard.routes");

const testRoutes = require("./routes/test.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/test", testRoutes);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Reminder API is running..."
    });
});

module.exports = app;