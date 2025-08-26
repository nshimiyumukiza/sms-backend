import mongoose from "mongoose";
const teacherSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    teacherId:{
        type:String,
        required: false,
        unique: false
    },
    subject:{
        type:String,
        required:false
    },
    qualification:{type:String},
    phone:{type:String},
    hireDate:{
        type:Date,
        default:Date.now
    },

},{timestamps:true})

const Teacher = mongoose.model("Teacher",teacherSchema);
export default Teacher;