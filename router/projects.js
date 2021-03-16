const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (router) {
    router.get("/projects", function (req, res) {

    });

    router.post("/projects", auth, function (req, res) {

    });

    router.post("/projects/all", auth, function (req, res) {

    });
};
