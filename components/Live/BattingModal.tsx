import React, { useState } from "react";
import "@/app/styles/neo.css";
import { Match, Player, Status, Team } from "@/data/Game/type";
import AuthButtons from "../auth/AuthButtons";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import toast from "react-hot-toast";

const BattingModal = ({
  scoreJson,
  setScoreJson,
}: {
  scoreJson: Match;
  setScoreJson: React.Dispatch<React.SetStateAction<Match | undefined>>;
}) => {
  const [batsman1, setBatsman1] = useState<string>("");
  const [batsman2, setBatsman2] = useState<string>("");

  const players: Player[] =
    scoreJson?.team1.players.filter(
      (player) => player.name !== batsman1 && player.name !== batsman2
    ) || [];

  const options: string[] = [];

  for (let i = 0; i < players.length; i++) {
    options.push(players[i].name);
  }

  const battingHandler = () => {
    if (batsman1 && batsman2) {
      const team = scoreJson?.team1;

      team?.players.map((player) => {
        if (player.name === batsman1 || player.name === batsman2) {
          player.batting.status = Status.NOT_OUT;
        }
      });

      const newTeam = team;
      scoreJson.team1 = newTeam;
      setScoreJson(scoreJson);
      return;
    }
    toast.error("Select 2 Batsmen",{
      id:"2"
    });
    return;
  };

  return (
    <div className="neo w-96 h-96 flex flex-col gap-10">
      <div className="text-xl text-charcoal font-semibold mt-10 ml-3">
        Select Batting Line-Up
      </div>
      <div className="flex flex-col text-lg text-charcoal gap-10 ml-3">
        <div className="flex items-center gap-7">
          <div>Batsman 1:</div>
          <div>
            <Dropdown
              options={options}
              onChange={(e) => setBatsman1(e.value)}
              placeholder={"Select Striker"}
            />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div>Batsman 2:</div>
          <div>
            <Dropdown
              options={options}
              onChange={(e) => setBatsman2(e.value)}
              placeholder={"Select Striker"}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto" onClick={battingHandler}>
        <AuthButtons text="Done" />
      </div>
    </div>
  );
};

export default BattingModal;
