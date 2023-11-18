require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (loaclFilePath) => {
    try {
        if(!loaclFilePath) return null;
        const result = await cloudinary.uploader.upload(loaclFilePath, {
            resource_type: "auto",
            width: 250,
            height: 250,
            gravity: 'faces',
            crop: 'fill'
        })
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = uploadToCloudinary;