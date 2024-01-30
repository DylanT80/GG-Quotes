const express = require('express');
const {
    quotePagination,
    getQuote,
    addQuote,
    deleteQuote
} = require('../controllers/quotesController');
const verifyToken = require("../middleware/validateToken");
const router = express.Router();

router.get('/', quotePagination);
router.get('/quote?', getQuote);
router.post('/create', verifyToken, addQuote);
router.delete('/delete?', verifyToken, deleteQuote);

module.exports = router;