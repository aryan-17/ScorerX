import express, { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

app.use(cors({
  origin:"*"
})); // Enable CORS for all routes

io.on("connection", (socket: Socket) => {

  socket.on("roomId",(room:string)=>{
    console.log(socket.id," joined ",room);
    socket.join(room);
    socket.on("message", (message: string) => {
      console.log("Received message:", JSON.parse(message));
      io.to(room).emit("message", message);
    });
  })
});

const PORT =  5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
