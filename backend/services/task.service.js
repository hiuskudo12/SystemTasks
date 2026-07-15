const { poolPromise, sql } = require("../config/db");

exports.getAllTasks = async (user_id, query) => {

    const pool = await poolPromise;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const status = query.status || null;
    const priority = query.priority || null;
    const keyword = query.keyword || null;

    let whereClause = `WHERE user_id=@user_id`;

    if (status) {
        whereClause += ` AND status=@status`;
    }

    if (priority) {
        whereClause += ` AND priority=@priority`;
    }

    if (keyword) {
        whereClause += ` AND title LIKE @keyword`;
    }

    // Query lấy danh sách Task
    const dataQuery = `
        SELECT
            task_id,
            title,
            description,
            status,
            priority,
            deadline,
            created_at
        FROM Tasks
        ${whereClause}
        ORDER BY deadline ASC
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
    `;

    // Query đếm tổng số Task
    const countQuery = `
        SELECT COUNT(*) AS total
        FROM Tasks
        ${whereClause};
    `;

    // Chuẩn bị request lấy danh sách
    const dataRequest = pool.request()
        .input("user_id", sql.Int, user_id)
        .input("offset", sql.Int, offset)
        .input("limit", sql.Int, limit);

    // Chuẩn bị request đếm
    const countRequest = pool.request()
        .input("user_id", sql.Int, user_id);

    if (status) {
        dataRequest.input("status", sql.VarChar, status);
        countRequest.input("status", sql.VarChar, status);
    }

    if (priority) {
        dataRequest.input("priority", sql.VarChar, priority);
        countRequest.input("priority", sql.VarChar, priority);
    }

    if (keyword) {
        dataRequest.input("keyword", sql.NVarChar, `%${keyword}%`);
        countRequest.input("keyword", sql.NVarChar, `%${keyword}%`);
    }

    const dataResult = await dataRequest.query(dataQuery);
    const countResult = await countRequest.query(countQuery);

    const total = countResult.recordset[0].total;

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        tasks: dataResult.recordset
    };

};

exports.getTaskById = async (task_id, user_id) => {

    const pool = await poolPromise;

    const result = await pool.request()

        .input("task_id", sql.Int, task_id)

        .input("user_id", sql.Int, user_id)

        .query(`
            SELECT *

            FROM Tasks

            WHERE

            task_id=@task_id

            AND

            user_id=@user_id
        `);

    if(result.recordset.length===0){

        throw new Error("Task not found");

    }

    return result.recordset[0];

};

exports.createTask = async (user_id, taskData) => {

    const pool = await poolPromise;

    const {
        title,
        description,
        priority,
        deadline
    } = taskData;

    console.log({
    title,
    description,
    priority,
    deadline
});

    const result = await pool.request()

    .input("user_id", sql.Int, user_id)

    .input("title", sql.NVarChar, title)

    .input("description", sql.NVarChar, description)

    .input("priority", sql.VarChar, priority)

    .input("deadline", sql.DateTime, deadline)

    .query(`
        INSERT INTO Tasks
        (
            user_id,
            title,
            description,
            priority,
            deadline
        )

        OUTPUT INSERTED.*

        VALUES
        (
            @user_id,
            @title,
            @description,
            @priority,
            @deadline
        )
    `);

return {

    message: "Task created successfully",

    task: result.recordset[0]

};

};

exports.updateTask = async (task_id, user_id, taskData) => {

console.log("task_id:", task_id);
console.log("user_id:", user_id);

    const pool = await poolPromise;

    const {
        title,
        description,
        priority,
        deadline,
    } = taskData;

    console.log({
    title,
    description,
    priority,
    deadline,
});

    const result = await pool.request()

        .input("task_id", sql.Int, task_id)

        .input("user_id", sql.Int, user_id)

        .input("title", sql.NVarChar, title)

        .input("description", sql.NVarChar, description)

        .input("priority", sql.VarChar, priority)

        .input("deadline", sql.DateTime, deadline)

        .query(`
            UPDATE Tasks
            SET
                title = @title,
                description = @description,
                priority = @priority,
                deadline = @deadline,
                updated_at = GETDATE()

            OUTPUT INSERTED.*

            WHERE
                task_id = @task_id
                AND user_id = @user_id
        `);
            console.log(result.recordset);
    if (result.recordset.length === 0) {
        throw new Error("Task not found");
    }

    return {
        message: "Task updated successfully",
        task: result.recordset[0],
    };

};

exports.updateStatus = async (task_id, user_id, status) => {

    const allowStatus = [

        "pending",

        "completed",

        "skipped"

    ];

    if (!allowStatus.includes(status)) {

        throw new Error("Invalid task status");

    }

    const pool = await poolPromise;

    const result = await pool.request()

        .input("task_id", sql.Int, task_id)

        .input("user_id", sql.Int, user_id)

        .input("status", sql.VarChar, status)

        .query(`

            UPDATE Tasks

            SET

                status=@status,

                updated_at=GETDATE()

            OUTPUT INSERTED.*

            WHERE

                task_id=@task_id

            AND

                user_id=@user_id

        `);

    if(result.recordset.length===0){

        throw new Error("Task not found");

    }

    return{

        message:"Task status updated successfully",

        task:result.recordset[0]

    };

};

exports.deleteTask = async (task_id, user_id) => {

    const pool = await poolPromise;

    const result = await pool.request()
        .input("task_id", sql.Int, task_id)
        .input("user_id", sql.Int, user_id)
        .query(`
            DELETE FROM Tasks
            OUTPUT DELETED.*
            WHERE task_id = @task_id
            AND user_id = @user_id
        `);

    if (result.recordset.length === 0) {
        throw new Error("Task not found");
    }

    return {
        message: "Task deleted successfully"
    };

};

exports.getPendingTasks = async (user_id) => {

    const pool = await poolPromise;

    const result = await pool.request()

        .input("user_id", sql.Int, user_id)

        .query(`
            SELECT
                task_id,
                title,
                priority,
                deadline
            FROM Tasks
            WHERE
    user_id = @user_id
    AND status = 'pending'
    AND CAST(deadline AS DATE) <= DATEADD(DAY, 1, CAST(GETDATE() AS DATE))
        `);

    return result.recordset;

};
