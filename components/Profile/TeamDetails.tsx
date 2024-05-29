import { userData } from "@/store/atoms/userData";
import React from "react";
import { useRecoilState } from "recoil";
import { FaCopyright } from "react-icons/fa";

const TeamDetails = () => {
  const [data, setData] = useRecoilState(userData);
  const players = data.profile?.team?.players;
  console.log("Players--------->",players);

  return (
    <div className="flex flex-col overflow-scroll">
      <div className="text-xl m-8 text-charcoal font-semibold">
        {data.profile?.team?.name}
      </div>
      <div className="border-b border-[1px] border-richblack-200"></div>
      <div>
        {players === undefined ? (
          <div></div>
        ) : (
          <div>
            {players?.map((ele, idx) => {
                return (
                    <div key={idx} className={`${(idx % 2 === 0) ? 'bg-pure-greys-25' : 'bg-white'} p-2 flex flex-row justify-between text-charcoal`}>
                        {/* Name */}
                        <div className="mx-8 flex items-center gap-4">
                            {idx+1}. {ele.user.FirstName} {ele.user.LastName} {(ele.captain === true)? (<FaCopyright/>) : (<div></div>)}
                        </div>

                        {/* Role */}
                        <div className="mx-8">
                            {ele.Role}
                        </div>
                    </div>
                )
            }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
