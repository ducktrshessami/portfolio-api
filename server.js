try {
    require("dotenv").config();
}
catch {
    console.warn("Not using dotenv. Make sure environment variables are set");
}

const express = require("express");
const cors = require("cors");
const Cycle = require("express-cycle");

const PORT = process.env.PORT || 3000;
const app = express();
const cycle = Cycle({
    origin: process.env.PUBLIC_URL,
    verbose: true,
    timestamps: true
});

// App config
app.use(cycle);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./router"));
app.use(require("./public"));

// It's go time
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    cycle.startLoop();
});
