bcrypt = require("bcryptjs");
jwt = require("jsonwebtoken");
const { passwordValidator, emailValidator } = require("../utils/utility.js");

const client = require("../utils/mongoclient.js");
const database = client.db("campus-bazaar")
const userCollection = database.collection("user");
const postCollection = database.collection("post");
const crypto = require("crypto");
const sanitizeHtml = require('sanitize-html');
const { ObjectId } = require("mongodb");
const { time } = require("console");
const { title } = require("process");

require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET_KEY;

const handleRegister = async (req, res) => {
    console.log("Register request has been received")
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const { email, password, passwordDupe } = req.body;

    const isValidEmail = await emailValidator(email);

    if (!isValidEmail) {
        res.status(400).json({ error: "Not a valid email" });
        return
    } else if (!passwordValidator(password)) {
        res.status(400).json({ error: "Passwords must contain special characters, capital letter, lowercase letter, and min 8 characters" });
        return
    }

    if(password != passwordDupe){
        res.status(400).json({ error: "Passwords must match" });
        return
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await userCollection.findOne({ email });

    if (data == null) {
        await userCollection.insertOne({ email, "password": hashedPassword,cart: []});
        res.status(200).json({ message: "User has been registered" });
    } else {
        res.status(401).json({ error: "Email is in use" });
    }
}

const handleLogin = async (req, res) => {
    console.log("Login request has been received")
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const { email, password } = req.body;
    const data = await userCollection.findOne({ email });

    if (data == null) {
        res.status(400).json({ error: "User has not been registered" });
        return
    }

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
        res.status(401).json({ error: "Incorrect password" });
        return;
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1hr' });
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await userCollection.findOneAndUpdate(
        { email },
        { 
            $set: { 
                token: hashedToken,
                cart: [] 
            }
         }
    );

    res.cookie('authToken', token, {
        httpOnly: true,
        expiresIn: 60 * 60 * 1000,
        sameSite: 'None',
        secure: true
    });

    res.status(200).json({ message: "User has logged in" });
}

const handleUpload = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const { title, price, description, email } = req.body;
    const image = req.file;
    console.log(image);
    //CHECK FOR EMPTY FIELDS
    if (!title || title.trim().length === 0) { return res.status(400).json({ error: "Please include a title" }); }
    if (!price) { return res.status(400).json({ error: "Please include a price" }) }
    if (!description || description.trim().length === 0) { return res.status(400).json({ error: "Please include a description" }); }
    if (!image) { return res.status(400).json({ error: "Please include a image" }) }
    //LIMIT LENGTH OF INPUT
    if (description.length > 500 || description.length < 20) { return res.status(400).json({ error: "Description length must be between 20 and 500 characters" }) }
    if (title.length > 100 || title.length < 5) { return res.status(400).json({ error: "Title length must be between 5 and 20 characters" }) }

    //SANITIZE TEXT
    const sanitized_title = sanitizeHtml(title, {
        allowedTags: [],
        allowedAttributes: {}
    })
    const sanitized_description = sanitizeHtml(description, {
        allowedTags: [],
        allowedAttributes: {} 
    })

    
    const parsed_price = parseFloat(price);
    if (isNaN(parsed_price) || parsed_price <= 0) {
        return res.status(400).json({ error: "Invalid price value" });
    }
    console.log("UPLOAD IS OK")
    await postCollection.insertOne({
        sanitized_title,
        parsed_price,
        sanitized_description,
        email,
        image: image ? image.buffer : null,
        bookmarkCount: 0,
        bookmarkedBy: [], 
        createdAt: new Date()
    })
    console.log("UPLOAD IS OK")
    res.status(200).json({ message: "Image uploaded successfully" });
}


const displayPost = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    try {
        const {email} = req.body;
        const posts = await postCollection.find().sort({ "createdAt": -1 }).toArray();
        const user = await userCollection.findOne({"email": email});
        // console.log("user *****: ", user);
        const formattedPosts = await Promise.all(posts.map(async post => {
            const user = await userCollection.findOne({ "email": post.email });
            return {
                ...post,
                id: post._id,
                imageUrl: post.image ? `data:image/jpeg;base64,${post.image.toString('base64')}` : null,
                profilePic_url: user && user.profilePic ? `data:image/jpeg;base64,${user.profilePic.toString('base64')}` : null
            };
        }));
        res.status(200).json(formattedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handleLanding = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (!("authToken" in req.cookies)) {
        res.status(404).json({ user: null });
    } else {
        const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
        const user = await userCollection.findOne({ token })
        console.log("landing cookies", req.cookies)
        if (user == null) {
            res.status(404).json({ user: null });
        } else {
            res.status(200).json({ user: user.email })
        }
    }
}

const handleDeletePost = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    try {

        if (!("authToken" in req.cookies)) {
            console.log("Cookies available:", req.cookies);
            return res.status(401).json({ message: "Authentication required" });
        }

        const { id } = req.params;
        const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
        console.log("hashed token ", token);

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const objId = new ObjectId(id);


        const postUser = await postCollection.findOne({ _id: objId });
        const userEmail = postUser['email'];
        const user = await userCollection.findOne({ 'email': userEmail });
        const userToken = user['token'];
        console.log("user token ", userToken);


        if (userToken == token) {
            const deleted = await postCollection.deleteOne({ _id: objId });
            if (deleted.deletedCount === 0) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.status(204).json({ message: "Post successfully deleted" });
        } else {

            res.status(403).json({ message: "Unable to Delete Other People Posts" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.toString() });
    }

}
const check_in_cart = async (req,res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
    const curr_user = await userCollection.findOne({ token });
    const { id } = req.body;
    const post = await postCollection.findOne({ _id: new ObjectId(c.id) });
    if (post){
        console.log("Item is already in cart, button should display REMOVE");
    }else{
        console.log("ITEM IS NOT IN CART , button should display add to cart");
    }
}
const displayCart = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
    const curr_user = await userCollection.findOne({ token });
    console.log("ATTEMPTING TO DISPLAY CART ");
    
    if (curr_user.cart && curr_user.cart.length > 0) {
        
        const cart_list = [];
     
        for (let cartId of curr_user.cart) {
            const post = await postCollection.findOne({ _id: new ObjectId(cartId) });
            if (post) {
                sellerEmail = post.email;
                sellerProfileImg = (userCollection.findOne({email: sellerEmail})).profilePic;
                const item = {
                    id: post._id,
                    title: post.sanitized_title,
                    price: post.parsed_price,
                    image: post.image ? `data:image/jpeg;base64,${post.image.toString('base64')}` : null,
                    sellerPic: sellerProfileImg ? `data:image/jpeg;base64,${sellerProfileImg.toString('base64')}` : null,
                };

                cart_list.push(item);
            } else {
                console.error(`Post with ID ${cartItem.id} not found.`);
            }
        }

        res.json(cart_list);
    } else {
        res.json([]);
    }
};
 
 

