import { Match } from "@/data/Game/type";
import { FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";
import sample from "@/data/Game/sample.json";
import { useSession } from "next-auth/react";
import { apiConnector } from "@/services/apiConnector";
import { scoreEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Toss from "./Toss";

const Scorer = ({ gameCode }: { gameCode: string }) => {
  const message = JSON.stringify(sample);
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [scoreJson, setScoreJson] = useState<Match>(
    JSON.parse(localStorage.getItem("scoreJson") as string)
  );

  const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as any, {
    transports: ["websocket"],
  }) as any;

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.emit("roomId", gameCode);

  socket.on("message", (newMessage: Match) => {
    console.log("Received message:", newMessage);
    setScoreJson(newMessage);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });

  const handleMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      if (!session) return;
      try {
        setLoading(true);
        const response = (await apiConnector(
          "GET",
          scoreEndPoints.SCORE_API
        )) as any;

        setScoreJson(response.data.data.scoreCard);
        localStorage.setItem("scoreJson", JSON.stringify(response.data.data))
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.error("An error occurred:", error.response?.data.message);
        } else if (error instanceof Error) {
          console.error("An error occurred:", error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    if (!scoreJson) {
      getUserDetails();
    }
  }, []);

  const sendDataToDatabase = async ()=>{
    try {
      setLoading(true);
      const response = (await apiConnector(
        "PATCH",
        scoreEndPoints.SCORE_API,
        scoreJson
      )) as any;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.error("An error occurred:", error.response?.data.message);
      } else if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      sendDataToDatabase();
    }, 30000); 

    return () => clearInterval(interval);
  }, [scoreJson]);

  console.log(scoreJson);

  if (scoreJson?.team1 == null) {
    return <Toss scoreJson={scoreJson} setScoreJson={setScoreJson} />;
  }

  return (
    <div>
      <h1>Chat App</h1>
      <form onSubmit={handleMessageSubmit}>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Scorer;
