import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import UserChats from "./UserChats";

const ChatContainer = () => {
  const { isMessagesLoading, getMessages, messages, selectedUser, listenUsersMessages, unListenUsersMessages} = useChatStore();

  console.log("***" , messages)

  useEffect(() => {
    getMessages(selectedUser._id);
    listenUsersMessages()

    return ()=>unListenUsersMessages();

  }, [selectedUser._id, getMessages,listenUsersMessages,unListenUsersMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <UserChats/>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
