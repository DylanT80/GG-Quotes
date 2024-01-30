const quoteModel = require('../models/quoteModel');
const daredevilModel = require('../models/daredevilModel');

// @desc Pagination of quotes
// @route GET /api/quotes/
// @public
const quotePagination = async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query;

    try {
        const quotes = await quoteModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('daredevil', '-_id -createdAt -updatedAt -__v -quotes')
        .select('-_id -createdAt -updatedAt -__v');
        const total = await quoteModel.countDocuments();
        res.status(200).json({
            quotes,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// @desc Get a daredevil by its id or random
// @route GET /api/quotes/quote?id=_
// @public
const getQuote = async (req, res, next) => {
    const { id } = req.query;

    try {
        // Random quote if no id specified
        if (!id) {
            const docs = await quoteModel.aggregate([{ $sample: { size: 1 } }, { $unset: ['_id', 'createdAt', 'updatedAt', '__v'] }]);
            res.status(200).json(docs[0]);
        }
        const quote = await quoteModel.findOne({id}, '-_id -createdAt -updatedAt -__v');
        if (!quote) {
            throw new Error("Quote not in DB!");
        }

        res.status(200).json(quote);
    } catch (error) {
        res.status("400");
        next(error);
    }
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
        if (!id) {
            throw new Error("Quote fields missing");
        }

        const quote = await quoteModel.findOne({id});
        if (!quote) {
            throw new Error("Quote not in DB!");
        }

        // Remove quote from daredevil
        const daredevil = await daredevilModel.findOne(quote.daredevil);
        const updatedQuotes = daredevil.quotes;
        const i = updatedQuotes.indexOf(quote._id);
        updatedQuotes.splice(i, 1);
        const update = { quotes: updatedQuotes };
        await daredevil.updateOne(update);

        // Decrement quote id ordering
        await quoteModel.updateMany({ id: { $gt: id }}, { $inc: { id: -1 } });
        // Delete quote
        const deletedQuote = await quote.deleteOne();
        res.status(202).json(deletedQuote);
    } catch (error) {
        res.status(400);
        next(error);
    }
}

module.exports = {
    quotePagination,
    getQuote,
    addQuote,
    deleteQuote
};