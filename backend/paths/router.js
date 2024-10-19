const { parseCookies, passwordValidator } =  require("./middleware.js");

//Empty router incase we need it
express = require("express");
tokens = require("csurf");
controller = require("../controller/controller.js");

router = express.Router();
router.use(parseCookies); // middleware to parse cookies

const csrfProtection = tokens({cookie: true}); // XSRF tokens
//csrfProtection,
module.exports = (database) => {
    // console.log(typeof csrfProtection, typeof passwordValidator, typeof controller.register);
    router.post('/register', passwordValidator, (req, res) => controller.register(req, res, database));
    router.post('/login',  (req, res) => controller.login(req, res, database));
    router.post('/protected', tokenValidator, (req, res) => {res.status(200).json({message: "Access Granted"})})

    return router;
};


