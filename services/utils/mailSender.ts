import { createTransport } from "nodemailer";

export default async function mailSender(email:string, title:string, body:string){
    try{
        const transporter = createTransport({
            service:"gmail",
            port: 587,
            secure:false,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: title,
            html: body
        })

        console.log("Email Sent ",info);
        return Response.json({
            success:true,
            response:info
        })
    }
    catch(error){
        return Response.json({
            success:false,
            message:error
        })
    }
}