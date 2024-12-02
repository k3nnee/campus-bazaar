express = require("express");
path = require("path");
router = require("./utils/router.js")
cors = require("cors")
cookieParser = require("cookie-parser")

const http = require("http");
const { Server } = require('socket.io');
const { Agenda }= require('agenda');

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

app = express();

const server = http.createServer(app);
const wss = new Server(server, {
    cors: {
        origin: 'https://campus-bazaar-koyz.onrender.com',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

app.use(cors({
    origin: 'https://campus-bazaar-koyz.onrender.com',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use("/", router)

app.use((req, res, next) => {
    if (req.url.endsWith('.ico')) {
        res.setHeader('Content-Type', 'image/x-icon');
    }

    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    next();
});

app.use(express.static(path.join(__dirname,"../","frontend","build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../","frontend","build", "index.html"));
});

wss.on("connect", async (socket) => {
    agenda.define('post content', async (job) => {
        const { jobData } = job.attrs.data;
        const blob = new Blob([Buffer.from(jobData.image, "base64")]);
        const formData = new FormData;

        formData.append('image', blob);
        formData.append('title', jobData.title);
        formData.append('price', jobData.price);
        formData.append('description', jobData.description);
        formData.append('email', jobData.email);

        await fetch(process.env.HOST+'/upload', {
            method: 'POST',
            body: formData
        })
            .then(async (res) => {
                const msg = await res.json();
                if ("error" in msg){
                    socket.emit("upload_response", { error: msg.error })
                }else{
                    console.log("here");
                    socket.broadcast.emit("broadcast", { message: "Image uploaded successfully" })
                    socket.emit("broadcast", { message: "Image uploaded successfully" })
                }
            })
            .catch((error) => {
                socket.emit("upload_response", { error })
                console.log(error);
            })
    });

    await agenda.start();

    socket.on("create_post", async (data) => {
        console.log(data.image);
        const binaryData = Buffer.from(data.image, "utf-8").toString("base64");

        const jobData = {
            image: binaryData,
            title: data.title,
            price: data.price,
            description: data.description,
            email: data.email
        };

        const time = new Date(Date.now() + (data.hour * 60 * 60 * 1000) + (data.minute * 60 * 1000) + (data.second * 1000));
        agenda.schedule(time, 'post content', { jobData });

        socket.emit("upload_response", { message: "Post scheduled" });

    })
})

server.listen("8080", () => {
    console.log("Listening on port 8080");
})