import { Status } from "@/data/Game/type";
import { jsonData } from "@/store/atoms/scoreJson";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

const Controls = () => {
  const [scoreJson, setScoreJson] = useRecoilState(jsonData);
  const runs = [0, 1, 2, 3, 4, 5, 6];
  const extrasArray = ["Wicket", "No Ball", "Wide"];
  const [activeRuns, setActiveRuns] = useState<number | null>(0);
  const [extra, setExtra] = useState<string>("");
  const [isNewBatsman, setIsNewBatsman] = useState(false);
  const [wicketModal, setWicketModal] = useState(false);
  const [batsman, setBatsman] = useState("Wicket");

  const striker = scoreJson.team1.players.filter(
    (player) =>
      player.batting.strike === true && player.batting.status === Status.NOT_OUT
  )[0];

  const nonStriker = scoreJson.team1.players.filter(
    (player) =>
      player.batting.strike === false &&
      player.batting.status === Status.NOT_OUT
  )[0];

  const bowler = scoreJson.team2.players.filter(
    (player) => player.bowling.status === true
  )[0];

  const runsHandler = (runs: number) => {
    setActiveRuns(runs);
  };

  const setWicketHandler = (name: string) => {
    {
      batsman === name ? setBatsman("Wicket") : setBatsman(name);
    }
    setWicketModal(false);
    setExtra(name);
  };

  const extrasHandler = (extras: string) => {
    if (extras === "Wicket") return;
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
      const localStriker = newScoreJson.team1.players.filter(
        (player) =>
          player.batting.strike === true &&
          player.batting.status === Status.NOT_OUT
      )[0];

      const localBowler = newScoreJson.team2.players.filter(
        (player) => player.bowling.status === true
      )[0];

      // Non Strike Player
      const localNonStriker = newScoreJson.team1.players.filter(
        (player) =>
          player.batting.strike === false &&
          player.batting.status === Status.NOT_OUT
      )[0];

      // Team Runs
      newScoreJson.team1.totalRuns += activeRuns;

      // Bowler Overs 
      localBowler.bowling.overs += 0.1;

      // Bowler Runs
      localBowler.bowling.runs += activeRuns;

      // Player Runs
      localStriker.batting.runs += activeRuns;

      // Boundaries
      if (activeRuns === 4) {
        localStriker.batting.fours++;
      }
      if (activeRuns === 6) {
        localStriker.batting.sixes++;
      }

      // Strike Change
      if (activeRuns % 2 === 1) {
        localStriker.batting.strike = false;
        localNonStriker.batting.strike = true;
      }

      if (extra) {
        if (extra === "Wide" || extra === "No Ball") {
          newScoreJson.team1.overs -= 0.1;
          localBowler.bowling.overs -= 0.1;

          newScoreJson.team1.totalRuns += activeRuns+1;
          localBowler.bowling.runs += activeRuns+1;
        }
        if (extra === striker.name || extra === nonStriker.name) {
          setBatsman("Wicket");
          localBowler.bowling.wickets++;
          newScoreJson.team1.totalRuns++;
          localStriker.batting.runs += activeRuns;
          localBowler.bowling.runs += activeRuns;
          if (extra === striker.name) {
            localStriker.batting.strike = false;
            localStriker.batting.status = Status.OUT;
          }
          if (extra === nonStriker.name) {
            localNonStriker.batting.strike = false;
            localNonStriker.batting.status = Status.OUT;
          }
        }
      }
      setScoreJson(newScoreJson);
      localStorage.setItem("scoreJson", JSON.stringify(newScoreJson));
      setActiveRuns(null);
      setExtra("");
    }
  };

  return (
    <div className="flex justify-evenly items-center">
      <div className="flex gap-10 text-lg">
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
      <div className="flex justify-evenly gap-x-10 items-center">
        {extrasArray.map((extras) => {
          return (
            <div key={extras} className="text-lg">
              <button
                onClick={() => {
                  extrasHandler(extras);
                }}
                className={`${
                  (extra === extras && extra !== "Wicket") ||
                  (extras === "Wicket" && batsman !== "Wicket" && !wicketModal)
                    ? `bg-persiangreen`
                    : `bg-black`
                } flex text-center p-3 text-white w-40 relative ${
                  extras === "Wicket"
                    ? ` ${!wicketModal ? `rounded-full` : `rounded-xl`} `
                    : `rounded-full`
                }`}
              >
                {extras === "Wicket" ? (
                  <div className={`w-full flex flex-col`}>
                    <div
                      className="w-full text-white flex items-center justify-center gap-3"
                      onClick={() => setWicketModal((prev) => !prev)}
                    >
                      <div>{batsman}</div>
                      {!wicketModal ? (
                        <div>
                          <MdOutlineArrowDropDown />
                        </div>
                      ) : (
                        <div>
                          <MdOutlineArrowDropUp />
                        </div>
                      )}
                    </div>
                    {wicketModal && (
                      <div className="absolute top-10 right-[0.9px] p-3 z-50 bg-black w-full rounded-bl-lg rounded-br-lg flex flex-col gap-3">
                        <div onClick={() => setWicketHandler(striker.name)}>
                          {striker.name}
                        </div>
                        <div onClick={() => setWicketHandler(nonStriker.name)}>
                          {nonStriker.name}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full justify-center">{extras}</div>
                )}
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
          } bg-black p-3 rounded-full text-white text-lg`}
        >
          Next Ball
        </button>
      </div>
    </div>
  );
};

export default Controls;
