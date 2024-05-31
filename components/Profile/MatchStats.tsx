import { userData } from "@/store/atoms/userData";
import React from "react";
import { useRecoilState } from "recoil";
import { FaCopyright } from "react-icons/fa";

const TeamDetails = () => {
  const [data, setData] = useRecoilState(userData);

  const stats = [
    {
      id:"Strike Rate",
      data: data.profile?.strikeRate,
    },
    {
      id: "Average Runs",
      data: data.profile?.averageRuns
    },
    {
      id: "Highest Runs",
      data: data.profile?.highestRuns
    },
    {
      id: "Average Economy",
      data: data.profile?.averageEconomy
    },
    {
      id: "Highest Wickets",
      data: data.profile?.highestWickets
    },
    {
      id: "Man of the Match",
      data: data.profile?.manOfTheMatch
    }
  ]

  return (
    <div className="w-full h-full grid grid-cols-3 items-center justify-center text-charcoal">
      {
        stats.map((ele, idx)=>{
          return (
            <div key={idx} className="h-full flex flex-col items-center justify-around">
              <div className="text-lg font-semibold">
                {ele.id}
              </div>
              <div>
                {ele.data}
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default TeamDetails;
