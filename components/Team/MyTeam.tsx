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

  async function addHandler(fullName: string): Promise<void> {
    let spaceIndex = fullName.indexOf(" ");
    if (spaceIndex === -1) {
      let firstName = fullName;
      let lastName = "";
      await addPlayerApi(firstName, lastName);
      return;
    }

    let firstName = fullName.substring(0, spaceIndex);
    let lastName = fullName.substring(spaceIndex + 1);
    await addPlayerApi(firstName, lastName);
    return;
  }

  async function deleteHandler(playerId: number): Promise<void> {
    try {
      setLoading(true);
      console.log(playerId);

      const res = (await apiConnector("DELETE", playerEndPoints.PLAYER_API, {playerId})) as any;
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
  }

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  return (
    <div className="flex flex-col text-charcoal min-h-full">
      <div className="flex flex-col h-20 justify-center grad ml-10">
        <div className="text-2xl font-semibold">Manage Members </div>
        <div>Manage you team members or add new members to your team.</div>
      </div>
      <div className="border-b-2 border-pure-greys-100"></div>

      <div className="text-charcoal font-semibold text-xl mt-5 mx-10">
        {teamData.name}
      </div>
      <div className="mx-10 mt-3 flex gap-5">
        <input
          type="text"
          onChange={changeHandler}
          className="rounded-lg border-[1px] border-pure-greys-25 text-charcoal hover: outline-1 p-2 hover: outline-persiangreen h-8 w-1/2"
          placeholder="Full name of player"
        />
        {loading ? (
          <button
          className="text-black bg-persiangreen  px-4 rounded-lg font-semibold"
        >
          Please Wait...
        </button>
        ) : (
          <button
            onClick={() => addHandler(name)}
            className="text-black bg-persiangreen  px-4 rounded-lg font-semibold"
          >
            Add Player
          </button>
        )}
      </div>

      <div className="flex bg-pure-greys-25 mx-10 rounded-lg mt-10 py-2 gap-10 text-center px-3 items-center text-charcoal font-semibold">
        <div className="w-full">Name</div>
        <div className="w-full">Role</div>
        <div className="w-full">Career Runs</div>
        <div className="w-full">Career Wickets</div>
        <div className="w-full">Action</div>
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
              <div
                className="w-full flex justify-center text-2xl text-pink-300 cursor-pointer"
                onClick={() => deleteHandler(ele.id)}
              >
                <MdDeleteForever />
              </div>
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
