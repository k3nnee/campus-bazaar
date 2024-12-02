express = require("express");
path = require("path");
router = require("./utils/router.js")
cors = require("cors")
cookieParser = require("cookie-parser")

const http = require("http");
const { Server } = require('socket.io');
const rateLimiter = require("express-rate-limit");

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

const blocked_IPs = {}

const dos_protection = rateLimiter({
    windowMs: 10 * 1000,
    max: 50,
    handler: (req, res) => {
        blocked_IPs[req.ip] = Date.now();
        res.status(429).json({message: "Too many request, potential attack risk detected"});
    }
})

app.use((req, res, next) => {
    const curr_IP = req.ip;
    const curr_time = Date.now();

    if(curr_IP in blocked_IPs){
        const curr_IP_time = blocked_IPs[curr_IP];
        const time_diff = Math.floor((curr_time - curr_IP_time) / 1000);

        if (time_diff > 30){
            delete blocked_IPs.curr_IP
        }else{
            return res.status(429).json({message: "Too many request, still blocked"});
        }
    }

    next();
});

app.use(cookieParser());
app.use(express.json());
app.use(dos_protection);
app.use("/", router);

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

wss.on("connect", (socket) => {
    socket.on("create_post", async (data) => {
        const blob = new Blob([data.image]);
        const formData = new FormData();
        formData.append('image', blob);
        formData.append('title', data.title);
        formData.append('price', data.price)
        formData.append('description', data.description);
        formData.append('email', data.email);

        await fetch(process.env.HOST+'/upload', {
            method: 'POST',
            body: formData
        })
            .then(() => {
                socket.broadcast.emit("broadcast", { message: "Image uploaded successfully" })
                socket.emit("upload_response", { message: "Image uploaded successfully" })
                console.log("posted!")
            })
            .catch((error) => {
                socket.emit("upload_response", { error })
                console.log(error);

            })
    })
})

server.listen("8080", () => {
    console.log("Listening on port 8080");
})