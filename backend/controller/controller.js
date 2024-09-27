path = require("path");

const serveLanding = (req, res) => {
    res.set({
        "X-Content-Type-Options": "nosniff",
        "Content-Type": "text/html"
    });
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
}

module.exports = {
    serveLanding
}
