import React from 'react';

const TypingDots = () => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" 
             style={{animationDelay: '0ms'}} />
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" 
             style={{animationDelay: '150ms'}} />
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" 
             style={{animationDelay: '300ms'}} />
      </div>
      <span className="text-sm text-gray-600 font-medium">
        typing
      </span>
    </div>
  );
};

export default TypingDots;