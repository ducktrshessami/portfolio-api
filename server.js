try {
    require("dotenv").config();
}
catch {
    console.log("Not using dotenv. Make sure environment variables are set");
}

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

// App config
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./router/api")(app);

// It's go time
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
