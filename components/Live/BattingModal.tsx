import React, { useState } from "react";
import "@/app/styles/neo.css";
import { Match, Player, Status, Team } from "@/data/Game/type";
import AuthButtons from "../auth/AuthButtons";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { jsonData } from "@/store/atoms/scoreJson";
import { cloneDeep } from 'lodash';

const BattingModal = () => {
  const [scoreJson, setScoreJson] = useRecoilState(jsonData);
  const [batsman1, setBatsman1] = useState<string>("");
  const [batsman2, setBatsman2] = useState<string>("");

  // Filter out the selected batsmen from the team's players list
  const players: Player[] =
    scoreJson?.team1.players.filter(
      (player) => player.name !== batsman1 && player.name !== batsman2
    ) || [];

  // Generate options array for player names
  const options: string[] = players.map((player) => player.name);

  const battingHandler = () => {
    // Check if both batsmen are selected
    if (batsman1 && batsman2) {
      // Create a deep copy of the team object to avoid mutating the state directly
      const team = cloneDeep(scoreJson?.team1);

      team?.players.forEach((player) => {
        if (player.name === batsman1 || player.name === batsman2) {
          player.batting.status = Status.NOT_OUT;
          if (player.name === batsman1) {
            player.batting.strike = true;
          }
        }
      });

      // Update scoreJson with the new team information
      setScoreJson({
        ...scoreJson,
        team1: team,
      });

      // Save updated scoreJson to localStorage
      localStorage.setItem(
        "scoreJson",
        JSON.stringify({
          ...scoreJson,
          team1: team,
        })
      );
      return;
    }

    toast.error("Select 2 Batsmen", {
      id: "2",
    });
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
