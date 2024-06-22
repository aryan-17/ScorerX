import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import {Match} from "@/data/Game/type"

const  LiveMatch = ({gameCode}:{gameCode:string}) => {

  const [scoreJson, setScoreJson] = useState<Match>();

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as any, {
      transports: ["websocket"],
    }) as any;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("message", (newMessage:Match) => {
      console.log("Received message:", newMessage);
      setScoreJson(newMessage);
    });

    socket.emit("roomId", gameCode);

    socket.on("disconnect", () => {
        console.log(socket.id);
    });

  return (
    <div>
      Live Match
    </div>
  )
}

export default LiveMatch
