import { Match, Status } from "@/data/Game/type";
import React from "react";
import Controls from "./Controls";
import { useRecoilState } from "recoil";
import { jsonData } from "@/store/atoms/scoreJson";
import LoadingComponent from "../Loaders/LoadingComponent";

const Controller = () => {

  const [scoreJson, setScoreJson] = useRecoilState(jsonData);

  const striker = scoreJson.team1.players.filter(
    (player) =>
      player.batting.status === Status.NOT_OUT && player.batting.strike === true
  )[0];
  const nonStriker = scoreJson.team1.players.filter(
    (player) =>
      player.batting.status === Status.NOT_OUT &&
      player.batting.strike === false
  )[0];

  if(!striker || !nonStriker){
    return <LoadingComponent/>
  }

  console.log(scoreJson);
  

  return (
    <div className="flex flex-col gap-y-20">
      <div className="flex w-full justify-evenly h-full">
        <div className="grid grid-rows-3 grid-cols-2 gap-x-10">
          <div></div>
          <div className="flex items-center text-pure-greys-400 text-xl">
            <div className="w-full text-center">R</div>
            <div className="w-full text-center">B</div>
            <div className="w-full text-center">4&apos;s</div>
            <div className="w-full text-center">6&apos;s</div>
          </div>
          <div>
            <div className="flex">
              <div className="flex gap-5 text-charcoal font-semibold text-xl">
                {striker.name}{" "}
                {striker.batting.strike ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2a9d8f"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-cricket"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.105 18.79l-1 .992a4.159 4.159 0 0 1 -6.038 -5.715l.157 -.166l8.282 -8.401l1.5 1.5l3.45 -3.391a2.08 2.08 0 0 1 3.057 2.815l-.116 .126l-3.391 3.45l1.5 1.5l-3.668 3.617" />
                    <path d="M10.5 7.5l6 6" />
                    <path d="M14 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  </svg>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center text-charcoal text-xl">
            <div className="w-full text-center">{striker.batting.runs}</div>
            <div className="w-full text-center">{striker.batting.balls}</div>
            <div className="w-full text-center">{striker.batting.fours}</div>
            <div className="w-full text-center">{striker.batting.sixes}</div>
          </div>
          <div>
            <div className="flex gap-5 text-charcoal font-semibold text-xl">
              {nonStriker.name}{" "}
              {nonStriker.batting.strike ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2a9d8f"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-cricket"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M11.105 18.79l-1 .992a4.159 4.159 0 0 1 -6.038 -5.715l.157 -.166l8.282 -8.401l1.5 1.5l3.45 -3.391a2.08 2.08 0 0 1 3.057 2.815l-.116 .126l-3.391 3.45l1.5 1.5l-3.668 3.617" />
                  <path d="M10.5 7.5l6 6" />
                  <path d="M14 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex items-center text-charcoal text-xl">
            <div className="w-full text-center">{nonStriker.batting.runs}</div>
            <div className="w-full text-center">{nonStriker.batting.balls}</div>
            <div className="w-full text-center">{nonStriker.batting.fours}</div>
            <div className="w-full text-center">{nonStriker.batting.sixes}</div>
          </div>
        </div>
        <div className="border-l-2 border-pure-greys-50"></div>
        <div>Bowling</div>
      </div>
      <div>
        <Controls />
      </div>
    </div>
  );
};

export default Controller;
