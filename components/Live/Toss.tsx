import React from "react";
import { Match, Status, Team } from "@/data/Game/type";
import { useRecoilState } from "recoil";
import { gameData } from "@/store/atoms/gameData";
import trophy from "@/assests/Live/trophy.png";
import Image from "next/image";
import "@/app/styles/neo.css";

const Toss = ({
  setScoreJson,
}: {
  setScoreJson: React.Dispatch<React.SetStateAction<Match | undefined>>;
}) => {
  const [matchData, setMatchData] = useRecoilState(gameData);

  const setBatting = (battingTeam: string, bowlingTeam: string) => {
    const teamBatting = matchData.teams.filter(
      (team) => team.name === battingTeam
    );
    const teamBowling = matchData.teams.filter(
      (team) => team.name === bowlingTeam
    );
    const newScore: Match = {
      team1: {
        name: battingTeam,
        players: teamBatting[0].players.map((player) => ({
          name: player.user.FirstName + " " + player.user.LastName,
          batting: {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            status: Status.YET_TO_BAT,
          },
          bowling: {
            runs: 0,
            wickets: 0,
            overs: 0,
          },
        })),
        totalRuns: 0,
        wickets: 0,
        overs: 0,
      },
      team2: {
        name: bowlingTeam,
        players: teamBowling.map((player) => ({
          name: player.name,
          batting: {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            status: Status.NOT_OUT,
          },
          bowling: {
            runs: 0,
            wickets: 0,
            overs: 0,
          },
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
    <div className="flex flex-col gap-20 justify-between my-10">
      <div className="w-full flex items-center justify-center">
        <Image alt="trophy" src={trophy} width={150} height={150} />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-10">
        <div className="text-2xl font-semibold text-charcoal">Enter batting team.</div>
        <div className="flex gap-5 flex-col text-charcoal text-xl">
          <button
            className="neo w-20 h-10"
            onClick={() => {
              setBatting(matchData.teams[0].name, matchData.teams[1].name);
            }}
          >
            {matchData.teams[0].name}
          </button>
          <button
            className="neo w-20 h-10 "
            onClick={() => {
              setBatting(matchData.teams[1].name, matchData.teams[0].name);
            }}
          >
            {matchData.teams[1].name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toss;
