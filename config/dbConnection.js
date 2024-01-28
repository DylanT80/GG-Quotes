const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
    try {
        // Connect to database first
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected ${connect.connection.host} ${connect.connection.name}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;