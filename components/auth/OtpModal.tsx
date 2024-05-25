import { isAxiosError } from "axios";
import React from "react";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import AuthButtons from "./AuthButtons";
import DisabledButton from "./DisabledButton";
import { apiConnector } from "@/services/apiConnector";
import { authEndPoints } from "@/services/apis";
import { useRecoilState } from "recoil";
import { active } from "@/store/atoms/active";
import { signUpEmail } from "@/store/atoms/auth";

const OtpModal = () => {
  const [loading, setLoading] = useState(false);
  const [activeState, setActiveState] = useRecoilState(active);
  const [email, setEmail] = useRecoilState(signUpEmail);
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("POST", authEndPoints.VERIFY_OTP_API, {
        email,
        otp,
      }) as any;
      toast.success(res.data.message);
      setLoading(false);
      setActiveState(3);
    } catch (error: unknown) {
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
    <div className="flex flex-col justify-center items-center h-full gap-y-10">
      <div className="text-3xl font-semibold text-charcoal">
        Enter Otp for Verification
      </div>
      <div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-persiangreen font-semibold"
            />
          )}
          containerStyle={{
            justifyContent: "space-evenly",
            gap: "0 6px",
          }}
        />
      </div>
      <div>
        {!loading ? (
          <div onClick={handleSubmit}>
            <AuthButtons text="Verify OTP" />
          </div>
        ) : (
          <DisabledButton />
        )}
      </div>
    </div>
  );
};

export default OtpModal;
