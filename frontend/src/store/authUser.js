import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


export const useAuthUser = create((set) => ({
    user:null,
    isSignup:false,
    isauthCheck: true,
    isloggingOut:false,
    isloggingin:false,
    signup: async (credentials)=>{
        set({isSignup:true});
        try{
            const response = await axios.post("/api/auth/signup",credentials);
            set({user:response.data.user,isSignup:false});
            toast.success("Signup successful");
        }catch(error){
            toast.error(error.response.data.message||"signup failed");
            set({isSignup:false,user:null});
        }
    },
    login: async (credentials)=>{
        set({isloggingin:true});
        try{
            const response = await axios.post("/api/auth/login",credentials);
            set({user:response.data.user,isloggingin:false});
            toast.success("login successful");
        }catch(error){
            set({isloggingin:false,user:null});
            toast.error(error.response.data.message||"login failed");
        }


    },
    logout: async ()=>{
        set({isloggingOut:true});
        try{
            const response = await axios.post("/api/auth/logout");
            set({user:null,isloggingOut:false});
            toast.success("logout successful");
        }catch(error){
            set({isloggingOut:false});
            toast.error(error.response.data.message||"logout failed");
        }
    },
    authCheck:async ()=>{
        set({isauthCheck:true});
        try{
            const response = await axios.get("/api/auth/authCheck");
            set({user:response.data.user,isauthCheck:false});
        }catch(error
        ){set({isauthCheck:false,user:null});

        }
    },
}));