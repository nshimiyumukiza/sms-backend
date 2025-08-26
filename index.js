import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";

dotenv.config()
const port = process.env.PORT || 3000
const db = process.env.MONGOOSE
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',userRouter)
app.listen(port, () => {
    console.log("port is learing on port 3000")
})

mongoose.connect(db)
.then(()=> console.log("database connect succefully"))
.catch(()=>console.log("connection to tada base faild"))