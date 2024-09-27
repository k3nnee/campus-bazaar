const {serveLanding, serveApp, serveCSS} = require("../controller/controller");
express = require("express")

router = express.Router();
router.get("/", serveLanding);
router.get("/static/js/main.6e62c9d7.js", serveApp);
router.get("/static/css/main.eaabf409.css", serveCSS);
module.exports = router;