// @desc Get a random GG quote
// @route GET /api/quotes
const getRandomQuote = async (req, res, next) => {
    res.status(200).send('Get random quote');
}

module.exports = {
    getRandomQuote
};