import React, { useEffect } from "react";
import { useChatStore} from "../store/useChatStore";
import NoChatMessages from "../components/NoChatMessages";
import Chat from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, users ,getUsers} = useChatStore();


  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatMessages /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
