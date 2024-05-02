import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/client";
import sendResetPasswordMail from "@/services/operations/mail/sendResetPasswordMail"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {

    const session = await getServerSession(NEXT_AUTH);
    console.log(session);
    
    const userEmail = session?.user?.email as string;
    const token = session?.accessToken;
    const user = await prisma.user.findFirst({
        where:{
            email:userEmail
        }
    })

    if(!user){
        return Response.json({
            success:false,
            message:"User invalid"
        },{
            status:404
        })
    }

    const url = `http://localhost:3000/update-password/${token}`;

    const mailResponse = await sendResetPasswordMail(userEmail,url);

    return Response.json({
      success: true,
      message: "Sent the Otp",
    },{
        status:200
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Error in sending otp",
      },
      {
        status: 500,
      }
    );
  }
}
