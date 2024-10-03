const {serveLanding, serveApp} = require("../controller/controller");
express = require("express")

router = express.Router();
router.get("/", serveLanding);

//Edit this
router.get("/static/js/main.6f7deb0c.js", serveApp);

module.exports = router;