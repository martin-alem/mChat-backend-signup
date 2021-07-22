/**
 * @author Martin Alemajoh
 * @description This controller handles setup requests
 * @date 7/19/2021
 */

const path = require('path');
const Controller = require(path.join(__dirname, './Controller'));
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));
const Helper = require(path.join(__dirname, "../utils/Helper"));
const middleware = require(path.join(__dirname, "../middleware/setupMiddleware"));
const Logger = require(path.join(__dirname, "../utils/Logger"))

class SetupController extends Controller {

    static async setup(req, res) {

        try {
            const privateKey = process.env.PRIVATE_KEY;
            const signature = Helper.signToken(payload.phone, privateKey);
            const statusCode = 201;
            const message = "User setup successful";
            res.cookie('authentication', signature, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true, secure: true, sameSite: "None" });
            SendResponse.successResponse(statusCode, req, res, message);
        } catch (err) {
            const statusCode = 500;
            const error = "Internal server error";
            SendResponse.failedResponse(statusCode, req, res, error);
            Logger.logWarning(err.message, __filename, new Date());
        }

    }


    static middleware() {
        const middlewareFunctions = [];

        for (const [_, value] of middleware) {
            middlewareFunctions.push(value);
        }
        return middlewareFunctions;
    }
}

module.exports = SetupController;

