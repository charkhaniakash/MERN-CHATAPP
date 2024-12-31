import express from "express";
import { Login, Logout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
