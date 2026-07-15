const jwt = require("jsonwebtoken");
const response = require("../utils/response");

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return response.error(res, "Access token is required", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return response.error(res, "Invalid token", 401);
    }

try {

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    console.log("Decoded JWT:", decoded);

    req.user = decoded;

    next();

} catch (error) {

    console.log(error);

    return response.error(
        res,
        "Token is invalid or expired",
        401
    );

}

};