//Empty router incase we need it
express = require("express")
controller = require("../controller/controller.js")

router = express.Router();

router.post("/register", controller.handleRegister)
router.post("/login", controller.handleLogin)


module.exports = router;