"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <button onClick={()=>{
        router.push(`/auth/signIn/verify-otp`);
      }}>
        SignIn
      </button>
      <button onClick={()=>{
        signIn()
      }}>
        Login
      </button>
      <button onClick={()=>{
        signOut()
      }}>
        Log Out
      </button>
      {
        JSON.stringify(session)
      }
    </div>
  );
}
