import React, { useContext, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import EmptyChat from "./EmptyChat";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ChatArea = ({
  selectedUser,
  messages,
  message,
  setMessage,
  handleSendMessage,
  onBackToUsers,
  isMobile = false,
}) => {
  const { theme } = useContext(ThemeContext);
  const [isEmojie, setIsEmojie] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    console.log(emojiData.emoji);
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleEmojiBUttonClick = () => {
    setIsEmojie((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setIsEmojie(false);
      }
    };

    if (isEmojie) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEmojie]);
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

          {isEmojie && (
            <div
              ref={emojiPickerRef}
              className="absolute right-2 md:right-4 bottom-20 z-50"
            >
              <EmojiPicker
                theme={theme === "dark" ? "dark" : "light"}
                onEmojiClick={handleEmojiClick}
                width={isMobile ? 380 : 320}
                height={isMobile ? 350 : 500}
              />
            </div>
          )}
          <MessageInput
            message={message}
            setMessage={setMessage}
            handleEmojiBUttonClick={handleEmojiBUttonClick}
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
