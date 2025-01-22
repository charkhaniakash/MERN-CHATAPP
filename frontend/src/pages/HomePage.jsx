import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatMessages from "../components/NoChatMessages";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { ContactRound, Linkedin, Mail } from "lucide-react";

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
                  Welcome to NammaChatApp!
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

      <div className="ml-2 mt-2 mr-2 flex justify-between items-center text-sm">
        <div>Made with ♥️ by Akash </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://www.linkedin.com/in/akash-charkhani-4375442a9/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            Contact &#128073; <Linkedin className="w-4 h-4" />
            {/* <span>Contact Me by <Linkedin className="w-4 h-4" /></span> */}
            {/* <ContactRound /> */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
