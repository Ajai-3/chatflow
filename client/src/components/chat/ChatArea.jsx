import React from "react";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import EmptyChat from "./EmptyChat";

const ChatArea = ({ 
  selectedUser, 
  messages, 
  message, 
  setMessage, 
  handleSendMessage 
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {selectedUser ? (
        <>
          <ChatHeader selectedUser={selectedUser} />
          <MessagesList messages={messages} />
          <MessageInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default ChatArea;
