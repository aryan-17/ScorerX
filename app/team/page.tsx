"use client";
import { apiConnector } from "@/services/apiConnector";
import { teamEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "@/app/styles/neo.css";
import "@/app/styles/grad.css";
import MyTeam from "@/components/Team/MyTeam";
import CreateTeam from "@/components/Team/CreateTeam";
import { useRecoilState } from "recoil";
import { team } from "@/store/atoms/team";
import DisplayTeam from "@/components/Team/DisplayTeam";

export default function Team() {
  const [teamData, setTeamData] = useRecoilState(team);
  const [loading, setLoading] = useState(false);
  const [checkOwner, setCheckOwner] = useState(false);
  const session = useSession();

  useEffect(() => {
    const fetchTeam = async () => {
      if (!session) {
        return;
      }

      try {
        setLoading(true);
        const response = await apiConnector("GET", teamEndPoints.TEAM_DETAILS) as any;

        setTeamData(response.data.data);
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
  }, [session, setTeamData]);

  useEffect(() => {
    if (session && teamData && session.data) {
      setCheckOwner(session.data.id === teamData.ownerId);
    }
  }, [session, teamData]);

  if (loading || !teamData) return <p>Loading...</p>;

  return (
    <div className="min-h-[calc(100vh-174px)] my-10 mx-20  border-[2px] border-pure-greys-100 flex flex-col neo bg-white">
      {!team ? <CreateTeam /> : checkOwner ? <MyTeam /> : <DisplayTeam />}
    </div>
  );
}
