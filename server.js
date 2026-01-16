import express from "express";
import http from "http";
import {initWebSocket} from "./src/websocket.js";

const app = express();

const server = http.createServer(app);

app.use(express.static("public"));

initWebSocket(server);

server.listen(3000, () => {
    console.log("Signaling server running on 3000");
});


app.get("/access", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Microphone</title>
        </head>
        <body>
            <button onclick="navigator.mediaDevices.getUserMedia({ audio:true })
                .then(stream => alert('Mic allowed'))
                .catch(err => alert(err))">
                Test Mic
            </button>
        </body>
        </html>
    `);
});
