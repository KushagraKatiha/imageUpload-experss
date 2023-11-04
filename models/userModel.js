const bcrypt = require('bcryptjs') 
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    }
    
}, {timestamps: true})

// Creating JWT token
userSchema.method('generateToken', function (){
    return JWT.sign({id: this._id}, 
        process.env.SECRET,
        {expiresIn: '1d'})
})

// Encrypting password
userSchema.pre("save", async function (next){
     if(!this.isModified("password")) return next()
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

module.exports = User