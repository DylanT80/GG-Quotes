const quoteModel = require('../models/quoteModel');

// TODO: Add endpoint to return all quotes (pagination)

// @desc Get a random GG quote
// @route GET /api/quotes
// @public
const getRandomQuote = async (req, res, next) => {
    const docs = await quoteModel.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(docs[0]);
}

// @desc Add a new quote to database
// @route POST /api/quotes/create
// @private
const addQuote = async (req, res, next) => {
    const { author, quote } = req.body;
    
    try {
        if (!(author && quote)) {
            throw new Error("Quote fields missing");
        } else if (await quoteModel.findOne({author, quote})) {
            throw new Error("Quote from author already in DB!");
        }
        const quoteDoc = await quoteModel.create({author, quote});
        res.status(201).json(quoteDoc);
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// @desc Delete a quote in database
// @route DELETE /api/quotes/delete
// @private
const deleteQuote = async (req, res, next) => {
    const { author, quote } = req.body;

    try {
        if (!(author && quote)) {
            throw new Error("Quote fields missing");
        } else if (await quoteModel.findOneAndDelete({author, quote})) {
            res.status(202).json({ message: "Deletion Successful!"});
        } else {
            throw new Error("Quote not in DB!");
        }
    } catch (error) {
        res.status(400);
        next(error);
    }
}

module.exports = {
    getRandomQuote,
    addQuote,
    deleteQuote
};