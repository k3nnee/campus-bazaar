express = require("express");
path = require("path");
router = require("./utils/router.js")
cors = require("cors")
cookieParser = require("cookie-parser")

const http = require("http");
const { Server } = require('socket.io');

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

wss.on("connect", (socket) => {
    socket.on("create_post", async (data) => {
        const blob = new Blob([data.image]);
        const formData = new FormData();
        formData.append('image', blob);
        formData.append('title', data.title);
        formData.append('price', data.price)
        formData.append('description', data.description);
        formData.append('email', data.email);

        await fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .catch((error) => {
                socket.emit("upload_response", { error })

            })
            .finally(() => {
                socket.broadcast.emit("broadcast", { message: "Image uploaded successfully" })
                socket.emit("upload_response", { message: "Image uploaded successfully" })
        })

        console.log("posted!")
    })
})

server.listen("8080", () => {
    console.log("Listening on port 8080");
})