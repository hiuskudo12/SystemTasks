require("dotenv").config();

const app = require("./app");
require("./config/db");

const { startReminderCron } = require("./services/cron.service");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

    startReminderCron();

});