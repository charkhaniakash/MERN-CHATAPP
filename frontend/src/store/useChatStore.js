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
    const { selectedUser, users, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
      const updatedUsers = users.filter((user) => user._id !== selectedUser._id);
      set({
        users: [selectedUser, ...updatedUsers],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },
  

  listenUsersMessages: () => {
    const socket = useAuthStore.getState().socket;
  
    socket.on("userChatData", (newMessageData) => {
      const { selectedUser, users } = get();
      if (newMessageData.senderId === selectedUser?._id) {
        set({ messages: [...get().messages, newMessageData] });
      }
  
      const updatedUsers = users.filter((user) => user._id !== newMessageData.senderId);
      const sender = users.find((user) => user._id === newMessageData.senderId);
  
      if (sender) {
        sender.unreadCount = (sender.unreadCount || 0) + 1;
  
        set({
          users: [sender, ...updatedUsers],
        });
      }
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
