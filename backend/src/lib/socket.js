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


const connectingUsersMap = {}
io.on("connection" ,(socket)=>{
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId){
        connectingUsersMap[userId] = socket.id
    }

    console.log("connectingUsersMap" , connectingUsersMap)

    // here emit() will send events to all the online users

    io.emit("showOnlineUsers", Object.keys(connectingUsersMap) )


    socket.on("disconnect" ,()=>{
        delete connectingUsersMap[userId]
        io.emit("showOnlineUsers", Object.keys(connectingUsersMap) )
    });
})


export {io,server,app}