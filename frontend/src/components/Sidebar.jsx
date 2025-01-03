import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import SidebarSkeletonLoder from "./skeletons/SidebarSkeletonLoder";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, isUsersLoading,getUsers ,setSelectedUser , selectedUser} = useChatStore();
  const {connectedUsers} = useAuthStore()

  const [showOnlineUsersOnly , setShowOnlineUsersOnly] = useState(false)

  const showOnline = showOnlineUsersOnly ?  users.filter((user)=>connectedUsers.includes(user._id)) : users;
  console.log("showOnline" , connectedUsers)



    useEffect(()=>{
      getUsers()
    },[getUsers])

  if (isUsersLoading) {
    return <SidebarSkeletonLoder />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
           <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineUsersOnly}
              onChange={(e)=>setShowOnlineUsersOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({connectedUsers.length-1} online)</span>
        </div>
      </div>

      
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* TODO something must be done later */}
      </div>
      <div className="overflow-y-auto w-full py-3">
        {showOnline.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {connectedUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info visible only on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {connectedUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )} */}
      </div>
    </aside>
  );
};

export default Sidebar;