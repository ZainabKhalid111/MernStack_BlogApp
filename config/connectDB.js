// mongoDB connection

const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_url);

        console.log(`Connected to mongoDB database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`mongo connect errror ${error}`.bgRed.white)
    }
}

module.exports = connectDB;