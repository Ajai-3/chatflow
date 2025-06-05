import React from "react";
import { FaCircle, FaPhone, FaVideo, FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";


const ChatHeader = ({ selectedUser }) => {
  const onlineUsers = useSelector((state) => state.socket.onlineUsers)
  return (
    <div className="p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-base-300 overflow-hidden">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.fullname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&background=random`;
                }}
              />
            </div>
            {selectedUser?.online && (
              <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-base-100 rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-base-content">{selectedUser.fullname}</h2>
            <p className="text-sm text-base-content/60">
              {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-circle btn-sm">
            <FaPhone />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm">
            <FaVideo />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm">
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
