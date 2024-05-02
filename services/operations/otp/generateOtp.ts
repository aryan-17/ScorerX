import otpGenerator from "otp-generator";
import prisma from "@/db/client";

export default async function generateOtp() {
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
      return otp;
}