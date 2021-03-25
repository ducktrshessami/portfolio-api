const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({ auth: process.env.GIST_TOKEN });

module.exports = function (router) {
    router.get("/langs", function (req, res) {
        octokit.gists.get({ gist_id: process.env.GIST_ID })
            .then(gist => gist.data.files["langs.json"].content)
            .then(JSON.parse)
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });
};
