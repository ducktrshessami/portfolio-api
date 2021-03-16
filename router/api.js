const auth = require("../middleware/auth");

module.exports = function (app) {
    app.get("/projects", function (req, res) {

    });

    app.get("/message", auth, function(req, res) {
        
    });

    app.post("/message", function (req, res) {

    });
};
