express = require("express");
path = require("path");
require("dotenv").config()
const { MongoClient } = require("mongodb");
const cors = require('cors');


app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use((req, res, next) => {
    if (req.url.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});
app.use(express.static(path.join(__dirname, "../", "frontend", "build")));

const uri = "mongodb+srv://winston:superpassword@campus-bazaar.mv6nz.mongodb.net/";
const client = new MongoClient(uri);
let collection;
client.connect().then(async () => {
    console.log("Connected to the database")

    const database = client.db('myDatabase');
    const collection = database.collection('myCollection');
     

app.post('/', async (req, res) => {
    const{title,body,userName} = req.body;
    await collection.insertOne({title,body,userName})
})
    app.listen("8080", () => {
        console.log("Listening on port 8080");
    })
}).catch((e) => {
    console.log("Error connecting to the database: " + e);
})


// Ensure this script runs after the DOM is loaded
// document.getElementById("submit").onclick = async function(event) {
//     event.preventDefault(); // Prevent the form from submitting

//     const itemInput = document.getElementById("item_name");
//     const itemName = itemInput.value; // Get the value from the input

//     if (itemName) {
//         try {
//             // Assuming you have a `collection` variable already connected to your MongoDB
//             await collection.insertOne({ "Item-Name": itemName });
//             console.log("Item inserted:", itemName);
//             itemInput.value = ''; // Clear the input field after submission
//         } catch (error) {
//             console.error("Error inserting item:", error);
//         }
//     } else {
//         console.log("Please enter an item name.");
//     }
// };
