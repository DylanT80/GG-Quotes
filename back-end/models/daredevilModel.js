const mongoose = require('mongoose');
const { Schema } = mongoose;

const daredevilSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, "Provide surrogate primary key"]
        },
        firstName: {
            type: String,
            required: [true, "Provide first name"]
        },
        lastName: {
            type: String,
            default: ""
        },
        officialArtwork: {
            type: String,
            required: [true, "Provide artwork URL"]
        },
        quotes: [{
            type: Schema.Types.ObjectId,
            ref: 'Quote'
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Daredevil', daredevilSchema);

