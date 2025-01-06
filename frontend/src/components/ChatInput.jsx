import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Loader2, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import TypingDots from "./TypingDots";

const ChatInput = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [userText, setUserText] = useState("");
  const [imageLoad, setImageLoad] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const { sendMessages, selectedUser } = useChatStore();

  const fileInputRef = useRef(null);
  const socket = useAuthStore.getState().socket;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userText.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text: userText.trim(),
        image: imagePreview,
      });

      setUserText("");
      setImagePreview(null);
      socket.emit("stop-typing", { recipientId: selectedUser._id });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleChangeText = (e) => {
    const currentMsg = e.target.value;
    setUserText(currentMsg);

    if (currentMsg === "") {
      socket.emit("stop-typing", { recipientId: selectedUser._id });
    } else {
      socket.emit("typing", { 
        recipientId: selectedUser._id,
        status: "typing"
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setImageLoad(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageLoad(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    socket.on("user-typing", (data) => {
      if (data.senderId === selectedUser._id) {
        setTypingStatus(data.status);
      }
    });

    socket.on("user-stop-typing", (data) => {
      if (data.senderId === selectedUser._id) {
        setTypingStatus("");
      }
    });

    return () => {
      socket.off("user-typing");
      socket.off("user-stop-typing");
    };
  }, [socket, selectedUser._id]);



  return (
    <div className="p-4 w-full">
      {imageLoad && <Loader2 className="mb-2 ml-2 h-7 w-7 animate-spin" />}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {typingStatus && <TypingDots />}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={userText}
            onChange={handleChangeText}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!userText.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default ChatInput;
