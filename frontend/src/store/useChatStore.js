import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const usersList = await axiosInstance.get("/messages/users");
      console.log("usersList" , usersList.data.users)
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
      const chatMessages = await axiosInstance.get(`/message/${userId}`);
      set({ messages: chatMessages.data });
    } catch (error) {
      console.log(error);
      set({ isMessagesLoading: false });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async(messagePayload)=>{
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messagePayload);
      console.log("res" , res.data)
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("//",error.response.data.message);
      toast.error(error.response.data.message);
    }
  },

  // optimize this later
  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },
}));
