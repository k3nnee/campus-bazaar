express = require("express");
path = require("path");
require("dotenv").config()
const {MongoClient} = require("mongodb");

app = express();
app.use(express.json());

app.use((req, res, next) => {
    if (req.url.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});
app.use(express.static(path.join(__dirname,"../","frontend","build")));

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

client.connect().then(async () => {
    console.log("Connected to the database")

    const database = client.db('myDatabase');
    const collection = database.collection('myCollection');
    await collection.insertOne({"testing": true})

    app.listen("8080", () => {
        console.log("Listening on port 8080");
    })
}).catch((e) => {
    console.log("Error connecting to the database: " + e);
})

