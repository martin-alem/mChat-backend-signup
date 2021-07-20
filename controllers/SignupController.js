/**
 * @author Martin Alemajoh
 * @description This controller handles ping requests
 * @date 7/19/2021
 */

const path = require('path');
const Controller = require(path.join(__dirname, './Controller'));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));
const Query = require(path.join(__dirname, "../model/Query"));
const middleware = require(path.join(__dirname, "../middleware/signupMiddleware"))

class SignupController extends Controller {


    static async registerUser(req, res) {

        const phone = req.body.phone;
        const code = req.body.code;
        const status = "pending";
        const date = new Date().getTime();

        const tempUser = { "phone": phone, "code": code, "status": status, "date": date };

        try {
            await Query.insert("temp_users", tempUser);
            const statusCode = 201;
            const message = "Temporal user created";
            SendResponse.successResponse(statusCode, req, res, message);
        } catch (err) {
            const statusCode = 500;
            const error = "Internal server error";
            SendResponse.failedResponse(statusCode, req, res, error);
            console.log(err);
        }

    }

    static signup() {
        const middlewareFunctions = [];

        for (const mw in middleware) {
            middlewareFunctions.push(middleware[mw]);
        }

        return middlewareFunctions;
    }
}

module.exports = SignupController;