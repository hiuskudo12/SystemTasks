const authService = require("../services/auth.service");
const response = require("../utils/response");

exports.register = async (req, res) => {

    try {

        const result = await authService.register(req.body);

        return response.success(

            res,

            result.message,

            null,

            201

        );

    } catch (error) {

        return response.error(

            res,

            error.message

        );

    }

};

exports.login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        return response.success(
            res,
            result.message,
            {
                token: result.token,
                user: result.user
            }
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            401
        );

    }

};

exports.getProfile = async (req, res) => {

    try {

        const user = await authService.getProfile(req.user.user_id);

        return response.success(
            res,
            "Profile retrieved successfully",
            user
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            404
        );

    }

};