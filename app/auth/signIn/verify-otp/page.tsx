"use client";
import OtpModal from "@/components/auth/OtpModal";
import { apiConnector } from "@/services/apiConnector";
import { useState, FormEvent } from "react";
import { authEndPoints } from "@/services/apis";

export default function EmailVerify() {
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const res = await apiConnector("POST", authEndPoints.SENDOTP_API, {
      "email":email
    });
    console.log(res);
    setSubmit(true);
    setloading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => changeHandler(e)}
          />
        </label>
        {
          (loading===true) ? (<input type="submit" value={"Verify Email"} disabled/>) : (<input type="submit" value={"Verify Email"} />)
        }
      </form>
      {submit && <OtpModal />}
    </div>
  );
}
