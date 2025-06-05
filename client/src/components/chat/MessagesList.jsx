import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { useRef } from "react";

const MessagesList = ({ messages, selectedUser }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const messageRef = useRef(null)

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUser._id }));
    }
  }, [selectedUser]);

  useEffect(() => {
    if(messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

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
                ? "bg-primary text-primary-content rounded-br-md"
                : "bg-base-300 text-base-content rounded-bl-md"
            }`}
          >
            <p className="text-sm break-words">{msg.message}</p>
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
