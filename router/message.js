const { createTransport } = require("nodemailer");

const mailer = createTransport({
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

function generateHtml(name, email, message) {
    return `<article>
        <h3>${name}</h3>
        <h4><a href="mailto:${email}">${email}</a></h4>
        ${message.split("\n")
            .map(line => `<p>${line}</p>`)
            .join("\n")
        }
    </article>`;
}

function findError({ name = "", email = "", message = "" }) {
    if (!process.env.MAILER_ENABLED) {
        return "Messages are currently disabled";
    }
    if (!name.trim()) {
        return "Enter a name";
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.trim())) {
        return "Enter a valid E-mail address";
    }
    if (!message.trim()) {
        return "Enter a message";
    }
}

module.exports = function (router) {
    router.post("/message", function (req, res) {
        let validationError;
        if (validationError = findError(req.body)) {
            res.status(400).send(validationError);
        }
        else {
            let { name, email, message } = req.body;
            name = name.trim();
            email = email.trim();
            message = message.trim();
            mailer.sendMail({
                to: process.env.MAILER_DESTINATION,
                replyTo: email,
                subject: `Portfolio message from ${name}`,
                text: `${name}\n${email}\n${message}`,
                html: generateHtml(name, email, message)
            })
                .then(() => res.status(200).end())
                .catch(err => {
                    console.error(err);
                    res.status(500).end();
                });
        }
    });
};
