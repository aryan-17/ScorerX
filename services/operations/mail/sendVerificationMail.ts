import mailSender from "@/services/utils/mailSender"
import emailData from "@/data/email"
import emailTemplate from "@/mail/templates/emailVerify"


export default async function sendVerificationMail(email:string, otp:string) {
    try{
        
        const mailResponse = await mailSender(
            email,
            "Verification Mail",
            emailTemplate(otp)
        )

        console.log(mailResponse);
        

        return Response.json({
            success:true,
            message:mailResponse
        })
        
    }
    catch(error){
        return Response.json({
            success:false,
            message:error
        })
    }
}