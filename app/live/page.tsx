"use client";

import AppointUmpire from "@/components/Live/AppointUmpire";
import LoadingComponent from "@/components/Loaders/LoadingComponent";
import { apiConnector } from "@/services/apiConnector";
import { liveEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Live() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useState<any>();

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

  if(loading){
    return (<LoadingComponent/>)
  }

  console.log(matchData);
  

  if(matchData && !matchData.umpireId){
    return (<AppointUmpire gameCode={matchData.gameCode}/>)
  }

  if(!matchData){
    return (<div>Enter a match first</div>)
  }

  return (
    <div className="min-h-[calc(100vh-174px)]">
      Live
    </div>
  );
}
