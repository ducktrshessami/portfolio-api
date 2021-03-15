const crypto = require("crypto");

module.exports = function (key = "") {
    let hash = crypto.createHash("sha256")
        .update(key + process.env.SALT)
        .digest("hex");
    return hash === process.env.KEYHASH;
};
