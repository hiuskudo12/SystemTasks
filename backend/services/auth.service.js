const bcrypt = require("bcrypt");
const { poolPromise, sql } = require("../config/db");

exports.register = async (userData) => {

    const {
        username,
        email,
        password,
        full_name
    } = userData;

    const pool = await poolPromise;

    // Kiểm tra username

    const usernameExists = await pool.request()
        .input("username", sql.VarChar, username)
        .query(`
            SELECT user_id
            FROM Users
            WHERE username = @username
        `);

    if (usernameExists.recordset.length > 0) {

        throw new Error("Username already exists");

    }

    // Kiểm tra email

    const emailExists = await pool.request()
        .input("email", sql.VarChar, email)
        .query(`
            SELECT user_id
            FROM Users
            WHERE email = @email
        `);

    if (emailExists.recordset.length > 0) {

        throw new Error("Email already exists");

    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert User

    await pool.request()

        .input("username", sql.VarChar, username)

        .input("email", sql.VarChar, email)

        .input("password", sql.VarChar, hashedPassword)

        .input("full_name", sql.NVarChar, full_name)

        .query(`
            INSERT INTO Users
            (
                username,
                email,
                password,
                full_name
            )
            VALUES
            (
                @username,
                @email,
                @password,
                @full_name
            )
        `);

    return {

        message: "Register successful"

    };

};

const { generateToken } = require("../utils/jwt");

exports.login = async (loginData) => {

    const { username, password } = loginData;

    const pool = await poolPromise;

    const result = await pool.request()
        .input("username", sql.VarChar, username)
        .query(`
            SELECT *
            FROM Users
            WHERE username = @username
        `);

    if (result.recordset.length === 0) {
        throw new Error("Invalid username or password");
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid username or password");
    }

    const token = generateToken(user);

    return {
        message: "Login successful",
        token,
        user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            full_name: user.full_name
        }
    };

};



exports.getProfile = async (user_id) => {

    const pool = await poolPromise;

    const result = await pool.request()

        .input("user_id", sql.Int, user_id)

        .query(`
            SELECT
                user_id,
                username,
                email
            FROM Users
            WHERE user_id = @user_id
        `);

    if (result.recordset.length === 0) {
        throw new Error("User not found");
    }

    return result.recordset[0];
};