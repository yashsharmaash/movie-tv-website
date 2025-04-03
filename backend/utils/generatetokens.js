import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';
export const generatetokensandsetcookies = (userId,res) =>{
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });
    res.cookie('jwt-login',token,{
        maxAge: 15*24*60*60*1000,//15 days in milisecods
        httpOnly:true,// prevents access from javascript, prevent Xss attack(cross site scripting attacks)
        sameSite:"strict",//prevents csrf attack(cross site request forgery)
        secure:ENV_VARS.NODE_ENV !== "development", 

    }
    );
    return token;
}