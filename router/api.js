const auth = require("../middleware/auth");

module.exports = function (app) {
    app.get("/projects", function (req, res) {

    });

    app.get("/message", function (req, res) {
        if (auth(req.query.key)) {
            
        }
        else {
            res.status(401).end();
        }
    });

    app.post("/message", function (req, res) {

    });
};
