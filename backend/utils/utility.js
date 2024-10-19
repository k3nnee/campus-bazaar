function passwordValidator(password){
    const minLen = 8;
    const containUpperCase = /[A-Z]/.test(password);
    const containLowerCase = /[a-z]/.test(password);
    const containNum = /\d/.test(password);
    const containSpecialChar = /[!@#$%^&.*(),.?":{}|<>-_]/.test(password);

    const isValid = password.length >= minLen && containLowerCase && containUpperCase && containSpecialChar
        && containNum && containSpecialChar;

    if(password != null && isValid == false){
        return false;
    }

    return true;
}

module.exports = passwordValidator;