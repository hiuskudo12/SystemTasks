const { poolPromise, sql } = require("../config/db");

exports.getAllUsers = async () => {

    const pool = await poolPromise;

    const result = await pool.request()

        .query(`
            SELECT
                user_id,
                username,
                email
            FROM Users
            ORDER BY user_id
        `);

    return result.recordset;

};