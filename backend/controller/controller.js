path = require("path");

const serveLanding = (req, res) => {
    res.set({
        "X-Content-Type-Options": "nosniff",
        "Content-Type": "text/html"
    });
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
}

const serveApp = (req, res) => {
    res.set({
        "X-Content-Type-Options": "nosniff",
        "Content-Type": "text/javascript"
    });

    res.sendFile(path.join(__dirname, "../../frontend/build/static/js/main.0f120cd3.js"));
}
const serveCSS = (req, res) => {
    res.set({
        "X-Content-Type-Options": "nosniff",
        "Content-Type": "text/css"
    });
    res.sendFile(path.join(__dirname, "../../frontend/build/static/css/main.eaabf409.css"));
}

module.exports = {
    serveLanding,
    serveApp,
    serveCSS
}
