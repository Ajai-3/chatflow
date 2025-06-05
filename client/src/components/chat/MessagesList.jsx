import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { useRef } from "react";

const MessagesList = ({ messages, selectedUser }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isEmoji = (text) => {
    const emojiRegex =
      /([\u231A-\u27BF\u2B50\uFE0F\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u21AA\u21A9\u21AA\u23E9\u23EA\u23F0\u23F3\u2600-\u26FF\u2702\u2705\u2708\u2709\u270A\u270B\u2728\u274C\u274E\u2753\u2754\u2755\u2757\u2795\u2796\u2797\u27A1\u2934\u2935\u25AA\u25AB\u25FE\u25FB\u25FD\u25FB\u272B\u272C\u25D0\u25D1\u2764\u2B06\u2199\u2196\u2193\u2198\u25C0\u25B6\u2B06\u2197\u2B06\u2712-\u272F\u27BF]+|[^\x00-\x7F]+)/g;
    return emojiRegex.test(text);
  };

  const messageRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser._id }));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((msg, index) => (
        <div
          key={msg._id}
          ref={index === messages.length - 1 ? messageRef : null}
          className={`flex ${
            msg.senderId === user._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] md:max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl ${
              msg.senderId === user._id
                ? "bg-primary/50 text-primary-content rounded-br-md"
                : "bg-base-300/50 text-base-content rounded-bl-md"
            }`}
          >
            <p
              className={`${
                isEmoji(msg.message) && msg.message.length <= 2
                  ? "text-6xl"
                  : "text-md"
              } break-words`}
            >
              {msg.message}
            </p>

            <p
              className={`text-xs mt-1 ${
                msg.senderId === user._id
                  ? "text-primary-content/70"
                  : "text-base-content/60"
              }`}
            >
              {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
