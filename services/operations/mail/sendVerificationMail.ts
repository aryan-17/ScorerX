"use server"
import mailSender from "@/services/utils/mailSender"
import emailTemplate from "@/mail/templates/emailVerify"

export default async function sendVerificationMail(email:string, otp:string) {
    try{
        
        const mailResponse = await mailSender(
            email,
            "Verification Mail",
            emailTemplate(otp)
        )

        console.log(mailResponse);
        

        return ;
        
    }
    catch(error){
        return Response.json({
            success:false,
            message:error
        })
    }
}