import { Match, Team } from "@/data/Game/type";
import React from "react";

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
     <div className="flex flex-col">
      <div className="flex mx-20 mt-10 justify-between text-charcoal font-semibold text-2xl">
        <div>
          {scoreJson.team1.name} Vs {scoreJson.team2.name}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>{batting.name}</div>
        <div className="flex gap-x-10">
          <div>
            {batting.totalRuns}/{batting.wickets}
          </div>
          <div>{batting.overs}</div>
        </div>
        <div>
          <span>Run Rate:</span>{" "}
          <span>{batting.totalRuns / batting.wickets}</span>
        </div>
      </div>
    </div>
  </div>;
};

export default ScoreBoard;
