const dashboardService = require("../services/dashboard.service");
const response = require("../utils/response");

exports.getDashboard = async (req, res) => {

    try {

        const data = await dashboardService.getDashboard(
            req.user.user_id
        );

        return response.success(
            res,
            "Dashboard retrieved successfully",
            data
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            500
        );

    }

};