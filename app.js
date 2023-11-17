require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary')
const cookieParser = require('cookie-parser');
const dbConnection = require('./config/dbConnection');
const router = require('./routes/userRoutes');
const app = express();

dbConnection()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    cloud_api_key: process.env.CLOUDINARY_API_KEY,
    cloud_api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json())
app.use(cookieParser())

app.use("/", router)

module.exports = app;