const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (router) {
    router.get("/messages", auth, function (req, res) {

    });

    router.post("/messages", function (req, res) {

    });

    router.delete("/messages/:id", auth, function (req, res) {

    });

    router.delete("/messages/all", auth, function (req, res) {

    });
};
