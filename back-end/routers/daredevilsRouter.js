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
router.post('/', verifyToken, addDaredevil);
router.get('/:id', getDaredevil);
router.delete('/:id', verifyToken, deleteDaredevil);

module.exports = router;