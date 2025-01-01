// type= !module
// const express = require("express");
// type= module
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config();
const app = express();
const PORT = process.env.PORT; 

app.use(express.json());
app.use(cookieParser());

// if i wnat different port i need to change in vite.config file also  but 5173 is a default one
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});