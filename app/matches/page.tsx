"use client";
import CreateMatch from "@/components/Matches/CreateMatch";
import EnterMatch from "@/components/Matches/EnterMatch";
import HostedGame from "@/components/Matches/HostedGame";
import tabData from "@/data/misc/tabData.json";
import { useState } from "react";

export default function Matches() {
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState("Create Game");

  return (
    <div className="min-h-[calc(100vh-174px)] my-10 mx-20  border-[1px] border-pure-greys-100 flex neo bg-white justify-around">
      <div className="w-1/2">
        <div className="w-3/4 m-10 flex justify-around bg-[#2a6b63] rounded-full p-1">
          {tabData.map((tab, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setField(tab)}
                className={`${
                  field === tab
                    ? "bg-persiangreen text-black"
                    : "bg-transparent text-black"
                } py-2 px-5 rounded-full transition-all duration-200 font-semibold`}
              >
                <button>{tab}</button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center border-t-2 border-pure-greys-200">
          {field === "Create Game" ? <CreateMatch /> : <EnterMatch />}
        </div>
      </div>
      <div className="w-1/2 flex border-l-[1px] border-pure-greys-100"><HostedGame/></div>
    </div>
  );
}
