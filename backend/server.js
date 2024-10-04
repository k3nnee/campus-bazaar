express = require("express");
path = require("path");

app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.url);


    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    } else if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
    } else if (req.url === "/") {
        res.setHeader('Content-Type', 'text/html');
    }else if (req.url.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html');
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});
app.use(express.static(path.join(__dirname,"../","frontend","build")))


app.listen("8080", () => {
    console.log("Listening on port 8080");
})