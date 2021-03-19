try {
    require("dotenv").config();
}
catch {
    console.warn("Not using dotenv. Make sure environment variables are set");
}

const express = require("express");
const cors = require("cors");
const db = require("./models");

const PORT = process.env.PORT || 3000;
const app = express();

// App config
app.use(cors({
    origin: "https://ducktrshessami.github.io",
    optionsSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./router"));

// It's go time
db.sequelize.sync({ force: process.env.DB_FORCE })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });
    })
    .catch(console.error);
