const express = require('express');
const welcomeRouter = require("./welcome/welcome-router")
const accountRouter = require("./accounts/accounts-router")
// const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use("/", welcomeRouter)
server.use("/accounts", accountRouter)

module.exports = server;