import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from '../lib/utils';


const UserChats = () => {

 const {messages,selectedUser}= useChatStore()
 const {authUser} = useAuthStore()


  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((message) => (
      <div
      key={message.id}
      className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
      >
        <div>{message.senderId === authUser._id }</div>
        <div className=" chat-image avatar">
          <div className="size-10 rounded-full border">
            <img
              src={message.senderId === authUser._id ?authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png" }
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

  )
}

export default UserChats
