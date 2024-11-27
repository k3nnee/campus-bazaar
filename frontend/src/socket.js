import {io} from "socket.io-client";

export const socket = io("https://campus-bazaar-koyz.onrender.com/", {
    secure: true
});

