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

    // await generateOtp(email, 1);
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

    const verifiedId = await prisma.verification.findFirst({
      where:{
          email:email
      },
      select:{
          id:true
      }
    })

    if(!verifiedId){
      await prisma.verification.create({
        data:{
          email:email
        }
      })
    }

    return Response.json({
      success: true,
      message: "Otp has been sent.",
    },{
      status:200
    });
  } catch (error) {
    console.log(error);
    
    return Response.json({
      success: false,
      message: "Error in sending Otp",
    },{
      status:500
    });
  }
}

