bcrypt = require("bcryptjs");
jwt = require("jsonwebtoken");
const {passwordValidator,emailValidator} = require("../utils/utility.js");

const client = require("../utils/mongoclient.js");
const database = client.db("campus-bazaar")
const userCollection = database.collection("user");
const postCollection = database.collection("post");
const crypto = require("crypto");
const {Timestamp} = require("mongodb");

require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET_KEY;

const handleRegister = async (req, res) => {
    console.log("Register request has been received")
    const { email, password } = req.body;

    const isValidEmail = await emailValidator(email);
    if(!isValidEmail){
        res.status(200).json({error: "Not a valid email"});
        return
    }else if(!passwordValidator(password)){
        res.status(200).json({error: "Not a valid password"});
        return
    }
    console.log(!emailValidator(email));
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await userCollection.findOne({ email });

    if (data == null) {
        await userCollection.insertOne({ email, "password": hashedPassword, "token": "" });
        res.status(200).json({ message: "User has been registered" });
    } else {
        res.status(200).json({ error: "Email is in use" });
    }
}

const handleLogin = async (req, res) => {
    console.log("Login request has been received")
    const { email, password } = req.body;
    const data = await userCollection.findOne({ email });

    if (data == null) {
        res.status(200).json({error: "User has not been registered"});
        return
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) {
        res.status(200).json({ error: "Incorrect password" });
        return;
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1hr' });
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await userCollection.findOneAndUpdate(
        { email },
        { $set: { "token": hashedToken } }
    );

    res.cookie('authToken', token, {
        httpOnly: true,
        expiresIn: 24 * 60 * 60 * 1000,
        sameSite: 'None',
        secure: true
    });

    res.status(200).json({ message: "User has logged in" });
}

const handleUpload = async (req, res) => {
    try{
        const { title, price, description, email } = req.body;
        const image = req.file;
        await postCollection.insertOne({
            title,
            price,
            description,
            email,
            image: image ? image.buffer : null,
            createdAt: new Date()
        })

        res.status(200).json({ message: "Post uploaded successfully" });
    }catch(e){
        res.status(404).json({ error: "Post not uploaded successfully" });
    }
}

const displayPost = async (req, res) => {
    try {
        const posts = await postCollection.find().sort({"createdAt": -1}).toArray();
        const formattedPosts = posts.map(post => ({
            ...post,
            imageUrl: post.image ? `data:image/jpeg;base64,${post.image.toString('base64')}` : null
        }));
        res.status(200).json(formattedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleLanding = async (req, res) => {
    if( !("authToken" in req.cookies )){
        res.status(404).json({ user: null });
    } else {
        const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
        const user = await userCollection.findOne({token})

        if( user == null){
            res.status(404).json({ user: null });
        }else{
            res.status(200).json({ user: user.email })
        }
    }
}

module.exports = {
    handleLogin, handleRegister, handleUpload, displayPost, handleLanding
}

