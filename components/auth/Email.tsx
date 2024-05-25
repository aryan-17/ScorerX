"use client";
import React, { useState } from "react";
import AuthButtons from "./AuthButtons";
import { useRecoilState } from "recoil";
import { active } from "@/store/atoms/active";
import DisabledButton from "./DisabledButton";
import { apiConnector } from "@/services/apiConnector";
import { authEndPoints } from "@/services/apis";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { signUpEmail } from "@/store/atoms/auth";

const Email = () => {
  const [email, setEmail] = useState("");
  const [recoilMail, setRecoilMail] = useRecoilState(signUpEmail);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeState, setActiveState] = useRecoilState(active);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(e.target.value);
  };
  const submitEmail = async () => {
    if (email.length === 0) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const res = (await apiConnector("POST", authEndPoints.SENDOTP_API, {
        email: email,
      })) as any;
      if (res.data.message === "Email already Verified.") {
        setActiveState(3);
      } else {
        setActiveState(2);
      }
      toast.success(res.data.message);
      setRecoilMail(email);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-8">
      <div className="flex flex-col">
        <div className="font-bold text-4xl text-charcoal">
          Create An Account
        </div>
        <div className="text-md mx-auto text-pure-greys-400">
          Let&apos;s get started with your account.
        </div>
        <div className="border-t-2 mt-4 border-pure-greys-200"></div>
      </div>
      <div className="text-charcoal w-full flex justify-center">
        <form className="w-6/12">
          <label htmlFor="email" className="block font-semibold text-lg ml-2">
            Email<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-2 border-richblack-100 rounded-2xl focus:outline-none h-10 p-3 w-full"
            placeholder="Enter you Email"
            onChange={(e) => changeHandler(e)}
          />
        </form>
      </div>
      <div>
        <div>
          {!loading ? (
            <div onClick={submitEmail}>
              <AuthButtons text="Send OTP" />
            </div>
          ) : (
            <DisabledButton />
          )}
        </div>
        <div>
          {error === true ? (
            <div className="text-xs text-center text-pink-200 font-semibold">
              Fill all the Fields
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Email;
