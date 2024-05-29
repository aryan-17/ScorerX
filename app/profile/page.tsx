"use client";
import { useSession } from "next-auth/react";
import "@/app/styles/neo.css";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userData } from "@/store/atoms/userData";
import { apiConnector } from "@/services/apiConnector";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { userEndPoints } from "@/services/apis";
import MainCard from "@/components/Profile/MainCard";
import SocialMedia from "@/components/Profile/SocialMedia";
import PersonalDetails from "@/components/Profile/PersonalDetails";
import Stats from "@/components/Profile/Stats";
import Graph from "@/components/Profile/Graph";
import TeamDetails from "@/components/Profile/TeamDetails";
import MatchHistory from "@/components/Profile/MatchHistory";

export default function Profile() {
  const session = useSession();
  const [data, setData] = useRecoilState(userData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      if (!session) return;
      try {
        setLoading(true);
        const response = (await apiConnector(
          "GET",
          userEndPoints.USER_DETAILS
        )) as any;

        setData(response.data.data);
        toast.success(response.data.message, {
          id: "data",
        });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.error("An error occurred:", error.response?.data.message);
        } else if (error instanceof Error) {
          console.error("An error occurred:", error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);

  if (loading || !data) return <p>Loading...</p>;

  return (
    <div className="min-h-[calc(100vh-174px)] w-11/12 mx-auto flex flex-row my-10   gap-4">
      {/* Profile */}
      <div className="flex flex-col items-center w-1/5 gap-y-4">
        <div className="flex-1 w-full neo">
          <MainCard />
        </div>
        <div className="w-full neo">
          <SocialMedia />
        </div>
        <div className="flex-1 w-full neo">
          <PersonalDetails />
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col w-4/5 items-center gap-y-4">
        {/* Match Stats */}
        <div className="w-full flex flex-row h-2/5 gap-x-4">
          <div className="w-full neo"><Stats type={"Runs"} context={data.profile?.Runs}/></div>
          <div className="w-full neo"><Stats type={"Wickets"} context={data.profile?.Wicket}/></div>
          <div className="w-full neo"><Graph/></div>
        </div>

        {/* Team / Matches */}
        <div className="w-full flex flex-row h-3/5   gap-x-4">
          <div className="w-3/5 neo"><TeamDetails/></div>
          <div className="w-2/5 neo"><MatchHistory/></div>
        </div>
      </div>
    </div>
  );
}
