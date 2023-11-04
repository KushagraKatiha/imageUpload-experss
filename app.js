require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnection = require('./config/dbConnection');
const router = require('./routes/userRoutes');
const app = express();

dbConnection()
app.use(express.json())
app.use(cookieParser())

app.use("/", router)

module.exports = app;