const express = require('express');
const {
    getDaredevil,
    addDaredevil,
    deleteDaredevil
} = require('../controllers/daredevilsController');
const verifyToken = require("../middleware/validateToken");
const router = express.Router();

router.get('/daredevil?', getDaredevil);
router.post('/create', verifyToken, addDaredevil);
router.delete('/delete?', verifyToken, deleteDaredevil);

module.exports = router;