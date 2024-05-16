"use client";
import Email from "@/components/auth/Email";
import OtpModal from "@/components/auth/OtpModal";
import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";
import { useState } from "react";
import signUp from "@/assests/Auth/signUp.jpg"

export default function SignUp() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex justify-around mx-20">
      <div className="w-7/12">
        {active === 1 ? (
          <Email />
        ) : active === 2 ? (
          <OtpModal />
        ) : (
          <SignInForm />
        )}
      </div>
      <div>
        <Image height={512} src={signUp} alt="SignUp"/>
      </div>
    </div>
  );
}
