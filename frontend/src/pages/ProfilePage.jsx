import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";

const ProfilePage = () => {
  const { authUser, profileUpdate, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      await profileUpdate({ profilePic: base64Image });
      setSelectedImage(base64Image);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 pt-16 pb-8">
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Your Profile
          </h1>
          <p className="text-base-content/60 mt-2">Manage your personal information</p>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="size-40 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={selectedImage || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 
                    bg-primary hover:bg-primary-focus
                    p-3 rounded-full cursor-pointer 
                    shadow-lg transform transition-all duration-200
                    hover:scale-110 hover:rotate-6
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}`}
                >
                  <Camera className="w-5 h-5 text-primary-content" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{authUser?.fullName}</h2>
                <p className="text-base-content/60 text-sm">{authUser?.email}</p>
              </div>
              <p className="text-sm text-center text-base-content/60">
                {isUpdatingProfile ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-xs"></span>
                    Uploading...
                  </span>
                ) : (
                  "Click the camera icon to update your photo"
                )}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-base-content/60 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="px-4 py-3 bg-base-200 rounded-lg border border-base-300">
                    {authUser?.fullName}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-base-content/60 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-base-200 rounded-lg border border-base-300">
                    {authUser?.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Account Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-lg border border-base-300">
                  <span className="text-base-content/60">Member Since</span>
                  <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
