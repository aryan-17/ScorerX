import { NextRequest } from "next/server";
import prisma from "@/db/client";
import otpGenerator from "otp-generator";
import sendVerificationMail from "@/services/operations/mail/sendVerificationMail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("Email----------->", email);

    const checkUserPresent = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (checkUserPresent) {
      return Response.json({
        success: false,
        message: "User already registered",
      },{
        status:400
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const existingOtp = await prisma.otp.findFirst({
      where: {
        otp: otp,
      },
    });

    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }
    console.log("OPT----->", otp);

    const res = await prisma.otp.create({
      data: {
        email: email,
        otp: otp,
      },
    });

    const mailResponse = await sendVerificationMail(email, otp);

    return Response.json({
      success: true,
      message: "Otp has been sent.",
    },{
      status:200
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Error in sending Otp",
    },{
      status:500
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const email = searchParams.get("email") as string;
    const otp = searchParams.get("otp") as string;

    console.log(email, otp);

    const otpMatching = await prisma.otp.findFirst({
      where: {
        email: email,
        otp: otp,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Response for otp:", otpMatching);
    if (!otpMatching) {
      return Response.json(
        {
          success: false,
          message: "Incorrect Otp",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Email Verified",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur

    return Response.json(
      {
        success: false,
        message: "Error in verifying otp",
      },
      {
        status: 500,
      }
    );
  }
}
