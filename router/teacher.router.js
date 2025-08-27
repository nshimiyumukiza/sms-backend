import express from "express"
import { createTeacher, getAllTeacher, getSingleTeacher } from "../controller/teacher.controller.js";
const router = express.Router();

router.post('/teacher',createTeacher);
router.get('/teacher',getAllTeacher)
router.get('/teacher/:id',getSingleTeacher)
export default router