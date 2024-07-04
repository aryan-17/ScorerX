import { Match, Team } from "@/data/Game/type";
import React from "react";
import "@/app/styles/neo.css"

const ScoreBoard = ({
  batting,
  bowling,
  scoreJson,
}: {
  batting: Team;
  bowling: Team;
  scoreJson: Match;
}) => {
  return <div>
     <div className="flex flex-col gap-y-20">
      <div className="flex mx-20 mt-10 items-center text-charcoal font-semibold text-2xl">
        <div>
          {scoreJson.team1.name} Vs {scoreJson.team2.name}
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-full justify-center w-80 h-40 gap-y-2 mx-auto">
        <div className="ml-10 text-2xl text-persiangreen">{batting.name}</div>
        <div className="flex gap-x-3 ml-10">
          <div className="text-charcoal text-5xl">
            {batting.totalRuns}-{batting.wickets}
          </div>
          <div className="mt-2 text-charcoal text-lg">({(batting.overs).toFixed(1)} ov)</div>
        </div>
        <div className="ml-10 text-xl text-charcoal">
          <span>Run Rate:</span>{" "}
          <span>{(batting.totalRuns / batting.overs).toFixed(1)}</span>
        </div>
      </div>
    </div>
  </div>;
};

export default ScoreBoard;
