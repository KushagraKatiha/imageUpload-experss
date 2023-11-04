require('dotenv').config();
const express = require('express');
const app = express();

app.get("/", (req, res)=>{
    res.send(`<h1 style="background-color:#000000 ;color: #ffffff">Hello World!</h1>`);
})

module.exports = app;