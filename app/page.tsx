"use client";

import Image from "next/image";
import main_bg from "@/assests/background/main_bg.jpg";
import HighLightedText from "@/components/common/HighLightedText";
import steps from "@/assests/background/steps.jpg";
import UseSteps from "@/data/Home/UseSteps.json";
import chooseUs from "@/data/Home/chooseUs.json";
import grid from "@/data/Home/grid.json";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className="w-full bg-[#E8D6CA] pt-7 flex">
        <div>
          <Image src={main_bg} height={600} alt="Hero Image" />
        </div>
        <div className="text-charcoal flex flex-col gap-y-4 my-auto max-w-[45%]">
          <div className="text-4xl font-semibold flex flex-col gap-3">
            <p>Welcome to the</p>
            <HighLightedText
              style={{
                fontSize: 48,
                backgroundImage:
                  "linear-gradient(90deg, hsla(281, 37%, 45%, 1) 0%, hsla(1, 62%, 48%, 1) 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              text={"Ultimate"}
            />
            <p>Cricket Scoring Hub</p>
          </div>
          <div className="border-t-4 w-1/2 border-persiangreen"></div>
          <div className="w-3/4 text-lg font-medium">
            <p>
              Experience the pulse of every match with our dynamic cricket live
              scoring website. Stay glued to the action as it unfolds, with
              real-time updates, comprehensive statistics, and engaging visuals,
              all at your fingertips.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Service */}
      <div className="flex mt-20 gap-x-60 mx-40 items-center">
        <div>
          <Image
            src={steps}
            alt="Steps To Use"
            width={600}
            className="shadow-[20px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex flex-col gap-y-3">
            <p className="text-3xl text-charcoal font-bold">
              Enjoy the Sport By Platform Services.
            </p>
            <div className="border-t-4 w-1/4 border-black"></div>
          </div>

          <div className="mt-5">
            {UseSteps.map((ele, i) => {
              return (
                <div key={ele.id}>
                  <div className="flex gap-6 items-center ml-3" key={i}>
                    <div className=" bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                      <div className="w-10 h-10 text-center bg-persiangreen text-black p-2 rounded-full">
                        {ele.id}
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-[18px] text-black">
                        {ele.title}
                      </h2>
                      <p className="text-base text-charcoal font-medium">
                        {ele.data}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`hidden ${
                      UseSteps.length - 1 === i ? "hidden" : "lg:block"
                    }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px] ml-2`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Choose Us */}
      <div className="mt-20 mx-20">
        <div className="flex flex-col">
          <div className="flex gap-x-5">
            <div className="border-t-4 w-1/5 border-persiangreen mt-8"></div>
            <div className="flex flex-col text-3xl font-bold text-charcoal w-screen">
              <div>3 Reasons Why</div>
              <div>You Should Choose Us</div>
            </div>
          </div>
          <div className="flex mt-10 ml-10">
            {chooseUs.map((ele, i) => {
              return (
                <div key={i} className="flex gap-x-2">
                  <div dangerouslySetInnerHTML={{ __html: ele.svg }}></div>
                  <div className="flex flex-col gap-y-3">
                    <div className="text-persiangreen text-xl font-semibold">
                      {ele.title}
                    </div>
                    <div className="text-charcoal">{ele.data}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Abouy Cricket */}
      <div className="flex justify-around mt-40 mx-20 gap-x-20">
        <div className="w-1/2 flex flex-col gap-y-2">
          <p className="text-4xl font-bold">1500&apos;s</p>
          <div className="border-t-4 w-1/4 border-persiangreen"></div>
          <div className="text-charcoal mt-5">
            Cricket is a dynamic sport that blends strategy, skill, and
            athleticism.
          </div>
          <div className="text-charcoal flex flex-col underline h-full relative justify-end">
            All rights obtained.
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2">
          {grid.map((ele, i) => {
            return (
              <div key={i} className="flex flex-col gap-y-3 mt-5">
                <div className="flex gap-x-4">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: ele.svg }}
                  ></div>
                  <div className="text-xl text-charcoal font-bold">
                    {ele.title}
                  </div>
                </div>
                <div className="text-charcoal">{ele.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Us */}

      <div className="mt-20 flex flex-col items-center">
        <div className="text-4xl font-bold flex flex-col items-center">
          <span>Find Out More </span>
          <span>About Us</span>
        </div>
        <div className="border-t-4 w-[3rem] mt-2 border-persiangreen"></div>
        <div className="mt-10 flex gap-10">
          <input
            type="text"
            className="w-60 h-10 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Type Something For Us..."
          />
          <button className="h-10 bg-persiangreen w-40 rounded-md ">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
