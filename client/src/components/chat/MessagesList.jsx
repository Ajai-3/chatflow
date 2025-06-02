import React from "react";

const MessagesList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.isMine
                ? "bg-primary text-primary-content"
                : "bg-base-300 text-base-content"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p
              className={`text-xs mt-1 ${
                msg.isMine
                  ? "text-primary-content/70"
                  : "text-base-content/60"
              }`}
            >
              {msg.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
