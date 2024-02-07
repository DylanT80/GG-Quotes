const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {    // Bearer?
        throw new Error("Fields missing");
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        throw new Error("Token missing");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error("User unauthorized");
        }
        
        // User authorized, continue
        next();
    });
};

module.exports = validateToken;