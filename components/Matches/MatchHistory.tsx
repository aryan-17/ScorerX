import { apiConnector } from "@/services/apiConnector";
import { matchEndPoints, playerEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

interface Team {
  name: string;
}

interface Game {
  started: boolean;
  gameCode: number;
  id: number;
  overs: number;
  teams: Team[];
  scoreCard: JSON | null;
}
const MatchHistory = ({
  matchData,
}: {
  matchData: Game;
}) => {
  const [loading, setLoading] = useState(false);

  async function deleteHandler(gameId: number): Promise<void> {
    try {
      setLoading(true);

      const res = (await apiConnector("DELETE", matchEndPoints.MATCH_API, {
        gameId,
      })) as any;
      console.log(res);
      window.location.reload();
      toast.success(res.data.message);
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

  return (
    <div className="flex flex-col">
      <div className="flex bg-pure-greys-25 rounded-lg py-2 gap-10 text-center px-3 items-center text-charcoal font-semibold mx-10">
        <div className="w-full">Game Code</div>
        <div className="w-full">Overs</div>
        <div className="w-full">Actions</div>
      </div>

      <div className="flex gap-10 text-center items-center mx-10 justify-center mt-10 text-charcoal">
        <div className="w-full">{matchData.gameCode}</div>
        <div className="w-full">{matchData.overs}</div>
        <div
          onClick={() => deleteHandler(matchData.id)}
          className="w-full text-2xl text-pink-300 cursor-pointer flex justify-center"
        >
          <MdDeleteForever />
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
