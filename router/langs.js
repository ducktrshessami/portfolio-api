const assert = require("assert");
const db = require("../models");
const auth = require("../middleware/auth");

module.exports = function (router) {
    router.get("/langs", function (req, res) {
        db.Lang.findAll()
            .then(data => {
                let foo = {};
                data.forEach(lang => foo[lang.name] = lang.image);
                return foo;
            })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.post("/langs", auth, function (req, res) {
        db.Lang.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.put("/langs/:name", auth, function (req, res) {
        db.Lang.update(req.body, { where: { name: req.params.name } })
            .then(([data]) => assert(data))
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    });

    router.delete("/langs/:name", auth, function (req, res) {
        db.Lang.destroy({ where: { name: req.params.name } })
            .then(data => assert(data))
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    });
};
