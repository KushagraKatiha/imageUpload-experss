const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const cloudinary = require('cloudinary')
const upload = require('../utils/multer.js')

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

        // TODO: upload user picture

        

        console.log(`File details > ${JSON.stringify(req.file)} `);

        if(req.file){  
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })

                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url
                    
                    // remove file from local storage
    
                    // fs.rm(`uploads/${req.file.filename}`)
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
    home,
    upload
}