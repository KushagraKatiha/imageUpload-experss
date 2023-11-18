const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const uploadToCloudinary = require("../utils/cloudinary");

const home = (req, res) => {
    res.send("<h1>Hello from the controller!</h1>");
}

const setDetails = async (req, res, next) => {
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
            password,
            avatar: {
                public_id: email,
                secure_url: "123"
            }
        })

        console.log(`File details > ${JSON.stringify(req.file.path)}`); // file path in local storage

        if(req.file){  
                const result = await uploadToCloudinary(req.file.path)

                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url
                   
                }
            }else{
                throw new Error (`Image Upload Fail`)
            }
            
        

        await user.save()

        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
        next()

    }catch(err){
        res.status(400).json({
            success: "error samajh nhi aa rha ", 
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