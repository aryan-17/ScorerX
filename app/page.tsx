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
        router.push(`/auth/login`);
      }}>
        Login
      </button>
    </div>
  );
}
