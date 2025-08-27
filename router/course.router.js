import express from "express";
import {createCourse,getAllCourses,unrollStudent} from "../controller/course.controller.js"

const router = express.Router();

router.post('/course',createCourse);
router.get('/course',getAllCourses);
router.post('/enroll',unrollStudent);

export default router