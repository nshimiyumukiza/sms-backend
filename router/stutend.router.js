import express from "express"
import verifyAccess from "../middleware/authMiddleware.js";

const router = express.Router();
router.get('/dashboard',verifyAccess, (req,res) => {
    res.json({message:`welcame ${req.user.role}!`,user:req.user})
})
export default router