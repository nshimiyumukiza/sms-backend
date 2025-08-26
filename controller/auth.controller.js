import User from "../model/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const register =async (req , res) => {
    try {
           const {firstName,lastName,email,password,role}= req.body;
           console.log({firstName,lastName,email,password,role})
       const hash =bcrypt.hashSync(password, 10)
       
       const user = await User.create({firstName,lastName,email,password:hash,role})
       if(!user){
        return res.status(403).json({error:'user not created'})
       }
       return res.status(201).json({message:"create user succefully!",user})
        
    } catch (error) {
     return res.status(500).json({message:`error is ${error.message}`})
     
        
    }
    
};

// login

const login = async (req,res) => {
    try {
        const {password,email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(500).json({message:"invalid email or password"})
        }else{
            const comperePassword = bcrypt.compareSync(password,user.password);
            if(!comperePassword){
               return res.status(500).json({message:'password not found'})
            }else{
                const token = jwt.sign({user:user},process.env.SCRECTKEY,{
                    expiresIn:"1d"
                })
                res.status(201).json({message:"login succefuly!",token})
            }
        }
        
    } catch (error) {
      res.status(500).json({error: error.massage})  
    }

}

// get user

const getUser = async(req,res) =>{
    try {
        const user = await User.find({role:'student'})
        if(!user){
            return res.status(500).json({error:"none user here"})
        }else{
            return res.status(200).json(({message: `you get ${user.length} all user`,user:user}))
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

// get one user

const getSingleUser = async (req,res) => {
    try {
        const user = await User.findOne({_id:req.params.id,role:'student'})
        if(!user){
            return res.status(401).json({message:" user not found"})
        }
        res.status(200).json({message:`you get one user ${user.lastName}!`,user:user})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

// uptade user

const updadeUser = async(req,res) => {
  
    try {
        const user = await User.findByIdAndUpdate({_id:req.body.params, role:"student"},req.body,{new: true})
        if(!user){
            return res.status(401).json({message:'user not found'})
        }
        res.status(200).json({message:'update succefuly!',user:user})
        
    } catch (error) {
        res.status(500).json({error:error.massage})
        
    }
}
// delete user 
const deleteUser = async(req,res) =>{
    try {
        const user = await User.findByIdAndDelete({_id:req.body.params, role:"student"});
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        res.status(200).json({message:'delete user succefuly!'})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

export {register,login,getUser,getSingleUser,updadeUser,deleteUser}