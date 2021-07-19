/**
 * @author Martin Alemajoh
 * @description This is the main entry point for the service.
 * @date 7/19/2021
 */

require("dotenv").config();

const http = require("http");
const path = require("path");
const express = require("express");

const pingRouter = require(path.join(__dirname, "routes/pingRoute"));

const app = express();

app.set("x-powered-by", "mchat");

//parse json payloads and makes it available on the req object.
app.use(express.json());


//Route middleware
app.use("/ping", pingRouter);

//configurations for http server
const protocol = "http";
const option = {};
const httpServer = http.createServer(option, app);


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

//initializing and starting server.
httpServer.listen(PORT, HOST, () => {
    console.log(`Signup Server Started: ${protocol}://${HOST}:${PORT}`);
});