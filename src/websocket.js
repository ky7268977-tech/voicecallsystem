import { WebSocketServer } from "ws";
import url from "url";


const users = new Map();

export function initWebSocket(server) {
    const wss = new WebSocketServer({server});

    wss.on("connection", (ws, req) => {
            
        const { query } = url.parse(req.url, true);
        const userId = query.userId;

        if (!userId || users.has(userId)) {
            ws.close();
            return;
        }

        users.set(userId, ws);
        ws.userId = userId;

        console.log(userId, "connected");

        ws.on("message", (msg) => {
        try {
            const data = JSON.parse(msg);
            const target = users.get(data.to);
            if (target) target.send(JSON.stringify(data));
        } catch (e) {
            console.error("Invalid WS message", e);
        }
        });

        ws.on("close", () => {
            console.log(ws.userId, "disconnected");
            users.delete(ws.userId);
        });
    });
}