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
import { useRecoilState } from "recoil";
import { signUpEmail } from "@/store/atoms/auth";
import { active } from "@/store/atoms/active";
import { isAxiosError } from "axios";

interface IFormInput {
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  dob?: Date;
}

const SignInForm: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useRecoilState(signUpEmail);
  const [activeState, setActiveState] = useRecoilState(active);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      console.log(data);

      const res = (await apiConnector("POST", authEndPoints.SIGNUP_API, {
        data,
        email,
      })) as any;
      console.log(res);
      toast.success(res.data.message);
      setActiveState(1);
      router.push("/auth/login");
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
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", { required: true })}
            name="firstName"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span>
              <Important /> First Name is Required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            name="lastName"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span>
              <Important /> Last Name is Required
            </span>
          )}
        </div>

        <div className="password">
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /.*[!@#$%^&*(),.?":{}|<>]/,
                  message: "Password must contain at least one symbol",
                },
              })}
              onChange={(e) => changeHandler(e)}
              name="password"
            />
            {errors.password && (
              <span>
                <Important />
                Min. 6 letters with symbol
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm-Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <span>
                <Important />
                Passwords do not match
              </span>
            )}
          </div>
        </div>
        <div className="accent-persiangreen">
          <label>Gender: </label>
          <label className="w-fit font-normal">
            <input
              type="radio"
              value="MALE"
              {...register("gender", { required: true })}
              name="gender"
              className="mx-2"
            />
            Male
          </label>
          <label className="w-fit font-normal">
            <input
              type="radio"
              value="FEMALE"
              {...register("gender", { required: true })}
              name="gender"
              className="mx-2"
            />
            Female
          </label>
          {errors.gender && (
            <span>
              <Important />
              Enter your gender
            </span>
          )}
        </div>

        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            className="font-light text-md"
            {...register("dob", { required: true })}
          />
          {errors.dob && (
            <span>
              <Important />
              Enter your DOB
            </span>
          )}
        </div>

        <div className="flex items-center ">
          {loading ? <DisabledButton /> : <AuthButtons text="Sign Up" />}
        </div>
      </form>
      <div className="text-sm flex justify-center">
        <span>I already have an account.</span>
        <p
          className="underline text-blue-200 cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          Log In
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
