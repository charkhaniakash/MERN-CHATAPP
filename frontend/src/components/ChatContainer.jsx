import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessagesSkeleton from "./skeletons/MessagesSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const { isMessagesLoading, getMessages, messages, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

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
      {/* chat header */}
      <ChatHeader />

      <p>Content</p>
      {/* chat info */}
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
