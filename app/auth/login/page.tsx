"use client";
import React, { lazy } from "react";
import Image from "next/image";
import Login from "@/assests/Auth/login.jpg";
import LoginForm from "@/components/auth/LoginForm";

const page = () => {
  return (
    <div className="flex flex-row justify-evenly h-full flex-1 items-center">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="#2a9d8f"
            className="icon icon-tabler icons-tabler-filled icon-tabler-lock"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" />
          </svg>
        </div>
        <div className="text-4xl font-medium text-charcoal text-center">
          Welcome Back
        </div>
        <div className="text-md font-medium text-charcoal text-center">
          Please enter your details.
        </div>
        <div className="mt-5">
          <LoginForm />
        </div>
      </div>
      <div>
        <Image src={Login} height={400} alt="Login" loading={"lazy"} />
      </div>
    </div>
  );
};

export default page;
