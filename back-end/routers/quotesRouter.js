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
router.get('/:id', getQuote);
router.post('/', verifyToken, addQuote);
router.delete('/:id', verifyToken, deleteQuote);

module.exports = router;