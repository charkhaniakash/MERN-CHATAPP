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
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if(userId) {
      connectingUsersMap[userId] = socket.id;
  }

  io.emit("showOnlineUsers", Object.keys(connectingUsersMap));

  socket.on("typing", (data) => {
      const recipientSocketId = connectingUsersMap[data.recipientId];
      if (recipientSocketId) {
          io.to(recipientSocketId).emit("user-typing", {
              senderId: userId,
              status: data.status
          });
      }
  });
  
  socket.on("stop-typing", (data) => {
      const recipientSocketId = connectingUsersMap[data.recipientId];
      if (recipientSocketId) {
          io.to(recipientSocketId).emit("user-stop-typing", {
              senderId: userId
          });
      }
  });

  socket.on("disconnect", () => {
      delete connectingUsersMap[userId];
      io.emit("showOnlineUsers", Object.keys(connectingUsersMap));
  });
});

export {io,server,app}