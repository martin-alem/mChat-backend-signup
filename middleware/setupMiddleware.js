/**
 * @author Martin Alemajoh
 * @description Holds all the middleware functions  for setup
 */

const path = require('path');
const Validate = require(path.join(__dirname, "../validations/ValidateCredentials"));
const SendEmail = require(path.join(__dirname, "../services/SendEmail"));
const Hash = require(path.join(__dirname, "../services/Hash"));
const Query = require(path.join(__dirname, "../model/Query"));



const middleware = new Map();

function validatePayLoad(req, res, next) {
    const payload = req.body;
    if (Object.keys(payload).length === 0 ||
        !payload.firstname ||
        !payload.lastname ||
        !payload.email ||
        !payload.phone ||
        !payload.password) {
        const statusCode = 400;
        const error = "Please provide all required credentials";
        next({ error, statusCode });
        return;
    }
    next();
}

function validate(req, res, next) {

    const phone = req.body.phone;
    const password = req.body.password;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!Validate.isValidPhone(phone) ||
        !Validate.isValidPassword(password) ||
        !Validate.isValidEmail(email) ||
        !Validate.isValidName(firstname) ||
        !Validate.isValidName(lastname)) {
        const statusCode = 400;
        const error = "Invalid credentials provided";
        next({ error, statusCode });
        return;
    }
    next();

}

function verify(req, res, next) {

    const phone = req.body.phone
    try {
        const result = await Query.selectOne("temp_users", "phone", phone);
        if (result.length === 0 || result[0]["status"] !== "verified") {
            const statusCode = 403;
            const error = "Unauthorized user.";
            next({ error, statusCode });
            return;
        }
        next();
    } catch (error) {

    }
}

async function createUser(req, res, next) {


    const user = {
        "first_name": payload.firstname,
        "last_name": payload.lastname,
        "email": payload.email,
        "phone": payload.phone,
        "date": new Date().getTime()
    }

    const activeUser = {
        "phone": payload.phone,
        "password": Hash.hashData(payload.password),
        "email": payload.email,
        "status": "active",
    }
    const transactions = [{ "query": "INSERT into users SET ?", "value": user }, { "query": "INSERT INTO login SET ?", "value": activeUser }];

    try {
        await Query.performTransaction(transactions);
        await Query.updateOne("temp_users", "status", "complete", "phone", payload.phone);
        const options = { "templateName": "welcome", "address": payload.email, "subject": "Welcome To mChat" }
        await SendEmail.sendEmail(options);
    } catch (err) {
        const statusCode = 500;
        const error = "Internal server error";
        next({ error, statusCode });
        console.log(err);
        return;
    }
}

middleware.set("validatePayload", validatePayLoad);
middleware.set("validate", validate);
middleware.set("verify", verify);
middleware.set("createUser", createUser);

module.exports = middleware;