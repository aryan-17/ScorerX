import { userData } from "@/store/atoms/userData";
import React from "react";
import { useRecoilState } from "recoil";

type StatsProps = {
  context: number | undefined;
  type: string;
};

const Stats: React.FC<StatsProps> = ({ context, type }) => {
  const [data, setData] = useRecoilState(userData);
  return (
    <div className="w-full h-full flex flex-col items-center justify-around text-charcoal text-2xl">
      <div>{type}</div>
      <div className="  text-charcoal w-full h-full flex items-center justify-center gap-4">
        <div className=" !text-5xl ">
          {context !== undefined ? context : "-"}
        </div>
        <div className="text-lg">in</div>
        <div>{data.profile?.Matches}</div>
      </div>
    </div>
  );
};

export default Stats;
