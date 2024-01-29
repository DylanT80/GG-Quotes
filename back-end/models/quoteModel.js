const mongoose = require('mongoose');
const { Schema } = mongoose;

const quoteSchema = new mongoose.Schema(
    {
        quote: {
            type: String,
            required: [true, "Please provide the quote"]
        },
        daredevil: {
            type: Schema.Types.ObjectId,
            ref: 'Daredevil'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);