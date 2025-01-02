import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("response" ,res.data)
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async(data)=>{
    set({isSigningUp:true})
    try {
      const res = await axiosInstance.post("/auth/signup" , data)
      toast.success('Acount Created Successfully')
      set({authUser:res.data})
    } catch (error) {
      console.log("err",error)
      toast.error('Failed to create account')
    }finally{
      set({isSigningUp:false})
    }
  },

  login:async(userData)=>{
    console.log("runn")
    try {
      const res = await axiosInstance.post("/auth/login",userData)
      set({authUser:res.data})
      console.log("resssss",res)
      toast.success("LoggedIn successful")
    } catch (error) {
      console.log("eeeeee",error)
      toast.error(error.message)
    }finally{
      set({isLoggingIn:false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  profileUpdate: async(picData)=>{
    set({isUpdatingProfile:true})
    try {
      const profileData = await axiosInstance.put("/auth/updateProfile", picData)
      toast.success("Profile Updated Successfully")
      set({authUser:profileData.data})
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }finally{
      set({isUpdatingProfile:false})
    }
  }
}));
