import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/utils/mailer';


connect().then(() => console.log("Database connected successfully")).catch(err => console.error("Database connection error:", err));

export async function POST(request) {
    try {
     
        
        // Parse request body
        const reqBody = await request.json();
      

        const { username, email, password } = reqBody;
        
        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

  
        const user = await User.findOne({ email });

        if (user) {
        
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

    
        const newUser = new User({
            username,
            email,
            password: hash
        });


        const savedUser = await newUser.save();
 
console.log("Sending verification email");
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id.toString()});

        console.log("User registration complete");
        return NextResponse.json({
            message: 'User registered successfully',
            success: true,
            savedUser
        });

    } catch (error) {
        console.error("Error in POST function:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
























// import {connect}  from '@/dbConfig/dbConfig';
// import User from '@/models/userModel';
// import {NextRequest,NextResponse} from 'next/server'
//  import bcrypt    from 'bcryptjs';
//  import { sendEmail } from '@/utils/mailer';
// connect()


// export async function Post(request) {
//     try {
//         const reqBody=request.json();
//        const {username,email,password}=reqBody
//        console.log(req.body);
//        const user=await User.findOne({email});

//        if(user){
//         return NextResponse.json({error:'User already exist'},{status:400})
//        }

//        var salt = await bcrypt.genSalt(10);
//        var hash = await bcrypt.hash(password, salt);
         
//       const newUser= new User({
//         username,
//         email,
//         password:hash
//        })

//     const savedUser=await newUser.save();
//     console.log(savedUser,"savedUser")

//     await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

//     return NextResponse.json({
//         message:'user registered succesfully',
//         success:true,
//         savedUser
//     })


//     } catch (error) {
//         return NextResponse.json({error:error.message},{status:500})
//     }
// }