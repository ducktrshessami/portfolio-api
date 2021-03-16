const crypto = require("crypto");

module.exports = function (req, res, next) {
    let hash = crypto.createHash("sha256")
        .update(req.query.key + process.env.SALT)
        .digest("hex");
    if (hash === process.env.KEYHASH) {
        next();
    }
    else {
        res.status(401).end();
    }
};
