"use client";
import Email from "@/components/auth/Email";
import OtpModal from "@/components/auth/OtpModal";
import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";
import signUp from "@/assests/Auth/signUp.jpg";
import { useRecoilState } from "recoil";
import { active } from "@/store/atoms/active";

export default function SignUp() {
  const [activeState, setActiveState] = useRecoilState(active);

  return (
    <div className="flex flex-1 h-fit justify-between ml-5">
      <div className="w-7/12 mx-10">
        {activeState === 1 ? (
          <Email />
        ) : activeState === 2 ? (
          <OtpModal />
        ) : (
          <div className="mt-10 mx-10 flex flex-col justify-center">
            <p className="text-2xl font-semibold text-charcoal text-center">
              Sign Up
            </p>
            <div className="border-[1px] border-richblack-100 mt-3 w-10/12 mx-auto"></div>
            <div className="mx-auto">
              <SignInForm />
            </div>
          </div>
        )}
      </div>
      <div className="h-full my-auto">
        <Image src={signUp} alt="SignUp" loading={"lazy"} />
      </div>
    </div>
  );
}
