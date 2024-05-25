import { NextRequest } from "next/server";
import prisma from "@/db/client";
import sendVerificationMail from "@/services/operations/mail/sendVerificationMail";
import generateOtp from "@/services/utils/otp/generateOtp";

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
      return Response.json(
        {
          success: false,
          message: "User already registered",
        },
        {
          status: 400,
        }
      );
    }
    const verifiedId = await prisma.verification.findFirst({
      where: {
        email: email,
        verified: true,
      },
      select: {
        id: true,
      },
    });

    if (!verifiedId) {
      await prisma.verification.create({
        data: {
          email: email,
        },
      });
    } else {
      return Response.json({
        success: true,
        message: "Email already Verified.",
      });
    }
    const otp = await generateOtp();
    console.log(otp);

    const res = await prisma.otp.create({
      data: {
        email: email,
        otp: otp,
      },
    });
    const mailResponse = await sendVerificationMail(email, otp);

    return Response.json(
      {
        success: true,
        message: "Otp has been sent.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Error in sending Otp",
      },
      {
        status: 500,
      }
    );
  }
}
