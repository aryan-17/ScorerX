import { NextRequest } from "next/server";
import prisma from "@/db/client";

export async function POST(req: NextRequest) {
    try {
      const {email, otp} = await req.json();
  
      console.log("Email--------->",email,"OTP------------>" , otp);
  
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

      const verifiedId = await prisma.verification.findFirst({
        where:{
            email:email
        },
        select:{
            id:true
        }
      })
  
      const verification = await prisma.verification.upsert({
        where:{
            id:verifiedId?.id
        },
        update:{
            verified:true
        },
        create:{
            email:email,
            verified:true
        }
      })

      
  
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
  