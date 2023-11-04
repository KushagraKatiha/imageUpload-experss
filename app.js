require('dotenv').config();
const express = require('express');
const dbConnection = require('./config/dbConnection');
const router = require('./routes/userRoutes');
const app = express();

dbConnection()

app.use("/", router)

module.exports = app;