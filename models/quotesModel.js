const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
            default: 'Unknown'
        },
        quote: {
            type: String,
            required: [true, "Please provide the quote"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);