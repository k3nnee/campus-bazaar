const { displayPost, handleGetBookmarkCount } = require("../controller/controller.js");

//Empty router incase we need it
express = require("express")
controller = require("../controller/controller.js")
multer = require("multer")


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/posts",controller.displayPost);
router.post("/register", controller.handleRegister);
router.post("/login", controller.handleLogin);
router.post("/upload", upload.single("image"), controller.handleUpload);
router.get("/getUser", controller.handleLanding);
router.delete("/:id", controller.handleDeletePost);
router.post("/:id/bookmark",controller.handleBookmark);
router.get('/:id/bookmark-count', handleGetBookmarkCount);
router.post("/logout", controller.handleLogout);
router.post("/profile",upload.single("profilePic"), controller.handleProfileUpload);
router.post("/add_to_cart",controller.handleAddToCart);
router.get("/showCart",controller.displayCart);
module.exports = router;