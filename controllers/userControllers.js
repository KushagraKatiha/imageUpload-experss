const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");

const home = (req, res) => {
    res.send("<h1>Hello from the controller!</h1>");
}

const setDetails = async (req, res) => {
    try{
        const {name, username, email, password} = req.body

        if(!name || !username || !email || !password) {
            throw new Error (`Please provide all details`)
        }
        
        if(!emailValidator.validate(email)) {
            throw new Error (`Please provide all details`)
        }
        const user = new User({
            name,
            username,
            email,
            password
        })

        await user.save()

        res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    }catch(err){
        res.status(400).json({
            success: false, 
            message: err.message
        })
    }
}
const getDetails = async (req, res) => {
    
    try {
        const {email, password} = req.body
        if(!email || !password){
            throw new Error (`Please provide all details`)
        }
        
        if(!emailValidator.validate(email)) {
            throw new Error (`Please provide valid details`)
        }
        const user = await User.findOne({email}).select("+password")

        if(!user) {
            throw new Error (`No user found`)
        }
        if(!bcrypt.compare(password, user.password)) {
            throw new Error (`Wrong password`)
        }
        
        const token = await user.generateToken()


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token
        })
        
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })   
    }
}

module.exports = {
    setDetails,
    getDetails,
    home
}