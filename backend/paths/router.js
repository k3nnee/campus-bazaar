const {serveLanding} = require("../controller/controller");
express = require("express")


router = express.Router();
router.get("/", serveLanding);

module.exports = router;