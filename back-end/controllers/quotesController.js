const quoteModel = require('../models/quoteModel');
const daredevilModel = require('../models/daredevilModel');
// TODO: Update endpoints to reflext new Model changes
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
    const { firstName, lastName, quote } = req.body;
    try {
        if (!(firstName && lastName && quote)) {
            throw new Error("Quote fields missing");
        }
        const daredevil = await daredevilModel.findOne({firstName, lastName});
        if (!daredevil) {
            throw new Error("Daredevil not in DB!");
        }

        if (await quoteModel.findOne({daredevil, quote})) {
            throw new Error("Quote from author already in DB!");
        }
        // Updated id
        const total = await quoteModel.countDocuments() + 100;  // 100's for quote ids, can make constants file?
        const quoteDoc = await quoteModel.create({id: total + 1, quote, daredevil: daredevil._id });
         // Update daredevil!
        const updatedQuotes = daredevil.quotes;
        updatedQuotes.push(quoteDoc._id);
        const update = { quotes: updatedQuotes };
        await daredevil.updateOne(update);
        res.status(201).json(quoteDoc);
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// @desc Delete a quote in database
// @route DELETE /api/quotes/delete?id=_
// @private
const deleteQuote = async (req, res, next) => {
    const { id } = req.query;

    try {
        if (!(id)) {
            throw new Error("Quote fields missing");
        }

        const quote = await quoteModel.findOne({id});
        if (quote) {
            // Remove quote from daredevil
            const daredevil = await daredevilModel.findOne(quote.daredevil);
            const updatedQuotes = daredevil.quotes;
            updatedQuotes.splice(daredevil.quotes.indexOf(quote._id, 1));
            const update = { quotes: updatedQuotes };
            await daredevil.updateOne(update);

            await quote.deleteOne();
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