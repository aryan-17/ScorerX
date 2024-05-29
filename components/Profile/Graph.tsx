import { userData } from "@/store/atoms/userData";
import React from "react";
import { useRecoilState } from "recoil";
import { PieChart } from "@mui/x-charts/PieChart";

const Graph = () => {
  const [data, setData] = useRecoilState(userData);

  const wonMatches =
    data.profile?.matchWon === undefined ? 5 : data.profile.matchWon;
  const totalMatches =
    data.profile?.Matches === undefined ? 2 : data.profile.Matches;

  return (
    <div className="flex flex-col w-full h-full items-center justify-around">
      <div className="text-2xl text-charcoal ">Win Rate</div>
      {totalMatches === 0 ? (
        <div className="text-charcoal text-2xl w-full h-full flex items-center justify-center">
          -/-
        </div>
      ) : (
        <div className="ml-20">
          <PieChart
            colors={["#2a9d8fff", "#264653"]}
            series={[
              {
                data: [
                  { id: 0, value: 2, label: "Matches Won" },
                  { id: 1, value: 5, label: "Total Played" },
                ],
              },
            ]}
            width={200}
            height={150}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
      )}
    </div>
  );
};

export default Graph;
