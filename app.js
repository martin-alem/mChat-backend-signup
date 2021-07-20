/**
 * @author Martin Alemajoh
 * @description This is the main entry point for the service.
 * @date 7/19/2021
 */


const path = require("path");
const express = require("express");
const app = express();

const pingRouter = require(path.join(__dirname, "routes/pingRoute"));
const signupRouter = require(path.join(__dirname, "routes/signupRoute"));

//app settings
app.set("x-powered-by", false);

//parse json payloads and makes it available on the req object.
app.use(express.json());


//Route middleware
app.all("/", (req, res) => {
    res.status(200).end();
});
app.use("/signup", signupRouter);
app.use("/ping", pingRouter);



module.exports = app;