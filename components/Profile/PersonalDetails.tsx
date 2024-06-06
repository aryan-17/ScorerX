import { userData } from "@/store/atoms/userData";
import React from "react";
import { MdEmail } from "react-icons/md";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import { useRecoilState } from "recoil";
import { FaBirthdayCake } from "react-icons/fa";
import capitalise from "@/services/utils/capitalise";
import { useRouter } from "next/navigation";
import { modal } from "@/store/atoms/modal";

const PersonalDetails = () => {
  const [data, setData] = useRecoilState(userData);
  const [visible, setVisible] = useRecoilState(modal);
  const router = useRouter();
  const date = new Date(data.DOB);
  const options = {
    day: "2-digit" as "2-digit",
    month: "long" as "long",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  function handleClick(): void {
    setVisible(true);
  }

  return (
    <div className="flex flex-col gap-y-10 justify-evenly h-full">
      <div className="flex flex-col items-center mt-2">
        <div className="flex flex-row items-center text-charcoal">
          <MdEmail className="text-2xl text-persiangreen" />: {data.email}
        </div>
        <div className="text-charcoal">
          {data.Gender === "MALE" ? (
            <div className=" flex flex-row">
              <CgGenderMale className="!text-2xl text-persiangreen" />:{" "}
              {capitalise(data.Gender)}
            </div>
          ) : (
            <CgGenderFemale />
          )}
        </div>
        <div className="flex text-charcoal">
          <FaBirthdayCake className="text-2xl text-persiangreen" />:{" "}
          {formattedDate}
        </div>
      </div>
      <div className="w-full flex justify-center" onClick={handleClick}>
        <button className="rounded-xl bg-[#254450] text-white p-[5px]">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
