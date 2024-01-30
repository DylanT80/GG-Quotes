const express = require('express');
const {
    getRandomQuote,
    addQuote,
    deleteQuote
} = require('../controllers/quotesController');
const verifyToken = require("../middleware/validateToken");
const router = express.Router();

router.get('/random', getRandomQuote);
router.post('/create', verifyToken, addQuote);
router.delete('/delete?', verifyToken, deleteQuote);

module.exports = router;