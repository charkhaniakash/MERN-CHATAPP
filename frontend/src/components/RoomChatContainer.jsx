import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";

const RoomChatContainer = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (room) {
      fetchRoomMessages();
    }
  }, [room]);

  const fetchRoomMessages = async () => {
    try {
      const { data } = await axiosInstance.get(`/messages/room/${room._id}`);
      setMessages(data);
    } catch (error) {
      console.error("Error++", error);
    }
  };
  

  const sendMessage = async (text) => {
    try {
      const { data } = await axiosInstance.post("/messages/room", {
        roomId: room._id,
        text,
      });
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{room.name}</h2>
        <p className="text-sm text-base-content/60">
          {room.participants.length} participants
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">
              <p className="font-bold text-sm">
                {message.senderId === authUser._id
                  ? "You"
                  : message.sender?.username}
              </p>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default RoomChatContainer;