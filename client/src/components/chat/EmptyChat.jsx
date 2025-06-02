import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-base-100">
      <div className="text-center">
        <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaPaperPlane className="text-3xl text-base-content/40" />
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-2">
          Welcome to MyApp Chat
        </h2>
        <p className="text-base-content/60 mb-4">
          Select a conversation to start messaging
        </p>
        <div className="flex gap-2 justify-center">
          <a href="/login" className="btn btn-ghost btn-sm">
            Sign In
          </a>
          <a href="/signup" className="btn btn-primary btn-sm">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
