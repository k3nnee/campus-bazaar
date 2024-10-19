//Empty controller incase we need it
bcrypt = require("bcryptjs");
crypto = require("crypto")
jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.JWT_SECRET_KEY;

//Registration
exports.register = async (req, res, database) => {
    console.log("Received")
    try{
        // get contant from body and store in respective variables
        const {email, userName, password} = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // hashing password

        // inserting user into the datatbase
        const result = await database.collection("users").insertOne({
            email, userName, password: hashedPassword
        });

        // send response that it has been done sucessfully
        res.status(201).json({message: 'User has been registered', userId: result.insertId});
    }catch(error){
        // send response if user has failed to register
        res.status(500).json({message: 'Registration has FAILED '})
    }

};

// Login a user
exports.login = async(req, res, database) =>{
    try{
        // get contant from body and store in respective variables
        const {email, userName, password} = req.body;
        const user = await database.collection("users").findOne({email,userName});
        const isMatch = await bcrypt.compare(password, user.password);
        const token = jwt.sign({_id: userId, userName}, secret, {expiresIn: '1hr'});
        const hashedToken = crypto.createHash("sha256").update(token).digest('hex');

        if(!user){
            return res.send(401).json({message: "Invalid email/userName or password"});
        }else if(isMatch == false){
            return res.send(401).json({message: "Invalid email/userName or password"});
        }

        await database.collection("users").updateOne(
            {_id: userId},
            {$set: hashedToken}
        );

        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 3600
        });

        res.status(200).json({ message: 'Login successful' });
    
    }catch(error){
        res.status(500).json({ message: 'Login failed' });
    }
};