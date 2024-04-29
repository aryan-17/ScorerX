"use client";
import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiConnector } from "@/services/apiConnector";
import { authEndPoints } from "@/services/apis";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password,setPassword] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }

  const submitHandler: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
    //   const otpVerify = apiConnector()
      const res = await apiConnector("POST", authEndPoints.SIGNUP_API, data);
      console.log(res);
      
      setLoading(false);
    } catch (error) {
      console.log("ERROR-MESSAGE ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="text-black">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          {...register("firstName", { required: true })}
          name="firstName"
          placeholder="First Name"
        />
        {errors.firstName && <span>* First Name is Required</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          name="lastName"
          placeholder="Last Name"
        />
      </div>

      <div>
        <label htmlFor="password">
            <input 
            type="password"
            id="password"
            placeholder="Enter password"
            {...register("password",{
                required:true
            })}
            onChange={(e)=> changeHandler(e)}
            name="password"
            />
            {errors.password && <span>* Enter appropriate password of length 6 with uppercase, lowercase and special characters</span>}
        </label>
        </div>

        <div>
        <label htmlFor="confirmPassword">
            <input 
            type="password"
            id="confirmPassword"
            placeholder="Enter password"
            {...register("confirmPassword",{
                required:true,
                validate:(value)=> value === password || "Passwords do not match"
            })}
            name="confirmPassword"
            />
            {errors.confirmPassword && <span>* Passwords do not match</span>}
        </label>
      </div>
      <div>
        <label>Gender</label>
        <label>
          <input
            type="radio"
            value="Male"
            {...register("gender", { required: true })}
            name="gender"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            {...register("gender", { required: true })}
            name="gender"
          />
          Female
        </label>
        {errors.gender && <span>* Enter your gender</span>}
      </div>

      <div>
        <label htmlFor="dob">
          <input type="date" {...register("dob", { required: true })} />
        </label>
        {errors.dob && <span>* Enter your DOB</span>}
      </div>

      <div>
        {
        loading ? (<input type="submit" value={"Verify-Email"} disabled/>) : (<input type="submit" value={"Verify-Email"}/>)
        }
      </div>
    </form>
  );
};

export default SignInForm;
