const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (app) {
    app.get("/projects", function (req, res) {

    });

    app.post("/projects", auth, function (req, res) {

    });

    app.get("/messages", auth, function (req, res) {

    });

    app.post("/messages", function (req, res) {

    });
};
