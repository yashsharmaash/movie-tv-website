import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ENV_VARS} from '../config/envVars.js';  

export const protectRoute = async (req,res,next)=>{
    try{
        const token =req.cookies["jwt-login"];

        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized- No token"});
        }
        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false,message:"Unauthorized- Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");// we are not selecting the password
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error in protectRoute middleware: "+error.message);
        return res.status(500).json({success:false,message:"Internal Server error"});
    }
}; // this is a middleware function that will be used in the movie.route.js and tv.route.js to protect the routes from unauthorized access