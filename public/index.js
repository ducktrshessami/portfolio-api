const express = require("express");
const path = require("path");

const router = express.Router();
const staticDir = path.resolve(__dirname, "static");
const staticPage = path.join(staticDir, "index.html");

router.use(express.static(staticDir));

router.get("*", function (req, res) {
    res.status(200).sendFile(staticPage);
});

module.exports = router;
