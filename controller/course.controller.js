import Course from "../model/course.modal.js";
import User from "../model/user.modal.js"

const createCourse = async (req, res ) => {
    try {
        const {name, description, teacher} = req.body;

        // chech taecher exit
        const teacherUser = await User.findById(teacher)
        if(!teacherUser ||teacherUser.role !== "teacher"){
            return res.status(400).json({message: "invalid teacher"})
        }

        const course = await Course.create(req.body);
        res.status(200).json({message : "course created succefully!",course})
        
    } catch (error) {
        res.status(500).json({error : error.message})
        
    }
}

// getAll classs

const getAllCourses = async ( req,res) => {
    try {
        const course = await Course.find()
        .populate("teacher","firstName","lastName","email")
        .populate("student","firstName","lastName","email")
        res.json(course)
        
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

}

// enroll student into class

const unrollStudent = async (req,res) =>{
    try {
        const {classId, studentId} = req.body;
        const studentUser = await Course.findById(studentId)
        if(!studentUser || studentUser.role !== "student"){
            return res.status(400).json({message: "class not found!"})
        }
        const classObj = await Course.findById(classId);
        if(!classObj) return res.status(404).json({message:"class not found"});
        if(classObj.students.includes(studentId)){
            classObj.students.push(studentId);
            await classObj.save();
        }
        res.status(200).json({message:"unrolled student successfully!",classObj})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

export {createCourse, getAllCourses,unrollStudent}