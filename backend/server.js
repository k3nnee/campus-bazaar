express = require("express");
const cors = require('cors');
path = require("path");
require("dotenv").config()
const {MongoClient} = require("mongodb");
// const router = require('./paths/router.js');


app = express();
app.use(cors());
// app.use('/', router);



//Mongodb Setup
// const pwd = encodeURIComponent("1BH1EI65dXsKsDr4");
// const user = encodeURIComponent("Cluster30804");
// const uri = `mongodb+srv://${user}:${pwd}@campusbazaardatabase.firxl.mongodb.net/`;

// const client = new MongoClient(uri);

app.use(express.json());


// app.use("/", routes);

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
    const router = require('./paths/router.js')(database);
    app.use('/', router);
    const collection = database.collection('myCollection');
    await collection.insertOne({"testing": true})

    app.listen("8080", () => {
        console.log("Listening on port 8080");
    })
}).catch((e) => {
    console.log("Error connecting to the database: " + e);
})

