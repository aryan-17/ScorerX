"use client";
import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiConnector } from "@/services/apiConnector";
import { authEndPoints } from "@/services/apis";
import "@/app/styles/form.css";
import AuthButtons from "./AuthButtons";
import DisabledButton from "./DisabledButton";
import Important from "./Important";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { signIn } from "next-auth/react";

interface ILoginInput {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler: SubmitHandler<ILoginInput> = async (data) => {
    try {
      setLoading(true);
      console.log("data---------------->", data);
      const res = (await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })) as any;
      console.log(res);
      if (res?.error) {
        toast.error("Invalid Credentials");
      } else {
        toast.success("Login successful!");
        window.location.reload();
        router.push("/profile");
      }
    } catch (error) {
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
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="text-charcoal font-semibold text-lg form-items mt-5"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
            })}
            name="email"
          />
          {errors.email && (
            <span>
              <Important />
              Email is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
          />
          {errors.password && (
            <span>
              <Important />
              Min. 6 letters password.
            </span>
          )}
        </div>
        <div>{loading ? <DisabledButton /> : <AuthButtons text="Login" />}</div>
      </form>
    </div>
  );
};

export default LoginForm;
