import { apiConnector } from "@/services/apiConnector";
import { liveEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const AppointUmpire = ({gameCode}:{gameCode:number}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  const addUmpireApi = async (firstName: string, lastName: string) => {
    try {
      setLoading(true);
      console.log(firstName, lastName);

      const res = (await apiConnector("PATCH", liveEndPoints.LIVE_API, {
        firstName,
        lastName,
        gameCode
      })) as any;
      console.log(res);
      toast.success(res.data.message);
      window.location.reload();
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
      await addUmpireApi(firstName, lastName);
      return;
    }

    let firstName = fullName.substring(0, spaceIndex);
    let lastName = fullName.substring(spaceIndex + 1);
    await addUmpireApi(firstName, lastName);
    return;
  }

  return (
    <div className="min-h-[calc(100vh-174px)] w-1/2 my-10 mx-auto border-[1px] border-pure-greys-100 flex neo bg-white flex-col text-charcoal">
      <div className="flex flex-col">
        <div className="font-semibold text-2xl">Appoint an Umpire</div>
        <div className="border-b-[1px] border-pure-greys-100 w-full"></div>
      </div>
      <div className="h-full">
        <input
          type="text"
          onChange={changeHandler}
          className="rounded-lg border-[1px] border-pure-greys-25 text-charcoal hover: outline-1 p-2 hover: outline-persiangreen h-8 w-1/2"
          placeholder="Full name of player"
        />
        {loading ? (
          <button className="text-black bg-persiangreen  px-4 rounded-lg font-semibold">
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
    </div>
  );
};

export default AppointUmpire;
