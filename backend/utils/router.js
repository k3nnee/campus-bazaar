const { displayPost } = require("../controller/controller.js");

//Empty router incase we need it
express = require("express")
controller = require("../controller/controller.js")
multer = require("multer")


const router = express.Router();
const upload = multer();

router.get("/posts",controller.displayPost);
router.post("/register", controller.handleRegister);
router.post("/login", controller.handleLogin);
router.post("/upload", upload.single("image"), controller.handleUpload);
router.get("/getUser", controller.handleLanding);


module.exports = router;