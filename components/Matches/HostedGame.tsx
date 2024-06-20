import { NEXT_AUTH } from "@/lib/auth";
import { apiConnector } from "@/services/apiConnector";
import { matchEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingComponent from "../Loaders/LoadingComponent";
import MatchHistory from "./MatchHistory";

const HostedGame = () => {
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
          matchEndPoints.MATCH_API
        )) as any;

        setMatchData(response.data.data);
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
  }, [session]);  
  console.log(matchData);
  

  if(loading){
    return <LoadingComponent/>
  }

  return (
    <div className="flex flex-col w-full items-center gap-y-20 mt-20">
        <div className="font-semibold text-charcoal text-2xl">Pending Matches</div>
        <div className="w-full">
          {
            matchData?.Game ? (<MatchHistory matchData={matchData.Game}/>) : (<div>No Current Matches</div>)
          }
        </div>
    </div>
  );
};

export default HostedGame;
