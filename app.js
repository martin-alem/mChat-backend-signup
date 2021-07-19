/**
 * @author Martin Alemajoh
 * @description This is the main entry point for the service.
 * @date 7/19/2021
 */

require("dotenv").config();

const http = require("http");
const https = require("https");
const express = require("express");

const app = express();

//parse json payloads and makes it available on the req object.
app.use(express.json());

//configurations for https server
const httpsOptions = {};
const protocol = "http";
const httpServer = http.createServer(app);


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

//initializing and starting server.
httpServer.listen(PORT, HOST, () => {
    console.log(`Signup Server Started: ${protocol}://${HOST}:${PORT}`);
});