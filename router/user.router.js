import express from "express"
import { deleteUser, getSingleUser, getUser, login, register, updadeUser } from "../controller/auth.controller.js";
import verifyAccess from "../middleware/authMiddleware.js";

const router = express.Router();
router.post('/register',verifyAccess('admin'),register);
router.post('/login',login);
router.get('/users',verifyAccess('admin'),getUser);
router.get('/user/:id',verifyAccess('admin'),getSingleUser);
router.put('/user/:id',verifyAccess('admin'),updadeUser)
router.delete('/user/:id',verifyAccess("admin"),deleteUser)

export default router