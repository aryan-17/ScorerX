import React from "react";
import { Match } from "@/data/Game/type";
import { useRecoilState } from "recoil";
import { gameData } from "@/store/atoms/gameData";

const Toss = ({
  setScoreJson,
  scoreJson,
}: {
  setScoreJson: React.Dispatch<React.SetStateAction<Match>>;
  scoreJson: Match;
}) => {
  const [matchData, setMatchData] = useRecoilState(gameData);

  const setBatting = (battingTeam: string, bowlingTeam: string) => {
    if (scoreJson) {
      const newScore = {
        ...scoreJson,
        team1: { ...scoreJson.team1, name: battingTeam },
        team2: { ...scoreJson.team2, name: bowlingTeam },
      };
      setScoreJson(newScore);
      localStorage.setItem("scoreJson",JSON.stringify(newScore));
    }
  };  

  return (
    <div>
      <div>Enter batting team.</div>
      <div className="flex gap-5">
        <button
          onClick={() =>
            setBatting(matchData.teams[0].name, matchData.teams[1].name)
          }
        >
          {matchData.teams[0].name}
        </button>
        <button
          onClick={() =>
            setBatting(matchData.teams[1].name, matchData.teams[0].name)
          }
        >
          {matchData.teams[1].name}
        </button>
      </div>
    </div>
  );
};

export default Toss;
