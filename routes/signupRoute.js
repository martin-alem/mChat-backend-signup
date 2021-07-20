/**
 * @author Martin Alemajoh
 * @description This route handles request made to /ping route in-order to communicate the status of the server.
 * @date 7/19/2021
 */

const path = require("path");
const express = require("express");
const router = express.Router({ caseSensitive: true });
const SendResponse = require(path.join(__dirname, "../utils/SendResponse"))

const SignupController = require(path.join(__dirname, "../controllers/SignupController"));
const VerifyController = require(path.join(__dirname, "../controllers/VerifyController"));

router.post("/", SignupController.signup(), (req, res) => {
    SignupController.registerUser(req, res);
});

router.post("/verify", VerifyController.verify(), (req, res) => {
    VerifyController.verifyUser(req, res);
});

router.use((error, req, res, next) => {
    SendResponse.failedResponse(error.statusCode, req, res, error.error);
});

module.exports = router;