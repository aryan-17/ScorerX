import { jsonData } from "@/store/atoms/scoreJson";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const Controls = () => {
  const [scoreJson, setScoreJson] = useRecoilState(jsonData);
  const runs = [0, 1, 2, 3, 4, 5, 6];
  const extras = ["Wicket", "No Ball", "Wide"];
  const [activeRuns, setActiveRuns] = useState<number | undefined>();
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
    // const newScoreJson = cloneDeep(scoreJson);

    // newScoreJson.team1.overs += 0.1;
    // setScoreJson(newScoreJson);
    // localStorage.setItem("scoreJson", JSON.stringify(newScoreJson));

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
          className={` ${!activeRuns ? (`cursor-not-allowed`) : ('')} bg-black p-3 rounded-full text-white`}
        >
          Next Ball
        </button>
      </div>
    </div>
  );
};

export default Controls;
