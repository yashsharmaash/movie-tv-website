import express from "express";
import { signup,Login,Logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { authCheck } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup)

router.post("/login",Login)

router.post("/logout",Logout)

router.get("/authCheck",protectRoute,authCheck);

export default router;
