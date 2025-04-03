import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generatetokensandsetcookies } from "../utils/generatetokens.js";
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 6 characters long, contain at least 1 special character, and 1 number" 
            });
        }

       
        const existingUserByEmail = await User.findOne({ email:email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

       
        const existingUserByUsername = await User.findOne({ username : username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        
        const newUser = new User({
            email,
            password:hashedPassword, 
            username,

        });

        await newUser.save();
         generatetokensandsetcookies(newUser._id,res);
         
         res.status(201).json({ 
            success: true,
            user:{
                ...newUser._doc,
                password:"",
            }

          });
        



        

    
        

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        generatetokensandsetcookies(user._id,res);
        res.status(200).json({ success: true, user:{
            ...user._doc,
            password:"",
        } });

    } catch (error) {
        console.log("error logging in", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }

}


export async function Logout(req, res) {
    try{
        res.clearCookie("jwt-login");
        res.status(200).json({ success: true, message: "Logged out successfully" });

} catch (error) {
    console.log("error logging out" , error.message);
    res.status(500).json({ success: false, message: "internal server error" });
}
}

export async function authCheck(req, res) {
    try { 
        res.status(200).json({ success: true, user:req.user });
        
    } catch (error) {
        console.log("error checking auth", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
        
    }
}