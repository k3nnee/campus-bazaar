//Empty router incase we need it
express = require("express")
controller = require("../controller/controller.js")
multer = require("multer")


const router = express.Router();
const upload = multer();

router.post("/register", controller.handleRegister);
router.post("/login", controller.handleLogin);
router.post("/logout", controller.handleLogout);
router.post("/upload", upload.single("image") ,controller.handleUpload);


module.exports = router;