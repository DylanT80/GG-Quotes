const express = require('express');
const {
    addDaredevil,
    deleteDaredevil
} = require('../controllers/daredevilsController');
const verifyToken = require("../middleware/validateToken");
const router = express.Router();

// TODO: Route specific route with query params
router.post('/create', verifyToken, addDaredevil);
router.delete('/delete?', verifyToken, deleteDaredevil);

module.exports = router;