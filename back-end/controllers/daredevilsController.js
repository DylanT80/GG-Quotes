const daredevilModel = require('../models/daredevilModel');
const quoteModel = require('../models/quoteModel');

// @desc Get a daredevil by its id
// @route GET /api/daredevils?
// @public
const getDaredevil = async (req, res, next) => {
    const { id } = req.query;

    try {
        if (!id) {
            throw new Error("Field missing");
        }
        const daredevil = await daredevilModel.findOne({id}, '-_id -createdAt -updatedAt -__v');
        if (!daredevil) {
            throw new Error("Daredevil not in DB!");
        }

        res.status(200).json(daredevil);
    } catch (error) {
        res.status("400");
        next(error);
    }
}

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

// @desc Delete a daredevil from the database
// @route DELETE /api/daredevils/delete?id=_
// @priavte
const deleteDaredevil = async (req, res, next) => {
    const { id } = req.query;
    
    try {
        if (!id) {
            throw new Error("Missing field");
        }
        const daredevil = await daredevilModel.findOne({id});
        if (!daredevil) {
            throw new Error("Daredevil not in DB!")
        }

        // Delete all quote docs associated with Daredevil
        await quoteModel.deleteMany(
            {
                _id: { $in: daredevil.quotes}
            }
        );
        // Decrement ids
        await daredevilModel.updateMany({ id: { $gt: id } }, { $inc: { id: -1 }});

        const deletedDaredevil = await daredevil.deleteOne();
        res.status(202).json(deletedDaredevil);
    } catch (error) {
        res.status(400);
        next(error);
    }
}

module.exports = {
    getDaredevil,
    addDaredevil,
    deleteDaredevil
};