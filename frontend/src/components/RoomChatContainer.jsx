import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import { formatMessageTime } from "../lib/utils";

const RoomChatContainer = ({ room }) => {
    const [messages, setMessages] = useState([]);
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    const socket = useAuthStore.getState().socket;

    useEffect(() => {
        if (room) {
            fetchRoomMessages();
            socket.emit("join-room", room._id);
        }

        socket.on("new-room-message", (newMessage) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        return () => {
            if (room) {
                socket.emit("leave-room", room._id);
            }
            socket.off("new-room-message");
        };
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

            socket.emit("room-message", data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


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
                        className={`chat ${message.senderId._id === authUser._id ? "chat-end" : "chat-start"
                            }`}
                        ref={messageEndRef}
                    >

                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId._id === authUser._id
                                            ? authUser.profilePic || "/avatar.png"
                                            : message.senderId.profilePic || "/avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <ChatInput onSendMessage={sendMessage} />
        </div>
    );
};

export default RoomChatContainer;