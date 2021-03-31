module.exports = function (router) {
    router.all("/ping", function (req, res) {
        res.status(200).send("Pong!");
    });
};
