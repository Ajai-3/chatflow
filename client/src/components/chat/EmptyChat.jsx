import React from "react";
import { FaRocket } from "react-icons/fa";

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-base-100">
      <div className="text-center">
        <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaRocket className="text-5xl text-base-content/40" />
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-2">
          Welcome to MyApp Chat
        </h2>
        <p className="text-base-content/60 mb-4">
          Select a conversation to start messaging
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
