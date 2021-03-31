const { Router } = require("express");
const path = require("path");

const router = Router();
const staticPage = path.resolve(__dirname, "index.html");

router.get("*", function (req, res) {
    res.status(200).sendFile(staticPage);
});

module.exports = router;
