const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (router) {
    router.get("/messages", auth, function (req, res) {
        db.Message.findAll({
            order: [["createdAt", "asc"]],
            attributes: ["name", "email", "message"]
        })
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

    router.delete("/messages/all", auth, function (req, res) {
        db.Message.sync({ force: true })
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    });

    router.delete("/messages/:id", auth, function (req, res) {
        db.Message.destroy({ where: { id: Number(req.params.id) } })
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    });
};
