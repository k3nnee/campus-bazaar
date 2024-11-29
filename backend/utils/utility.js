dns = require("dns");


function passwordValidator(password){
    const minLen = 8;
    const containUpperCase = /[A-Z]/.test(password);
    const containLowerCase = /[a-z]/.test(password);
    const containNum = /\d/.test(password);
    const containSpecialChar = /[!@#$%^&.*(),?":{}|<>_]/.test(password);
    console.log("__",password,"__")
    console.log(containSpecialChar)

    const isValid = password.length >= minLen && containLowerCase && containUpperCase && containSpecialChar
        && containNum && containSpecialChar;

    if(password != null && isValid == false){
        return false;
    }

    return true;
}

function emailValidator(email, callback){
    return new Promise((resolve) => {
        const htmlTags = /<[^>]*>/g;

        if(email.indexOf('.') == 0 || email.match(htmlTags)){
            console.log("has html tags\n")
            resolve(false);
            return
        }

        if(email.indexOf('@') != -1 && email.indexOf['.'] != email.indexOf('@') - 1){
            const domain = email.split('@')[1];
            dns.resolveMx(domain, (error, emailAddresses) => {
                if(error || emailAddresses.length == 0){
                    console.log("not a domain\n")
                    resolve(false);
                    return
                }else{
                    console.log("is a domain \n")
                    resolve(true);
                    return
                }
            });

        }else{
            console.log("does not contain @")
            resolve(false);
            return
        }
    });
    
} 




module.exports = {passwordValidator, emailValidator};