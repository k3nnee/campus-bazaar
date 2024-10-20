bcrypt = require("bcryptjs")
jwt = require("jsonwebtoken")
isValid = require("../utils/utility.js")

const client = require("../utils/mongoclient.js");
const database = client.db("campus-bazaar")
const userCollection = database.collection("user");
const postCollection = database.collection("post");
const crypto = require("crypto");

require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET_KEY;

const handleRegister = async (req, res) => {
    console.log("Register request has been received")
    const {email, password} = req.body;

    if(!isValid(password)){
        res.status(200).json("Not a valid password");
        return
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await userCollection.findOne({email});

    if (data == null){
        await userCollection.insertOne({email, "password": hashedPassword, "token": ""});
        res.status(200).json("User has been registered");
    }else{
        res.status(200).json("Email is in use");
    }
}

const handleLogin = async (req, res) => {
    console.log("Login request has been received")
    const {email, password} = req.body;
    const data = await userCollection.findOne({email});

    if (data == null) {
        await userCollection.insertOne({email});
        res.status(200).json("User has not been registered");
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) {
        res.status(200).json("Incorrect password");
        return;
    }

    const token = jwt.sign({email}, jwtSecret, {expiresIn: '1hr'});
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await userCollection.findOneAndUpdate(
        {email},
        {$set: {"token": hashedToken}}
    );

    res.cookie('authToken', token, {
        httpOnly: true,
        expiresIn: 24 * 60 * 60 * 1000,
        sameSite: 'None',
        secure: true
    });

    res.redirect("http://localhost:3000/");
}

const handleUpload = async (req, res) => {
    const{ title, description, email } = req.body;
    const image = req.file;
    await postCollection.insertOne({
        title,
        description,
        email,
        image: image ? image.buffer : null
    })

    res.status(200).json({message: "Image uploaded successfully"});
}

module.exports = {
    handleLogin, handleRegister, handleUpload
}