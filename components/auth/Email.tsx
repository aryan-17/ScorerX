import React from "react";
import AuthButtons from "./AuthButtons";

const Email = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-8 min-w-">
      <div className="flex flex-col">
        <div className="font-bold text-4xl text-charcoal">
          Create An Account
        </div>
        <div className="text-md mx-auto text-pure-greys-400">
          Let&apos;s get started with your account.
        </div>
        <div className="border-t-2 mt-4 border-pure-greys-200">

        </div>
      </div>
      <div className="text-charcoal w-full flex justify-center">
        <form className="w-6/12">
          <label htmlFor="email" className="block font-semibold text-lg ml-2">
            Email<sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-2 border-richblack-100 rounded-2xl focus:outline-none h-10 p-3 w-full"
            placeholder="Enter you Email"
          />
        </form>
      </div>
      <div>
        <AuthButtons text="Send OTP" />
      </div>
    </div>
  );
};

export default Email;
