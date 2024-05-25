"use client";

import Image from "next/image";
import main_logo from "@/assests/logo/main_logo.png";
import { useRouter } from "next/navigation";
import "@/app/styles/nav_bar.css"
import { signIn } from "next-auth/react";

const Header = () => {

  const router = useRouter();

  return (
    <div className="flex justify-between text-lg px-20 py-4 bg-[#E8D6CA]">
      {/* Logo */}
      <div>
        <Image
          className=""
          width={120}
          height={120}
          src={main_logo}
          alt="Logo"
        ></Image>
      </div>

      <div className="flex gap-20 nav items-center text-persiangreen">
        <div onClick={()=> router.push("/")}>
          <p>Home</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#2A9D8F"
            className="icon icon-tabler icons-tabler-filled icon-tabler-home"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
          </svg>
        </div>
        <div>
          <p>Teams</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A9D8F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-friends"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
            <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
          </svg>
        </div>
        <div>
          <p>Matches</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A9D8F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-device-gamepad"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z" />
            <path d="M6 12h4m-2 -2v4" />
            <path d="M15 11l0 .01" />
            <path d="M18 13l0 .01" />
          </svg>
        </div>
        <div>
          <p>Live</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A9D8F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-device-tv"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M16 3l-4 4l-4 -4" />
          </svg>
        </div>
      </div>

      <div className="flex gap-10 nav items-center text-persiangreen">
        <div onClick={()=> signIn()}>
          <p>Log In</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A9D8F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-login-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
            <path d="M3 12h13l-3 -3" />
            <path d="M13 15l3 -3" />
          </svg>
        </div>
        <div onClick={()=> router.push("/auth/signUp")}>
          <p>Sign Up</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A9D8F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
            <path d="M16 19h6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
