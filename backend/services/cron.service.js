const cron = require("node-cron");

const userService = require("./user.service");
const taskService = require("./task.service");
const mailService = require("./mail.service");

const {
    generateReminderEmail
} = require("../templates/reminder-email");

exports.startReminderCron = () => {
    // doi time o day: "0 6,22 * * *"
    // Test 1p / 1 lan: "*/1 * * * *"
    cron.schedule("0 6,22 * * *", async () => {

        console.log("⏰ Reminder Cron Started");

        try {

            const users = await userService.getAllUsers();

            for (const user of users) {

                const tasks = await taskService.getPendingTasks(user.user_id);

                if (tasks.length === 0) {

                    console.log(`⏭ ${user.username} không có task pending`);

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

            console.log("🎉 Reminder Cron Finished");

        } catch (error) {

            console.error(error);

        }

    });

};