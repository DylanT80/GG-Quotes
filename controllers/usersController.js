const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// @desc Log in a user (me)
// @route /api/users/login
// @public
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Missing credentials
    if (!(username && password)) {
        res.status(400);
        next(new Error('Missing credentials'));
    }
    
    // Compare username and password
    const user = await userModel.findOne({'username' : username});
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m'});
        console.log(`${user.username} logged in!`);
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        next(new Error('Invalid credentials'));
    };
};

module.exports = {
    loginUser
};