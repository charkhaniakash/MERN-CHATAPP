import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import WorkInProgress from "./components/WorkInProgress";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth , connectedUsers } = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return <div className="flex justify-center h-screen items-center">
      <Loader className="size-10 animate-spin" />
    </div>;
  }

  return (
    <div data-theme={theme}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?<HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> :<Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/stillWorking" element={<WorkInProgress />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  );
};

export default App;
