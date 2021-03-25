const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({ auth: process.env.GIST_TOKEN });

module.exports = function (router) {
    router.get("/langs", function (req, res) {

    });
};
