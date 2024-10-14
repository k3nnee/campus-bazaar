const { parseCookies, passwordValidator } =  require("./middleware.js");

//Empty router incase we need it
express = require("express");
tokens = require("csrf");
controller = require("../controller/controller.js");

router = express.Router();
router.use(parseCookies); // middleware to parse cookies

const csrfProtection = tokens({cookie: true}) // XSRF tokens

module.exports = (database) => {
    router.post('/register', csrfProtection, passwordValidator, (res, req) => controller.register(req, res, database));
    router.post('/login', csrfProtection, (res, req) => controller.login(req, res, database));

    return router;
};


