const taskService = require("../services/task.service");
const response = require("../utils/response");

exports.getAllTasks = async (req, res) => {

    try {

        const tasks = await taskService.getAllTasks(

            req.user.user_id,

            req.query

        );

        return response.success(

            res,

            "Task list retrieved successfully",

            tasks

        );

    } catch (error) {

        return response.error(

            res,

            error.message,

            500

        );

    }

};

exports.getTaskById = async (req, res) => {

    console.log(req.user);
    console.log(req.params.id);

    try {

        const result = await taskService.getTaskById(

            req.params.id,

            req.user.user_id

        );

        return response.success(

            res,

            "Task retrieved successfully",

            result

        );

    } catch (error) {

        return response.error(

            res,

            error.message,

            404

        );

    }

};

exports.createTask = async (req, res) => {

    console.log("========== CREATE TASK ==========");
    console.log("req.body:", req.body);

    try {

        const result = await taskService.createTask(
            req.user.user_id,
            req.body
        );

        return response.success(
            res,
            result.message,
            result.task,
            201
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            400
        );

    }

};

exports.updateTask = async (req, res) => {

    try {

        const result = await taskService.updateTask(

            req.params.id,

            req.user.user_id,

            req.body

        );

        return response.success(

            res,

            result.message,

            result.task

        );

    } catch (error) {

        return response.error(

            res,

            error.message,

            400

        );

    }

};

exports.updateStatus = async (req, res) => {

    try {

        const result = await taskService.updateStatus(

            req.params.id,

            req.user.user_id,

            req.body.status

        );

        return response.success(

            res,

            result.message,

            result.task

        );

    } catch (error) {

        return response.error(

            res,

            error.message,

            400

        );

    }

};

exports.deleteTask = async (req, res) => {

    try {

        const result = await taskService.deleteTask(
            req.params.id,
            req.user.user_id
        );

        return response.success(
            res,
            result.message
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            400
        );

    }

};