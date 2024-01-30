const daredevilModel = require('../models/daredevilModel');

// TODO: DELETE daredevil
// TODO: GET daredevil by id

// @desc Add a daredevil to the database
// @route POST /api/daredevils/create
// @private
const addDaredevil = async (req, res, next) => {
    const { firstName, lastName, officialArtwork } = req.body;

    try {
        if (!(firstName && lastName && officialArtwork)) {
            throw new Error("Fields missing");
        } else if (await daredevilModel.findOne({firstName, lastName})) {
            throw new Error("Daredevil already exists in DB!");
        }
        
        const total = await daredevilModel.countDocuments();    // Daredevil in 0's
        const daredevil = new daredevilModel({ id: total + 1, firstName, lastName, officialArtwork });
        await daredevil.save();
        res.status(201).json(daredevil);
    } catch (error) {
        res.status(400);
        next(error);
    }
}

module.exports = {
    addDaredevil
};