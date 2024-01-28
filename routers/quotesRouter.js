const express = require('express');
const {
    getRandomQuote
} = require('../controllers/quotesController');

const router = express.Router();

router.use(require('../middleware/validateToken'));
router.route('/').get(getRandomQuote);

module.exports = router;