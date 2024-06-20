import { apiConnector } from "@/services/apiConnector";
import { matchEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EnterMatch = () => {
  const [gameCode, setGameCode] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameCode(value === "" ? 0 : parseFloat(value));
  };

  const createGameHandler = async () => {
    try {
      setLoading(true);
      const response = (await apiConnector("PATCH", matchEndPoints.MATCH_API, {
        gameCode,
      })) as any;
      toast.success(response.data.message, {
        id: "data",
      });
      router.push("/live");
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
      <label htmlFor="gameCode" className="text-charcoal font-semibold text-lg">
        Game Code:
        <input
          type="text"
          id="gameCode"
          onChange={changeHandler}
          className="ml-4 p-1 font-light focus:outline-1 focus: outline-persiangreen border-[1px] border-pure-greys-100 rounded-lg"
        />
      </label>

      {loading ? (
        <div>
          <button className="bg-persiangreen disabled w-40 ml-10 text-black p-1 rounded-lg">
            Loading...
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={createGameHandler}
            className="bg-persiangreen w-40 ml-10 text-black p-1 rounded-lg"
          >
            Enter Match
          </button>
        </div>
      )}
    </div>
  );
};

export default EnterMatch;
