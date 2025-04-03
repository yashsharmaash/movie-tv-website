import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const connectDB = async ()=>{

    try{
        const conn =await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB connected" + conn.connection.host);
    } catch(error){
        console.error("error connecting to mongo db" + error.message);
        process.exit(1);//1 menas there was an error and 0 means success
        
    }
    
}