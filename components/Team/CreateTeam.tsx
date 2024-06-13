import React, { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import { MdOutlineGroupOff } from "react-icons/md";
import AuthButtons from "../auth/AuthButtons";
import DisabledButton from "../auth/DisabledButton";
import { apiConnector } from "@/services/apiConnector";
import { teamEndPoints } from "@/services/apis";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

const CreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const [teamName, setteamName] = useState("");

  const addTeam = async (teamName: string) => {
    try {
      setLoading(true);
      console.log(teamName);

      const res = (await apiConnector("POST", teamEndPoints.TEAM_DETAILS, {
        teamName,
      })) as any;
      console.log(res);
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
      window.location.reload();
    }
  };

  const teamHandler = async (teamName: string) => {
    await addTeam(teamName);
  };

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setteamName(event.target.value);
  }

  return (
    <div className="flex flex-col text-charcoal min-h-full gap-20">
      <div className="flex flex-col h-20 justify-center grad border-b-2 border-pure-greys-100">
        <div className="text-2xl font-semibold ml-10">Create Team </div>
        <div className="ml-10">Create your team and add new members.</div>
      </div>

      <div className="flex flex-col items-center justify-center h-full gap-8">
        <MdOutlineGroupOff className="text-6xl text-charcoal" />
        <div className="text-2xl text-charcoal font-semibold">
          No Team Found
        </div>
        <div className="flex flex-col gap-5">
          <input
            onChange={changeHandler}
            type="text"
            className="bg-richblack-5 border-[1px] border-pure-greys-25 text-charcoal hover: outline-1 p-2 hover: outline-persiangreen h-8"
            placeholder="Your Team Name"
          />
          <div onClick={() => teamHandler(teamName)}>
            {loading ? <DisabledButton /> : <AuthButtons text="Create Team" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
