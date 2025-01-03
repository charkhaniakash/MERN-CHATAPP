import { Server } from "socket.io";

import express from "express"
import http from "http"

const app = express()

const server = http.createServer(app) 

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export const getRecieverId =(userId)=>{
    return connectingUsersMap[userId]
}


const connectingUsersMap = {}
io.on("connection" ,(socket)=>{
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId){
        connectingUsersMap[userId] = socket.id
    }

    // here emit() will send events to all the online users

    io.emit("showOnlineUsers", Object.keys(connectingUsersMap))


    socket.on("typing" , (userMsg)=>{
      console.log("user is typing")
      socket.broadcast.emit("user-typing" , userMsg)
    })
    
    socket.on("stop-typing" , (userData)=>{
      console.log("user is stoped")
      socket.broadcast.emit("user-stop-typing" , userData)
    })



    socket.on("disconnect" ,()=>{
        delete connectingUsersMap[userId]
        io.emit("showOnlineUsers", Object.keys(connectingUsersMap) )
    });
})


export {io,server,app}