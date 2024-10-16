import User from '@/models/userModel';
import { verify } from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
export const sendEmail=async({email,emailType,userId})=>{
   
     try {

    const hashToken=await bcrypt.hash(userId,10)

       if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashToken,
                verifyTokenExpiry:Date.now()+3600000
            })    
                                                                                                                                                                                                                                                                                                         
       }else if(emailType==="RESET"){
        await User.findByIdAndUpdate(userId,{
            verifyToken:hashToken,
            verifyTokenExpiry:Date.now()+3600000
        })  
       }
       
  

    
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1a7f94b950c2cb",
      pass: "ae9908b432b21d"
    }
  });
        const mailOptions={
         from: 'cluster@gmail.com', // sender address
                to: email,      
                subject:emailType==='VERIFY'?"vERIFY Your email":'Reset Your password', // Subject line
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a>   to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashToken}</p>`,
           }

        const mailResponse=await transport.sendMail(mailOptions)
        return mailResponse
     } catch (error) {
        throw new Error(error.message)
     }
}