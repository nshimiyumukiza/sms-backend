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
            res.status(500).json({message:"user not found"})
        }else{
            const comperePassword = bcrypt.compareSync(password,user.password);
            if(!comperePassword){
               return res.status(500).json({message:'password not found'})
            }else{
                const token = jwt.sign({user:user},process.env.SCRECTKEY,{
                    expiresIn:"1d"
                })
                res.status(201).json({message:"login succefuly!"})
            }
        }
        
    } catch (error) {
      res.status(500).json({error: error.massage})  
    }

}

// get user

const getUser = async(req,res) =>{
    try {
        const user = await User.find({})
        if(!user){
            return res.status(500).json({error:"none user here"})
        }else{
            return res.status(200).json(({message: `you get ${user.length} all user`}))
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

export {register,login,getUser}