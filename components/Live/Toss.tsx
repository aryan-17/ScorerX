import React from "react";
import { Match } from "@/data/Game/type";
import { useRecoilState } from "recoil";
import { gameData } from "@/store/atoms/gameData";
import { LineUp } from "./Scorer";
const Toss = ({
  setScoreJson,
  scoreJson,
  setTeam1LineUp,
  setTeam2LineUp,
}: {
  setScoreJson: React.Dispatch<React.SetStateAction<Match>>;
  scoreJson: Match;
  setTeam1LineUp: React.Dispatch<React.SetStateAction<LineUp>>;
  setTeam2LineUp: React.Dispatch<React.SetStateAction<LineUp>>;
}) => {
  const [matchData, setMatchData] = useRecoilState(gameData);

  const setBatting = (battingTeam: string, bowlingTeam: string) => {
    if (scoreJson) {
      const newScore = {
        team1: {
          ...scoreJson.team1,
          name: battingTeam,
          batsman: [],
          bowler: [],
          fallOfWickets: [],
          extras: { wide: 0, noBall: 0, legBy: 0 },
          totalRuns: 0,
          wickets: 0,
          overs: 0,
        },
        team2: {
          ...scoreJson.team2,
          name: bowlingTeam,
          batsman: [],
          bowler: [],
          fallOfWickets: [],
          extras: { wide: 0, noBall: 0, legBy: 0 },
          totalRuns: 0,
          wickets: 0,
          overs: 0,
        },
        maxOvers: matchData.overs,
        scoreCard: null,
      };
      setScoreJson(newScore);
      localStorage.setItem("scoreJson", JSON.stringify(newScore));
    }
    else{
      const newScore = {
        team1: {
          name: battingTeam,
          batsman: [],
          bowler: [],
          fallOfWickets: [],
          extras: { wide: 0, noBall: 0, legBy: 0 },
          totalRuns: 0,
          wickets: 0,
          overs: 0,
        },
        team2: {
          name: bowlingTeam,
          batsman: [],
          bowler: [],
          fallOfWickets: [],
          extras: { wide: 0, noBall: 0, legBy: 0 },
          totalRuns: 0,
          wickets: 0,
          overs: 0,
        },
        maxOvers: matchData.overs,
        scoreCard: null,
      };
      setScoreJson(newScore);
      localStorage.setItem("scoreJson", JSON.stringify(newScore));
    }
  };

  return (
    <div>
      <div>Enter batting team.</div>
      <div className="flex gap-5">
        <button
          onClick={() => {                   
            setBatting(matchData.teams[0].name, matchData.teams[1].name);
            matchData.teams[0].players.forEach((player) => {
              console.log(player.userId);
              setTeam1LineUp((prev) => ({
                ...prev,
                batting: [
                  ...(prev.batting || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
                bowling: [
                  ...(prev.bowling || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
              }));
            });
            matchData.teams[1].players.forEach((player) => {
              setTeam2LineUp((prev) => ({
                ...prev,
                batting: [
                  ...(prev.batting || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
                bowling: [
                  ...(prev.bowling || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
              }));
            });
          }}
        >
          {matchData.teams[0].name}
        </button>
        <button
          onClick={() => {
            setBatting(matchData.teams[1].name, matchData.teams[0].name);
            matchData.teams[1].players.forEach((player) => {
              console.log(player.userId);
              setTeam1LineUp((prev) => ({
                ...prev,
                batting: [
                  ...(prev.batting || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
                bowling: [
                  ...(prev.bowling || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
              }));
            });
            matchData.teams[0].players.forEach((player) => {
              setTeam2LineUp((prev) => ({
                ...prev,
                batting: [
                  ...(prev.batting || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
                bowling: [
                  ...(prev.bowling || []),
                  player.user.FirstName + " " + player.user.LastName,
                ],
              }));
            });
          }}
        >
          {matchData.teams[1].name}
        </button>
      </div>
    </div>
  );
};

export default Toss;
