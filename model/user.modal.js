import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt"

const userSchem = mongoose.Schema({
   firstName:String,
   lastName: String,
   email:{
    type : String,
    unique: true
   },
   password: String,
   role: {
    type: String,
    enum: ['admin,','teacher','student','parent'],
    default: 'student'
   },
   phoneNumber:Number,
   dateOfBirth:{
    type: Date,
   },
   address: {
    provence:String,
    district:String,
    sector:String,
    country:{
        type: String,
        default:'RWANDA'
    }
},
    profilePicture:{
        type: String,
        default: null
    },
    isActive:{
        type: Boolean,
        default:true
    },
    studentId:{
        type:String,
        sparse:true,
        unique:true
    },
    grade:{
        type: String,
        enum:['A','B','C','D','E','F']
    },
    teacherId:{
        type: String,
        sparse:true,
        unique:true
    },
    subject:[{
        type:String
    }],
    lastLogin:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true,
})
const User = mongoose.model("User",userSchem)
export default User