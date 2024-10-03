const {serveLanding, serveApp, serveCSS} = require("../controller/controller");
express = require("express")

router = express.Router();
router.get("/", serveLanding);

//Edit this
router.get("/static/js/main.0f120cd3.js", serveApp);
router.get("/static/css/main.eaabf409.css", serveCSS);

module.exports = router;