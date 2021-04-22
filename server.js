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
    ms: 1500000,
    verbose: true,
    timestamps: false
});

// App config
app.use(cycle);
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./router"));
app.use(require("./public"));

cycle.on("error", console.error);

// It's go time
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    if (process.env.CYCLE && (process.env.CYCLE || "").trim().toLowerCase() !== "false") {
        cycle.startLoop();
    }
});
