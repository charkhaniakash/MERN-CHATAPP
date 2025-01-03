import React from "react";

const TypingDots = () => {
  return (
    <div class="flex space-x-2 justify-center items-center bg-white h-screen dark:inver bg-opacity-0 bg-gradient-to-r from-violet-200 to-pink-200">
      <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingDots;
