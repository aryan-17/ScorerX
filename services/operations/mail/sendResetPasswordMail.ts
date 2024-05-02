import mailSender from "@/services/utils/mailSender"
import resetPassword from "@/mail/templates/resetPassword"


export default async function sendVerificationMail(email:string, otp:string) {
    try{
        
        const mailResponse = await mailSender(
            email,
            "Verification Mail",
            resetPassword(otp)
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