const User = require("../models/userModel");

const home = (req, res) => {
    res.send("<h1>Hello from the controller!</h1>");
}

const setDetails = (req, res) => {
    const {name, username, email, password} = req.body
    try{

        if(!name || !username || !email || !password) throw new Error `Please provide all details`

        const user = new User({
            name,
            username,
            email,
            password
        })
        
        user.save()

    }catch(err){
        res.status(400).json({
            success: false, 
            message: err.message
        })
    }
}
const getDetails = () => {}

module.exports = {
    setDetails,
    getDetails,
    home
}