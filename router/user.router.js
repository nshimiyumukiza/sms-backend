import express from "express"
import { getUser, login, register } from "../controller/auth.controller.js";

const router = express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/user',getUser)

export default router