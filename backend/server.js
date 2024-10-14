express = require("express");
path = require("path");
routes = require("./paths/router")
cors = require("cors");
const {MongoClient} = require("mongodb");

app = express();

//Mongodb Setup
const pwd = encodeURIComponent("1BH1EI65dXsKsDr4");
const user = encodeURIComponent("Cluster30804");
const uri = `mongodb+srv://${user}:${pwd}@campusbazaardatabase.firxl.mongodb.net/`;

const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.use((req, res, next) => {
    console.log(req.url);

    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    } else if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
    } else if (req.url === "/") {
        res.setHeader('Content-Type', 'text/html');
    }else if (req.url.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html');
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

app.use(express.static(path.join(__dirname,"../","frontend","build")))

async function dbConnect(){
    try {
        await client.connect(); // connect to mongo_client
        database = client.db("CampusBazaarDatabase");// utilize the database called CampusBazaarDatabase

        app.use("/users", router(database));

        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Failed to connect to MongoDB",error);
    }
}

dbConnect().then(() => {
    app.listen("8080", () => {
        console.log("Listening on port 8080");
    })
})
