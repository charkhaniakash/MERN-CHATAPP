import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircleCode, Github, Twitter } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill all the fields");
    }
    login(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 mt-5">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Left Side - Decorative */}
        <div className="hidden md:block relative bg-gradient-to-br from-primary/90 to-purple-900 p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white">
              <MessageCircleCode className="w-8 h-8" />
              <span className="text-2xl font-bold">NammaChatApp</span>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">Start your journey with us</h2>
              <p className="text-white/80">Connect with friends and family seamlessly through our secure messaging platform.</p>
            </div>
            <div className="text-white/60 text-sm">
              2025 NammaChatApp. All rights reserved.
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 lg:p-12">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome back</h1>
              <p className="text-gray-400">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      className="block w-full pl-10 px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg 
                               focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors
                               text-white placeholder-gray-500"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full pl-10 px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg 
                               focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors
                               text-white placeholder-gray-500"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-primary hover:bg-primary-focus text-white font-medium py-2.5 rounded-lg
                         transition-colors duration-200 flex items-center justify-center gap-2
                         disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-primary-focus font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
