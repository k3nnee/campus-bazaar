express = require("express");
path = require("path");
const router = require("./paths/router");

app = express();
app.use(express.json());
app.use("/", router);


app.listen("8080", () => {
    console.log("Listening on port 8080");
})