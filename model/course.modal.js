import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{type:String},
    teacher:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    stundents:[{type:mongoose.Schema.Types.ObjectId, ref:"User",required: true}],
    schedula:{
        day:{
            type: String,
            enum:['monday',"tuesday",'wednesday','thursday','friday','saturday']
        },
        time: String
    }
},{timestamps:true})

const Course = mongoose.model("Course",courseSchema)

export default Course;