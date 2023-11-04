const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

const dbConnection = async () => {
    mongoose.connect(MONGO_URI)
    .then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
    .catch((err) => {
        console.log(err.message)
        process.exit(1)
    })
}

module.exports = dbConnection