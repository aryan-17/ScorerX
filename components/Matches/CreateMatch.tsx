import { apiConnector } from "@/services/apiConnector";
import { matchEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateMatch = () => {
  const [overs, setOvers] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOvers(value === "" ? 0 : parseFloat(value));
  };

  const createGameHandler = async () => {
    try {
      setLoading(true);
      const response = (await apiConnector("POST", matchEndPoints.MATCH_API, {
        overs,
      })) as any;
      toast.success(response.data.message, {
        id: "data",
      });
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

  return (
    <div className="mt-20 flex flex-col gap-y-5 ">
      <label htmlFor="over" className="text-charcoal font-semibold text-lg">
        Overs:
        <input
          type="text"
          id="over"
          onChange={changeHandler}
          className="ml-4 p-1 font-light focus:outline-1 focus: outline-persiangreen border-[1px] border-pure-greys-100 rounded-lg"
        />
      </label>

      {loading ? (
        <div>
          <button
            className="bg-persiangreen disabled w-40 ml-10 text-black p-1 rounded-lg"
          >
           Loading... 
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={createGameHandler}
            className="bg-persiangreen w-40 ml-10 text-black p-1 rounded-lg"
          >
            Create Match
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMatch;
