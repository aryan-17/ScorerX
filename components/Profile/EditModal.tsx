"use client";
import { userData } from "@/store/atoms/userData";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import "@/app/styles/neo.css";
import { useRecoilState } from "recoil";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { modal } from "@/store/atoms/modal";
import { apiConnector } from "@/services/apiConnector";
import { userEndPoints } from "@/services/apis";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import {
  CldUploadWidget,
} from "next-cloudinary";

const EditModal = () => {
  const [data, setData] = useRecoilState(userData);
  const [firstName, setFirstName] = useState(data.FirstName);
  const [lastName, setLastName] = useState(data.LastName);
  const [photoUrl, setPhotoUrl] = useState(data.photoUrl);
  const [role, setRole] = useState(data.profile?.Role);
  const [visible, setVisible] = useRecoilState(modal);
  const [loading, setLoading] = useState(false);

  const changeFirstNameHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(event.target.value);
  };

  const changeLastNameHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLastName(event.target.value);
  };

  function handleUploadHandler(results: any): void {
    setPhotoUrl(results.info.secure_url);
    
  }

  const options = ["BATSMAN", "BOWLER", "ALL_ROUNDER"];

  async function updateProfileHandler() {
    try {
      setLoading(true);

      const res = (await apiConnector("PATCH", userEndPoints.USER_DETAILS, {
        firstName,
        lastName,
        role,
        photoUrl
      })) as any;
      console.log(res);
      toast.success(res.data.message);
      setVisible(false);
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
      window.location.reload();
    }
  }

  console.log(loading);

  return (
    <div>
      <div className="text-charcoal p-5 neo border-[1px] border-pure-greys-50 flex flex-col gap-5 bg-[#F7F8FA]">
        <div>
          <Image
            src={data.photoUrl}
            width={70}
            height={70}
            alt="pfp"
            className="rounded-full aspect-square"
          />
        </div>
        <div>
          <div className="text-xl font-semibold text-charcoal">
            {data.FirstName} {data.LastName}
          </div>
          <div className="font-light text-sm text-charcoal">{data.email}</div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-20 border-t-[1px] py-7 border-pure-greys-100 items-center">
            <div className="font-semibold text-lg">Name</div>
            <div className="flex gap-5 items-center">
              <div>
                <input
                  className="border-[1px] border-pure-greys-50 rounded-lg focus:outline-1 focus:outline-pure-greys-100 p-1"
                  type="text"
                  value={firstName}
                  onChange={changeFirstNameHandler}
                />
              </div>
              <div>
                <input
                  className="border-[1px] border-pure-greys-50 rounded-lg focus:outline-1 focus:outline-pure-greys-100 p-1"
                  type="text"
                  value={lastName}
                  onChange={changeLastNameHandler}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-20 items-center border-t-[1px] border-pure-greys-50 py-5">
            <div className="font-semibold text-lg">Role</div>
            <div className="cursor-pointer text-charcoal">
              <Dropdown
                className="rounded-lg"
                options={options}
                onChange={(e) => setRole(e.value)}
                placeholder={"Select a Role"}
              />
            </div>
          </div>
          <div className="flex gap-20 items-center border-t-[1px] border-pure-greys-50 py-5">
            <div className="font-semibold text-lg ">Profile</div>
            <div className="flex items-center gap-10">
              <div>
                <Image
                  width={40}
                  height={40}
                  src={photoUrl}
                  alt="pfp"
                  className="rounded-full"
                />
              </div>
              <div>
                <CldUploadWidget
                  signatureEndpoint={"/api/sign-image"}
                  onSuccess={handleUploadHandler}
                  options={{ maxFiles: 1, folder: '/scorer-X'}}
                >
                  {({ cloudinary, widget, open }) => {
                    return (
                      <button
                        onClick={() => open()}
                        className="rounded-xl bg-persiangreen text-sm p-[5px]"
                      >
                        Click to Replace
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
          </div>
        </div>

        <div>
          {loading === false ? (
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setVisible(false)}
                className="bg-pink-200 rounded-xl p-1 px-2"
              >
                Cancel
              </button>
              <button
                onClick={updateProfileHandler}
                className="bg-persiangreen p-1 rounded-xl px-2"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="flex gap-4 justify-end">
              <button className="bg-pink-200 rounded-xl p-1 px-2 cursor-not-allowed">
                Cancel
              </button>
              <button className="bg-persiangreen p-1 rounded-xl px-2 cursor-not-allowed">
                Loading...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
