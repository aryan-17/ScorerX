"use client";
import { team } from "@/store/atoms/team";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { FaCopyright } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { apiConnector } from "@/services/apiConnector";
import { playerEndPoints, teamEndPoints } from "@/services/apis";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

const MyTeam = () => {
  const session = useSession();
  const [teamData, setTeamData] = useRecoilState(team);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const fetchTeam = async () => {
    if (!session) {
      return;
    }

    try {
      setLoading(true);
      const response = (await apiConnector(
        "GET",
        teamEndPoints.TEAM_DETAILS
      )) as any;

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

  const addPlayerApi = async (firstName: string, lastName: string) => {
    try {
      setLoading(true);
      console.log(firstName, lastName);

      const res = (await apiConnector("POST", playerEndPoints.PLAYER_API, {
        firstName,
        lastName,
      })) as any;
      console.log(res);
      await fetchTeam();
      toast.success(res.data.message);
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

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  return (
    <div className="flex flex-col text-charcoal min-h-full">
      <div className="flex flex-col h-20 justify-center grad ml-10">
        <div className="text-2xl font-semibold">{teamData.name}</div>
        <div>Analyse and make strategy according to your team players.</div>
      </div>
      <div className="border-b-2 border-pure-greys-100"></div>

      <div className="text-charcoal font-semibold text-xl mt-10 mx-10">
        Members
      </div>

      <div className="flex bg-pure-greys-25 mx-10 rounded-lg mt-10 py-2 gap-10 text-center px-3 items-center text-charcoal font-semibold">
        <div className="w-full">Name</div>
        <div className="w-full">Role</div>
        <div className="w-full">Career Runs</div>
        <div className="w-full">Career Wickets</div>
      </div>

      <div className="mx-10">
        {teamData && teamData.players && teamData.players.length > 0 ? (
          teamData.players.map((ele, idx) => (
            <div
              key={ele.id}
              className="flex items-center gap-10 text-center p-2 text-charcoal border-b-2 border-pure-greys-25 "
            >
              <div className="w-full flex items-center justify-around">
                {ele.user.FirstName} {ele.user.LastName}{" "}
                {ele.captain === true ? (
                  <div>
                    <FaCopyright />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="w-full">{ele.Role}</div>
              <div className="w-full">{ele.Runs}</div>
              <div className="w-full">{ele.Wicket}</div>
            </div>
          ))
        ) : (
          <div>No players available</div>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
