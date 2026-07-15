const express = require("express");

const router = express.Router();

const userService = require("../services/user.service");
const taskService = require("../services/task.service");
const mailService = require("../services/mail.service");

const {
    generateReminderEmail
} = require("../templates/reminder-email");

router.get("/send-reminder", async (req, res) => {

    try {

        const users = await userService.getAllUsers();

        for (const user of users) {

            const tasks = await taskService.getPendingTasks(user.user_id);

            if (tasks.length === 0) {
                continue;
            }

            const html = generateReminderEmail(
                user.username,
                tasks
            );

            await mailService.sendMail(
                user.email,
                "Nhắc công việc hôm nay",
                html
            );

            console.log(`✅ Đã gửi email cho ${user.email}`);
        }

        res.json({
            success: true,
            message: "Reminder emails sent successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;