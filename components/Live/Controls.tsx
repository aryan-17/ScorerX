import { Status } from "@/data/Game/type";
import { jsonData } from "@/store/atoms/scoreJson";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const Controls = () => {
  const [scoreJson, setScoreJson] = useRecoilState(jsonData);
  const runs = [0, 1, 2, 3, 4, 5, 6];
  const extras = ["Wicket", "No Ball", "Wide"];
  const [activeRuns, setActiveRuns] = useState<number | null>(0);
  const [extra, setExtra] = useState<string | undefined>();

  const runsHandler = (runs: number) => {
    setActiveRuns(runs);
  };

  const extrasHandler = (extras: string) => {
    if (extras === extra) {
      setExtra("");
      return;
    }
    setExtra(extras);
  };

  const nextBallHandler = () => {
    const newScoreJson = cloneDeep(scoreJson);

    if (activeRuns !== null) {
      newScoreJson.team1.overs += 0.1;

      // Strike Player
      const striker = newScoreJson.team1.players.filter(
        (player) =>
          player.batting.strike === true &&
          player.batting.status === Status.NOT_OUT
      )[0];

      // Non Strike Player
      const nonStriker = newScoreJson.team1.players.filter(
        (player) =>
          player.batting.strike === false &&
          player.batting.status === Status.NOT_OUT
      )[0];

      // Team Runs
      newScoreJson.team1.totalRuns += activeRuns;

      // Player Runs
      striker.batting.runs += activeRuns;

      // Boundaries
      if (activeRuns === 4) {
        striker.batting.fours++;
      }
      if (activeRuns === 6) {
        striker.batting.sixes++;
      }

      // Strike Change
      if (activeRuns % 2 === 1) {
        striker.batting.strike = false;
        nonStriker.batting.strike = true;
      }

      if (extra) {
        if (extra === "Wide" || extra === "No Ball") {
          newScoreJson.team1.overs -= 0.1;
          newScoreJson.team1.totalRuns++;
        }
        if(extra === "Wicket"){

        }
      }
      setScoreJson(newScoreJson);
      localStorage.setItem("scoreJson", JSON.stringify(scoreJson));
      setActiveRuns(null);
      setExtra("");
    }
  };

  return (
    <div className="flex justify-evenly">
      <div className="flex gap-10">
        {runs.map((runs) => {
          return (
            <div key={runs}>
              <button
                onClick={() => runsHandler(runs)}
                className={`${
                  runs === activeRuns ? `bg-persiangreen` : `bg-black`
                } rounded-full w-10 h-10 text-white`}
              >
                {runs}
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex justify-evenly gap-x-10">
        {extras.map((extras) => {
          return (
            <div key={extras}>
              <button
                onClick={() => extrasHandler(extras)}
                className={`${
                  extra === extras ? `bg-persiangreen` : `bg-black`
                } rounded-full p-3 text-white`}
              >
                {extras}
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={nextBallHandler}
          className={` ${
          activeRuns === null ? `cursor-not-allowed` : ""
          } bg-black p-3 rounded-full text-white`}
        >
          Next Ball
        </button>
      </div>
    </div>
  );
};

export default Controls;
