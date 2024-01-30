const express = require('express');
const {
    daredevilPagination,
    getDaredevil,
    addDaredevil,
    deleteDaredevil
} = require('../controllers/daredevilsController');
const verifyToken = require("../middleware/validateToken");
const router = express.Router();

router.get('/', daredevilPagination);
router.get('/daredevil?', getDaredevil);
router.post('/create', verifyToken, addDaredevil);
router.delete('/delete?', verifyToken, deleteDaredevil);

module.exports = router;