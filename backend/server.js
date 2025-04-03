import express from 'express';
import cron from 'node-cron';   
import axios from 'axios';

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cookieparser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';
import searchRoutes from './routes/search.route.js';
import path from "path";
const app = express();
const PORT = ENV_VARS.PORT
const __dirname = path.resolve();
const serverURL = "https://movie-tv-website.onrender.com"

app.use(express.json());// the function that allows us to use req.body in auth.controller.js for email password and username in signup
app.use(cookieparser());

app.use("/api/auth",authRoutes);
app.use("/api/movie",protectRoute,movieRoutes);
app.use("/api/tv",protectRoute,tvRoutes);
app.use("/api/search",protectRoute,searchRoutes);
if(ENV_VARS.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"/frontend/dist/index.html"));
    });
}

cron.schedule("*/5 * * * *", async () => {
    try {
      await axios.get(serverUrl);
      console.log("Server pinged successfully to prevent cold start");
    } catch (error) {
      console.error("Error pinging server:", error.message);
    }
  });

app.listen(PORT ,()=>{
    console.log('sever started');
    connectDB();


})

