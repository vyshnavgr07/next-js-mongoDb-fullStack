import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';
import   bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


connect()

export async function POST(request){
try {
    const reqBody = await request.json();
    const {email,password } = reqBody;
    console.log(reqBody)
  const user= await User.findOne({email})

  if(!user){
    return NextResponse.json({error:'user does not exist'},{status:400})
  }

 console.log("user exist");
const validPassword=bcrypt.compare(password,user.password)

if(!validPassword){
return NextResponse.json({error:'Check your credentials'},{status:400})
}

const tokenData={
    id:user._id,
    username:user.username,
    email:user.email
}

const token=await jwt.sign(tokenData,process.env.SECRET,{ expiresIn: '1h' })

const response=NextResponse.json({
    message:"Logged in successfilly",
    success:true
})
    
response.cookies.set("token",token,{
    httpOnly:true
})

return response;

} catch (error) {
  return NextResponse.json({error:error.message},{status:500})
}
}
