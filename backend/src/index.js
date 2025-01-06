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
import { app ,server  } from "./lib/socket.js";
import path from "path";


dotenv.config();
const __dirname = path.resolve()

const PORT = process.env.PORT; 

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(express.urlencoded({ limit: '50mb', extended: true }));

// if i want different port i need to change in vite.config file also  but 5173 is a default one
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV  === 'production'){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});