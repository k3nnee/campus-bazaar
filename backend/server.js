express = require("express");
path = require("path");

app = express();
app.use(express.json());

app.use((req, res, next) => {
    if (req.url.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});
app.use(express.static(path.join(__dirname,"../","frontend","build")))


app.listen("8080", () => {
    console.log("Listening on port 8080");
})