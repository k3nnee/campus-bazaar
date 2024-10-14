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

    if(password != null){
        if(isValid == false){
            res.status(400).json({message: 
                "'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."});
        }
    }
    
    next();
}

module.exports = {parseCookies, passwordValidator};