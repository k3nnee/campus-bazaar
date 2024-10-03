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
    //Edit this
    res.sendFile(path.join(__dirname, "../../frontend/build/static/js/main.6f7deb0c.js"));
}

module.exports = {
    serveLanding,
    serveApp
}
