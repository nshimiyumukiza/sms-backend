import express from "express"
import { createTeacher, getAllTeacher } from "../controller/teacher.controller.js";
const router = express.Router();

router.post('/teacher',createTeacher);
router.get('/teacher',getAllTeacher)
export default router