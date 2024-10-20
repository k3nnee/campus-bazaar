express = require("express");
path = require("path");
router = require("./utils/router.js")
cors = require("cors")

app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use("/", router)

app.use((req, res, next) => {
    if (req.url.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
    }

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

app.use(express.static(path.join(__dirname,"../","frontend","build")));

app.listen("8080", () => {
    console.log("Listening on port 8080");
})