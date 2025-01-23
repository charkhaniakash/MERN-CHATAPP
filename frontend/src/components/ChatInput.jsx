import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Loader2, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import TypingDots from "./TypingDots";

const ChatInput = ({ onSendMessage }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [userText, setUserText] = useState("");
  const [imageLoad, setImageLoad] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const [draftMessages, setDraftMessages] = useState({});
  const { sendMessages, selectedUser, selectedRoom } = useChatStore();

  const fileInputRef = useRef(null);
  const socket = useAuthStore.getState().socket;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userText.trim() && !imagePreview) return;

    try {
      if (onSendMessage) {
        // For room messages
        await onSendMessage(userText.trim());
      } else if (selectedUser) {
        // For direct messages
        await sendMessages({
          text: userText.trim(),
          image: imagePreview,
        });
        
        // Only emit typing events for direct messages
        socket.emit("stop-typing", { recipientId: selectedUser._id });
      }

      setUserText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleChangeText = (e) => {
    const currentMsg = e.target.value;
    setUserText(currentMsg);

    // Only handle drafts and typing for direct messages
    if (selectedUser) {
      setDraftMessages(prev => ({
        ...prev,
        [selectedUser._id]: currentMsg
      }));

      if (currentMsg === "") {
        socket.emit("stop-typing", { recipientId: selectedUser._id });
      } else {
        socket.emit("typing", { 
          recipientId: selectedUser._id,
          status: "typing"
        });
      }
    }
  };

  useEffect(() => {
    if (selectedUser && draftMessages[selectedUser._id]) {
      setUserText(draftMessages[selectedUser._id]);
    } else {
      setUserText("");
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("user-typing", (typeHead) => {
      setTypingStatus(typeHead);
    });

    socket.on("user-stop-typing", () => {
      setTypingStatus("");
    });

    return () => {
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, [socket]);
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageLoad(true);
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImagePreview(reader.result);
          setImageLoad(false);
        };
      } catch (error) {
        console.log("Error uploading image:", error);
        toast.error("Error uploading image");
        setImageLoad(false);
      }
    } else {
      toast.error("Please upload an image file");
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="px-4 py-3 ">
      {imageLoad && (
        <div className="flex items-center gap-2 mb-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Uploading image...</span>
        </div>
      )}

      {imagePreview && (
        <div className="mb-2">
          <div className="relative w-fit">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-32 h-32 object-contain"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {typingStatus && selectedUser && <TypingDots />}

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 input input-bordered h-10"
          value={userText}
          onChange={handleChangeText}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-circle btn-ghost btn-sm"
        >
          <Image className="w-5 h-5" />
        </button>

        <button type="submit" className="btn btn-circle btn-ghost btn-sm">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
