const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
            default: 'Unknown'
        },
        quote: {
            type: String,
            required: [true, "Please provide the quote"]
        },
        accessToken: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);