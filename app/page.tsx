"use client";

import Image from "next/image";
import main_bg from "@/assests/background/main_bg.jpg";
import HighLightedText from "@/components/common/HighLightedText";

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
    </div>
  );
}
