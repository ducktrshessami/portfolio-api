const db = require("../models");
const auth = require("../middleware/auth");

function insertProject(projectData) {
    return db.Project.create(projectData)
        .then(project => Promise.all((projectData.langs || []).map(lang => project.addLang(lang))));
}

module.exports = function (router) {
    router.get("/projects", function (req, res) {
        db.Project.findAll({
            order: [["id", "asc"]],
            attributes: ["title", "description", "url"],
            include: {
                model: db.Lang,
                attributes: ["image"]
            }
        })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.post("/projects", auth, function (req, res) {
        insertProject(req.body)
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });

    router.post("/projects/all", auth, function (req, res) {
        db.Project.sync({ force: true })
            .then(() => Promise.all(req.body.map(insertProject)))
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    });
};
