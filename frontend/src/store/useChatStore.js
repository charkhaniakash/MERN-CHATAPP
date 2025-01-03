import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const usersList = await axiosInstance.get("/messages/users");
      set({ users: usersList.data.users });
    } catch (error) {
      console.log(error);
      set({ isUsersLoading: false });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const chatMessages = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: chatMessages.data });
    } catch (error) {
      console.log(error);
      set({ isMessagesLoading: false });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  listenUsersMessages: () => {
    const { selectedUser } = get();
    if(!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    console.log("***" , socket)
    socket.on("userChatData", (newMessageData) => {
      if(newMessageData.senderId !== selectedUser._id)return;
      set({ messages: [...get().messages, newMessageData] });
    });
  },

  unListenUsersMessages :()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("userChatData")
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },
}));
