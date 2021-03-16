const db = require("../models");

module.exports = function (router) {
    router.get("/langs", function (req, res) {
        db.Lang.findAll()
            .then(data => {
                
            })
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });
};
