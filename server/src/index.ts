import express, { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

app.use(cors()); // Enable CORS for all routes

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  // Listen for incoming messages
  socket.on("message", (message: string) => {
    console.log("Received message:", message);

    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT =  5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
