const { poolPromise, sql } = require("../config/db");

exports.getDashboard = async (user_id) => {

    const pool = await poolPromise;

    const result = await pool.request()

        .input("user_id", sql.Int, user_id)

        .query(`

            SELECT

                COUNT(*) AS totalTasks,

                SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pendingTasks,

                SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) AS completedTasks,

                SUM(CASE WHEN status='skipped' THEN 1 ELSE 0 END) AS skippedTasks,

                SUM(
                    CASE
                        WHEN deadline < GETDATE()
                        AND status='pending'
                        THEN 1
                        ELSE 0
                    END
                ) AS overdueTasks

            FROM Tasks

            WHERE user_id=@user_id

        `);

    return result.recordset[0];

};