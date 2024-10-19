const bcrypt = require("bcryptjs/dist/bcrypt");

// cookie parser
function parseCookies(req, res, next){
    const cookieHeader = req.headers.cookies;
    req.cookies = {};

    if(cookieHeader != null){
        const cookies = cookieHeader.split("=").map(cookie => cookie.trim());
        const cookie = cookies[1].split(";").map(c => c.trim());

        for(c in cookie){
            const [name, value] = c.split("="); 
            req.cookie[name] = decodeURIComponent(value);
        }
    }

    next();
}

// password validator
function passwordValidator(req, res, next){
    const {password} = req.body;
    const minLen = 8;
    const containUpperCase = /[A-Z]/.test(password);
    const containLowerCase = /[a-z]/.test(password);
    const containNum = /\d/.test(password);
    const containSpecialChar = /[!@#$%^&.*(),.?":{}|<>-_]/.test(password);

    const isValid = password.length >= minLen && containLowerCase && containUpperCase && containSpecialChar 
                    && containNum && containSpecialChar;

    if(password != null && isValid == false){
        res.status(400).json({message: 
            "'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."});
    }
    
    next();
}

async function tokenValidator(req, res, next){
    const token = req.cookies.authToken;

    if(!token){
        res.status(401).json({message: "Authentication Required"});
    }

    try{
        const decodedToken = jwt.verify(token, secret);
        const userId = decodedToken.userId;
        const user = await req.database.collection("users").findOne({_id: userId, name});
        const isValidToken = await bcrypt.compare(token, user.hashedToken);

        if(!user){
            res.status(401).json({message: "Invalid Token"})
        }

        req.user = decodedToken;
        next;
    }catch (err){
        res.status(401).json({message: "Invalid Token"})
    }
}

module.exports = {parseCookies, passwordValidator, tokenValidator};