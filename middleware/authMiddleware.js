import jwt from "jsonwebtoken";

const verifyAccess = (passRole) => {
    return (req,res,next) => {
         const token = req.headers["auth"];
        // const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"token not found"})
        }else{
            try {
                const verifyToken = jwt.verify(token,process.env.SCRECTKEY,{expiresIn:"1d"})
                req.user = verifyToken.user
                if(passRole !== verifyToken.user.role){
                  return  res.status(401).json({message:"you're not allowed"})
                }else{
                    return next()
                }
                
            } catch (error) {
             return res.status(500).json(`{error is ${error.message}}`)
                
            }
        }
    }
}
export default verifyAccess;