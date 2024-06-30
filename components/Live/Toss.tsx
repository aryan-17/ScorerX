import React from "react";
import { Match, Status } from "@/data/Game/type";
import { useRecoilState } from "recoil";
import { gameData } from "@/store/atoms/gameData";

const Toss = ({
  setScoreJson,
  scoreJson,
}: {
  setScoreJson: React.Dispatch<React.SetStateAction<Match | undefined>>;
  scoreJson: Match | undefined;
}) => {
  const [matchData, setMatchData] = useRecoilState(gameData);

  const setBatting = (battingTeam: string, bowlingTeam: string) => {
    const teamBatting = matchData.teams.filter((team)=> team.name === battingTeam);
    const teamBowling = matchData.teams.filter((team)=> team.name === bowlingTeam);
    const newScore: Match = {
      team1: {
        name:battingTeam,
        players:teamBatting[0].players.map((player)=> ({
          name: player.user.FirstName + " " + player.user.LastName,
          batting:{
            runs:0,
            balls:0,
            fours:0,
            sixes:0,
            status: Status.NOT_OUT
          },
          bowling:{
            runs:0,
            wickets:0,
            overs:0
          }
        })),
        totalRuns: 0,
        wickets: 0,
        overs: 0,
      },
      team2: {
        name:bowlingTeam,
        players:teamBowling.map((player)=> ({
          name: player.name,
          batting:{
            runs:0,
            balls:0,
            fours:0,
            sixes:0,
            status: Status.NOT_OUT
          },
          bowling:{
            runs:0,
            wickets:0,
            overs:0
          }
        })),
        totalRuns: 0,
        wickets: 0,
        overs: 0,
      },
      maxOvers: matchData.overs,
    };
    setScoreJson(newScore);
    localStorage.setItem("scoreJson", JSON.stringify(newScore));
  };

  console.log("Toss");

  return (
    <div>
      <div>Enter batting team.</div>
      <div className="flex gap-5">
        <button
          onClick={() => {
            setBatting(matchData.teams[0].name, matchData.teams[1].name);
          }}
        >
          {matchData.teams[0].name}
        </button>
        <button
          onClick={() => {
            setBatting(matchData.teams[1].name, matchData.teams[0].name);
          }}
        >
          {matchData.teams[1].name}
        </button>
      </div>
    </div>
  );
};

export default Toss;
