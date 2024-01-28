const express = require('express');
const {
    getRandomQuote
} = require('../controllers/quotesController');


const router = express.Router();

router.route("/").get(getRandomQuote);

module.exports = router;