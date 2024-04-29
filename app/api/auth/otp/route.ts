import { NextRequest } from "next/server";
import prisma from "@/db/client"
import otpGenerator from "otp-generator"
import sendVerificationMail from "@/services/operations/mail/sendVerificationMail";

export default async function POST(req:NextRequest){
    try{
        const email = await req.json();

        const checkUserPresent = await prisma.user.findFirst({
            where:{
                    email:email
            }
        })

        if(checkUserPresent){
            return Response.json({
                success:false,
                message:"User already registered"
            })
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        const existingOtp = await prisma.otp.findFirst({
            where: {
              otp: otp
            }
          });
          

        while(existingOtp){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
        }
        console.log(otp);

        const res = await prisma.otp.create({
            data:{
                email:email,
                otp:otp
            }
        })

        const mailResponse = await sendVerificationMail(email, otp);

        return Response.json({
            success:true,
            message:"Otp has been sent."
        })
        
    }
    catch(error){
        return Response.json({
            success:false,
            message:error
        })
    }
}