"use client";
import { userData } from "@/store/atoms/userData";
import React from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import capitalise from "@/services/utils/capitalise";
import { RiTeamFill } from "react-icons/ri";

const MainCard = () => {
  const [data, setData] = useRecoilState(userData);

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-3 text-charcoal">
      <div className="flex flex-col items-center">
        <div>
          <Image
            className="rounded-full aspect-square"
            src={data.photoUrl}
            width={80}
            height={80}
            alt="pfp"
          />
        </div>
        <div className="text-2xl font-medium ">
          {capitalise(data.FirstName)} {capitalise(data.LastName)}
        </div>
      </div>
      <div className="flex flex-col items-center font-light gap-1">
        <div className="flex gap-2">
          {data.profile?.team !== null ? (
            <RiTeamFill className="text-xl text-persiangreen" />
          ) : (
            <div></div>
          )}
          {capitalise(data.profile?.team?.name)}
        </div>
        <div>{capitalise(data.profile?.Role)}</div>
      </div>
    </div>
  );
};

export default MainCard;
