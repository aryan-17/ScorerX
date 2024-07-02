"use client";

import AppointUmpire from "@/components/Live/AppointUmpire";
import LiveMatch from "@/components/Live/LiveMatch";
import Scorer from "@/components/Live/Scorer";
import LoadingComponent from "@/components/Loaders/LoadingComponent";
import { apiConnector } from "@/services/apiConnector";
import { liveEndPoints, userEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { gameData } from "@/store/atoms/gameData";

export default function Live() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useRecoilState(gameData);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchTeam = async () => {
      if (!session) {
        return;
      }

      try {
        setLoading(true);
        const response = (await apiConnector(
          "GET",
          liveEndPoints.LIVE_API
        )) as any;
        const userResponse = (await apiConnector(
          "GET",
          userEndPoints.USER_DETAILS
        )) as any;

        setUserData(userResponse.data.data);
        setMatchData(response.data.data?.Game);
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
    fetchTeam();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  const checkUmpire = () => {
    if(userData && matchData){
      return userData.profile.id === matchData.umpireId;
    }
    return <LoadingComponent />;
  };

  if (matchData && !matchData.umpireId) {
    return <AppointUmpire gameCode={matchData.gameCode} />;
  }

  if (!matchData) {
    return <div>Enter a match first</div>;
  }

  return (
    <div className="min-h-[calc(100vh-174px)] relative">
      {!checkUmpire() ? (
        <LiveMatch gameCode={matchData.gameCode} />
      ) : (
        <Scorer gameCode={matchData.gameCode} />
      )}
    </div>
  );
}
