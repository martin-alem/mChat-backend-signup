/**
 * @author Martin Alemajoh
 * @description This controller handles ping requests
 * @date 7/19/2021
 */

const path = require('path');
const SendResponse = require(path.join(__dirname, "../Utils/SendResponse"));

class PingController {

    static pingController(req, res) {

        const statusCode = 200;
        const message = "Signup server up and running";
        SendResponse.successResponse(statusCode, req, res, message);
    }

    static invalidRequest(req, res) {
        const statusCode = 404;
        const error = "Invalid request";
        SendResponse.failedResponse(statusCode, req, res, error);
    }
}

module.exports = PingController;