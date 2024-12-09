const {MongoClient} = require("mongodb");
require("dotenv").config()


const uri = process.env.MONGODB_URI;
const client = new MongoClient("mongodb+srv://admin:ihavealongpassword@campus-bazaar.mv6nz.mongodb.net/");

client.connect().then(async () => {
    console.log("Connected to the database");
    return client;
}).catch((e) => {
    console.log("Error connecting to the database: " + e);
})

module.exports = client;