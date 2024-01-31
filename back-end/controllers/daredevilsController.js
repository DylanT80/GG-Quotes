const daredevilModel = require('../models/daredevilModel');
const quoteModel = require('../models/quoteModel');

// @dest Pagination of daredevils
// @route GET /api/daredevils/
// @public
const daredevilPagination = async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query;

    try {
        const daredevils = await daredevilModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('quotes', '-_id -createdAt -updatedAt -__v -daredevil')
        .select('-_id -createdAt -updatedAt -__v -daredevil');
        
        const total = await daredevilModel.countDocuments();
        res.status(200).json({
            results: daredevils,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// @desc Get a daredevil by its id
// @route GET /api/daredevils/daredevil?id=_
// @public
const getDaredevil = async (req, res, next) => {
    const { id } = req.query;

    try {
        // Random daredevil if no id specified
        if (!id) {
            const docs = await daredevilModel.aggregate([{ $sample: { size: 1 } }]);
            const daredevil = await daredevilModel
            .find(docs[0], '-_id -createdAt -updatedAt -__v')
            .populate('quotes', '-_id -createdAt -updatedAt -__v -daredevil');
            res.status(200).json(daredevil[0]); // [0] json returns array?
        }
        const daredevil = await daredevilModel.findOne({id}, '-_id -createdAt -updatedAt -__v');
        if (!daredevil) {
            throw new Error("Daredevil not in DB!");
        }

        res.status(200).json(daredevil);
    } catch (error) {
        res.status(400);
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
    daredevilPagination,
    getDaredevil,
    addDaredevil,
    deleteDaredevil
};