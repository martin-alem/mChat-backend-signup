/**
 * @author Martin Alemajoh
 * @description This route handles request made to /signup route
 * @date 7/19/2021
 */

const path = require("path");
const express = require("express");
const router = express.Router({ caseSensitive: true });

const SendResponse = require(path.join(__dirname, "../utils/SendResponse"));
const SignupController = require(path.join(__dirname, "../controllers/SignupController"));
const VerifyController = require(path.join(__dirname, "../controllers/VerifyController"));
const ResendController = require(path.join(__dirname, "../controllers/ResendController"));
const SetupController = require(path.join(__dirname, "../controllers/SetupController"));

router.post("/", SignupController.middleware(), (req, res) => {
    SignupController.registerUser(req, res);
});

router.post("/verify", VerifyController.middleware(), (req, res) => {
    VerifyController.verifyUser(req, res);
});

router.post("/setup", SetupController.middleware(), (req, res) => {
    SetupController.setup(req, res);
})

router.post("/verify/resend", ResendController.middleware(), (req, res) => {
    ResendController.resendCode(req, res);
});

router.use((error, req, res, next) => {
    SendResponse.failedResponse(error.statusCode, req, res, error.error);
});

module.exports = router;