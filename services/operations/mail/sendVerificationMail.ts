import mailSender from "@/services/utils/mailSender"
import emailTemplate from "@/mail/templates/emailVerificationTemplate"
export default async function sendVerificationMail(email:string, otp:string) {
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Mail",
            emailTemplate(otp)
        )
        // console.log(mailResponse);

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