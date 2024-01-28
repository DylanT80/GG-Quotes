const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide username']
        },
        password: {
            type: String,
            required: [true, 'Please provide password']
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);