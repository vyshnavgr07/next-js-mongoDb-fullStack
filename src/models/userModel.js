import mongoose from 'mongoose';




const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"plesae provide username"],
        unique: true
    },
  email:{
        type:String,
        required:[true,"plesae provide email"],
        unique: true
    },
  password:{
        type:String,
        required:[true,"plesae provide password"],
     
    },
    isVarified:{
        type:Boolean,
        default:false 
    },
    forgetPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
    
})

const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;    