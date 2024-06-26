"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use((0, cors_1.default)({
    origin: "*"
})); // Enable CORS for all routes
io.on("connection", (socket) => {
    socket.on("roomId", (room) => {
        console.log(socket.id, " joined ", room);
        socket.join(room);
        socket.on("message", (message) => {
            console.log("Received message:", JSON.parse(message));
            io.to(room).emit("message", message);
        });
    });
});
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
