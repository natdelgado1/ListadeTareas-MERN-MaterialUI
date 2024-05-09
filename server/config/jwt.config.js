const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            req.body.userId = payload._id;
            next();
        }
    });
}