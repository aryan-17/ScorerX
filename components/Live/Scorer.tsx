import { Match, Status, Team } from "@/data/Game/type";
import { FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";
import sample from "@/data/Game/sample.json";
import { useSession } from "next-auth/react";
import { apiConnector } from "@/services/apiConnector";
import { scoreEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Toss from "./Toss";
import { gameData } from "@/store/atoms/gameData";
import { useRecoilState } from "recoil";
import ScoreBoard from "./ScoreBoard";
import BattingModal from "./BattingModal";

const Scorer = ({ gameCode }: { gameCode: string }) => {
  const message = JSON.stringify(sample);
  const [matchData, setMatchData] = useRecoilState(gameData);
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [scoreJson, setScoreJson] = useState<Match>();
  // JSON.parse(localStorage.getItem("scoreJson") as string)

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
        localStorage.setItem(
          "scoreJson",
          JSON.stringify(response.data.data.scoreCard)
        );
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
  }, [scoreJson, session]);

  console.log(scoreJson);

  useEffect(() => {
    const sendDataToDatabase = async () => {
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
    };
    const interval = setInterval(() => {
      sendDataToDatabase();
    }, 30000);

    return () => clearInterval(interval);
  }, [scoreJson, matchData.teams]);

  const currentBattingPlayers = () => {
    const count = scoreJson?.team1.players.filter(
      (player) => player.batting.status === Status.NOT_OUT
    ).length;
    console.log(count);

    return count;
  };

  if (!scoreJson || scoreJson.team1 == null) {
    return <Toss setScoreJson={setScoreJson} />;
  }

  return (
    <div>
      {currentBattingPlayers() == 0 && (
        <div className="absolute w-full h-full flex justify-center items-center backdrop-blur">
          <BattingModal scoreJson={scoreJson} setScoreJson={setScoreJson} />
        </div>
      )}
      <ScoreBoard
        batting={scoreJson.team1}
        bowling={scoreJson.team2}
        scoreJson={scoreJson}
      />
    </div>
  );
};

export default Scorer;
