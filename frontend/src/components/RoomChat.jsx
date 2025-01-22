import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";


const RoomChat = ({ onClose }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { authUser } = useAuthStore();
  const { users,setSelectedRoom  } = useChatStore();
  

  useEffect(() => {
    fetchRooms();
  }, []);


  const handleRoomSelect = (room) => {
    console.log("...",room)
    setSelectedRoom(room);
    onClose(); 
  };

  const fetchRooms = async () => {
    try {
      const { data } = await axiosInstance.get("/rooms");
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const createRoom = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/rooms/create", {
        name: newRoomName,
        participants: selectedUsers,
      });
      setRooms([...rooms, data]);
      setNewRoomName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Create New Room</h2>
        <form onSubmit={createRoom} className="space-y-4">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Room Name"
            className="input input-bordered w-full"
            required
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Participants</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {users.map((user) => (
                <label key={user._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user._id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                      }
                    }}
                    className="checkbox"
                  />
                  <span>{user.fullName}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Create Room
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Rooms</h2>
        <div className="space-y-2">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="p-4 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300"
              onClick={() => handleRoomSelect(room)} 
            >
              <h3 className="font-semibold">{room.name}</h3>
              <p className="text-sm text-base-content/60">
                {room.participants.length} participants
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomChat;