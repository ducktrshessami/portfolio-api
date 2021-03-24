const { createTransport } = require("nodemailer");

const transport = createTransport({
    host: process.env.MAILER_HOST,
    secure: true,
    auth: {
        type: "OAuth2",
        user: process.env.MAILER_USER,
        clientId: process.env.MAILER_ID,
        clientSecret: process.env.MAILER_SECRET,
        refreshToken: process.env.MAILER_REFRESH
    }
});

module.exports = function (router) {
    router.post("/message", function (req, res) {
        db.Message.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });
};