const handleAddToCart = async (req,res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const { id } = req.body;


    const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
    
    const curr_user = await userCollection.findOne({token});
    const post = await postCollection.findOne({ _id: new ObjectId(id) });
    const curr_email  = curr_user.email;
    console.log("ATTEMPTING TO ADD TO CART");
    const user = await userCollection.findOne({ email: curr_email });
    const isInCart = user.cart.includes(id);
        if (isInCart){
        console.log("...Removing Fromhasdsddasd Cart...")
        await userCollection.findOneAndUpdate(
            { email: curr_email },
            { $pull: { cart:  id  } }
        );
        res.status(200).json({ message: 'Item removed from cart' });
    }else{
    console.log("BEEP BOOP ADDING TO CART")
    await userCollection.findOneAndUpdate(
        { email: curr_email },
        { $addToSet: { cart: id } }
        
    );
    res.status(200).json({ message: 'Item added to cart' });
}
}
const handleBookmark = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    console.log("REQBODYL:",req.body)
    const { id } = req.params;
    console.log("id:",id)
    console.log("HEOHJASDIAHNFUGBHISf")
    const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
    console.log("hashed token ", token);

    const curr_user = await userCollection.findOne({token});

    console.log("Current User is :", curr_user.email)

    const post = await postCollection.findOne({ _id: new ObjectId(id) });

     
    const alreadyBookmarked = post.bookmarkedBy.includes(curr_user.email);
    console.log("BOOKMARK STATUS:", alreadyBookmarked)
    console.log("Current User Email:", curr_user.email);
    console.log("Bookmarked By Array:", post.bookmarkedBy);
    if (alreadyBookmarked) {
        await postCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $inc: { bookmarkCount: -1 },
                $pull: { bookmarkedBy: curr_user.email }
            }
        );
    } else {
        await postCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $inc: { bookmarkCount: 1 },
                $addToSet: { bookmarkedBy: curr_user.email }
            }
        );
     }
     const updatedPost = await postCollection.findOne({ _id: new ObjectId(id) });
     return res.status(200).json({ message: alreadyBookmarked ? "Post Unmarked" : "Post Saved", bookmarkCount: updatedPost.bookmarkCount });
};

const handleGetBookmarkCount = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const { id } = req.params;

    const post = await postCollection.findOne({ _id: new ObjectId(id) });
    const token = crypto.createHash("sha256").update(req.cookies["authToken"]).digest("hex");
    const curr_user = await userCollection.findOne({ token });
    const isBookmarked = post.bookmarkedBy.includes(curr_user.email);
    return res.status(200).json({
        bookmarkCount: post.bookmarkCount,
        isBookmarked
    });
};

const handleLogout = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });

    const {email} = req.body;
    console.log(email)
    if (email) {
        const x = await userCollection.updateOne(
            {email},
            { $unset: {token: ""}} //Clear token from database
        );
        // console.log(x)
    }
    res.status(200).json({ message: "User has logged out"})
};

const handleProfileUpload = async (req, res) => {
    console.log("Profile upload endpoint hit");
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const {email} = req.body;
    const profilePic = req.file;

    if(!profilePic){
        return res.status(400).json({ error: "No image found" });
    }

    // console.log(email)
    if (email) {
        const result = await userCollection.findOneAndUpdate(
            { email },
            { $set: { "profilePic": profilePic ? profilePic.buffer : null} }
        );
        // console.log("email------",email)
    }
    
    res.status(200).json({ message: "Profile picture updated successfully"});
}

module.exports = {
    
    displayCart,
    handleAddToCart,
    handleLogin,
    handleRegister,
    handleUpload,
    displayPost,
    handleLanding,
    handleDeletePost,
    handleBookmark,
    handleGetBookmarkCount,
    handleLogout,
    handleProfileUpload
}
