const express = require('express');
const {
    quotePagination,
    getRandomQuote,
    addQuote,
    deleteQuote
} = require('../controllers/quotesController');
const verifyToken = require("../middleware/validateToken");
const router = express.Router();

router.get('/', quotePagination);
router.get('/random', getRandomQuote);
router.post('/create', verifyToken, addQuote);
router.delete('/delete?', verifyToken, deleteQuote);

module.exports = router;