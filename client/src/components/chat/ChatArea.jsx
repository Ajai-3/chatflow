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
  handleSendMessage,
  onBackToUsers,
  isMobile = false,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {selectedUser ? (
        <>
          <ChatHeader
            selectedUser={selectedUser}
            onBackToUsers={onBackToUsers}
            isMobile={isMobile}
          />
          <MessagesList messages={messages} selectedUser={selectedUser} />
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
