import React from "react";
import { useState, FormEvent } from "react";


const OtpModal = () => {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">
          <input type="number" placeholder="Enter Otp" />
        </label>
        <button type="submit">Submit Otp</button>
      </form>
    </div>
  );
};

export default OtpModal;
