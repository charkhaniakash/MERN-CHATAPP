import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatMessages from "../components/NoChatMessages";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, users, getUsers } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? (
              <NoChatMessages>
                <h2 className="text-2xl font-bold">
                  Welcome to IntuChatBox!
                </h2>
                <p className="text-base-content/60">
                  Lets Get Start a Your Chats
                </p>
              </NoChatMessages>
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>

      <div className="ml-2 text-xl">Made with ♥️ by Akash </div>
    </div>
  );
};

export default HomePage;
