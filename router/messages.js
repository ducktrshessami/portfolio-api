const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (router) {
    router.get("/messages", auth, function (req, res) {
        db.Message.findAll({ order: [["createdAt", "asc"]] })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.post("/messages", function (req, res) {
        db.Message.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.delete("/messages/:id", auth, function (req, res) {

    });

    router.delete("/messages/all", auth, function (req, res) {

    });
};
