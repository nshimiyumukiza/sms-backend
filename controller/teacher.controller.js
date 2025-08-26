import Teacher from "../model/teacher.modal.js";

const createTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save()
        res.status(201).json({message:"teacher created succefully!",teacher})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
// get all teacher
const getAllTeacher = async(req,res) => {

    try {
        const teacher = await Teacher.find({})
        if(!teacher){
            return res.status(401).json({message:'invalid teacher'})
        }
        res.status(200).json({message:`you get ${teacher.length} all teachers`,teacher})
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}
export {createTeacher, getAllTeacher}