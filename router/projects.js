const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (router) {
    router.get("/projects", function (req, res) {
        db.Project.findAll({
            order: [["id", "asc"]],
            attributes: ["title", "description", "langs", "url"]
        })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.post("/projects", auth, function (req, res) {
        db.Project.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.post("/projects/all", auth, function (req, res) {
        db.Project.sync({ force: true })
            .then(() => db.Project.bulkCreate(req.body))
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    });
};
